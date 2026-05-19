import { renderToString } from 'react-dom/server'
import { StrictMode } from 'react'
import { StaticRouter, Routes, Route } from 'react-router'
import App from './App'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import Karriere from './pages/Karriere'
import Kuendigung from './pages/Kuendigung'
import Kurse from './pages/Kurse'

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/karriere" element={<Karriere />} />
          <Route path="/kuendigung" element={<Kuendigung />} />
          <Route path="/kurse" element={<Kurse />} />
        </Routes>
      </StaticRouter>
    </StrictMode>
  )
  return { html }
}
