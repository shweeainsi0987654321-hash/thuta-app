# Web app project guidance

## Repository boundary

This repository owns the browser experience for Thadin: page routing, presentation, client-side forms, and API interaction. The API repository owns persistence, authentication decisions, and authorization. The future mobile client has its own repository and must use the same versioned API without sharing browser UI components.

## Stable architecture

- Use TypeScript, React, and Vite.
- Use React Router for browser routes and TanStack Query for server state.
- Use React Hook Form and Zod for listing forms and client-side validation where applicable.
- Keep API requests in the client API module and use the versioned `/api/v1` contract.
- Send credentials with requests so HTTP-only session cookies work. Do not store session tokens in browser storage.
- Keep browser presentation and styles in this repository; do not move database or authorization rules into the client.

## Constraints

- Read API DTOs and error responses from the API contract; do not assume client validation replaces server validation.
- Keep API base URL and asset origin configurable through `VITE_API_URL` and `VITE_API_ORIGIN`.
- Do not commit `.env`, generated build output, or TypeScript build cache files.
- Keep changes within this web repository unless the task explicitly includes another project.

For current user-facing behavior and setup, see `SPEC.md` and `README.md`.
