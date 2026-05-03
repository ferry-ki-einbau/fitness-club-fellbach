import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const CDN = 'https://cdn.prod.website-files.com/64c8b8357249be90e806d8b9'

const SLIDES = [
  {
    no: '01',
    tag: '24/7 verfügbar',
    title: 'TRAINING',
    text: 'Modernste Geräte. Großzügige Fläche. Kraft, Ausdauer, funktional — alles was du brauchst, jederzeit.',
    img: `${CDN}/64c8ee1414476c15c5c9e632_DSC02147%201.png`,
  },
  {
    no: '02',
    tag: '30+ Kurse / Woche',
    title: 'KURSE',
    text: 'Yoga, BodyPump, Pilates, Rückenfit, Zirkel. Geleitet von Experten — abwechslungsreich, motivierend.',
    img: `${CDN}/64c8ee149b835c3ec80ea6c5_DSC02110%201.png`,
  },
  {
    no: '03',
    tag: '05:00 – 24:00 Uhr',
    title: 'WELLNESS',
    text: 'Sauna, Pool, Ruhebereich. Dein verdientes Abschalten — täglich, ohne Aufpreis im All-In.',
    img: `${CDN}/64c8ee144047408110a5798a_DSC02219%201.png`,
  },
]

export default function HorizontalBereiche() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%'])

  return (
    <section ref={ref} style={{ position: 'relative', height: '300vh', background: 'var(--black)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <motion.div style={{ x, display: 'flex', height: '100%', width: '300vw' }}>
          {SLIDES.map((s) => (
            <div
              key={s.no}
              style={{
                width: '100vw',
                height: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: 'clamp(24px, 6vw, 96px)',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.32 }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(90deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.55) 60%, rgba(8,8,8,0.2) 100%)',
                  }}
                />
              </div>
              <div style={{ position: 'relative', maxWidth: 720, zIndex: 2 }}>
                <div
                  className="font-condensed"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'var(--lime)',
                    marginBottom: 18,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span>{s.no}</span>
                  <span style={{ width: 32, height: 1, background: 'var(--lime)' }} />
                  <span>{s.tag}</span>
                </div>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'var(--heading-xl)',
                    fontWeight: 700,
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    marginBottom: 24,
                  }}
                >
                  {s.title}
                </h2>
                <p style={{ color: '#C9BFB3', fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.7, maxWidth: 520 }}>
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
        <div
          className="font-condensed"
          style={{
            position: 'absolute',
            bottom: 32,
            right: 32,
            fontSize: 10,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            zIndex: 3,
          }}
        >
          Scroll →
        </div>
      </div>
    </section>
  )
}
