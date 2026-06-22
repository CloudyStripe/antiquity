/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

// The GitHub Pages repository name. This single constant must match the manifest
// start_url/scope and the service-worker scope, or the installed app breaks on the
// subpath https://<user>.github.io/<REPO>/ . Change it in exactly one place.
const REPO = 'antiquity';
const BASE = `/${REPO}/`;

// Brand colors (kept in sync with src/app.css tokens).
const THEME_COLOR = '#2E5A88'; // lapis
const BACKGROUND_COLOR = '#F4ECE0'; // parchment

export default defineConfig({
  base: BASE,
  resolve: {
    alias: {
      $lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
      $components: fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon-180.png'],
      manifest: {
        id: BASE,
        name: 'Antiquity — Ancient History',
        short_name: 'Antiquity',
        description:
          'Learn ancient history in short, rigorous, swipeable modules. Works offline.',
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        orientation: 'portrait',
        background_color: BACKGROUND_COLOR,
        theme_color: THEME_COLOR,
        categories: ['education', 'books'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,svg,png,json,webmanifest}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/],
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
  preview: {
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
  },
  build: {
    target: 'esnext',
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
    globals: true,
  },
});
