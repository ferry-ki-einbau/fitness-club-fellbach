import { motion } from 'framer-motion'
import { useRef } from 'react'

const STEPS = [
  { no: '01', title: 'Erstgespräch', text: 'Marcel fragt nach deinem Ziel, deiner Ausgangslage, deiner Zeit. 15 Minuten — kein Bullshit.' },
  { no: '02', title: 'Dein Plan', text: 'Übungen, Sets, Gewichte, Reihenfolge. Auf dich zugeschnitten — nicht aus dem Internet kopiert.' },
  { no: '03', title: 'Erste Einheit', text: 'Gemeinsam. Marcel zeigt dir die Geräte, korrigiert die Form, erklärt das Warum.' },
  { no: '04', title: 'Du trainierst', text: 'Mit Plan. Mit Ziel. Wann du willst — 05:00 bis 24:00. Wir sind da wenn du uns brauchst.' },
]

export default function TrainingsplanSection() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section ref={ref} style={{ background: '#0F1419', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle burgund glow background */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,69,82,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(80px, 12vh, 140px) clamp(24px, 5vw, 80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: 'clamp(48px, 8vw, 120px)', alignItems: 'center' }}>

        {/* LEFT — Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <span style={{ width: 32, height: 1, background: '#C44552' }} />
              <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C44552', fontWeight: 600 }}>Nur für Mitglieder · Kostenlos</span>
            </div>

            {/* Headline */}
            <h2 className="font-display" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#F5F0E8', margin: '0 0 32px' }}>
              Dein Plan.<br />
              <span style={{ color: '#C44552', fontStyle: 'italic' }}>Dein Start.</span><br />
              Kostenlos.
            </h2>

            {/* Big statement */}
            <p style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', color: '#C9BFB3', lineHeight: 1.75, maxWidth: '48ch', marginBottom: 48 }}>
              Kein Generic-Plan aus dem Internet. Kein 08/15 Anfänger-PDF.
              <br /><br />
              Marcel sitzt mit dir hin, fragt was dein Ziel ist — und baut dir deinen persönlichen Trainingsplan. <span style={{ color: '#F5F0E8', fontWeight: 600 }}>Ab dem ersten Tag als Mitglied.</span>
            </p>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 52 }}>
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.no}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid rgba(245,240,232,0.07)', alignItems: 'flex-start' }}
                >
                  <span className="font-display" style={{ fontSize: 11, letterSpacing: '0.3em', color: '#C44552', fontWeight: 700, minWidth: 28, paddingTop: 3 }}>{s.no}</span>
                  <div>
                    <div className="font-display" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#F5F0E8', marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: '#9A8878', lineHeight: 1.6 }}>{s.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#preise" className="btn-lime" style={{ padding: '16px 36px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span>Mitglied werden + Plan sichern</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <span style={{ fontSize: 12, color: '#6E5A48', letterSpacing: '0.05em' }}>Ab 14 Tage kostenlos testen</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Decorative frame */}
          <div style={{ position: 'absolute', top: -16, right: -16, bottom: 16, left: 16, border: '1px solid rgba(196,69,82,0.2)', pointerEvents: 'none', zIndex: 0 }} />

          <div style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
            <motion.img
              src="/images/real-personal-training-md.webp"
              srcSet="/images/real-personal-training-sm.webp 600w, /images/real-personal-training-md.webp 1000w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Persönliches Training im Fitness Club Fellbach"
              loading="lazy"
              style={{ width: '100%', display: 'block' }}
            />
            {/* Overlay gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(15,20,25,0.7) 100%)', pointerEvents: 'none' }} />

            {/* Badge unten links */}
            <div style={{ position: 'absolute', bottom: 24, left: 24, padding: '12px 20px', background: 'rgba(15,20,25,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(196,69,82,0.3)' }}>
              <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C44552', marginBottom: 2 }}>Inklusive</div>
              <div className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase' }}>Persönlicher Trainingsplan</div>
              <div style={{ fontSize: 11, color: '#9A8878', marginTop: 2 }}>Von Marcel · Kostenlos ab Tag 1</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
