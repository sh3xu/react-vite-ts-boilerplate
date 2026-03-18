FROM node:20-alpine AS deps

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY frontend/package.json frontend/pnpm-lock.yaml ./frontend/
RUN pnpm -C frontend install --frozen-lockfile

FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules

COPY . .

RUN pnpm -C frontend build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

RUN corepack enable

RUN addgroup -S nodejs && adduser -S node -G nodejs

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/frontend/dist ./frontend/dist

USER node

EXPOSE 3001

CMD ["node", "src/index.js"]
