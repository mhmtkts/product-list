import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'Product Store',
      short_name: 'Store',
      description: 'An optimized product store PWA',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/dummyjson\.com\/products/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'product-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 gün
            },
          },
        },
      ],
    },
  })
  ]
})
