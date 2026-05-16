import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COOKIE_KEY = 'fcf_cookie_consent'

function initGtm(gtmId: string) {
  if (document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`)) return
  // Consent Mode default — alles denied
  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtag(...args: any[]) { (window as any).dataLayer.push(args) }
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  })
  // GTM Script
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(s)
  ;(window as any).dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
}

function grantConsent() {
  ;(window as any).dataLayer = (window as any).dataLayer || []
  ;(window as any).dataLayer.push({
    event: 'cookie_consent_update',
  })
  function gtag(...args: any[]) { (window as any).dataLayer.push(args) }
  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  })
}

// GTM ID — noch kein echtes GTM eingerichtet, Platzhalter
const GTM_ID = 'GTM-XXXXXXX'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (stored === 'accepted') {
      // Schon akzeptiert → GTM laden + Consent granten
      initGtm(GTM_ID)
      setTimeout(grantConsent, 100)
    } else if (stored !== 'declined') {
      // Noch nie entschieden → Banner zeigen (nach 1.5s)
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
    // declined → nichts laden
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
    initGtm(GTM_ID)
    setTimeout(grantConsent, 200)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            padding: 'clamp(16px, 3vw, 24px)',
            background: 'rgba(15, 20, 25, 0.97)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(245, 240, 232, 0.08)',
            boxShadow: '0 -8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'clamp(12px, 2vw, 24px)',
          }}>
            <p style={{
              flex: '1 1 400px',
              fontSize: 13,
              lineHeight: 1.6,
              color: '#B5A99A',
              margin: 0,
            }}>
              Wir nutzen Cookies für Analyse und zur Verbesserung unserer Website.
              Details findest du in unserer{' '}
              <a href="/datenschutz" style={{ color: 'var(--accent-bright)', textDecoration: 'underline' }}>
                Datenschutzerklärung
              </a>.
            </p>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              <button
                onClick={decline}
                style={{
                  padding: '10px 24px',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'transparent',
                  color: '#9A8470',
                  border: '1px solid rgba(154, 132, 112, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#9A8470'; e.currentTarget.style.color = '#F5F0E8' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(154, 132, 112, 0.3)'; e.currentTarget.style.color = '#9A8470' }}
              >
                Ablehnen
              </button>
              <button
                onClick={accept}
                style={{
                  padding: '10px 24px',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-bright)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)' }}
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
