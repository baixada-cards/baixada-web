# syntax=docker/dockerfile:1

FROM node:24.12.0-bookworm-slim AS deps

ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update \
  && apt-get install --no-install-recommends --yes ca-certificates curl git \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./

# Keep public-registry installs behind Socket Firewall, as in CI. The exact
# public design-system revision is fetched over HTTPS, never with an SSH key.
RUN curl --fail --location --proto '=https' --tlsv1.2 \
      https://github.com/SocketDev/sfw-free/releases/download/v1.13.1/sfw-free-linux-x86_64 \
      --output /usr/local/bin/sfw \
  && echo '4dc46b626a7c5b81c0b54e1984ee53be5a628dbfb2f55ab14e9b04c8a134db6a  /usr/local/bin/sfw' | sha256sum --check - \
  && chmod 0755 /usr/local/bin/sfw \
  && corepack enable \
  && sfw npm ci

FROM node:24.12.0-bookworm-slim AS build

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build:cloud-run

FROM node:24.12.0-bookworm-slim AS runtime

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0

WORKDIR /app

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

CMD ["node", "server.js"]
