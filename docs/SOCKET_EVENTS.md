# CodeSync AI - Socket.IO Real-Time Event Architecture

## Server & Client Event Specification

### Presence & Room Events
- `join-project`: Connect socket to `project:<id>` room namespace.
- `presence-update`: Broadcast updated list of online connected collaborators.
- `user-joined` / `user-left`: Room notifications when users enter or exit.

### Collaborative Editing
- `code-change`: Broadcast Yjs document diff & line buffer modifications.
- `cursor-update`: Broadcast active user cursor position & selection range.
- `follow-user-position`: Sync scroll line and file tab for follow mode.
- `heatmap-activity`: Broadcast line edit count to render heatmap gutter decorations.

### Chat & Audio Huddle
- `new-chat-message`: Broadcast team chat message with code snippets.
- `typing-start` / `typing-stop`: Live typing status indicators.
- `audio-huddle-state`: Broadcast active speaker volume & mute states.
