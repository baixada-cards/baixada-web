# Dynamic import glob adapter

`vite-plugin-dynamic-import@1.6.0` calls only
`fastGlob.sync(patterns, { cwd })` when discovering dynamic import targets.
The scoped npm override routes that call to `tinyglobby@0.2.17` without its
unpatched `fast-glob → micromatch → braces` dependency chain
([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)).

This implements only that call, not the entire fast-glob API. Directory
expansion is disabled to match the caller's original file-only behavior.
The root file dependency lets npm resolve the same adapter from this caller;
the override is restricted to `vite-plugin-dynamic-import`.

The regression tests cover extension alternatives, directory index discovery,
hidden-file exclusion, and deeply nested brace patterns. Recheck the caller's
API when upgrading the plugin. Remove the adapter when the upstream plugin
uses a patched dependency chain.
