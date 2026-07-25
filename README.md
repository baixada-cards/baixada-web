# Baixada web

The umbrella homepage for [baixada.cards](https://baixada.cards): a quiet home
for the card games of the south.

The site is intentionally separate from the individual game applications. It
introduces Baixada, links to the live Truco table and lab, and gives Escopa and
Bisca their future rooms without pretending they have shipped.

## Development

Requirements: Node.js 22.13 or newer.

```bash
npm ci
npm run dev -- --port 3005
npm run build
npm test
```

The Baixada visual system is consumed from the exact public
`baixada-cards/design-system` revision recorded in `package.json` and
`dependencies.lock.json`.

## Routes

- `/` — English
- `/pt` — Portuguese (Brazil)

The game applications remain on their own subdomains:

- `truco.baixada.cards`
- `escopa.baixada.cards` — planned
- `bisca.baixada.cards` — planned

## Deployment

`.openai/hosting.json` defines the Cloudflare-compatible Sites surface. The
homepage is public and does not require authentication, persistent storage, or
runtime secrets.
