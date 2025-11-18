# Learn AI Playbook — Interactive GenAI Playground

Learn AI Playbook is a hands-on, interactive GenAI learning sandbox with BYOK (Bring Your Own Key) support,
open-model demos, lessons, a gallery of community examples, and safe ephemeral-key support for server-side features.

Built with: **Next.js** (frontend) + **FastAPI** (backend) — starter repo for fast launch.

## Quick links
- Sandbox: `/frontend/pages/sandbox.js`
- Lessons: `/frontend/pages/lessons.js`
- Gallery: `/frontend/pages/gallery.js`
- Backend mock & ephemeral sessions: `/backend/main.py`

### Frontend
```bash
cd frontend
npm ci
npm run dev
# Open http://localhost:3000
```

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# Backend available at http://localhost:8000
```

## Deploy hints
- Frontend: Deploy on Vercel (project name: learn-ai-playbook)
- Backend: Deploy on Render/Cloud Run/Railway with env vars:
  - REDIS_URL
  - FERNET_KEY
  - OLLAMA_URL (if using Ollama)
  - ALLOW_OLLAMA (true/false)


## License
MIT
