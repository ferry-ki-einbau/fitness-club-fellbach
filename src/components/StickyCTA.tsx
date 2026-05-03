import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewH = window.innerHeight
      const docH = document.body.scrollHeight

      const pastThreshold = scrollY > viewH * 0.4
      const nearFooter = scrollY + viewH > docH - 200

      setVisible(pastThreshold && !nearFooter)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 90,
            background: 'rgba(15,20,25,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(196,69,82,0.3)',
            height: 64,
          }}
        >
          <div
            className="hidden md:flex"
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 32px',
            }}
          >
            {/* Left */}
            <span
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: 13,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
              }}
            >
              Fitness Club Fellbach · Bruckstraße 61 · Fellbach
            </span>

            {/* Center */}
            <span
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '0.12em',
                color: '#C44552',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              14 TAGE GRATIS TESTEN
            </span>

            {/* Right */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <a
                href="tel:+4971195459988"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 4,
                  padding: '8px 20px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                    'rgba(196,69,82,0.6)'
                  ;(e.currentTarget as HTMLAnchorElement).style.color = '#fff'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                    'rgba(255,255,255,0.25)'
                  ;(e.currentTarget as HTMLAnchorElement).style.color =
                    'rgba(255,255,255,0.85)'
                }}
              >
                Anrufen
              </a>

              <a
                href="#mitglied"
                className="btn-lime"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: '#C44552',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  padding: '8px 24px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.background =
                    '#a8323e'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLAnchorElement).style.background =
                    '#C44552'
                }}
              >
                Jetzt Mitglied
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
