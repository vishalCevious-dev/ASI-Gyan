# ASI-Gyan Monorepo

This repo is now a Turborepo monorepo with two apps:

- `apps/backend` — Express + TypeScript API (migrated from your existing project)
- `apps/web` — Vite + React + TypeScript frontend

## Prerequisites

- Node.js 18+ and pnpm (via Corepack recommended)

## Install (pnpm)

This repo uses pnpm workspaces.

```
pnpm install
```

## Develop

Run both apps in parallel with Turborepo:

```
pnpm run dev
```

Or run individually:

```
pnpm --filter asi-gyan-backend run dev
pnpm --filter web run dev
```

## Build

```
pnpm run build
```

## Start backend

```
pnpm --filter asi-gyan-backend run start
```

## Drizzle Migrations (backend)

From the repo root using pnpm filter:

```
pnpm --filter asi-gyan-backend run migrate:generate
pnpm --filter asi-gyan-backend run migrate:push
```

Environment variables for the API live in `apps/backend/.env`.

## Docker

Build and run with Docker Compose (requires Docker Desktop):

```
docker compose up -d --build
```

Services:
- backend: http://localhost:3000
- web: http://localhost:8080

Update `docker-compose.yml` build arg `VITE_API_URL` if your API URL differs.
