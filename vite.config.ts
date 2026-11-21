import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const SCHEME_JSON = fileURLToPath(new URL("./src/lib/colourmap.json", import.meta.url));
const VIRTUAL_ID = "virtual:schemes.css";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

type JsonMap = Record<string, { lt: Record<string, string>; dk: Record<string, string> }>;

/**
 * Emits scheme CSS from src/lib/colourmap.json — the single source (spec 17 §7).
 * `default` → :root / .dark; every other scheme → [data-scheme] blocks.
 * The JSON is re-read on each load so edits hot-apply in dev.
 */
function emitSchemeCss(): string {
  const map = JSON.parse(readFileSync(SCHEME_JSON, "utf8")) as JsonMap;
  const block = (sel: string, scale: Record<string, string>) =>
    `${sel} {\n${Object.entries(scale)
      .map(([step, v]) => `  --accent-${step}: ${v};`)
      .join("\n")}\n}`;
  const parts = ["/* GENERATED from src/lib/colourmap.json — do not edit by hand. */"];
  for (const [name, scheme] of Object.entries(map)) {
    if (name === "default") parts.push(block(":root", scheme.lt), block(".dark", scheme.dk));
    else parts.push(block(`[data-scheme="${name}"]`, scheme.lt), block(`[data-scheme="${name}"].dark`, scheme.dk));
  }
  return parts.join("\n\n") + "\n";
}

function schemeCss(): Plugin {
  return {
    name: "scheme-css",
    resolveId: (id) => (id === VIRTUAL_ID ? RESOLVED_ID : undefined),
    load: (id) => (id === RESOLVED_ID ? emitSchemeCss() : undefined),
    configureServer: (server) => {
      server.watcher.add(SCHEME_JSON);
    },
    handleHotUpdate: ({ file, server }) => {
      if (!file.replace(/\\/g, "/").endsWith("/colourmap.json")) return;
      const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
      if (mod) {
        server.moduleGraph.invalidateModule(mod);
        return [mod];
      }
    },
  };
}

export default defineConfig({
  plugins: [schemeCss(), react(), tailwindcss()],
  server: { allowedHosts: true },
});
