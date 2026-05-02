import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1900)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ background: 'var(--black)' }}>
          <div className="relative" style={{ width: 'min(560px, 80vw)' }}>
            {/* Burgundy line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
              style={{ height: 2, background: 'linear-gradient(90deg, var(--accent-deep), var(--accent-bright))', transformOrigin: 'left', marginBottom: 24 }}
            />
            {/* Wordmark mask reveal */}
            <motion.div
              className="overflow-hidden"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
            >
              <div className="font-display" style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 700, color: 'var(--text)',
                letterSpacing: '0.05em', lineHeight: 0.95, textTransform: 'uppercase',
              }}>
                FITNESS CLUB
                <div className="font-condensed" style={{
                  fontSize: 11, letterSpacing: '0.5em', fontWeight: 500,
                  color: 'var(--accent-bright)', marginTop: 12,
                }}>FELLBACH · 24 / 7</div>
              </div>
            </motion.div>
            {/* Loading dot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="absolute -bottom-8 right-0 flex items-center gap-2"
              style={{ fontSize: 10, letterSpacing: '0.35em', color: 'var(--text-muted)', fontFamily: 'Barlow Condensed' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-bright)', display: 'inline-block', animation: 'pulse 1s ease-in-out infinite' }} />
              ΜΟΛΩΝ ΛΑΒΕ
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
