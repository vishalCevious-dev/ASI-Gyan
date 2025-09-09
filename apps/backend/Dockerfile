# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder
WORKDIR /repo

# Enable pnpm via Corepack
RUN corepack enable

# Copy workspace manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/backend/package.json apps/backend/package.json

# Install only backend workspace (with dev deps for build)
RUN pnpm install --filter=asi-gyan-backend... --frozen-lockfile

# Copy source
COPY apps/backend apps/backend

# Build backend
RUN pnpm -F asi-gyan-backend build


FROM node:22-alpine AS runtime
WORKDIR /app

# Enable pnpm via Corepack for installing prod deps
RUN corepack enable

# Copy workspace manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/backend/package.json apps/backend/package.json

# Install production dependencies for backend only
RUN pnpm install --filter=asi-gyan-backend... --prod --frozen-lockfile

# Copy built output
COPY --from=builder /repo/apps/backend/dist ./apps/backend/dist

ENV NODE_ENV=production
EXPOSE 3000
WORKDIR /app/apps/backend
CMD ["node", "dist/index.js"]

