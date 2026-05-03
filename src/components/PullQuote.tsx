import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Pull Quote Divider — massive Single-Sentence Section zwischen Sections.
 * Macht epische Text-Moments wie in Magazin-Editorial.
 */
type Props = {
  before?: string  // small label above
  text: string
  highlight?: string  // word/phrase in burgund italic
  after?: string  // attribution / small text below
  variant?: 'light' | 'dark'
  bg?: string
}

export default function PullQuote({ before, text, highlight, after, variant = 'dark', bg }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  const isDark = variant === 'dark'
  const textColor = isDark ? '#F5F0E8' : '#0F1419'
  const accentColor = '#C44552'
  const subColor = isDark ? '#9A8470' : '#6E5050'
  const background = bg || (isDark ? '#0F1419' : '#F5F0E8')

  // Split text on highlight if provided
  let parts: { t: string; em: boolean }[] = [{ t: text, em: false }]
  if (highlight && text.includes(highlight)) {
    const split = text.split(highlight)
    parts = [
      { t: split[0], em: false },
      { t: highlight, em: true },
      { t: split[1] || '', em: false },
    ]
  }

  return (
    <section ref={ref} style={{
      position: 'relative',
      background,
      padding: 'clamp(64px, 10vh, 120px) clamp(16px, 4vw, 48px)',
      overflow: 'hidden',
    }}>
      {/* Subtle gold rule top */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 60, height: 1, background: '#B8924A', opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 60, height: 1, background: '#B8924A', opacity: 0.4 }} />

      <motion.div style={{ y, opacity, maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        {before && (
          <div className="font-condensed" style={{
            fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase',
            color: '#B8924A', fontWeight: 600, marginBottom: 32,
          }}>
            {before}
          </div>
        )}

        <h2 className="font-display" style={{
          fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: textColor,
          textTransform: 'uppercase',
          margin: 0,
          maxWidth: '18ch',
          marginInline: 'auto',
        }}>
          {parts.map((p, i) => (
            p.em
              ? <span key={i} style={{ color: accentColor, fontStyle: 'italic', fontWeight: 700 }}>{p.t}</span>
              : <span key={i}>{p.t}</span>
          ))}
        </h2>

        {after && (
          <div className="font-condensed" style={{
            fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase',
            color: subColor, fontWeight: 500, marginTop: 36,
          }}>
            — {after}
          </div>
        )}
      </motion.div>
    </section>
  )
}
