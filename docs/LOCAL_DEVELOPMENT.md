# Local Development

## Install

```powershell
npm.cmd install
npm.cmd install --prefix server
```

## Run the combined application

Build the React frontend and serve it from Express:

```powershell
npm.cmd run full
```

Open:

- Application: http://localhost:5000
- IDE workspace: http://localhost:5000/ide
- Backend health: http://localhost:5000/api/health

## Frontend-only development

Use the Vite server when working on frontend changes:

```powershell
npm.cmd run client
```

The Vite server runs on port 5173 and proxies API and Socket.IO requests to port 5000.

## Database fallback

MongoDB is optional for local UI and scratchpad execution. When MongoDB is unavailable, the server keeps the API and local demo execution available, but database-backed projects, task history, file persistence, and activity history are not durable.

## IDE workflow

1. Open `/ide`.
2. Create files and folders from the Explorer.
3. Edit code in Monaco.
4. Use `Ctrl+S` to save project files.
5. Use `Ctrl+Enter` or **Run** to execute the active file.
6. Open **AI Suggestions** for active-file guidance.
7. Use the activity bar for Search, Tasks, Chat, Extensions, Review, and Version History.
