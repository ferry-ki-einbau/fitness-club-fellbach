import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'

const kurse = [
  { name: 'BodyPump', desc: 'Ganzkörper-Krafttraining mit Hantelstange', cat: 'Les Mills', color: '#E15464' },
  { name: 'Yoga', desc: 'Flexibilität, Atmung, mentale Ruhe', cat: 'Mind & Body', color: '#B8924A' },
  { name: 'Pilates', desc: 'Core-Stärke, Haltung, Beweglichkeit', cat: 'Mind & Body', color: '#B8924A' },
  { name: 'Rückenfit', desc: 'Rückenmuskulatur stärken, Schmerzen lindern', cat: 'Prävention', color: '#9A8470' },
  { name: 'BodyCombat', desc: 'Kampfsport-inspiriertes Cardio-Training', cat: 'Les Mills', color: '#E15464' },
  { name: 'Spinning', desc: 'Indoor-Cycling mit Musik & Trainer', cat: 'Cardio', color: '#C44552' },
  { name: 'Functional', desc: 'Kettlebells, Battle Ropes, Bewegungsmuster', cat: 'Strength', color: '#8E2A35' },
  { name: 'Stretching', desc: 'Mobility & Regeneration nach dem Training', cat: 'Recovery', color: '#9A8470' },
]

export default function KurseGrid() {
  return (
    <section id="kurse" style={{
      position: 'relative',
      background: '#EDE7DD',
      padding: 'clamp(64px, 10vh, 120px) clamp(16px, 4vw, 48px)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* Header with hero image as backdrop */}
        <div style={{ position: 'relative', marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ width: 32, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>30+ Kurse pro Woche</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(24px, 5vw, 80px)', alignItems: 'end' }} className="kurse-header-grid">
            <h2 className="font-display" style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800,
              letterSpacing: '-0.025em', color: '#0F1419', textTransform: 'uppercase', lineHeight: 0.95, margin: 0,
            }}>
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Kurse</span> für jede Woche.
            </h2>
            <p style={{ color: '#3F2C2C', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.65, maxWidth: 420 }}>
              BodyPump, Yoga, Pilates, Rückenfit & mehr. Buch deinen Platz in 10 Sekunden über die <span style={{ color: '#0F1419', fontWeight: 500 }}>MySports App</span>.
            </p>
          </div>
        </div>

        {/* Kurse grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {kurse.map((k, i) => (
            <motion.div
              key={k.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              style={{ aspectRatio: '5/4' }}
            >
              <SpotlightCard
                glowColor={k.color.replace('#', '').match(/.{2}/g)?.map(h => parseInt(h, 16)).join(', ') || '184, 146, 74'}
                style={{
                  padding: '28px 24px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(26, 15, 15, 0.08)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'default',
                  transition: 'box-shadow 0.3s',
                  boxShadow: '0 1px 2px rgba(26,15,15,0.04)',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: k.color, zIndex: 3 }} />
                <div>
                  <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: k.color, marginBottom: 12, fontWeight: 600 }}>{k.cat}</div>
                  <div className="font-display" style={{ fontSize: 26, fontWeight: 700, color: '#0F1419', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1 }}>{k.name}</div>
                </div>
                <div style={{ fontSize: 13, color: '#5A4040', lineHeight: 1.5, marginTop: 16 }}>{k.desc}</div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#6E5050', fontSize: 12, marginTop: 32, letterSpacing: '0.05em' }}>
          + Les Mills BodyAttack, Stepp, Senioren-Gymnastik & mehr — vollständiger Plan in der App
        </p>
      </div>
    </section>
  )
}
