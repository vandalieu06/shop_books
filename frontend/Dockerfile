# --- ETAPA 1: Base ---
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# --- ETAPA 2: Dependencias ---
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- ETAPA 3: Desarrollo ---
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]

# --- ETAPA 4: Build (Construcción de estáticos) ---
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# --- ETAPA 5: Producción (Servidor Web) ---
FROM nginx:1.29.8-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
