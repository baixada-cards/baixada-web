import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import glob from "../build/dynamic-import-glob/index.js";

test("resolves dynamic import extension alternatives and directory indexes", async (t) => {
  const cwd = await mkdtemp(join(tmpdir(), "dynamic-import-glob-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  await mkdir(join(cwd, "pages", "nested"), { recursive: true });
  for (const path of ["pages/en.ts", "pages/pt.js", "pages/nested/index.ts", "pages/no.css", "pages/.hidden.ts"]) {
    await writeFile(join(cwd, path), "");
  }

  assert.deepEqual(
    glob.sync(["pages/*.{js,ts}", "pages/*/index.{js,ts}"], { cwd }).sort(),
    ["pages/en.ts", "pages/nested/index.ts", "pages/pt.js"],
  );
});

test("handles deeply nested brace patterns without recursive stack exhaustion", () => {
  const pattern = "{".repeat(10_000) + "a" + "}".repeat(10_000);
  assert.deepEqual(glob.sync(pattern), []);
});
