# Deployment Guide 🚀

This guide explains how to deploy the **Learn AI Playbook** for free using **Vercel** (Frontend) and **Render** (Backend).

## Prerequisites

1.  **GitHub Account**: Ensure your code is pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **Render Account**: Sign up at [render.com](https://render.com).

---

## Part 1: Deploy Frontend (Vercel)

Vercel is the creators of Next.js and offers the best hosting experience for it.

1.  **Import Project**:
    *   Go to your Vercel Dashboard.
    *   Click **"Add New..."** -> **"Project"**.
    *   Select your `Learn_AI_Playbook` repository.

2.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: Click "Edit" and select `frontend`. **(Important!)**
    *   **Environment Variables**:
        *   If you deployed the backend (Part 2), add `NEXT_PUBLIC_API_URL` with your backend URL.
        *   Otherwise, you can skip this for now (the app works fine in "Mock Mode").

3.  **Deploy**:
    *   Click **"Deploy"**.
    *   Wait ~1 minute.
    *   🎉 **Success!** Your app is live at `https://your-project-name.vercel.app`.

---

## Part 2: Deploy Backend (Render) - *Optional*

The backend is needed if you want to persist data (like user sessions) or use server-side features in the future. Currently, the app works mostly client-side.

1.  **Create Web Service**:
    *   Go to your Render Dashboard.
    *   Click **"New +"** -> **"Web Service"**.
    *   Connect your repository.

2.  **Configure Service**:
    *   **Name**: `learn-ai-backend` (or similar).
    *   **Root Directory**: `backend`.
    *   **Runtime**: Python 3.
    *   **Build Command**: `pip install -r requirements.txt`.
    *   **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
    *   **Instance Type**: Free.

3.  **Environment Variables**:
    *   `ALLOW_OLLAMA`: `false` (Ollama is local-only).
    *   `REDIS_URL`: (Optional) If you use Upstash for Redis.

4.  **Deploy**:
    *   Click **"Create Web Service"**.
    *   It may take a few minutes to build.
    *   Copy the **onrender.com** URL and update your Vercel environment variables (Part 1).

---

## Part 3: Database (Upstash Redis) - *Optional*

If you want to save "Gallery" submissions or user progress in the future.

1.  Go to [upstash.com](https://upstash.com).
2.  Create a new Redis database (Free tier).
3.  Copy the `REDIS_URL` (starts with `redis://...`).
4.  Add this `REDIS_URL` to your **Render** environment variables.

---

## Part 4: Enable Analytics 📊

1.  **Push & Deploy**: Ensure you have pushed your latest code (with `_app.js` changes) to GitHub and Vercel has finished a new deployment.
2.  **Enable in Dashboard**: Go to your project in the **Vercel Dashboard** -> **Analytics** tab -> Click **"Enable"**.
3.  **Visit Production URL**: Analytics are **not** tracked on `localhost`. You must visit your deployed app (e.g., `https://your-app.vercel.app`).
4.  **Disable Ad Blockers**: If you are testing, ensure your ad blocker isn't blocking the analytics script.

---

## Troubleshooting

*   **"404 Not Found" on Vercel**: Did you set the **Root Directory** to `frontend`?
*   **Backend Sleeping**: On the Render free tier, the backend sleeps after 15 mins of inactivity. The first request might take 30-50 seconds to wake it up.
