# Agent Instructions

## Repository purpose

This repository owns the public Baixada umbrella homepage at `baixada.cards`.
It introduces the brand and routes visitors to the independently deployed game
rooms. Gameplay, game rules, study tooling, and private operations belong in
their owning repositories.

## Brand and architecture

- `baixada-cards/design-system` owns naming, tokens, marks, and brand
  governance. Consume its exact reviewed revision; do not fork those assets.
- `baixada-cards/truco-web` owns the Truco application and lab.
- Escopa and Bisca remain future rooms until their repositories have live
  products.
- English and Brazilian Portuguese are first-class public surfaces.

## Workflow

- Use Socket Firewall for supported public-registry dependency fetches.
- Keep dependencies locked and pin cross-repository inputs to full commits.
- Run `npm run lint`, `npm run build`, and `npm test` before wrapping up.
- Inspect desktop and mobile screenshots for visible changes.
- Do not use port 3000 for agent-owned previews.
- Sign commits.

## Security and publishing

- Never add credentials, private operational state, personal contact details,
  commercial media, or game-owned source.
- Keep the site anonymous and static unless a concrete product requirement
  justifies persistence or authentication.
- `.openai/hosting.json` is the source of truth for Sites hosting identity and
  bindings.
