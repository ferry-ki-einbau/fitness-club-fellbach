/**
 * SSG — Pre-renders all routes to static HTML for SEO.
 * Run after `vite build` via `node prerender.mts`
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')

// Routes to prerender
const routes = ['/', '/impressum', '/datenschutz', '/karriere', '/kuendigung']

async function prerender() {
  // Read the built index.html as template
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  // Import the server entry (built by vite build --ssr)
  const { render } = await import(path.resolve(distDir, 'server/entry-server.js'))

  for (const route of routes) {
    const { html: appHtml } = render(route)

    // Inject rendered HTML into the template
    const finalHtml = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

    // Write to the correct path
    const filePath = route === '/'
      ? path.resolve(distDir, 'index.html')
      : path.resolve(distDir, `${route.slice(1)}.html`)

    // Ensure directory exists for nested routes
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    fs.writeFileSync(filePath, finalHtml)
    console.log(`  ✓ ${route} → ${path.relative(distDir, filePath)}`)
  }

  console.log(`\n✅ ${routes.length} routes pre-rendered.`)
}

prerender().catch(err => {
  console.error('SSG failed:', err)
  process.exit(1)
})
