FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

ARG BUILD_ID=local
ENV BUILD_ID=$BUILD_ID

LABEL org.opencontainers.image.revision=$BUILD_ID \
      org.opencontainers.image.title="scalable-app-delivery-api"

RUN addgroup -S app && adduser -S app -G app

COPY --from=deps /app/node_modules ./node_modules

COPY src ./src
COPY package*.json ./

RUN chown -R app:app /app

# Install small probe tool for HEALTHCHECK (kept minimal)
RUN apk add --no-cache curl

# Run as non-root
USER app

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD curl -fsS http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]