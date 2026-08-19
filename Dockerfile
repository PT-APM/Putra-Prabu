FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1


ARG NEXT_PUBLIC_AWS_REGION
ARG NEXT_PUBLIC_AWS_S3_BUCKET
ENV NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION
ENV NEXT_PUBLIC_AWS_S3_BUCKET=$NEXT_PUBLIC_AWS_S3_BUCKET

# Build-time-only placeholder: pages are force-dynamic, so no query ever
# runs against this during `next build` — it only has to be a non-empty
# string so the Prisma MariaDB adapter doesn't throw while the page modules
# are imported to collect route data. The real DATABASE_URL is supplied at
# container runtime (see docker-compose on the deploy host).
ENV DATABASE_URL="mysql://build:build@localhost:3306/build"

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
