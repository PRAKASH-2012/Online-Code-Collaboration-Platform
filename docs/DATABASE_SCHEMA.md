# CodeSync AI - Database Schemas & Relations

CodeSync AI uses 25 Mongoose database models:

## Primary Models
1. **User**: Credentials, profile metadata, roles (`Platform Admin`, `Org Admin`, `Developer`), active sessions.
2. **Organization**: Team organization structure, logo, slug, owner reference.
3. **Team**: Sub-teams within organizations.
4. **Project**: Project metadata, language, framework, visibility (`Public`, `Private`, `Unlisted`), stars count, forks count.
5. **ProjectMember**: User to Project role assignment (`Owner`, `Maintainer`, `Editor`, `Reviewer`, `Viewer`).
6. **ProjectInvitation**: Email invitations with role tokens and expiration dates.
7. **File**: Path, content, language, project link, unsaved state.
8. **Message**: Project room chat messages with code snippet attachments.
9. **DirectMessage**: Private 1-on-1 team messages.
10. **Comment**: Line-level code comments with replacement suggestions.
11. **Review**: Live code review requests and status tracking.
12. **Task**: Kanban tasks with assignees, checklist items, and due dates.
13. **Issue**: Bug and feature issue tracking.
14. **Milestone**: Project roadmap progress metrics.
15. **Notification**: User system notifications.
16. **Version**: Line file commit entries.
17. **Snapshot**: Full workspace snapshot backups for instant restoration.
18. **Branch**: Internal project branches.
19. **Execution**: Sandbox execution history logs with stdout/stderr.
20. **AIInteraction**: AI prompt history and token metrics.
21. **ActivityLog**: User action logs.
22. **AuditLog**: Security audit events.
23. **Report**: User and project moderation reports.
24. **Snippet**: User reusable code snippets.
25. **Star**: User project stars mapping.
