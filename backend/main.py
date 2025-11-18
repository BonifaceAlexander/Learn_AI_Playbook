from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio, os, uuid, time
import httpx
import aioredis
from cryptography.fernet import Fernet
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title='Learn AI Playbook Backend')

REDIS_URL = os.getenv('REDIS_URL')
SESSION_TTL = int(os.getenv('SESSION_TTL', '1800'))
FERNET_KEY = os.getenv('FERNET_KEY')
OLLAMA_URL = os.getenv('OLLAMA_URL', 'http://localhost:11434')
ALLOW_OLLAMA = os.getenv('ALLOW_OLLAMA', 'true').lower() in ('1','true','yes')

redis = None
fernet = None

class PromptIn(BaseModel):
    prompt: str

class KeyIn(BaseModel):
    key: str

@app.on_event("startup")
async def startup():
    global redis, fernet
    if REDIS_URL:
        redis = await aioredis.from_url(REDIS_URL, encoding='utf-8', decode_responses=True)
    if FERNET_KEY:
        fernet = Fernet(FERNET_KEY.encode())
    else:
        print("FERNET_KEY not set; keys will not be encrypted in redis (not recommended)")

async def store_key(session_token: str, raw_key: str, ttl:int=SESSION_TTL):
    if not redis:
        raise HTTPException(status_code=500, detail="Redis not configured")
    if fernet:
        enc = fernet.encrypt(raw_key.encode()).decode()
    else:
        enc = raw_key
    await redis.set(session_token, enc, ex=ttl)

async def retrieve_key(session_token: str):
    if not redis:
        raise HTTPException(status_code=500, detail="Redis not configured")
    v = await redis.get(session_token)
    if not v: return None
    if fernet:
        try:
            return fernet.decrypt(v.encode()).decode()
        except Exception:
            return None
    return v

@app.post('/api/mock')
async def mock_run(payload: PromptIn):
    await asyncio.sleep(0.2)
    return {"output": f"[MOCK] This is a demo response for: {payload.prompt}"}

@app.post('/api/proxy-run')
async def proxy_run(payload: PromptIn):
    await asyncio.sleep(0.2)
    return {"output": f"[PROXY MOCK] Server-side mock for: {payload.prompt}"}

@app.post('/session/create-key')
async def create_key(payload: KeyIn):
    if not redis:
        raise HTTPException(status_code=500, detail="Redis not configured")
    token = str(uuid.uuid4())
    await store_key(token, payload.key)
    return {"session_token": token, "ttl_seconds": SESSION_TTL}

@app.post('/session/health')
async def session_health():
    if not redis:
        return {"active_sessions": 0}
    keys = await redis.keys('*')
    return {"active_sessions": len(keys)}

@app.post('/api/ollama-run')
async def ollama_run(payload: PromptIn):
    if not ALLOW_OLLAMA:
        raise HTTPException(status_code=403, detail="Ollama disabled")
    url = OLLAMA_URL.rstrip('/') + '/api/completions'
    body = {"model":"llama2", "prompt": payload.prompt, "max_tokens": 300}
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            resp = await client.post(url, json=body)
            resp.raise_for_status()
            return {"output": resp.json()}
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=str(e))
