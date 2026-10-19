# Thadin web app

Responsive browser client for searching Myanmar property listings and managing owner accounts. Built with React, TypeScript, and Vite; the app uses the Thadin API for data and authentication.

## Requirements

- Node.js and npm
- The API running locally (see [`../api/README.md`](../api/README.md))

## Local development

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Vite serves the app at `http://localhost:5173` by default. `.env.example` sets the local API URL and API origin; update these values when using a different API host.

## Commands

- `npm run dev` — start the Vite development server.
- `npm run lint` — type-check the app.
- `npm run build` — type-check and build production assets into `dist/`.
- `npm run preview` — serve the production build locally.

See `SPEC.md` for browser features and `AGENTS.md` for stable architecture and repository constraints.
