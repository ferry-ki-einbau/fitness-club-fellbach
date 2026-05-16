import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const Impressum = lazy(() => import('./pages/Impressum.tsx'))
const Datenschutz = lazy(() => import('./pages/Datenschutz.tsx'))
const Karriere = lazy(() => import('./pages/Karriere.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/impressum" element={<Suspense fallback={null}><Impressum /></Suspense>} />
        <Route path="/datenschutz" element={<Suspense fallback={null}><Datenschutz /></Suspense>} />
        <Route path="/karriere" element={<Suspense fallback={null}><Karriere /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
