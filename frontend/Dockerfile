# Etapa 1: Dependencias
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Etapa 2: Desarrollo
FROM node:22-alpine AS dev
WORKDIR /app

ENV NODE_ENV=development
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 8080

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]
