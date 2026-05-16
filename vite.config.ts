import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { readFileSync, existsSync } from 'fs'

// Plugin: /blog/* im Dev-Server direkt aus public/blog/ servieren
function blogStaticPlugin() {
  return {
    name: 'blog-static',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url?.startsWith('/blog')) {
          let filePath = req.url === '/blog' || req.url === '/blog/'
            ? resolve(__dirname, 'public/blog/index.html')
            : resolve(__dirname, 'public' + req.url)
          if (existsSync(filePath)) {
            const ext = filePath.split('.').pop()
            const types: Record<string, string> = { html: 'text/html', css: 'text/css', js: 'application/javascript', json: 'application/json' }
            res.setHeader('Content-Type', types[ext || ''] || 'text/html')
            res.end(readFileSync(filePath, 'utf-8'))
            return
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [blogStaticPlugin(), react(), tailwindcss()],
  ssr: {
    noExternal: ['framer-motion'],
  },
})
