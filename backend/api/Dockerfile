# --- ETAPA 1: Base ---
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /api
RUN corepack enable && corepack prepare pnpm@latest --activate

# --- ETAPA 2: Dependencias (Instalación total) ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- ETAPA 3: Solo Dependencias de Producción ---
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# --- ETAPA 4: Desarrollo ---
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /api/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]

# --- ETAPA 5: Producción (Runner) ---
FROM node:22-alpine AS production
WORKDIR /api
ENV NODE_ENV=production
COPY --from=prod-deps /api/node_modules ./node_modules
COPY . .
RUN chown -R node:node /api
USER node
EXPOSE 3000
CMD ["node", "src/server.js"]
