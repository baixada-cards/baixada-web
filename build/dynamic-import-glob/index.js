import { globSync } from "tinyglobby";

// vite-plugin-dynamic-import only uses fastGlob.sync(patterns, { cwd }).
// Scope the npm override to that caller to avoid its unpatched braces chain.
export const sync = (patterns, { cwd } = {}) =>
  globSync(patterns, { cwd, expandDirectories: false });

export default { sync };
