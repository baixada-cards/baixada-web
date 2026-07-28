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

The public homepage runs as the `baixada-web` Cloud Run service in the private
Baixada production project. A manual-only GitHub Actions workflow builds an
immutable container image from exact `main`, deploys it with zero minimum and
one maximum instance, smoke-tests every public locale, and rolls traffic back
to the previous revision if that check fails. The service has no persistent
storage or runtime secrets.

`.openai/hosting.json` remains the source of truth for a separate, owner-only
`chatgpt.site` design preview. It is not the public `baixada.cards` origin.
