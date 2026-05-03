import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const zones = [
  {
    id: 'training',
    label: 'Trainingsfläche',
    img: 'real-trainingsbereich',
    headline: '1.500m² für jedes Ziel',
    text: 'Großzügige Hauptfläche mit modernen Geräten, Free Weights und genug Platz auch zu Stoßzeiten.',
    stats: ['1.500m²', 'modernste Geräte', 'kein Drängeln'],
  },
  {
    id: 'cardio',
    label: 'Cardio',
    img: 'real-cardio',
    headline: 'Cardio mit Aussicht',
    text: 'Laufbänder, Crosstrainer, Fahrräder, Ruderer — alles vor großen Fenstern. Auch um 5 Uhr morgens.',
    stats: ['Laufbänder', 'Crosstrainer', 'Bikes & Rower'],
  },
  {
    id: 'kraft',
    label: 'Krafttraining',
    img: 'real-geraete',
    headline: 'Iron, das was hält',
    text: 'Maschinen für Anfänger, Free Weights für Fortgeschrittene. Inkl. EGYM Smart Strength im All-In Plan.',
    stats: ['Maschinen', 'Free Weights bis 70kg', 'EGYM'],
  },
  {
    id: 'kursraum',
    label: 'Kursraum',
    img: 'real-kursraum-1',
    headline: '30+ Kurse pro Woche',
    text: 'BodyPump, Yoga, Pilates, Zumba, Spinning — alles mit erfahrenen Trainern. Plätze über die App buchen.',
    stats: ['Les Mills', 'Mind & Body', 'Group Fitness'],
  },
  {
    id: 'sauna',
    label: 'Sauna',
    img: 'real-wellness-area',
    headline: 'Sauna & Whirlpool',
    text: 'Finnische Sauna, Whirlpool, Kaltwasserbecken und Ruheraum. Frei wählbar 05:00 bis 24:00 Uhr.',
    stats: ['Sauna', 'Whirlpool', 'Kaltbecken'],
  },
  {
    id: 'whirlpool',
    label: 'Whirlpool',
    img: 'real-pool-area',
    headline: 'Whirlpool & Kaltbecken',
    text: 'Heißer Whirlpool für die müden Muskeln, kaltes Becken zum Wachwerden. Direkt im Wellness-Bereich neben der Sauna.',
    stats: ['Whirlpool', 'Kaltwasserbecken', 'Ruheraum'],
  },
]

export default function StudioTour() {
  const [active, setActive] = useState(0)
  const z = zones[active]

  return (
    <section id="tour" style={{ background: '#0A0505', padding: 'clamp(80px, 12vh, 160px) 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ width: 32, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Studio Tour · Interaktiv</span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800,
            letterSpacing: '-0.025em', color: '#F5F0E8', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: 16,
          }}>
            Schau dich <span style={{ fontStyle: 'italic', color: 'var(--accent-bright)' }}>um.</span>
          </h2>
          <p style={{ color: '#C9BFB3', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.65, maxWidth: 520 }}>
            6 Bereiche. Klick durch und schau wo du dich am wohlsten fühlst.
          </p>
        </div>

        {/* Tabs */}
        <div className="tour-tabs" style={{ display: 'flex', gap: 8, marginBottom: 32, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
          {zones.map((zone, i) => (
            <button
              key={zone.id}
              onClick={() => setActive(i)}
              className="font-condensed"
              style={{
                flexShrink: 0,
                padding: '14px 22px',
                background: active === i ? '#B8924A' : 'rgba(245, 240, 232, 0.04)',
                color: active === i ? '#0A0505' : '#B5A99A',
                border: `1px solid ${active === i ? '#B8924A' : 'rgba(184, 146, 74, 0.2)'}`,
                cursor: 'pointer',
                fontSize: 11,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 600,
                transition: 'all 0.25s',
              }}
            >
              {String(i + 1).padStart(2, '0')} · {zone.label}
            </button>
          ))}
        </div>

        {/* Active zone display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={z.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tour-content"
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 'clamp(24px, 4vw, 56px)', alignItems: 'center' }}
          >
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.7)' }}>
              <img
                src={`/images/${z.img}-md.webp`}
                srcSet={`/images/${z.img}-sm.webp 800w, /images/${z.img}-md.webp 1600w`}
                sizes="(max-width: 900px) 100vw, 55vw"
                alt={z.label}
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.02) brightness(1.05) saturate(1.05)' }}
              />
              <div style={{ position: 'absolute', top: 24, left: 24, padding: '8px 14px', background: 'rgba(8,4,4,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(184, 146, 74, 0.4)' }}>
                <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 700 }}>{String(active + 1).padStart(2, '0')} / {String(zones.length).padStart(2, '0')}</span>
              </div>
            </div>

            <div>
              <h3 className="font-display" style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800,
                letterSpacing: '-0.02em', color: '#F5F0E8', textTransform: 'uppercase',
                lineHeight: 1, marginBottom: 24,
              }}>
                {z.headline}
              </h3>
              <p style={{ color: '#C9BFB3', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7, marginBottom: 32 }}>{z.text}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
                {z.stats.map(s => (
                  <span key={s} className="font-condensed" style={{
                    padding: '8px 14px', background: 'rgba(184, 146, 74, 0.1)',
                    border: '1px solid rgba(184, 146, 74, 0.3)', color: '#B8924A',
                    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
                  }}>{s}</span>
                ))}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setActive((active - 1 + zones.length) % zones.length)} className="font-condensed" style={{ padding: '12px 18px', background: 'transparent', border: '1px solid rgba(184, 146, 74, 0.3)', color: '#F5F0E8', cursor: 'pointer', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase' }}>← Vorher</button>
                <button onClick={() => setActive((active + 1) % zones.length)} className="font-condensed" style={{ padding: '12px 18px', background: '#B8924A', border: '1px solid #B8924A', color: '#0A0505', cursor: 'pointer', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 }}>Nächste →</button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
