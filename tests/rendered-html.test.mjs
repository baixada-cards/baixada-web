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
  assert.match(html, /<title>Baixada — card games of the south<\/title>/i);
  assert.match(html, /A LAB FOR THE CARD GAMES OF THE SOUTH/i);
  assert.match(html, /Sit at the Truco table/);
  assert.match(html, /Truco · Lab/);
  assert.match(html, /Escopa/);
  assert.match(html, /Bisca/);
  assert.match(html, /https:\/\/baixada\.cards\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders the Portuguese surface", async () => {
  const response = await render("/pt");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Baixada é um lugar tranquilo/);
  assert.match(html, /Sentar à mesa de Truco/);
  assert.match(html, /Puxa uma cadeira/);
  assert.match(html, /feito no sul/);
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
