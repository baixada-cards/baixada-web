# Baixada web

The umbrella homepage for [baixada.cards](https://baixada.cards): a home for
playing, studying, and learning about card games.

The site is intentionally separate from the individual game applications. It
introduces Baixada, links to the live Truco game, lab, and guide, and gives
Escopa and Bisca explicit future states without pretending they have shipped.
The name comes from the family farm where these games became part of the
project creator's life; it is not a claim about the games' geographic origins
or where the software is made.

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
- `/es` — Spanish

The game applications remain on their own subdomains:

- `truco.baixada.cards`
- `escopa.baixada.cards` — planned
- `bisca.baixada.cards` — planned

## Deployment

`.openai/hosting.json` defines the Cloudflare-compatible Sites surface. The
current `chatgpt.site` deployment is owner-only behind Sign in with ChatGPT.
The application does not require persistent storage or runtime secrets. Public
access and a future `baixada.cards` custom-domain cutover are separate
decisions.
