# Software Requirements Specification (SRS) - CodeSync AI

## 1. Functional Requirements
- **FR1 Auth**: User registration, JWT login, session tracking.
- **FR2 IDE**: Monaco Editor integration, multi-tabs, custom Black & Gold theme styling.
- **FR3 Sync**: Real-time collaborative cursors and text diff synchronization.
- **FR4 Exec**: Multi-language isolated execution with stdout/stderr.
- **FR5 AI**: Gemini AI copilot, security audit, code quality scoring.
- **FR6 Tasks**: Kanban board task management and line comment conversion.

## 2. Non-Functional Requirements
- **NFR1 Performance**: Socket message latency < 50ms.
- **NFR2 Security**: Password hashing with bcrypt, JWT token verification, role middleware.
- **NFR3 Reliability**: Graceful fallback evaluator when execution or AI API keys are unconfigured.
