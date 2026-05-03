import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * Massive Stats Showcase — 6 huge numbers mit count-up animation.
 * Apple/Stripe style — each stat is its own moment.
 */
const stats = [
  { num: 24, suffix: '/7', label: 'Geöffnet', sub: '05:00 – 24:00 täglich' },
  { num: 1500, prefix: '', suffix: 'm²', label: 'Trainingsfläche', sub: 'Modern + viel Raum' },
  { num: 8, suffix: '+', label: 'Bereiche', sub: 'Cardio · Kraft · Kurse · Wellness' },
  { num: 30, suffix: '+', label: 'Kurse / Woche', sub: 'BodyPump · Yoga · Pilates' },
  { num: 200, suffix: '+', label: 'Bewertungen', sub: '4,7 ★ auf Google' },
  { num: 14, suffix: ' Tage', label: 'Risikofrei testen', sub: 'Volle Erstattung' },
]

function Counter({ target, duration = 1600 }: { target: number; duration?: number }) {
  const [v, setV] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setV(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return <span ref={ref}>{v.toLocaleString('de-DE')}</span>
}

export default function BigStats() {
  return (
    <section style={{
      position: 'relative',
      background: '#0F1419',
      padding: 'clamp(80px, 14vh, 180px) 24px',
      borderTop: '1px solid rgba(184, 146, 74, 0.15)',
      borderBottom: '1px solid rgba(184, 146, 74, 0.15)',
      overflow: 'hidden',
    }}>
      {/* subtle gradient orb */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196, 69, 82, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: 64, maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ width: 32, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Zahlen die zählen</span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800,
            letterSpacing: '-0.025em', color: '#F5F0E8', textTransform: 'uppercase',
            lineHeight: 0.95,
          }}>
            Was du <span style={{ fontStyle: 'italic', color: 'var(--accent-bright)' }}>kriegst.</span>
          </h2>
        </div>

        <div className="big-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(24px, 3vw, 48px) clamp(16px, 2vw, 32px)' }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', paddingTop: 24, borderTop: '1px solid rgba(184, 146, 74, 0.2)' }}
            >
              <div className="font-display" style={{
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: '#F5F0E8',
                marginBottom: 12,
                fontFeatureSettings: '"tnum"',
              }}>
                <Counter target={s.num} />
                <span style={{ color: '#B8924A' }}>{s.suffix}</span>
              </div>
              <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', letterSpacing: '-0.005em', marginBottom: 4 }}>
                {s.label}
              </div>
              <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9A8470' }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
