import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Floating WhatsApp CTA — bottom-right.
 * Erscheint nach 1.2s scroll, pulsierender Ring, grüner Brand-Farbton.
 * Tooltip "Schnell per WhatsApp" auf Desktop.
 */
const PHONE = '4971158864'   // wa.me erwartet ohne + und ohne Leerzeichen
const TEXT = encodeURIComponent('Hi, ich interessiere mich für eine Mitgliedschaft im Fitness Club Fellbach. Können wir kurz reden?')
const HREF = `https://wa.me/${PHONE}?text=${TEXT}`

export default function WhatsAppFab() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 240)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Chat starten"
          initial={{ opacity: 0, y: 24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.85 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9000,
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#25D366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 32px -8px rgba(37, 211, 102, 0.55), 0 4px 12px rgba(0,0,0,0.3)',
            textDecoration: 'none',
          }}
        >
          {/* Pulse ring */}
          <span style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: '#25D366',
            opacity: 0.5,
            animation: 'wa-pulse 2.2s ease-out infinite',
            pointerEvents: 'none',
          }} />
          {/* WhatsApp SVG logo */}
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 1 }}>
            <path d="M16.04 6.32c-5.36 0-9.72 4.36-9.72 9.72 0 1.71.45 3.38 1.3 4.85L6.24 25.68l4.93-1.3c1.42.78 3.02 1.19 4.66 1.19h.01c5.36 0 9.72-4.36 9.72-9.72 0-2.6-1.01-5.04-2.85-6.88-1.84-1.84-4.28-2.85-6.87-2.85zm0 17.8h-.01a8.07 8.07 0 0 1-4.11-1.13l-.3-.18-3.05.8.81-2.97-.19-.31a8.07 8.07 0 0 1-1.24-4.3c0-4.46 3.62-8.08 8.09-8.08 2.16 0 4.19.84 5.71 2.37a8.06 8.06 0 0 1 2.37 5.72c0 4.46-3.62 8.08-8.08 8.08zm4.43-6.05c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.83.81-.83 1.97 0 1.16.85 2.29.97 2.45.12.16 1.67 2.55 4.05 3.58.57.25 1.01.39 1.35.5.57.18 1.08.16 1.49.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" fill="#fff"/>
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
