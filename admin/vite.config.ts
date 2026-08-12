import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

const here = import.meta.dirname
const repoRoot = resolve(here, '..')

/**
 * The admin console builds and deploys separately from the customer portal.
 * It shares node_modules and the design tokens in src/index.css, nothing else —
 * in particular the two apps never share an auth tree.
 */
export default defineConfig({
  root: here,
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    // Design tokens live outside this app's root
    fs: { allow: [repoRoot] },
  },
  build: {
    outDir: resolve(repoRoot, 'dist-admin'),
    emptyOutDir: true,
  },
})
