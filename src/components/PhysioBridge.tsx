import { motion } from 'framer-motion'

/**
 * Cross-Link zur Schwester-Marke Physio Zentrum Fellbach.
 * Beide Häuser an Bruckstraße 61 vom selben Inhaber.
 * Cross-Sell: Verletzung/Schmerz → Physio · Reha → zurück ins Training.
 */
export default function PhysioBridge() {
  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #0d9488 0%, #0a6e64 50%, #064e47 100%)',
      padding: 'clamp(64px, 10vh, 120px) clamp(16px, 4vw, 48px)',
      overflow: 'hidden',
    }}>
      {/* Subtle pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.06,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><circle cx='40' cy='40' r='1' fill='%23ffffff'/></svg>")`,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 'clamp(24px, 4vw, 56px)',
            alignItems: 'center',
          }}
          className="physio-bridge-grid"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <span style={{ width: 32, height: 1, background: '#FFFFFF', opacity: 0.5 }} />
              <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#FFFFFF', fontWeight: 600, opacity: 0.85 }}>Bruckstraße 61 · Familie</span>
            </div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800,
              letterSpacing: '-0.025em', color: '#FFFFFF', textTransform: 'uppercase',
              lineHeight: 1, marginBottom: 20,
            }}>
              Eine Adresse.<br />
              <span style={{ fontStyle: 'italic', color: '#FFE066' }}>Zwei Welten.</span>
            </h2>
            <p style={{ color: '#E8F5F4', fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)', lineHeight: 1.7, marginBottom: 24, maxWidth: '52ch' }}>
              Tut dir was weh? Brauchst du Reha nach OP oder gegen Rückenschmerzen?
              Direkt nebenan im selben Haus: das <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Physio Zentrum Fellbach</span> — vom selben Inhaber. Termin innerhalb 48h, alle Kassen.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <a
                href="https://www.physio-zentrum-fellbach.de"
                target="_blank"
                rel="noopener noreferrer"
                className="font-condensed"
                style={{
                  padding: '14px 28px',
                  background: '#FFFFFF',
                  color: '#0d9488',
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                Zum Physio Zentrum →
              </a>
              <a
                href="tel:0711588657"
                className="font-condensed"
                style={{
                  padding: '14px 28px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.4)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                Physio anrufen · 0711 588657
              </a>
            </div>
          </div>

          {/* Right — Stats / value props */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[
              { stat: '48h', label: 'Termin innerhalb' },
              { stat: '5,0★', label: 'Google Rating' },
              { stat: 'alle', label: 'Kassen + Privat' },
              { stat: '30 Min', label: 'Ersttermin' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '20px 18px',
              }}>
                <div className="font-display" style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.stat}</div>
                <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FFFFFF', opacity: 0.7, marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
