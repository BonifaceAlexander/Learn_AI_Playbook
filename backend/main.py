# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio
import os
import uuid
import time
from typing import Optional

import httpx
from cryptography.fernet import Fernet
from dotenv import load_dotenv

# Use redis.asyncio (redis-py with asyncio support)
import redis.asyncio as redis

load_dotenv()

app = FastAPI(title="Learn AI Playbook Backend (redis-py async)")

# Config via env
REDIS_URL = os.getenv("REDIS_URL")  # e.g. redis://default:xxxxx@global-...upstash.io:6379
SESSION_TTL = int(os.getenv("SESSION_TTL", "1800"))  # seconds
FERNET_KEY = os.getenv("FERNET_KEY")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
ALLOW_OLLAMA = os.getenv("ALLOW_OLLAMA", "true").lower() in ("1", "true", "yes")

# Redis client placeholder
redis_client: Optional[redis.Redis] = None
fernet: Optional[Fernet] = None

# Pydantic models
class PromptIn(BaseModel):
    prompt: str

class KeyIn(BaseModel):
    key: str

@app.on_event("startup")
async def startup():
    global redis_client, fernet
    if REDIS_URL:
        # redis.from_url returns a Redis (async) client object
        redis_client = redis.from_url(
            REDIS_URL,
            encoding="utf-8",
            decode_responses=True,
            # Optional: set socket_timeout etc if needed
        )
        # Optionally test connection (non-fatal)
        try:
            await redis_client.ping()
        except Exception as e:
            # Log to stdout/stderr; Render logs will show this
            print("Warning: unable to ping redis:", str(e))
    else:
        print("REDIS_URL not configured — ephemeral sessions disabled")

    if FERNET_KEY:
        try:
            fernet = Fernet(FERNET_KEY.encode())
        except Exception as e:
            print("FERNET_KEY invalid:", e)
            fernet = None
    else:
        print("FERNET_KEY not set; keys will not be encrypted (NOT recommended for prod)")

# Helper: store key in redis encrypted
async def store_key(session_token: str, raw_key: str, ttl: int = SESSION_TTL):
    if not redis_client:
        raise HTTPException(status_code=500, detail="Redis not configured")
    if fernet:
        enc = fernet.encrypt(raw_key.encode()).decode()
    else:
        enc = raw_key
    # redis.set supports ex for expiry in seconds
    await redis_client.set(session_token, enc, ex=ttl)

async def retrieve_key(session_token: str) -> Optional[str]:
    if not redis_client:
        raise HTTPException(status_code=500, detail="Redis not configured")
    v = await redis_client.get(session_token)
    if not v:
        return None
    if fernet:
        try:
            return fernet.decrypt(v.encode()).decode()
        except Exception:
            return None
    return v

async def delete_key(session_token: str):
    if redis_client:
        await redis_client.delete(session_token)

@app.post("/api/mock")
async def mock_run(payload: PromptIn):
    # returns a canned response after simulating small latency
    await asyncio.sleep(0.2)
    out = {
        "output": f"[MOCK] This is a canned demo response for the prompt:\n{payload.prompt}\n\nTry pasting your OpenAI key in the sandbox to call a real model (client-side)."
    }
    return out

@app.post("/api/proxy-run")
async def proxy_run(payload: PromptIn):
    # Server-side mock / proxy placeholder
    await asyncio.sleep(0.2)
    return {"output": f"[PROXY MOCK] Server-side mock response for prompt:\n{payload.prompt}"}

@app.post("/session/create-key")
async def create_key(payload: KeyIn):
    """
    Store an ephemeral encrypted key in Redis and return a session token.
    NOTE: This example stores the key in Redis encrypted with Fernet.
    Do not use this pattern in production without additional hardening.
    """
    if not redis_client:
        raise HTTPException(status_code=500, detail="Ephemeral sessions require REDIS_URL and FERNET_KEY set in env")
    token = str(uuid.uuid4())
    await store_key(token, payload.key, ttl=SESSION_TTL)
    return {"session_token": token, "ttl_seconds": SESSION_TTL}

@app.post("/session/use-key")
async def use_key(payload: KeyIn):
    # convenience wrapper to create and return session token
    return await create_key(payload)

@app.post("/session/health")
async def session_health():
    """
    Return number of active sessions (approx).
    Note: KEYS is not recommended in production for large keyspaces.
    """
    if not redis_client:
        return {"active_sessions": 0}
    try:
        keys = await redis_client.keys("*")
        return {"active_sessions": len(keys)}
    except Exception as e:
        # If KEYS is unsafe or unsupported on provider, return -1 or a safe message
        print("Error while fetching keys:", e)
        return {"active_sessions": -1, "note": "Unable to fetch keys"}

@app.post("/api/ollama-run")
async def ollama_run(payload: PromptIn):
    """
    Call a local Ollama / vLLM endpoint if enabled.
    Adjust URL/path/payload parsing depending on your inference server API.
    """
    if not ALLOW_OLLAMA:
        raise HTTPException(status_code=403, detail="Ollama usage not enabled")
    # default endpoint shape; adjust for your Ollama/vLLM version
    url = OLLAMA_URL.rstrip("/") + "/api/completions"
    body = {
        "model": "llama2",  # change to installed model name
        "prompt": payload.prompt,
        "max_tokens": 400
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            resp = await client.post(url, json=body)
            resp.raise_for_status()
            data = resp.json()
            return {"output": data}
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Ollama error: {str(e)}")
