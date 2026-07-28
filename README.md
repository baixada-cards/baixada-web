# Baixada web

The umbrella homepage for [baixada.cards](https://baixada.cards): a laboratory
specialized in heads-up truco paulista.

The site is intentionally separate from the individual game applications. It
introduces Baixada and links to the Truco laboratory, guide, and playable game.
The laboratory and guide are the project's primary contribution; the playable
game is available as a supporting surface. More games may be added later.

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

Game applications remain on their own subdomains:

- `truco.baixada.cards`

## Deployment

`.openai/hosting.json` defines the Cloudflare-compatible Sites surface. The
current `chatgpt.site` deployment is owner-only behind Sign in with ChatGPT.
The application does not require persistent storage or runtime secrets. Public
access and a future `baixada.cards` custom-domain cutover are separate
decisions.
