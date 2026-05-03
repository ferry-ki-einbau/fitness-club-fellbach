import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Particles from './Particles'

/**
 * Killer-Tagline vom Original-Studio. Massive editorial type, parallax.
 * Gold meander dividers oben + unten. Burgundy CTA-Linie.
 */
export default function StatementBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2])

  return (
    <section ref={ref} style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #0F1419 0%, #1A2128 50%, #0F1419 100%)',
      padding: 'clamp(96px, 16vh, 200px) 24px',
      overflow: 'hidden',
      borderTop: '1px solid rgba(184, 146, 74, 0.2)',
      borderBottom: '1px solid rgba(184, 146, 74, 0.2)',
    }}>
      {/* Background athlete silhouette mit Parallax */}
      <motion.div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.18,
        backgroundImage: 'url(/images/athlete-silhouette-md.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        filter: 'blur(2px)',
        y: bgY,
        scale: bgScale,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,20,25,0.9) 0%, rgba(15,20,25,0.7) 30%, rgba(15,20,25,0.7) 70%, rgba(15,20,25,0.95) 100%)' }} />
      <Particles count={40} color="#B8924A" opacity={0.45} />
      {/* Background meander pattern (subtle) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><path d='M0 48 L0 24 L24 24 L24 48 L48 48 L48 0 L72 0 L72 72 L0 72 Z' fill='none' stroke='%23B8924A' stroke-width='2'/></svg>")`,
      }} />

      {/* Top gold rule */}
      <div style={{ maxWidth: 1280, margin: '0 auto 64px', display: 'flex', alignItems: 'center', gap: 24, position: 'relative' }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #B8924A 50%, transparent)' }} />
        <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#B8924A' }}>Manifest</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #B8924A 50%, transparent)' }} />
      </div>

      <motion.div
        style={{ y: y1, opacity, maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}
      >
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 7.5vw, 7rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
            color: '#F5F0E8',
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Was dir heute<br />
          <span style={{ fontStyle: 'italic', color: 'var(--accent-bright)', fontWeight: 700 }}>schwer vorkommt,</span><br />
          ist bald nur<br />
          noch ein <span style={{ WebkitTextStroke: '2px #B8924A', color: 'transparent' }}>Warm-Up.</span>
        </h2>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="reveal"
      >
        <div style={{ maxWidth: 800, margin: '64px auto 0', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Fitness Club Fellbach</span>
            <div style={{ width: 48, height: 1, background: '#B8924A' }} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
