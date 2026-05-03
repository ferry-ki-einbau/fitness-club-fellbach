import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SLOTS = [
  { time: '05:00', msg: 'Der erste Satz des Tages. Bevor die Stadt aufwacht.' },
  { time: '07:30', msg: 'Vor der Arbeit. Vor allen anderen.' },
  { time: '12:30', msg: 'Die Mittagspause die zählt.' },
  { time: '17:30', msg: 'After-Work bedeutet: direkt nach der Schicht.' },
  { time: '20:00', msg: 'Der Abend gehört dir. Nicht dem Sofa.' },
  { time: '22:30', msg: 'Während andere schlafen. Du trainierst.' },
]

export default function TageszeitenSection() {
  const [currentHour, setCurrentHour] = useState<number | null>(null)

  useEffect(() => {
    setCurrentHour(new Date().getHours())
  }, [])

  // Determine which slot is "now" — closest past slot
  const activeIndex = (() => {
    if (currentHour === null) return -1
    const slotHours = [5, 7, 12, 17, 20, 22]
    let last = -1
    for (let i = 0; i < slotHours.length; i++) {
      if (currentHour >= slotHours[i]) last = i
    }
    return last
  })()

  return (
    <section style={{
      position: 'relative',
      background: '#0F1419',
      padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px)',
      overflow: 'hidden',
    }}>
      {/* Subtle burgund radial glow — upper right */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: 'clamp(400px, 50vw, 700px)',
        height: 'clamp(400px, 50vw, 700px)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(196,69,82,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}
        >
          <span style={{ width: 36, height: 1, background: '#C44552', flexShrink: 0 }} />
          <span
            className="font-condensed"
            style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C44552', fontWeight: 700 }}
          >
            05:00 — 24:00 · Täglich
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display"
          style={{
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            color: '#F5F0E8',
            margin: '0 0 clamp(56px, 8vh, 96px)',
          }}
        >
          Wann immer<br />
          <span style={{ color: '#C44552', fontStyle: 'italic' }}>du willst.</span>
        </motion.h2>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {SLOTS.map((slot, i) => {
            const isActive = i === activeIndex
            return (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(80px, 12vw, 140px) clamp(20px, 3vw, 48px) 1fr',
                  alignItems: 'center',
                  gap: '0 clamp(12px, 2vw, 28px)',
                  padding: 'clamp(20px, 3vh, 32px) 0',
                  borderTop: '1px solid rgba(245,240,232,0.06)',
                  transition: 'background 0.3s',
                  borderRadius: 2,
                }}>
                  {/* Time */}
                  <div
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                      fontWeight: 700,
                      color: isActive ? '#E15464' : '#C44552',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      opacity: isActive ? 1 : 0.85,
                      transition: 'opacity 0.3s, color 0.3s',
                    }}
                  >
                    {slot.time}
                    {isActive && (
                      <span style={{
                        display: 'inline-block',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#C44552',
                        marginLeft: 8,
                        verticalAlign: 'middle',
                        animation: 'pulse 2s ease-in-out infinite',
                      }} />
                    )}
                  </div>

                  {/* Gold separator line */}
                  <div style={{
                    height: 1,
                    background: isActive
                      ? 'linear-gradient(90deg, #B8924A, rgba(184,146,74,0.3))'
                      : 'linear-gradient(90deg, rgba(184,146,74,0.35), rgba(184,146,74,0.08))',
                    alignSelf: 'center',
                    transition: 'opacity 0.3s',
                  }} />

                  {/* Message */}
                  <p
                    className="font-condensed"
                    style={{
                      fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                      color: isActive ? '#E8DFD3' : '#C9BFB3',
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                      margin: 0,
                      letterSpacing: '0.01em',
                      fontWeight: isActive ? 500 : 400,
                      transition: 'color 0.3s, font-weight 0.3s',
                    }}
                  >
                    {slot.msg}
                  </p>
                </div>
              </motion.div>
            )
          })}

          {/* Last border */}
          <div style={{ borderTop: '1px solid rgba(245,240,232,0.06)' }} />
        </div>

        {/* Bottom: burgund rule + badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ marginTop: 'clamp(48px, 7vh, 80px)', display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }}
        >
          {/* Thick burgund rule */}
          <div style={{
            width: '100%',
            height: 3,
            background: 'linear-gradient(90deg, #C44552 0%, rgba(196,69,82,0.2) 60%, transparent 100%)',
          }} />

          {/* CTA pill badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 24px',
            border: '1px solid rgba(196,69,82,0.4)',
            background: 'rgba(196,69,82,0.08)',
            borderRadius: 999,
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#C44552',
              flexShrink: 0,
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span
              className="font-condensed"
              style={{
                fontSize: 12,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C44552',
                fontWeight: 700,
              }}
            >
              24/7 geöffnet · 05:00 bis 24:00 Uhr
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
