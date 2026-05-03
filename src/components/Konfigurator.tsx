import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type AddOn = { id: string; label: string; price: number }

const ADDONS: AddOn[] = [
  { id: 'sauna', label: 'Sauna', price: 3.49 },
  { id: 'kurse', label: 'Gruppenkurse', price: 2.99 },
  { id: 'egym', label: 'EGYM Smart Strength', price: 4.49 },
  { id: 'zirkel', label: 'Betreutes Zirkeltraining', price: 3.49 },
]

const DURATIONS = [
  { months: 6, factor: 1.0 },
  { months: 12, factor: 0.92 },
  { months: 24, factor: 0.84 },
]

export default function Konfigurator() {
  const [base, setBase] = useState<'basic' | 'allin'>('allin')
  const [duration, setDuration] = useState(12)
  const [selected, setSelected] = useState<string[]>([])

  const basePrice = base === 'basic' ? 29 : 49
  const factor = DURATIONS.find((d) => d.months === duration)?.factor ?? 1
  const addOnTotal = useMemo(() => {
    if (base === 'allin') return 0
    return selected.reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0) * 4.33, 0)
  }, [selected, base])

  const monthly = (basePrice * factor + addOnTotal).toFixed(2)

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <section style={{ background: 'var(--gray-dark)', padding: '96px 0', borderTop: '1px solid var(--gray-border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div className="label" style={{ marginBottom: 12 }}>Konfigurator</div>
        <h2
          className="font-display"
          style={{
            fontSize: 'var(--heading-lg)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}
        >
          BAU DIR <span style={{ color: 'var(--lime)' }}>DEINEN PLAN.</span>
        </h2>
        <p style={{ color: '#C9BFB3', fontSize: 14, lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
          Wähle deine Mitgliedschaft, Laufzeit und Add-Ons. Preis berechnet sich live.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Base */}
            <div>
              <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B8924A', marginBottom: 14 }}>
                Mitgliedschaft
              </div>
              <div style={{ display: 'flex', gap: 1, background: 'var(--gray-border)' }}>
                {(['basic', 'allin'] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setBase(b)}
                    className="font-display"
                    style={{
                      flex: 1,
                      padding: '18px 12px',
                      background: base === b ? 'var(--lime)' : 'var(--gray-mid)',
                      color: base === b ? '#000' : '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 13,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      transition: 'background 0.2s',
                    }}
                  >
                    {b === 'basic' ? 'Basic' : 'All-In'}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B8924A', marginBottom: 14 }}>
                Laufzeit
              </div>
              <div style={{ display: 'flex', gap: 1, background: 'var(--gray-border)' }}>
                {DURATIONS.map((d) => (
                  <button
                    key={d.months}
                    onClick={() => setDuration(d.months)}
                    className="font-display"
                    style={{
                      flex: 1,
                      padding: '16px 8px',
                      background: duration === d.months ? 'var(--lime)' : 'var(--gray-mid)',
                      color: duration === d.months ? '#000' : '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {d.months} Mo
                  </button>
                ))}
              </div>
            </div>

            {/* Add-Ons */}
            <div>
              <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B8924A', marginBottom: 14 }}>
                {base === 'allin' ? 'Im All-In bereits enthalten' : 'Add-Ons'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ADDONS.map((a) => {
                  const active = base === 'allin' || selected.includes(a.id)
                  const disabled = base === 'allin'
                  return (
                    <button
                      key={a.id}
                      onClick={() => !disabled && toggle(a.id)}
                      disabled={disabled}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        background: active ? 'rgba(200,255,0,0.08)' : 'var(--gray-mid)',
                        border: `1px solid ${active ? 'var(--lime)' : 'var(--gray-border)'}`,
                        cursor: disabled ? 'default' : 'pointer',
                        opacity: disabled ? 0.7 : 1,
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span
                          style={{
                            width: 14,
                            height: 14,
                            border: `1px solid ${active ? 'var(--lime)' : '#333'}`,
                            background: active ? 'var(--lime)' : 'transparent',
                            display: 'inline-block',
                          }}
                        />
                        <span className="font-display" style={{ fontSize: 13, letterSpacing: '0.05em', color: '#fff' }}>
                          {a.label}
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {disabled ? 'inkl.' : `+ ${a.price.toFixed(2)}€/Wo`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Result */}
          <div style={{ background: 'var(--black)', border: '1px solid var(--gray-border)', padding: 36, position: 'sticky', top: 96, alignSelf: 'start' }}>
            <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B8924A', marginBottom: 18 }}>
              Dein Preis
            </div>
            <motion.div
              key={monthly}
              initial={{ opacity: 0.4, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display"
              style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 700, color: 'var(--lime)', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.02em' }}
            >
              {monthly}€
            </motion.div>
            <div style={{ fontSize: 13, color: '#C9BFB3', marginBottom: 32 }}>/ Monat · {duration} Monate Laufzeit</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid var(--gray-border)' }}>
              {[
                ['Mitgliedschaft', base === 'basic' ? 'Basic' : 'All-In'],
                ['Laufzeit', `${duration} Monate`],
                ['Add-Ons', base === 'allin' ? 'alle inkl.' : selected.length === 0 ? 'keine' : `${selected.length} gewählt`],
                ['Aufnahme', 'einmal 20€'],
              ].map(([k, v]) => (
                <div key={String(k)} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#9A8470', letterSpacing: '0.05em' }}>{k}</span>
                  <span style={{ color: '#C9BFB3' }}>{v}</span>
                </div>
              ))}
            </div>

            <a
              href="https://www.fitness-club-fellbach.de/membership/memberships"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime"
              style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }}
            >
              <span>Diesen Plan starten</span>
              <span>→</span>
            </a>
            <p style={{ fontSize: 11, color: '#9A8470', textAlign: 'center', marginTop: 12, letterSpacing: '0.05em' }}>
              14 Tage Widerrufsrecht. Risikofrei.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
