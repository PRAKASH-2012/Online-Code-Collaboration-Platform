# Contributing

## Development flow

1. Create a feature branch from `main`.
2. Install dependencies with `npm.cmd install` and `npm.cmd install --prefix server`.
3. Run `npm.cmd run build` before opening a pull request.
4. Use `npm.cmd run full` to verify the combined application.
5. Keep commits focused on one change.

## Commit style

Use short imperative subjects, for example:

- `Add project task filters`
- `Fix IDE execution fallback`
- `Document local deployment`

## Frontend changes

Keep React components close to the feature they render. Reuse existing context, services, and common components before adding new abstractions. Verify the IDE route at `http://localhost:5000/ide` after UI changes.

## Backend changes

Keep API behavior under `server/routes`, request handling under `server/controllers`, and reusable operations under `server/services`. Protected routes should use the existing authentication middleware. Do not commit secrets or local `.env` files.

## Pull requests

Include:

- A concise summary of the behavior change.
- The commands used for validation.
- Any database, environment, or deployment requirements.
- Screenshots for meaningful UI changes.
