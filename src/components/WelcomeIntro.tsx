import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function WelcomeIntro() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const leftX = useTransform(scrollYProgress, [0, 1], ['-50%', '0%'])
  const rightX = useTransform(scrollYProgress, [0, 1], ['50%', '0%'])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
    <section style={{
      position: 'relative',
      background: '#FFFBF4',
      padding: 'clamp(64px, 10vh, 120px) clamp(16px, 4vw, 48px)',
      borderBottom: '1px solid rgba(184, 146, 74, 0.18)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <span style={{ width: 32, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Schön, dass du da bist</span>
            <span style={{ width: 32, height: 1, background: '#B8924A' }} />
          </div>

          <h2 className="font-display" style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#0F1419',
            margin: '0 0 36px',
            maxWidth: 18 + 'ch',
            marginInline: 'auto',
          }}>
            Familiär. Modern.<br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Für alle, die es ernst meinen.</span>
          </h2>

          <p style={{
            color: '#3F2C2C',
            fontSize: 'clamp(1.15rem, 1.5vw, 1.35rem)',
            lineHeight: 1.75,
            maxWidth: '58ch',
            marginInline: 'auto',
            marginBottom: 48,
            fontWeight: 400,
          }}>
            Familiäre Atmosphäre. Trainer, die deinen Namen kennen. Saubere Geräte, Sauna und Whirlpool.
            <br /><br />
            Über <span style={{ color: '#0F1419', fontWeight: 600 }}>200 Mitglieder</span> vertrauen uns — viele schon seit Jahren.
            <span style={{ color: '#0F1419', fontWeight: 600 }}> Komm vorbei, wann du willst</span> — wir freuen uns auf dich.
          </p>

          {/* Three quick value props mit SVG icons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, maxWidth: 880, marginInline: 'auto', marginTop: 64 }}>
            {[
              {
                svg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C44552" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                label: 'Persönliche Betreuung', sub: 'Trainer die zuhören'
              },
              {
                svg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B8924A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                label: '24 / 7 für dich offen', sub: '05:00 – 24:00 täglich'
              },
              {
                svg: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
                label: '14 Tage testen', sub: 'Risikofrei, voller Geld zurück'
              },
            ].map((v) => (
              <div key={v.label} style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, borderRadius: '50%', background: 'rgba(15,20,25,0.04)', border: '1px solid rgba(15,20,25,0.08)', marginBottom: 16 }}>
                  {v.svg}
                </div>
                <div className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#0F1419', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 6 }}>{v.label}</div>
                <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A7060' }}>{v.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Split-screen reveal bars */}
      <motion.div style={{ opacity }} aria-hidden="true">
        <motion.div style={{ x: leftX, position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'rgba(196,69,82,0.04)', pointerEvents: 'none', transformOrigin: 'left' }} />
        <motion.div style={{ x: rightX, position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'rgba(196,69,82,0.04)', pointerEvents: 'none', transformOrigin: 'right' }} />
      </motion.div>
    </section>
    </div>
  )
}
