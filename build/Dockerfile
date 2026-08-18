# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Quiet Loop Digital — production image
#
# Three stages, one goal: the final image should contain nothing except what
# `node server.js` actually needs at 2am. No source, no devDependencies, no
# package manager, no root shell.
#
#   deps     installs dependencies only — its own layer, so editing source
#            code never invalidates the npm install cache
#   builder  copies source in, runs the Next.js build
#   runner   the shipped image — just the standalone server output,
#            running as a non-root user
#
# Build from the repo root:
#   docker build -f build/Dockerfile -t quietloopdigital-web .
# ---------------------------------------------------------------------------

ARG NODE_VERSION=24-alpine

# ---- deps ------------------------------------------------------------------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

# Only the lockfile-relevant files, so this layer is cached until a
# dependency actually changes.
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder -----------------------------------------------------------------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# The middleware and robots.ts both read COMING_SOON at request time via
# process.env, not at build time, so no build-time env vars are needed here.
RUN npm run build

# ---- runner ------------------------------------------------------------------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Bind to all interfaces — the default (localhost) is invisible from
# outside the container.
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# The base image ships the full npm CLI, with its own bundled
# dependencies (tar, undici, brace-expansion, ip-address, ...) — but a
# standalone server started with `node server.js` never calls npm. Those
# bundled packages pick up their own CVEs over time regardless, and a
# scanner correctly flags them as present even though nothing in this
# image can ever reach them. Removing npm/npx/corepack deletes that dead
# weight outright rather than carrying known vulnerabilities in
# unreachable code.
RUN rm -rf \
      /usr/local/lib/node_modules/npm \
      /usr/local/lib/node_modules/corepack \
      /usr/local/bin/npm \
      /usr/local/bin/npx \
      /usr/local/bin/corepack

# Alpine already has a "node" user (uid 1000) — reuse it instead of adding
# a new one, so the image doesn't drag in shadow-utils.
RUN mkdir -p /app/.next && chown node:node /app/.next

# Static assets first, largely so the CDN / edge cache picture is clear:
# these are the files a reverse proxy would serve directly.
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

# server.js is written by `next build` with output: "standalone"
CMD ["node", "server.js"]
