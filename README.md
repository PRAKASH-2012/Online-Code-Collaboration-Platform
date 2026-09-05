# CodeSync AI – Intelligent Real-Time Online Code Collaboration Platform

> An enterprise-grade, full-stack real-time collaborative IDE and developer platform designed with a high-end **Black + Gold Professional Theme**.

---

## 🌟 Overview
CodeSync AI is a complete developer collaboration ecosystem combining features from **VS Code**, **GitHub**, **Replit**, **Live Share**, **Linear**, **Slack**, and **Notion** into a unified, ultra-responsive, futuristic workspace.

### Key Capabilities
- **Black & Gold Visual Identity**: Deep space black background (`#050505`), charcoal surfaces, metallic gold highlights, and subtle ambient glows.
- **Real-Time Collaborative Editing**: Multi-user simultaneous editing, live cursors, presence indicators, follow mode, and Yjs CRDT synchronization.
- **Monaco Editor IDE**: Multi-tab support, split view, custom Monaco dark theme, dirty indicators, auto-save, and code minimap.
- **Isolated Code Execution**: Support for Node.js, Python, Java, C, C++, and TypeScript with live stdout/stderr and memory tracking.
- **Gemini AI Developer Suite**: Ask AI, Inline Assistant, AI Code Review & Scoring, AI Security Scanner, AI Project Scaffolder, and AI Test Generator.
- **Voice Huddle & Team Chat**: Real-time team audio channels with speaker pulse indicators and project room chat.
- **Time-Travel Code Replay & Heatmap**: Scrubbable timeline slider to replay file evolution and visual line edit heatmaps.
- **Task & Project Management**: Kanban boards, issue tracking, milestones, organizations, audit logs, and version snapshots.

---

## 🚀 Quick Start

### 1. Installation
```bash
# Clone or navigate to the workspace
cd C:\Users\rprak\.gemini\antigravity\scratch\codesync-ai

# Install all dependencies (Root, Server, and Client)
npm run setup
```

### 2. Environment Configuration
Copy `.env.example` to `.env` inside `server/`:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codesync-ai
JWT_SECRET=codesync_ai_super_secret_jwt_key_2026_black_and_gold
AI_API_KEY=your_gemini_api_key_here
```

For the full local development workflow, see [Local Development](docs/LOCAL_DEVELOPMENT.md).
Contribution and pull request guidelines are available in [Contributing](docs/CONTRIBUTING.md).

### 3. Database Seed & Start
```bash
# Seed realistic demo data (Prakash, Arun, Kumar, Meena)
npm run seed

# Launch the combined production-style app (Express serves the built frontend)
npm run full
```

Visit **`http://localhost:5000`** in your browser. The IDE is available at **`http://localhost:5000/ide`**.

---

## 📚 Technical Documentation Suite

Detailed guides are available in the `docs/` folder:
- [Architecture & Specifications](file:///C:/Users/rprak/.gemini/antigravity/scratch/codesync-ai/docs/ARCHITECTURE.md)
- [Database Schema (25 Mongoose Models)](file:///C:/Users/rprak/.gemini/antigravity/scratch/codesync-ai/docs/DATABASE_SCHEMA.md)
- [REST API Documentation](file:///C:/Users/rprak/.gemini/antigravity/scratch/codesync-ai/docs/API_DOCUMENTATION.md)
- [Socket.IO Real-Time Events](file:///C:/Users/rprak/.gemini/antigravity/scratch/codesync-ai/docs/SOCKET_EVENTS.md)
- [Software Requirements Specification (SRS)](file:///C:/Users/rprak/.gemini/antigravity/scratch/codesync-ai/docs/SRS.md)
- [Testing & Verification Guide](file:///C:/Users/rprak/.gemini/antigravity/scratch/codesync-ai/docs/TESTING.md)
- [Deployment Guide](file:///C:/Users/rprak/.gemini/antigravity/scratch/codesync-ai/docs/DEPLOYMENT.md)
- [Security Guidelines](file:///C:/Users/rprak/.gemini/antigravity/scratch/codesync-ai/docs/SECURITY.md)
- [User Guide & Shortcuts](file:///C:/Users/rprak/.gemini/antigravity/scratch/codesync-ai/docs/USER_GUIDE.md)

---

## ⚖️ License
MIT License © 2026 CodeSync AI Team.
