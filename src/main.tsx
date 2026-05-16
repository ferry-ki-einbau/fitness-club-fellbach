import { StrictMode, lazy, Suspense } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const Impressum = lazy(() => import('./pages/Impressum.tsx'))
const Datenschutz = lazy(() => import('./pages/Datenschutz.tsx'))
const Karriere = lazy(() => import('./pages/Karriere.tsx'))

const rootEl = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/impressum" element={<Suspense fallback={null}><Impressum /></Suspense>} />
        <Route path="/datenschutz" element={<Suspense fallback={null}><Datenschutz /></Suspense>} />
        <Route path="/karriere" element={<Suspense fallback={null}><Karriere /></Suspense>} />
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
