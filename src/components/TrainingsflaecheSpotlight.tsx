import { motion } from 'framer-motion'

/**
 * Hauptangebot — die Trainingsfläche.
 * Cardio · Krafttraining · Functional · 24/7.
 */
export default function TrainingsflaecheSpotlight() {
  return (
    <section style={{
      position: 'relative',
      background: '#F5F0E8',
      padding: 'clamp(64px, 10vh, 120px) clamp(16px, 4vw, 48px)',
      overflow: 'hidden',
    }}>
      <div className="boxring-grid" style={{
        maxWidth: 1440,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
        gap: 'clamp(32px, 5vw, 96px)',
        alignItems: 'center',
      }}>
        {/* Left: image with corner gold accents */}
        <motion.div
          initial={{ opacity: 0.5, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', aspectRatio: '4/3' }}
        >
          <div style={{ position: 'absolute', top: -12, left: -12, width: 64, height: 1, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'absolute', top: -12, left: -12, width: 1, height: 64, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'absolute', bottom: -12, right: -12, width: 64, height: 1, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'absolute', bottom: -12, right: -12, width: 1, height: 64, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.7)' }}>
            <img
              src="/images/real-geraete-md.webp"
              srcSet="/images/real-geraete-sm.webp 800w, /images/real-geraete-md.webp 1600w"
              sizes="(max-width: 900px) 100vw, 55vw"
              alt="Krafttraining im Fitness Club Fellbach"
              decoding="async"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.02) brightness(1.05) saturate(1.05)' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(180deg, transparent 0%, rgba(15,20,25,0.8) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 24, left: 24, padding: '8px 14px', background: 'rgba(15,20,25,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(184, 146, 74, 0.4)' }}>
              <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>1.500m² Trainingsfläche</div>
            </div>
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0.5, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <span style={{ width: 48, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Hauptangebot</span>
          </div>

          <h2 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
            fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em',
            margin: '0 0 28px', textTransform: 'uppercase', color: '#0F1419',
          }}>
            Dein Raum für <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Fortschritt.</span>
          </h2>

          <p style={{
            color: '#3F2C2C',
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            lineHeight: 1.65, marginBottom: 36, maxWidth: '54ch',
          }}>
            Großzügige Trainingsfläche mit allem was du brauchst — Ausdauer, Kraft, funktionelles Training.
            <span style={{ color: '#0F1419', fontWeight: 500 }}> Modernste Geräte</span>, viel Platz, kein Drängeln.
            Egal ob 5 Uhr morgens oder 23 Uhr abends — wir sind offen.
          </p>

          {/* Three-feature grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(26, 15, 15, 0.15)' }}>
            {[
              ['Cardio', 'Laufband · Crosstrainer · Bike'],
              ['Kraft', 'Maschinen · Free Weights · Racks'],
              ['Functional', 'Battle Ropes · TRX · Mobility'],
            ].map(([n, l]) => (
              <div key={n}>
                <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 8 }}>{n}</div>
                <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6E5050' }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
