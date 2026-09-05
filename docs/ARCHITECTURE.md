# CodeSync AI - System Architecture & Technical Specifications

## Architecture Overview
CodeSync AI is built as a real-time full-stack collaborative IDE using a decoupled client-server architecture.

```
+-------------------------------------------------------------------------+
|                          REACT FRONTEND CLIENT                          |
|   Vite + Tailwind CSS + Monaco Editor + Recharts + Lucide + Yjs Client |
+------------------------------------+------------------------------------+
                                     |
                          HTTP REST  |  Socket.IO WebSockets
                                     |
+------------------------------------v------------------------------------+
|                         EXPRESS & SOCKET.IO SERVER                      |
|       JWT Auth + Rate Limiter + Mongoose Schemas + Socket Manager       |
+------------------+------------------+-------------------+---------------+
                   |                  |                   |
         +---------v-------+  +-------v--------+  +-------v--------+
         | MongoDB Atlas   |  | Judge0 Engine  |  | Gemini AI Engine|
         | Persistent DB   |  | Sandbox Exec   |  | Copilot Suite  |
         +-----------------+  +----------------+  +----------------+
```

## System Components
1. **Frontend IDE Engine**: Monaco Editor with custom Black & Gold theme styling, split views, collaborative cursors, and line heatmap decorations.
2. **Real-time Sync**: Socket.IO rooms per project namespace (`project:<id>`) managing Yjs document state updates, live cursors, presence lists, and typing indicators.
3. **Execution Engine**: Judge0 API abstraction with server-side sandboxed fallback evaluator supporting JavaScript, Python, Java, C, C++, and TypeScript.
4. **AI Developer Suite**: Google Gemini API integration supporting natural language Q&A, refactoring, OWASP security audits, code scoring, and scaffold generation.
