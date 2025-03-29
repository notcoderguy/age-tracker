import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const nextConfig: NextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: 'sw.js',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200
        }
      }
    },
    {
      urlPattern: /\/_next\/static\/.*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
        }
      }
    },
    {
      urlPattern: /\/.*/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'pages',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 // 1 day
        }
      }
    }
  ]
});

export default nextConfig;
