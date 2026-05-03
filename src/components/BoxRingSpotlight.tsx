import { motion } from 'framer-motion'

/**
 * Differentiator section — echter Box-Ring im Studio.
 * Selten in deutschen Studios, also pushen.
 */
export default function BoxRingSpotlight() {
  return (
    <section style={{
      position: 'relative',
      background: '#0A0505',
      padding: 'clamp(80px, 12vh, 160px) 24px',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
        gap: 'clamp(32px, 5vw, 96px)',
        alignItems: 'center',
      }}
        className="boxring-grid"
      >
        {/* Left: full-bleed photo with gold corner accent */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', aspectRatio: '4/3' }}
        >
          {/* Corner gold rule top-left */}
          <div style={{ position: 'absolute', top: -12, left: -12, width: 64, height: 1, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'absolute', top: -12, left: -12, width: 1, height: 64, background: '#B8924A', zIndex: 3 }} />
          {/* Corner gold rule bottom-right */}
          <div style={{ position: 'absolute', bottom: -12, right: -12, width: 64, height: 1, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'absolute', bottom: -12, right: -12, width: 1, height: 64, background: '#B8924A', zIndex: 3 }} />
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)' }}>
            <img
              src="/images/real-boxring-1-md.webp"
              srcSet="/images/real-boxring-1-sm.webp 800w, /images/real-boxring-1-md.webp 1600w"
              sizes="(max-width: 900px) 100vw, 55vw"
              alt="Boxring im Fitness Club Fellbach"
              decoding="async"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.05) saturate(0.95)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(8,4,4,0.5) 0%, transparent 50%)' }} />
            {/* Bottom badge */}
            <div style={{ position: 'absolute', bottom: 24, left: 24, padding: '8px 14px', background: 'rgba(8,4,4,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(184, 146, 74, 0.4)' }}>
              <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Echter Boxring</div>
            </div>
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <span style={{ width: 48, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Selten · Spartan</span>
          </div>

          <h2 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            margin: '0 0 28px',
            textTransform: 'uppercase',
            color: '#F5F0E8',
          }}>
            Echter <span style={{ fontStyle: 'italic', color: 'var(--accent-bright)' }}>Box-Ring.</span><br />
            Mitten in Fellbach.
          </h2>

          <p style={{
            color: '#C9BFB3',
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            lineHeight: 1.65,
            marginBottom: 36,
            maxWidth: '52ch',
          }}>
            Volle Boxring-Ausstattung im Trainingsbereich — selten in deutschen Studios.
            Sparring, Boxtraining, Functional Drills. Alles unter einem Dach.
          </p>

          {/* Three-feature grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(184, 146, 74, 0.2)' }}>
            {[
              ['Box-Ring', 'Original-Größe'],
              ['Functional', 'Drills & Mobility'],
              ['Free Weights', 'Hanteln & Racks'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#B8924A', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 8 }}>{n}</div>
                <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A7A66' }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
