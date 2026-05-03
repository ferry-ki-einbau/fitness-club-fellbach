import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

/**
 * Trainer Section — Familie & Gesichter.
 * Echte Namen aus Reviews + Platzhalter-Initialen bis Fotos kommen.
 */
const trainers = [
  { initials: 'MA', name: 'Marcel', role: 'Studio Lead · Krafttraining', quote: 'Wenn du ihn fragst, kennst du am Ende seine ganze Biographie — und dein neues PR.' },
  { initials: 'AN', name: 'André', role: 'Personal Training · Kampfsport', quote: 'Holt das Maximum raus, ohne dass es sich nach Tortur anfühlt.' },
  { initials: 'VA', name: 'Vanessa', role: 'Zumba · Group Fitness', quote: 'Bringt jeden Donnerstag um 20:05 Uhr den Kursraum zum Beben.' },
  { initials: 'TE', name: 'Team', role: 'Front Desk · Beratung', quote: 'Begrüßt jedes Mitglied mit Namen. Auch wenn du nur einmal pro Monat kommst.' },
]

const colors = ['#C44552', '#B8924A', '#8E2A35', '#9A8470']

export default function TrainerSection() {
  return (
    <section style={{ background: '#FFFBF4', padding: 'clamp(64px, 10vh, 120px) clamp(16px, 4vw, 48px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ width: 32, height: 1, background: 'var(--accent)' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Das Team</span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800,
            letterSpacing: '-0.025em', color: '#0F1419', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: 20,
          }}>
            Trainer die <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>deinen Namen kennen.</span>
          </h2>
          <p style={{ color: '#3F2C2C', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.65, maxWidth: 560 }}>
            Keine austauschbaren Discounter-Mitarbeiter. Echte Menschen, die seit Jahren hier sind und sich für deinen Fortschritt interessieren.
          </p>
        </div>

        {/* Trainer cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {trainers.map((t, i) => (
            <TiltCard
              key={t.name}
              intensity={6}
              style={{
                background: '#FFFFFF', border: '1px solid rgba(26,15,15,0.08)',
                padding: 32, position: 'relative', overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(26,15,15,0.06)',
              }}
            >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Color bar top */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: colors[i] }} />

              {/* Initials avatar */}
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors[i]}22 0%, ${colors[i]}55 100%)`,
                border: `2px solid ${colors[i]}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <span className="font-display" style={{ fontSize: 26, fontWeight: 700, color: colors[i], letterSpacing: '-0.02em' }}>{t.initials}</span>
              </div>

              <div className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#0F1419', textTransform: 'uppercase', letterSpacing: '-0.005em', marginBottom: 6 }}>{t.name}</div>
              <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: colors[i], marginBottom: 16, fontWeight: 600 }}>{t.role}</div>
              <p style={{ color: '#5A4040', fontSize: 13.5, lineHeight: 1.65, fontStyle: 'italic' }}>"{t.quote}"</p>
            </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Note */}
        <p style={{ textAlign: 'center', color: '#8A7060', fontSize: 12, marginTop: 32, letterSpacing: '0.05em' }}>
          📸 Fotos vom Team folgen — bis dahin nur die Persönlichkeit.
        </p>
      </div>
    </section>
  )
}
