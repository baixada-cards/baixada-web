import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://baixada.cards${pathname}`, {
      headers: {
        accept: "text/html",
        host: "baixada.cards",
        "x-forwarded-host": "baixada.cards",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the English Baixada homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Baixada — heads-up truco paulista laboratory<\/title>/i,
  );
  assert.match(html, /Heads-up truco paulista/i);
  assert.match(
    html,
    /card games and counterfactual-regret minimization/i,
  );
  assert.match(
    html,
    /A laboratory specialized in heads-up truco paulista \(more games to come\)\./i,
  );
  assert.match(html, /Play Truco/);
  assert.match(html, /Open the lab/);
  assert.match(html, /Read the guide/);
  assert.match(html, /https:\/\/truco\.baixada\.cards\/en\/lab\/study/);
  assert.match(html, /https:\/\/baixada\.cards\/og\.png/);
  assert.doesNotMatch(
    html,
    /The games|Why Baixada|Escopa|Bisca|games of the south|made in the south|not a casino|take your seat/i,
  );
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders the Portuguese surface", async () => {
  const response = await render("/pt");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Truco paulista para dois/);
  assert.match(
    html,
    /jogos de carta e minimização de arrependimento contrafactual/i,
  );
  assert.match(
    html,
    /Um laboratório especializado em truco paulista para dois jogadores \(mais jogos em breve\)\./i,
  );
  assert.match(html, /Jogar Truco/);
  assert.match(html, /Abrir o laboratório/);
  assert.match(html, /Ler o guia/);
  assert.doesNotMatch(
    html,
    /Os jogos|Por que Baixada|Escopa|Bisca|jogos do sul|feito no sul|cassino|Puxa uma cadeira/i,
  );
});

test("server-renders the Spanish surface", async () => {
  const response = await render("/es");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Truco paulista mano a mano/);
  assert.match(
    html,
    /juegos de cartas y minimización del arrepentimiento contrafactual/i,
  );
  assert.match(
    html,
    /Un laboratorio especializado en truco paulista mano a mano \(más juegos próximamente\)\./i,
  );
  assert.match(html, /Jugar al Truco/);
  assert.match(html, /Abrir el laboratorio/);
  assert.match(html, /Leer la guía/);
  assert.match(html, /Español/);
  assert.doesNotMatch(
    html,
    /Los juegos|Por qué Baixada|Escopa|Bisca|juegos del sur|hecho en el sur|casino/i,
  );
});

test("ships the photographic hero art direction", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const hero = await readFile(new URL("../public/hero-v2.jpg", import.meta.url));

  assert.match(css, /url\(["']?\/hero-v2\.jpg["']?\)/);
  assert.ok(hero.byteLength > 100_000, "hero image should not be an empty placeholder");
});

test("pins the canonical design-system revision", async () => {
  const packageJson = await readFile(
    new URL("../package.json", import.meta.url),
    "utf8",
  );
  assert.match(
    packageJson,
    /baixada-cards\/design-system#82638b7cdabbb56a4bce7b953e8571847bf6fda9/,
  );
});
