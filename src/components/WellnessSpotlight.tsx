import { motion } from 'framer-motion'

/**
 * Wellness section — Sauna + Pool als editorial Doppel-Layout.
 * Saunazeiten 05–24h, Pool exklusiv.
 */
export default function WellnessSpotlight() {
  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #150A0A 0%, #0A0505 100%)',
      padding: 'clamp(80px, 12vh, 160px) 24px',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ width: 32, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Wellness · Erholung</span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
            fontWeight: 800, letterSpacing: '-0.025em', color: '#F5F0E8',
            textTransform: 'uppercase', lineHeight: 0.95, marginBottom: 20,
          }}>
            Nach dem Schweiß <span style={{ fontStyle: 'italic', color: 'var(--accent-bright)' }}>die Stille.</span>
          </h2>
          <p style={{ color: '#B5A99A', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.65, maxWidth: 600 }}>
            Sauna, Whirlpool, Kaltwasserbecken und Ruheraum innen + außen. 7 Tage die Woche, rund um die Uhr.
            Das Saunabad aktiviert dein Immunsystem, der Wechsel von Wärme und Kälte trainiert Herz-Kreislauf.
          </p>
        </div>

        {/* Two-image grid */}
        <div className="wellness-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px, 2.5vw, 36px)' }}>
          {[
            { src: 'real-wellness-area', label: 'Sauna-Oase', sub: '05:00 – 24:00 · Frei wählbar', tag: '01' },
            { src: 'real-pool-area', label: 'Pool & Whirlpool', sub: 'Inklusive Kaltwasserbecken', tag: '02' },
          ].map((it, i) => (
            <motion.div
              key={it.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}
            >
              <img
                src={`/images/${it.src}-md.webp`}
                srcSet={`/images/${it.src}-sm.webp 800w, /images/${it.src}-md.webp 1600w`}
                sizes="(max-width: 900px) 100vw, 50vw"
                alt={it.label}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.05) saturate(0.95)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,4,4,0.3) 0%, transparent 35%, transparent 55%, rgba(8,4,4,0.92) 100%)' }} />
              {/* Number tag top-left */}
              <div style={{ position: 'absolute', top: 24, left: 24, padding: '8px 12px', background: 'rgba(8,4,4,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(184, 146, 74, 0.4)' }}>
                <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.4em', color: '#B8924A', fontWeight: 700 }}>{it.tag}</span>
              </div>
              {/* Content bottom */}
              <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28 }}>
                <div className="font-display" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 6 }}>
                  {it.label}
                </div>
                <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 500 }}>
                  {it.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
