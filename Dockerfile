# Smart Business — Silver submission build image
FROM node:20-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates libvips42 \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_GOOGLE_MAP_KEY=build-placeholder \
    NEXT_PUBLIC_BASE_URL=https://api.smartbusiness.local \
    NEXT_CLIENT_HOST_URL=http://localhost:3000 \
    NEXT_PUBLIC_SITE_VERSION=3.9
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
