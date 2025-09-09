# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder
WORKDIR /repo
RUN corepack enable

# Build args for Vite envs
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

# Copy workspace manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json apps/web/package.json

# Install only web workspace
RUN pnpm install --filter=web... --frozen-lockfile

# Copy source
COPY apps/web apps/web

# Build web
RUN pnpm -F web build


FROM nginx:stable-alpine AS runtime
WORKDIR /usr/share/nginx/html
COPY --from=builder /repo/apps/web/dist .

# Provide SPA-friendly nginx config
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

