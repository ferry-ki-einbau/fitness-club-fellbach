import { motion } from 'framer-motion'

const programs = [
  {
    img: 'real-personal-training',
    label: 'Personal Training',
    price: 'Auf Anfrage',
    headline: 'Plan auf dein Ziel',
    text: 'Zertifizierte Personaltrainer. Maßgeschneiderter Plan basierend auf wissenschaftlichen Methoden. Individuelle Betreuung, kontinuierliches Feedback.',
  },
  {
    img: 'real-praevention',
    label: 'Präventionskurs',
    price: 'Add-On',
    headline: 'Beweglichkeit & Rücken',
    text: 'Verletzungen vorbeugen, Rückenbeschwerden lindern, Wohlbefinden steigern. Erfahrene Experten betreuen dich Schritt für Schritt.',
  },
  {
    img: 'real-exercube',
    label: 'Gaming Exercube',
    price: '5,99€ / Woche',
    headline: 'VR-Fitness im Studio',
    text: 'Tauche in virtuelle Abenteuer ein, während du trainierst. Effizientestes Training unserer Zeit — Kalorien verbrennen während du spielst.',
    tag: 'NEU',
  },
  {
    img: 'real-boxen-kurs',
    label: 'Boxen',
    price: '69€ / Monat',
    headline: 'Box-Kurs mit Experten',
    text: 'Schlagtechnik, Fußarbeit, Verteidigung. Anfänger bis Fortgeschrittene. Jede Trainingseinheit fordert dich neu.',
  },
]

export default function SpecialPrograms() {
  return (
    <section style={{
      position: 'relative',
      background: '#150A0A',
      padding: 'clamp(80px, 12vh, 160px) 24px',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 64, maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ width: 32, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Special Programs</span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800,
            letterSpacing: '-0.025em', color: '#F5F0E8', textTransform: 'uppercase',
            lineHeight: 0.95, marginBottom: 20,
          }}>
            Mehr als nur <span style={{ fontStyle: 'italic', color: 'var(--accent-bright)' }}>Geräte.</span>
          </h2>
          <p style={{ color: '#B5A99A', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.65, maxWidth: 580 }}>
            Über das normale Training hinaus — 1-zu-1 Personal Training, Präventionskurse, VR-Fitness und Box-Kurs.
          </p>
        </div>

        {/* Grid */}
        <div className="programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(16px, 2.5vw, 32px)' }}>
          {programs.map((p, i) => (
            <motion.article
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', background: '#0A0505', border: '1px solid rgba(184, 146, 74, 0.15)', overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                <img
                  src={`/images/${p.img}-md.webp`}
                  srcSet={`/images/${p.img}-sm.webp 800w, /images/${p.img}-md.webp 1600w`}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  alt={p.label}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.02) brightness(1.05) saturate(1.05)', transition: 'transform 0.7s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(8,4,4,0.8) 100%)' }} />
                {p.tag && (
                  <div style={{ position: 'absolute', top: 16, right: 16, padding: '6px 10px', background: 'var(--accent-bright)' }}>
                    <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.3em', color: '#0A0505', fontWeight: 700 }}>{p.tag}</span>
                  </div>
                )}
                <div style={{ position: 'absolute', top: 16, left: 16, padding: '6px 12px', background: 'rgba(8,4,4,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(184, 146, 74, 0.4)' }}>
                  <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.4em', color: '#B8924A', fontWeight: 700 }}>{p.price}</span>
                </div>
              </div>
              <div style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
                <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#B8924A', marginBottom: 8, fontWeight: 600 }}>{p.label}</div>
                <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 12, lineHeight: 1.1 }}>
                  {p.headline}
                </h3>
                <p style={{ color: '#B5A99A', fontSize: 14.5, lineHeight: 1.65 }}>{p.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
