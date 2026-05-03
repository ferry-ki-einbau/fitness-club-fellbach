import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Premium Preloader — Cinematic 3-stage Reveal.
 * 0–800ms: Address line draws + fades in
 * 800–1700ms: Logo wordmark fades in
 * 1700–2400ms: Tagline appears
 * 2400ms: Curtain reveals up
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400)
    const t2 = setTimeout(() => setStage(2), 900)
    const t3 = setTimeout(() => setVisible(false), 1500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ background: '#0F1419', overflow: 'hidden' }}>

          {/* Top + bottom thin gold rules animating in */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
            style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #B8924A 50%, transparent)', transformOrigin: 'left' }}
          />

          <div style={{ textAlign: 'center', position: 'relative', maxWidth: 'min(680px, 90vw)' }}>
            {/* Stage 0 — address eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: stage >= 0 ? 1 : 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              style={{ marginBottom: 36 }}
            >
              <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>
                Bruckstraße 61 · Fellbach
              </div>
            </motion.div>

            {/* Stage 1 — logo wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{
                opacity: stage >= 1 ? 1 : 0,
                y: stage >= 1 ? 0 : 30,
                scale: stage >= 1 ? 1 : 0.96,
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid rgba(184, 146, 74, 0.3)' }}
            >
              <img
                src="/images/logo-original.svg"
                alt="Fitness Club Fellbach"
                style={{
                  width: 'min(360px, 70vw)',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                  filter: 'drop-shadow(0 4px 12px rgba(184, 146, 74, 0.2))',
                }}
              />
            </motion.div>

            {/* Stage 2 — tagline + loading dot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 2 ? 1 : 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 12px rgba(34,197,94,0.7)', animation: 'pulse 1.4s ease-in-out infinite' }} />
                <span className="font-condensed" style={{ fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 500 }}>
                  24 Stunden geöffnet
                </span>
              </div>
            </motion.div>
          </div>

          {/* Burgund accent on left edge */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
            style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg, transparent, #C44552 50%, transparent)', transformOrigin: 'top' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
