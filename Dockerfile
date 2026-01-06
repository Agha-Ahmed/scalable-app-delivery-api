# ---- Base deps stage (cached) ----
FROM node:20-alpine AS deps
WORKDIR /app

# Only copy package files first (cache-friendly)
COPY package*.json ./
RUN npm ci --omit=dev

# ---- Runtime stage (minimal) ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# ✅ Step 5.6: Build-time build id (from CI) -> available at runtime automatically
ARG BUILD_ID=local
ENV BUILD_ID=$BUILD_ID

# Security hardening: create non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy only production node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY src ./src
COPY package*.json ./

# Run as non-root
USER app

# App Runner expects your app to listen on PORT env var
EXPOSE 3000

CMD ["node", "src/server.js"]
