ASI Gyan Backend — Express + TypeScript + Drizzle

Overview

- TypeScript, Express 5, Drizzle ORM (Postgres), Zod, JWT, bcrypt, Nodemailer.
- API prefix: `/api/v1`

Getting Started

PNPM usage

- Install deps: `pnpm install` (run at repo root)
- Dev server: `pnpm run dev`
- Build: `pnpm run build` → outputs to `dist/`
- Start (prod): `pnpm run start`
- Generate migrations: `pnpm run migrate:generate`
- Push migrations: `pnpm run migrate:push`

- Prereqs: Node 18+ and PostgreSQL (or Neon/Postgres URL).
- Install deps: `npm install`
- Copy env sample: `cp .env.sample .env` and fill values
  - Required: `DATABASE_URL`, `JWT_SECRET`, `SUPER_ADMIN_KEY`, `NODE_ENV`, `PORT`
- Dev server: `npm run dev`
- Build: `npm run build` → outputs to `dist/`
- Start (prod): `npm start`

Environment

- `.env.sample` lists all supported variables.
- NODE_ENV must be `PRODUCTION` or `DEVELOPMENT`.

Database (Drizzle)

- Generate migrations: `npm run migrate:generate`
- Push migrations: `npm run migrate:push`
  - Note: You’ll need a valid `DATABASE_URL` and network access to your DB.

Routes

- Health: `GET /api/v1/healthz` → `{ status: "ok" }`
- Auth
- `POST /api/v1/auth/register` (body: `{ name, email, password }`, optional `?superAdminKey=`)
  - `POST /api/v1/auth/login` (body: `{ email, password }`)
  - `GET /api/v1/auth/me` (auth required)
  - `POST /api/v1/auth/logout` (auth required)

Notes

- `express.static('public')` is configured; a placeholder file is added at `public/.gitkeep`.
- `getMe` returns a safe shape (no password).
- Registration no longer sets a non-existent `lastLogin` column; add it to schema + migration if you need it later.
