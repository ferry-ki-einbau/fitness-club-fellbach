import { motion } from 'framer-motion'

/**
 * EGYM Smart Strength Spotlight — image-led editorial.
 * EGYM ist echtes Differenzierungs-Feature im Original-Studio.
 */
export default function EgymSpotlight() {
  return (
    <section style={{
      position: 'relative',
      background: '#0F1419',
      padding: 'clamp(64px, 10vh, 120px) clamp(16px, 4vw, 48px)',
      overflow: 'hidden',
    }}>
      <div className="boxring-grid" style={{
        maxWidth: 1440,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
        gap: 'clamp(32px, 5vw, 96px)',
        alignItems: 'center',
      }}>
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0.5, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <span style={{ width: 48, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Smart Training</span>
          </div>

          <h2 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
            fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em',
            margin: '0 0 28px', textTransform: 'uppercase', color: '#F5F0E8',
          }}>
            EGYM. <span style={{ fontStyle: 'italic', color: 'var(--accent-bright)' }}>Daten</span><br />
            statt Schätzen.
          </h2>

          <p style={{
            color: '#C9BFB3',
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            lineHeight: 1.65, marginBottom: 36, maxWidth: '52ch',
          }}>
            Smart-Strength Geräte tracken jeden Satz, jede Wiederholung,
            jeden Newton. Du loggst dich ein — die Maschine kennt deinen Plan.
            <span style={{ color: '#F5F0E8' }}> Im All-In Plan inklusive.</span>
          </p>

          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14, marginTop: 32, paddingTop: 32, borderTop: '1px solid rgba(184, 146, 74, 0.2)' }}>
            {[
              ['Adaptive Last', 'Gerät passt Gewicht automatisch an'],
              ['Bewegungs-Tracking', 'Volumen, Power, Range of Motion'],
              ['Persönlicher Plan', 'Synced über App'],
            ].map(([t, s]) => (
              <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, fontSize: 14, color: '#C9BFB3' }}>
                <span style={{ color: '#B8924A', fontWeight: 700, fontSize: 13, marginTop: 2 }}>+</span>
                <div>
                  <div style={{ color: '#F5F0E8', fontWeight: 500, marginBottom: 2 }}>{t}</div>
                  <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.15em', color: '#8A7A66', textTransform: 'uppercase' }}>{s}</div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: image with corner gold accents */}
        <motion.div
          initial={{ opacity: 0.5, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', aspectRatio: '4/3' }}
        >
          <div style={{ position: 'absolute', top: -12, right: -12, width: 64, height: 1, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'absolute', top: -12, right: -12, width: 1, height: 64, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'absolute', bottom: -12, left: -12, width: 64, height: 1, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'absolute', bottom: -12, left: -12, width: 1, height: 64, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)' }}>
            <img
              src="/images/real-trainingsbereich-md.webp"
              srcSet="/images/real-trainingsbereich-sm.webp 800w, /images/real-trainingsbereich-md.webp 1600w"
              sizes="(max-width: 900px) 100vw, 50vw"
              alt="EGYM Smart Strength Geräte im Trainingsbereich"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.02) brightness(1.05) saturate(1.05)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(225deg, rgba(15,20,25,0.5) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', top: 24, right: 24, padding: '8px 14px', background: 'rgba(15,20,25,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(184, 146, 74, 0.4)' }}>
              <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Im All-In Inklusive</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
