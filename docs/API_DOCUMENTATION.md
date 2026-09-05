# CodeSync AI - REST API Documentation

## Endpoints Summary

### Authentication (`/api/auth`)
- `POST /register`: Create new developer account
- `POST /login`: Authenticate and receive JWT access token
- `GET /profile`: Get active user profile
- `PUT /profile`: Update profile fields
- `GET /sessions`: View active logged-in devices

### Projects (`/api/projects`)
- `GET /`: Get user projects
- `GET /public`: Browse public projects
- `POST /`: Create project
- `GET /:id`: Get project details & member list
- `POST /:id/star`: Toggle star on project
- `POST /:id/fork`: Fork project into personal workspace

### Code Execution (`/api/executions`)
- `POST /run`: Evaluate code snippet in sandbox

### AI Assistant (`/api/ai`)
- `POST /prompt`: Query AI Assistant (Ask, Refactor, Security Audit, Quality Score, Scaffold)
