/**
 * SSG — Pre-renders all routes to static HTML for SEO.
 * Run after `vite build` via `node prerender.mts`
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')

const SITE = 'https://fitness-club-fellbach.de'

// Per-Page SEO — sonst teilen sich alle Seiten Titel/Description/Canonical
// der Startseite (Duplicate-Content, keine Unterseite rankt für ihr Thema).
type Seo = { title: string; description: string; canonical: string; noindex?: boolean }
const SEO: Record<string, Seo> = {
  '/': {
    title: 'Fitness Club Fellbach — 24/7 Training, Sauna & Kurse',
    description: 'Fitness Club Fellbach: 24h geöffnet, 2.000m² Fläche, Sauna & 30+ Kurse/Woche. 14 Tage kostenlos testen. Bruckstraße 61 Fellbach.',
    canonical: `${SITE}/`,
  },
  '/kurse': {
    title: 'Kursplan Fellbach – 30+ Kurse/Woche | Fitness Club',
    description: 'Aktueller Kursplan vom Fitness Club Fellbach: BodyPump, Yoga, Pilates, Spinning, BoxFit & mehr — 30+ Kurse pro Woche, im Beitrag inklusive.',
    canonical: `${SITE}/kurse`,
  },
  '/karriere': {
    title: 'Jobs & Karriere | Fitness Club Fellbach',
    description: 'Werde Teil des Teams im Fitness Club Fellbach. Offene Stellen, Ausbildung & Karriere im Fitnessstudio in Fellbach bei Stuttgart.',
    canonical: `${SITE}/karriere`,
  },
  '/kuendigung': {
    title: 'Mitgliedschaft kündigen | Fitness Club Fellbach',
    description: 'Mitgliedschaft im Fitness Club Fellbach kündigen — Fristen, Ablauf und Online-Kündigung einfach erklärt.',
    canonical: `${SITE}/kuendigung`,
  },
  '/impressum': {
    title: 'Impressum | Fitness Club Fellbach',
    description: 'Impressum des Fitness Club Fellbach — Fitness & Sport GmbH, Bruckstraße 61, 70734 Fellbach.',
    canonical: `${SITE}/impressum`,
  },
  '/datenschutz': {
    title: 'Datenschutzerklärung | Fitness Club Fellbach',
    description: 'Datenschutzerklärung des Fitness Club Fellbach — Informationen zur Verarbeitung deiner Daten nach DSGVO.',
    canonical: `${SITE}/datenschutz`,
  },
  '/mitglied': {
    title: 'Mitglied werden | Fitness Club Fellbach',
    description: 'Jetzt online Mitglied im Fitness Club Fellbach werden — Tarif wählen, anmelden, 14 Tage kostenlos testen.',
    canonical: `${SITE}/mitglied`,
    noindex: true,
  },
}

function applySeo(html: string, seo: Seo): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;')
  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
  out = out.replace(/<meta name="description" content="[\s\S]*?" \/>/, `<meta name="description" content="${esc(seo.description)}" />`)
  out = out.replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${seo.canonical}" />`)
  out = out.replace(/<meta property="og:url" content="[\s\S]*?" \/>/, `<meta property="og:url" content="${seo.canonical}" />`)
  out = out.replace(/<meta property="og:title" content="[\s\S]*?" \/>/, `<meta property="og:title" content="${esc(seo.title)}" />`)
  out = out.replace(/<meta property="og:description" content="[\s\S]*?" \/>/, `<meta property="og:description" content="${esc(seo.description)}" />`)
  out = out.replace(/<meta name="twitter:title" content="[\s\S]*?" \/>/, `<meta name="twitter:title" content="${esc(seo.title)}" />`)
  out = out.replace(/<meta name="twitter:description" content="[\s\S]*?" \/>/, `<meta name="twitter:description" content="${esc(seo.description)}" />`)
  if (seo.noindex) {
    out = out.replace(/<meta name="robots" content="[\s\S]*?" \/>/, `<meta name="robots" content="noindex, follow" />`)
  }
  return out
}

// Routes to prerender
const routes = ['/', '/impressum', '/datenschutz', '/karriere', '/kuendigung', '/kurse', '/mitglied']

async function prerender() {
  // Read the built index.html as template
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  // Import the server entry (built by vite build --ssr)
  const { render } = await import(path.resolve(distDir, 'server/entry-server.js'))

  for (const route of routes) {
    const { html: appHtml } = render(route)

    // Per-Page SEO anwenden, dann gerendertes HTML injizieren
    const seo = SEO[route]
    const seoTemplate = seo ? applySeo(template, seo) : template
    const finalHtml = seoTemplate.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

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
