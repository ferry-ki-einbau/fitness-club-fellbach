import { StrictMode, lazy, Suspense } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const Impressum = lazy(() => import('./pages/Impressum.tsx'))
const Datenschutz = lazy(() => import('./pages/Datenschutz.tsx'))
const Karriere = lazy(() => import('./pages/Karriere.tsx'))
const Kuendigung = lazy(() => import('./pages/Kuendigung.tsx'))
const Kurse = lazy(() => import('./pages/Kurse.tsx'))
// Lazy: hält den Funnel-Code aus dem Haupt-Bundle (lädt nicht auf Homepage mit).
// /mitglied wird mit leerem Root prerendert → Client createRoot, kein Hydration-Mismatch.
const MitgliedFunnel = lazy(() => import('./pages/MitgliedFunnel.tsx'))

// Schlichter dunkler Lade-Screen als Suspense-Fallback für den Funnel
function FunnelLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1419', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', borderRadius: '50%', animation: 'mitglied-spin 0.7s linear infinite' }} />
      <style>{`@keyframes mitglied-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

const rootEl = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/impressum" element={<Suspense fallback={null}><Impressum /></Suspense>} />
        <Route path="/datenschutz" element={<Suspense fallback={null}><Datenschutz /></Suspense>} />
        <Route path="/karriere" element={<Suspense fallback={null}><Karriere /></Suspense>} />
        <Route path="/kuendigung" element={<Suspense fallback={null}><Kuendigung /></Suspense>} />
        <Route path="/kurse" element={<Suspense fallback={null}><Kurse /></Suspense>} />
        <Route path="/mitglied" element={<Suspense fallback={<FunnelLoading />}><MitgliedFunnel /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

// If SSG pre-rendered HTML exists, hydrate; otherwise mount fresh
if (rootEl.innerHTML.trim().length > 0) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
