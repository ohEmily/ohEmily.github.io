#!/usr/bin/env node
// build.js
// Build script using esbuild to bundle the React app

import * as esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function build() {
  try {
    console.log('🔨 Building production bundle...');
    
    await esbuild.build({
      entryPoints: [join(projectRoot, 'src/main.tsx')],
      bundle: true,
      minify: true,
      format: 'esm',
      platform: 'browser',
      target: 'es2020',
      outfile: 'bundle.js',
      jsx: 'automatic',
      jsxImportSource: 'react',
      external: [],
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.jsx': 'jsx',
        '.js': 'js',
      },
    });
    
    console.log('✅ Bundle created successfully: bundle.js');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
