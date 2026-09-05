# CodeSync AI - Deployment Guide

## Production Environment Setup
1. **Frontend (Vercel / Netlify)**:
   - Build Command: `npm run build`
   - Output Directory: `client/dist`
2. **Backend (Render / Railway)**:
   - Start Command: `node server/server.js`
   - Environment Variables: `MONGODB_URI`, `JWT_SECRET`, `AI_API_KEY`, `JUDGE0_API_KEY`
