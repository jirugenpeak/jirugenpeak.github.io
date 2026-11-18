import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const { VITE_BASE_PATH, VITE_SITE_URL } = loadEnv(mode, process.cwd())
  const siteUrl = VITE_SITE_URL ? new URL(VITE_SITE_URL) : undefined
  if (siteUrl && !['https:', 'http:'].includes(siteUrl.protocol)) {
    throw new Error('VITE_SITE_URL must be an absolute HTTP or HTTPS URL.')
  }

  return {
    base: VITE_BASE_PATH || '/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'canonical-site-url',
        apply: 'build',
        transformIndexHtml() {
          if (!siteUrl) return []
          return [
            { tag: 'link', attrs: { rel: 'canonical', href: siteUrl.href } },
            { tag: 'meta', attrs: { property: 'og:url', content: siteUrl.href } },
          ]
        },
      },
    ],
  }
})
