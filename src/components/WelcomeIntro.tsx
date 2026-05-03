import { motion } from 'framer-motion'

/**
 * Friendly welcome — bricht die Spartanische Härte mit einer warmen Begrüßung.
 * Liegt zwischen Hero und Trainingsfläche.
 */
export default function WelcomeIntro() {
  return (
    <section style={{
      position: 'relative',
      background: '#FFFBF4',
      padding: 'clamp(80px, 12vh, 140px) 24px',
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
            Wir sind kein Discounter.<br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Wir sind dein Studio.</span>
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

          {/* Three quick value props */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, maxWidth: 800, marginInline: 'auto', marginTop: 56 }}>
            {[
              { icon: '👋', label: 'Persönliche Betreuung', sub: 'Trainer die zuhören' },
              { icon: '🕔', label: '24 / 7 für dich offen', sub: '05:00 – 24:00 täglich' },
              { icon: '🤝', label: '14 Tage testen', sub: 'Risikofrei, voller Geld zurück' },
            ].map((v) => (
              <div key={v.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
                <div className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#0F1419', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 6 }}>{v.label}</div>
                <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A7060' }}>{v.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
