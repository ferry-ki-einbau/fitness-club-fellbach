import { renderToString } from 'react-dom/server'
import { StrictMode } from 'react'
import App from './App'

export function render(url: string) {
  // For the homepage (most critical for SEO), render full App
  // Sub-pages are lazy-loaded in client and less SEO-critical
  if (url === '/') {
    const html = renderToString(
      <StrictMode>
        <App />
      </StrictMode>
    )
    return { html }
  }

  // For other routes, return minimal shell (hydration takes over)
  return { html: '' }
}
