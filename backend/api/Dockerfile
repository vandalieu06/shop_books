# --- ETAPA 1: Base (Configuración común) ---
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /api
RUN corepack enable && corepack prepare pnpm@latest --activate

# --- ETAPA 2: Dependencias (Deps) ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- ETAPA 3: Desarrollo (Dev) ---
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /api/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]

# --- ETAPA 4: Producción (Runner) ---
FROM node:22-alpine AS production
WORKDIR /api
ENV NODE_ENV=production
COPY --from=deps /api/node_modules ./node_modules
COPY . .
RUN chown -R node:node /api
EXPOSE 3000
USER node
CMD ["node", "src/server.js"]
