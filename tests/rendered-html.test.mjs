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
  assert.match(html, /A table in the south/i);
  assert.match(html, /Play Truco/);
  assert.match(html, /Study the game/);
  assert.match(html, /This is not a casino\. It is a family table\./);
  assert.match(html, /Take your seat\./);
  assert.match(html, /Escopa/);
  assert.match(html, /Bisca/);
  assert.match(html, /https:\/\/baixada\.cards\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders the Portuguese surface", async () => {
  const response = await render("/pt");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Uma mesa no sul/);
  assert.match(html, /Jogar Truco/);
  assert.match(html, /Isto não é um cassino\. É uma mesa de família\./);
  assert.match(html, /Puxa uma cadeira/);
  assert.match(html, /feito no sul/);
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
