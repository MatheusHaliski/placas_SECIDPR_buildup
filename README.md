# Placas SECIDPR - React + TypeScript Webapp

This repository is structured as a normal **client + server** TypeScript application:

- `client/`: React app (Vite + TypeScript)
- `server/`: Express API/server (TypeScript)
- `public/`: central static assets used by the client (SVG)

## Routes

- `/app/app`: SECID placa data form.
- `/app/app/placa`: customized placa preview generated from the submitted form data.

## Development

```bash
npm install
npm run dev
```

- React client: http://localhost:5173/app/app
- API server: http://localhost:3000
- Health endpoint: http://localhost:3000/api/health

## Production build and run

```bash
npm run build
npm run start
```

Vite uses the repository-level `public/` folder as the static asset source, and the server serves the built client from `client/dist` with SPA fallback so `/app/app` and `/app/app/placa` do not return 404.
