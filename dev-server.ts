// dev-server.ts
// Development server that serves static files and transpiles TypeScript on-the-fly
// This allows the browser to load .tsx files directly during development

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.208.0/http/file_server.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.20.1/mod.js";

const PORT = 8000;

// Import map from deno.json
// Using ?deps to pin React 18 across all packages to avoid version conflicts
const reactVersion = "react@18.3.1,react-dom@18.3.1";
const importMap = {
  "react": `https://esm.sh/react@18.3.1`,
  "react-dom": `https://esm.sh/react-dom@18.3.1`,
  "react-dom/client": `https://esm.sh/react-dom@18.3.1/client`,
  "react-router-dom": `https://esm.sh/react-router-dom@6.22.0?deps=${reactVersion}`,
  "react/jsx-runtime": `https://esm.sh/react@18.3.1/jsx-runtime`,
  "react/jsx-dev-runtime": `https://esm.sh/react@18.3.1/jsx-dev-runtime`,
};

console.log(`🚀 Dev server running at http://localhost:${PORT}`);
console.log("   Watch mode enabled - changes will auto-reload\n");

// Initialize esbuild
await esbuild.initialize({});

// Clean up esbuild on exit
const cleanup = () => {
  esbuild.stop();
  Deno.exit();
};

Deno.addSignalListener("SIGINT", cleanup);
Deno.addSignalListener("SIGTERM", cleanup);

serve(
  async (req: Request) => {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Handle TypeScript/TSX files - transpile them
    if (pathname.endsWith(".ts") || pathname.endsWith(".tsx")) {
      try {
        const filePath = `.${pathname}`;
        const content = await Deno.readTextFile(filePath);
        
        // Transpile TypeScript to JavaScript using esbuild
        const result = await esbuild.transform(content, {
          loader: pathname.endsWith(".tsx") ? "tsx" : "ts",
          jsx: "automatic",
          jsxImportSource: "react",
          target: "esnext",
          format: "esm",
        });

        // Replace bare import specifiers with URLs from import map
        let code = result.code;
        for (const [specifier, url] of Object.entries(importMap)) {
          // Escape special regex characters in the specifier
          const escapedSpecifier = specifier.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
          // Match: import ... from "specifier" or import ... from 'specifier'
          const importRegex = new RegExp(
            `from\\s+['"]${escapedSpecifier}['"]`,
            "g"
          );
          code = code.replace(importRegex, `from "${url}"`);
        }

        return new Response(code, {
          headers: {
            "content-type": "application/javascript; charset=utf-8",
            "access-control-allow-origin": "*",
          },
        });
      } catch (error) {
        console.error(`Error transpiling ${pathname}:`, error);
        return new Response(`Error transpiling: ${error.message}`, {
          status: 500,
          headers: { "content-type": "text/plain" },
        });
      }
    }

    // For all other files, serve them normally
    return serveDir(req, {
      fsRoot: ".",
      showDirListing: false,
      quiet: false,
    });
  },
  { port: PORT }
);
