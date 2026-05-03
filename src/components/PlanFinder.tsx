import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Interactive Plan Finder — 3-Step Quiz.
 * Recommends Basic / Premium / All-In basierend auf Antworten.
 */

type Step = {
  question: string
  key: string
  options: { label: string; sub?: string; weight: number }[]
}

const steps: Step[] = [
  {
    question: 'Wie oft willst du trainieren?',
    key: 'frequency',
    options: [
      { label: '1–2× pro Woche', sub: 'Gelegentlich', weight: 1 },
      { label: '3–4× pro Woche', sub: 'Regelmäßig', weight: 2 },
      { label: '5+× pro Woche', sub: 'Hardcore', weight: 3 },
    ],
  },
  {
    question: 'Was ist dir am wichtigsten?',
    key: 'focus',
    options: [
      { label: 'Nur Geräte', sub: 'Cardio + Kraft reicht', weight: 1 },
      { label: 'Kurse & Geräte', sub: 'Abwechslung ist König', weight: 2 },
      { label: 'Wellness dazu', sub: 'Sauna & Whirlpool gehören rein', weight: 3 },
    ],
  },
  {
    question: 'Wie lange willst du dabei bleiben?',
    key: 'duration',
    options: [
      { label: '3 Monate ausprobieren', weight: 1 },
      { label: '12 Monate dranbleiben', weight: 2 },
      { label: '24 Monate · 2 Mo. gratis', weight: 3 },
    ],
  },
]

const plans = {
  basic: { name: 'Basic', price: '13,99€', sub: '/Woche · 24 Monate', text: 'Trainingsfläche, Duschen, 24/7 Zugang. Add-Ons jederzeit dazubuchbar.', accent: '#B8924A' },
  premium: { name: 'Premium', price: '12,99€', sub: '/Woche · 24 Monate', text: 'Alles aus Basic + 1 Add-On nach Wahl inklusive (Kurse oder Wellness).', accent: 'var(--accent-bright)' },
  allin: { name: 'All-In', price: '14,99€', sub: '/Woche · 24 Monate · 2 Mo. gratis', text: 'Komplett-Paket: Trainingsfläche, alle Kurse, Sauna, Whirlpool, EGYM, Getränke.', accent: 'var(--accent)' },
}

export default function PlanFinder() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const select = (weight: number) => {
    const newScores = [...scores, weight]
    setScores(newScores)
    if (step < steps.length - 1) setStep(step + 1)
    else setDone(true)
  }

  const reset = () => { setStep(0); setScores([]); setDone(false) }

  const total = scores.reduce((a, b) => a + b, 0)
  const recommended = total <= 4 ? plans.basic : total <= 7 ? plans.premium : plans.allin

  return (
    <section style={{ background: 'linear-gradient(135deg, #0F1419 0%, #0F1419 100%)', padding: 'clamp(80px, 12vh, 140px) 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle meander pattern background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><path d='M0 48 L0 24 L24 24 L24 48 L48 48 L48 0 L72 0 L72 72 L0 72 Z' fill='none' stroke='%23B8924A' stroke-width='2'/></svg>")`,
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <span style={{ width: 32, height: 1, background: '#B8924A' }} />
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Plan-Finder</span>
          <span style={{ width: 32, height: 1, background: '#B8924A' }} />
        </div>

        <h2 className="font-display" style={{
          fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800,
          letterSpacing: '-0.025em', color: '#F5F0E8', textTransform: 'uppercase',
          lineHeight: 0.95, marginBottom: 20,
        }}>
          {!done ? <>Finde <span style={{ color: 'var(--accent-bright)', fontStyle: 'italic' }}>deinen Plan.</span></> : <>Dein perfekter <span style={{ color: 'var(--accent-bright)', fontStyle: 'italic' }}>Plan.</span></>}
        </h2>

        <p style={{ color: '#C9BFB3', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', marginBottom: 56, maxWidth: '50ch', marginInline: 'auto' }}>
          {!done ? '3 schnelle Fragen — 30 Sekunden — wir empfehlen dir den passenden Plan.' : 'Basierend auf deinen Antworten passt dieser Plan am besten zu dir.'}
        </p>

        {/* Progress bar */}
        {!done && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 48 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ width: 60, height: 3, background: i <= step ? 'var(--accent-bright)' : 'rgba(184, 146, 74, 0.2)', transition: 'background 0.3s' }} />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#9A8470', marginBottom: 16 }}>
                Frage {step + 1} von {steps.length}
              </div>
              <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 700, color: '#F5F0E8', marginBottom: 40, letterSpacing: '-0.01em' }}>
                {steps[step].question}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, maxWidth: 760, marginInline: 'auto' }}>
                {steps[step].options.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => select(o.weight)}
                    className="font-display"
                    style={{
                      padding: '24px 20px',
                      background: 'rgba(245, 240, 232, 0.05)',
                      border: '1px solid rgba(184, 146, 74, 0.3)',
                      color: '#F5F0E8',
                      cursor: 'pointer',
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      transition: 'all 0.25s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => {
                      const t = e.currentTarget; t.style.background = 'rgba(225, 84, 100, 0.1)'; t.style.borderColor = 'var(--accent-bright)'; t.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      const t = e.currentTarget; t.style.background = 'rgba(245, 240, 232, 0.05)'; t.style.borderColor = 'rgba(184, 146, 74, 0.3)'; t.style.transform = 'translateY(0)'
                    }}
                  >
                    {o.label}
                    {o.sub && <div className="font-condensed" style={{ fontSize: 11, fontWeight: 400, color: '#9A8470', marginTop: 6, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{o.sub}</div>}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: 'rgba(245, 240, 232, 0.04)', border: `2px solid ${recommended.accent}`, padding: 48, maxWidth: 600, marginInline: 'auto' }}
            >
              <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: recommended.accent, marginBottom: 16, fontWeight: 600 }}>Empfehlung für dich</div>
              <div className="font-display" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, color: '#F5F0E8', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 12 }}>
                {recommended.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                <span className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: recommended.accent, letterSpacing: '-0.02em' }}>{recommended.price}</span>
                <span className="font-condensed" style={{ fontSize: 13, color: '#9A8470', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{recommended.sub}</span>
              </div>
              <p style={{ color: '#C9BFB3', fontSize: 15, lineHeight: 1.65, marginBottom: 32 }}>
                {recommended.text}
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#preise" className="btn-lime" style={{ padding: '14px 28px', fontSize: 13, fontWeight: 600, letterSpacing: '0.15em' }}>14 Tage gratis testen →</a>
                <button onClick={reset} className="font-condensed" style={{ padding: '14px 28px', background: 'transparent', border: '1px solid rgba(184, 146, 74, 0.4)', color: '#B5A99A', cursor: 'pointer', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                  Quiz neu starten
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
