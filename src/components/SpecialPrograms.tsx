import { motion } from 'framer-motion'

/**
 * Boxschule Charlie — eigene Boxschule im Fitness Club Fellbach.
 * Kein "Kurs", sondern eine eigenständige Boxschule die im Studio trainiert.
 */
export default function SpecialPrograms() {
  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #1A1014 0%, #0F1419 100%)',
      padding: 'clamp(64px, 10vh, 120px) clamp(16px, 4vw, 48px)',
      overflow: 'hidden',
    }}>
      {/* Subtle red glow top */}
      <div style={{
        position: 'absolute', top: -120, left: '30%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(196,69,82,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="boxschule-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(24px, 4vw, 56px)',
            alignItems: 'center',
          }}
        >
          {/* Left — Image */}
          <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
            <img
              src="/images/real-boxring-1-md.webp"
              srcSet="/images/real-boxring-1-sm.webp 800w, /images/real-boxring-1-md.webp 1600w"
              sizes="(max-width: 900px) 100vw, 50vw"
              alt="Boxschule Charlie im Fitness Club Fellbach"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'contrast(1.05) brightness(1.02) saturate(1.1)',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(15,20,25,0.2) 0%, transparent 40%, transparent 60%, rgba(15,20,25,0.7) 100%)',
            }} />
            {/* Price tag */}
            <div style={{
              position: 'absolute', top: 24, left: 24,
              padding: '10px 16px',
              background: 'rgba(196,69,82,0.9)',
              backdropFilter: 'blur(8px)',
            }}>
              <span className="font-condensed" style={{
                fontSize: 11, letterSpacing: '0.3em', color: '#FFFFFF',
                fontWeight: 700, textTransform: 'uppercase',
              }}>69€ / Monat</span>
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <span style={{ width: 32, height: 1, background: '#C44552' }} />
              <span className="font-condensed" style={{
                fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase',
                color: '#C44552', fontWeight: 600,
              }}>Boxen · Im Haus</span>
            </div>

            <h2 className="font-display" style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800,
              letterSpacing: '-0.025em', color: '#F5F0E8', textTransform: 'uppercase',
              lineHeight: 0.95, marginBottom: 20,
            }}>
              Boxschule<br />
              <span style={{ fontStyle: 'italic', color: '#C44552' }}>Charlie.</span>
            </h2>

            <p style={{
              color: '#B5A99A', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
              lineHeight: 1.7, marginBottom: 28, maxWidth: '48ch',
            }}>
              Eigene Boxschule direkt im Fitness Club Fellbach. Schlagtechnik, Fußarbeit, Verteidigung — von Anfänger bis Wettkampf. Feste Trainingszeiten, eigener Ring.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', marginBottom: 32 }}>
              {[
                { val: '69€', sub: 'pro Monat' },
                { val: 'Alle', sub: 'Level' },
                { val: 'Ring', sub: 'Im Studio' },
              ].map(s => (
                <div key={s.sub}>
                  <div className="font-display" style={{
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800,
                    color: '#F5F0E8', lineHeight: 1, letterSpacing: '-0.02em',
                  }}>{s.val}</div>
                  <div className="font-condensed" style={{
                    fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: '#B5A99A', marginTop: 4,
                  }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://boxschule-charlie.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed"
              style={{
                padding: '14px 28px',
                background: '#C44552',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                transition: 'transform 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#D4555F' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#C44552' }}
            >
              boxschule-charlie.de →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
