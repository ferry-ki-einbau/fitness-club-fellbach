import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../components/Logo'

// ─── Types ───────────────────────────────────────────────────────────────────

interface RateBundleTerm {
  id: number
  termValue: number // 12 or 24
  price: number // weekly price
  flatFees: { name: string; price: number }[]
  optionalModules: { id: number; name: string; price: number }[]
}

interface RateBundle {
  id: number
  name: string
  terms: RateBundleTerm[]
  displayName?: string
  features?: string[]
}

// ─── Kuratierte Mitgliedschaften ───────────────────────────────────────────────
// Die Magicline rate-bundle API liefert ALLE im Studio konfigurierten Tarife —
// auch interne, alte und abgelaufene Aktionen (z.B. "50 Jahre Jubiläum" 6,50€,
// oder den Grundtarif ohne 2-Monate-Aktion). Diese dürfen NICHT öffentlich
// buchbar sein. Wir zeigen ausschließlich die kuratierten Tarife unten —
// identisch zur offiziellen Anmeldeseite. Bei neuer Aktion: IDs hier anpassen.
const MEMBERSHIP_CONFIG: Record<number, { displayName: string; order: number; features: string[] }> = {
  // BASIC — 2 Monate GRATIS Training (Grundtarif mit zubuchbaren Modulen)
  1229471790: {
    displayName: 'Basic',
    order: 1,
    features: ['Fitnessfläche', 'Duschen inklusive', 'Zubuchbare Add-Ons ab 2,99€/Woche'],
  },
  // ALL-IN — 2 Monate GRATIS Training (Vollausstattung, Module inklusive)
  1229471690: {
    displayName: 'All-In',
    order: 2,
    features: ['Fitnessfläche', 'Duschen inklusive', 'Getränke inklusive', 'Sauna-Modul', 'Kurs-Modul', 'EGYM Training', 'Betreutes Zirkeltraining', 'Weitere Add-Ons ab 3,49€'],
  },
}

interface FunnelData {
  // Step 1
  bundleId: number | null
  termId: number | null
  termMonths: number // global Laufzeit-Auswahl (12 oder 24)
  // Step 2
  selectedAddons: number[]
  // Step 3
  gender: 'MALE' | 'FEMALE' | 'DIVERSE' | ''
  vorname: string
  nachname: string
  email: string
  telefon: string
  geburtsdatum: string
  strasse: string
  plz: string
  stadt: string
  // Step 4
  kontoinhaber: string
  iban: string
  sepaMandat: boolean
  // Meta
  agb: boolean
}

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE = 'https://fitness-club-fellbach.api.magicline.com/connect/v1'
const STUDIO_ID = '1210011390'
const RECAPTCHA_SITE_KEY = '6Ld5qKcgAAAAAMoywArOgIrC0lQ7NpYUTsF92PIC'

const STEPS = [
  { num: '01', label: 'TARIF' },
  { num: '02', label: 'ADD-ONS' },
  { num: '03', label: 'DATEN' },
  { num: '04', label: 'ZAHLUNG' },
  { num: '05', label: 'ÜBERBLICK' },
]

const C = {
  bg: '#0F1419',
  burgund: '#C44552',
  gold: '#B8924A',
  cream: '#F5F0E8',
  muted: '#9A8470',
  border: 'rgba(245,240,232,0.1)',
  borderHover: 'rgba(245,240,232,0.25)',
  inputBg: 'rgba(245,240,232,0.05)',
  green: '#22c55e',
  error: '#f87171',
}

const DEFAULT_DATA: FunnelData = {
  bundleId: null,
  termId: null,
  termMonths: 24,
  selectedAddons: [],
  gender: '',
  vorname: '',
  nachname: '',
  email: '',
  telefon: '',
  geburtsdatum: '',
  strasse: '',
  plz: '',
  stadt: '',
  kontoinhaber: '',
  iban: '',
  sepaMandat: false,
  agb: false,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toFixed(2).replace('.', ',')
}

function formatIBAN(raw: string): string {
  const clean = raw.replace(/\s/g, '').toUpperCase()
  return clean.replace(/(.{4})/g, '$1 ').trim()
}

function validateIBAN(iban: string): boolean {
  const clean = iban.replace(/\s/g, '').toUpperCase()
  if (clean.length !== 22) return false
  if (!/^DE\d{20}$/.test(clean)) return false
  // Basic mod-97 check (ISO 13616)
  const rearranged = clean.slice(4) + clean.slice(0, 4)
  const numeric = rearranged.replace(/[A-Z]/g, ch => String(ch.charCodeAt(0) - 55))
  let remainder = ''
  for (const digit of numeric) {
    remainder += digit
    remainder = String(parseInt(remainder, 10) % 97)
  }
  return parseInt(remainder, 10) === 1
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateDate(dateStr: string): boolean {
  if (!dateStr) return false
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return false
  // Must be at least 14 years old
  const now = new Date()
  const age = now.getFullYear() - d.getFullYear()
  const monthDiff = now.getMonth() - d.getMonth()
  if (age < 14 || (age === 14 && (monthDiff < 0 || (monthDiff === 0 && now.getDate() < d.getDate())))) return false
  return true
}

// ─── reCAPTCHA v3 ────────────────────────────────────────────────────────────

function loadRecaptcha(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if ((window as any).grecaptcha) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.onload = () => {
      ;(window as any).grecaptcha.ready(() => resolve())
    }
    script.onerror = () => reject(new Error('reCAPTCHA konnte nicht geladen werden'))
    document.head.appendChild(script)
  })
}

async function getRecaptchaToken(action: string): Promise<string> {
  await loadRecaptcha()
  return (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ height: 3, background: 'rgba(245,240,232,0.08)', flexShrink: 0 }}>
      <motion.div
        style={{ height: '100%', background: C.burgund, transformOrigin: 'left' }}
        initial={false}
        animate={{ width: `${(step / total) * 100}%` }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
      {STEPS.map((s, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isDone = stepNum < currentStep
        return (
          <span
            key={s.num}
            className="font-condensed"
            style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: isActive ? C.cream : isDone ? C.gold : 'rgba(245,240,232,0.3)',
              fontWeight: isActive ? 700 : 500,
              transition: 'color 0.3s',
            }}
          >
            {s.num} {s.label}
            {i < STEPS.length - 1 && (
              <span style={{ marginLeft: 6, opacity: 0.3 }}>·</span>
            )}
          </span>
        )
      })}
    </div>
  )
}

function Spinner() {
  return (
    <span style={{
      display: 'inline-block',
      width: 16, height: 16,
      border: '2px solid rgba(255,255,255,0.3)',
      borderTopColor: '#fff',
      borderRadius: '50%',
      animation: 'mitglied-spin 0.7s linear infinite',
    }} />
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div style={{
      padding: '14px 18px',
      background: 'rgba(196,69,82,0.1)',
      border: '1px solid rgba(196,69,82,0.3)',
      borderRadius: 3,
      color: C.error,
      fontSize: 13,
      lineHeight: 1.5,
    }}>
      {message}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: C.inputBg,
  border: `1px solid ${C.border}`,
  borderRadius: 3,
  color: C.cream,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: C.muted,
  fontSize: 11,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  fontFamily: "'Barlow Condensed', sans-serif",
  marginBottom: 6,
  fontWeight: 600,
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: '0 0 auto',
        padding: '16px 24px',
        background: 'transparent',
        color: C.muted,
        border: `1px solid ${C.border}`,
        borderRadius: 3,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: 'pointer',
      }}
    >
      ← Zurück
    </button>
  )
}

function NextButton({ onClick, disabled, loading, children }: { onClick: () => void; disabled?: boolean; loading?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        flex: 1,
        padding: '16px 24px',
        background: disabled ? 'rgba(196,69,82,0.4)' : C.burgund,
        color: '#fff',
        border: 'none',
        borderRadius: 3,
        fontFamily: "'Oswald', sans-serif",
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = '0.9' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
    >
      {loading ? <><Spinner /> Wird verarbeitet…</> : children}
    </button>
  )
}

// ─── Step 1: Tarif wählen ────────────────────────────────────────────────────

function StepTarif({
  bundles,
  data,
  onChange,
  onNext,
}: {
  bundles: RateBundle[]
  data: FunnelData
  onChange: (patch: Partial<FunnelData>) => void
  onNext: () => void
}) {
  const selectedBundle = bundles.find(b => b.id === data.bundleId)
  const selectedTerm = selectedBundle?.terms.find(t => t.id === data.termId)

  // Alle verfügbaren Laufzeiten über alle Tarife hinweg (für globalen Toggle)
  const allTermValues = [...new Set(bundles.flatMap(b => b.terms.map(t => t.termValue)))].sort((a, b) => b - a)

  // Term für einen Tarif anhand der global gewählten Laufzeit finden (Fallback: günstigster)
  function termForBundle(bundle: RateBundle) {
    return bundle.terms.find(t => t.termValue === data.termMonths)
      ?? bundle.terms.reduce((min, t) => t.price < min.price ? t : min, bundle.terms[0])
  }

  function selectTermMonths(tv: number) {
    const patch: Partial<FunnelData> = { termMonths: tv }
    // Wenn schon ein Tarif gewählt ist, termId auf passende Laufzeit aktualisieren
    if (selectedBundle) {
      const t = selectedBundle.terms.find(x => x.termValue === tv)
      if (t) patch.termId = t.id
    }
    onChange(patch)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <h3 className="font-display" style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: 700, color: C.cream,
          textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8,
        }}>
          Tarif wählen
        </h3>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
          Wähle deine Laufzeit und deinen Tarif. 24 Monate = bester Preis.
        </p>
      </div>

      {/* Globaler Laufzeit-Toggle — über den Cards */}
      {allTermValues.length > 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <span className="font-condensed" style={{ color: C.muted, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Laufzeit
          </span>
          <div style={{
            display: 'flex',
            background: 'rgba(245,240,232,0.05)',
            border: `1px solid ${C.border}`,
            borderRadius: 4,
            padding: 3,
          }}>
            {allTermValues.map(tv => {
              const isActive = data.termMonths === tv
              return (
                <button
                  key={tv}
                  onClick={() => selectTermMonths(tv)}
                  className="font-condensed"
                  style={{
                    padding: '10px 28px', borderRadius: 2, border: 'none', cursor: 'pointer',
                    background: isActive ? C.burgund : 'transparent',
                    color: isActive ? '#fff' : C.muted,
                    fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                    transition: 'all 0.2s',
                  }}
                >
                  {tv} Monate
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Bundle Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {bundles.map(bundle => {
          const isSelected = data.bundleId === bundle.id
          const cardTerm = termForBundle(bundle)

          return (
            <motion.button
              key={bundle.id}
              onClick={() => {
                onChange({
                  bundleId: bundle.id,
                  termId: cardTerm.id,
                  selectedAddons: [],
                })
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                position: 'relative',
                padding: '28px 24px',
                border: `2px solid ${isSelected ? C.burgund : C.border}`,
                borderRadius: 4,
                background: isSelected ? 'rgba(196,69,82,0.06)' : 'rgba(245,240,232,0.02)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s',
                outline: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'flex-start',
              }}
            >
              {isSelected && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 22, height: 22, borderRadius: '50%',
                  background: C.burgund,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}

              <div className="font-condensed" style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.4em',
                textTransform: 'uppercase', color: C.muted, marginBottom: 8,
              }}>
                Tarif
              </div>

              <div className="font-display" style={{
                fontSize: 18, fontWeight: 700, color: C.cream,
                textTransform: 'uppercase', marginBottom: 12,
              }}>
                {bundle.displayName ?? bundle.name}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span className="font-display" style={{
                  fontSize: 32, fontWeight: 700, color: isSelected ? C.gold : C.cream,
                  lineHeight: 1, letterSpacing: '-0.02em',
                }}>
                  {fmt(cardTerm.price)}€
                </span>
                <span style={{ color: C.muted, fontSize: 12 }}>/Woche</span>
              </div>

              {cardTerm.flatFees.length > 0 && (
                <div style={{ marginTop: 8, fontSize: 11, color: C.muted }}>
                  + {cardTerm.flatFees.map(f => `${f.name} ${fmt(f.price)}€`).join(', ')}
                </div>
              )}

              {bundle.features && bundle.features.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {bundle.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'rgba(245,240,232,0.7)', lineHeight: 1.4 }}>
                      <span style={{ color: C.burgund, flexShrink: 0, fontWeight: 700 }}>+</span>{f}
                    </li>
                  ))}
                </ul>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Price Summary */}
      {selectedTerm && (
        <div style={{
          padding: '20px 24px',
          background: 'rgba(184,146,74,0.06)',
          border: '1px solid rgba(184,146,74,0.2)',
          borderRadius: 3,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ color: C.cream, fontSize: 14, fontWeight: 600 }}>{selectedBundle!.displayName ?? selectedBundle!.name}</div>
              <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>
                {selectedTerm.termValue} Monate Laufzeit
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="font-display" style={{
                fontSize: 24, fontWeight: 700, color: C.gold, letterSpacing: '-0.01em',
              }}>
                {fmt(selectedTerm.price)}€/Woche
              </span>
              {selectedTerm.flatFees.length > 0 && (
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                  + {selectedTerm.flatFees.map(f => `${fmt(f.price)}€ ${f.name}`).join(', ')} (einmalig)
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <NextButton onClick={onNext} disabled={!data.bundleId || !data.termId}>
        Weiter <span>→</span>
      </NextButton>
    </div>
  )
}

// ─── Step 2: Add-Ons ─────────────────────────────────────────────────────────

function StepAddons({
  bundles,
  data,
  onChange,
  onNext,
  onBack,
}: {
  bundles: RateBundle[]
  data: FunnelData
  onChange: (patch: Partial<FunnelData>) => void
  onNext: () => void
  onBack: () => void
}) {
  const selectedBundle = bundles.find(b => b.id === data.bundleId)
  const selectedTerm = selectedBundle?.terms.find(t => t.id === data.termId)
  const addons = selectedTerm?.optionalModules || []

  if (addons.length === 0) {
    // Auto-skip if no addons available
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h3 className="font-display" style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: 700, color: C.cream,
            textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8,
          }}>
            Keine Add-Ons verfügbar
          </h3>
          <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
            Für den gewählten Tarif sind bereits alle Leistungen enthalten.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <BackButton onClick={onBack} />
          <NextButton onClick={onNext}>Weiter <span>→</span></NextButton>
        </div>
      </div>
    )
  }

  const addonTotal = data.selectedAddons.reduce((acc, id) => {
    const a = addons.find(x => x.id === id)
    return acc + (a ? a.price : 0)
  }, 0)

  const basePrice = selectedTerm?.price || 0
  const total = basePrice + addonTotal

  function toggleAddon(id: number) {
    const current = data.selectedAddons
    const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
    onChange({ selectedAddons: next })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 className="font-display" style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: 700, color: C.cream,
          textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8,
        }}>
          Add-Ons
        </h3>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
          Ergänze deinen Tarif nach Bedarf. Alles optional.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {addons.map(addon => {
          const isActive = data.selectedAddons.includes(addon.id)
          const isFree = addon.price === 0
          return (
            <motion.button
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              whileTap={{ scale: 0.99 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px',
                border: `1px solid ${isActive ? C.burgund : C.border}`,
                borderRadius: 3,
                background: isActive ? 'rgba(196,69,82,0.06)' : 'rgba(245,240,232,0.02)',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', outline: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  border: `2px solid ${isActive ? C.burgund : 'rgba(245,240,232,0.2)'}`,
                  background: isActive ? C.burgund : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.2s',
                }}>
                  {isActive && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3L3.5 5.5L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span style={{ color: isActive ? C.cream : 'rgba(245,240,232,0.7)', fontSize: 14, fontWeight: 500 }}>
                  {addon.name}
                </span>
              </div>
              <span className="font-condensed" style={{
                fontSize: 13, fontWeight: 700,
                color: isFree ? C.green : (isActive ? C.gold : C.muted),
                letterSpacing: '0.05em',
              }}>
                {isFree ? 'GRATIS' : `+${fmt(addon.price)}€/Wo`}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Running Total */}
      <div style={{
        padding: '20px 24px',
        background: 'rgba(184,146,74,0.06)',
        border: '1px solid rgba(184,146,74,0.2)',
        borderRadius: 3,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ color: C.muted, fontSize: 13 }}>
            {fmt(basePrice)}€ Basis
            {addonTotal > 0 && ` + ${fmt(addonTotal)}€ Add-Ons`}
          </span>
          <span className="font-display" style={{
            fontSize: 20, fontWeight: 700, color: C.cream, letterSpacing: '-0.01em',
          }}>
            Gesamt: {fmt(total)}€/Woche
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <BackButton onClick={onBack} />
        <NextButton onClick={onNext}>Weiter <span>→</span></NextButton>
      </div>
    </div>
  )
}

// ─── Step 3: Persönliche Daten ───────────────────────────────────────────────

function StepDaten({
  data,
  onChange,
  onNext,
  onBack,
  error,
}: {
  data: FunnelData
  onChange: (patch: Partial<FunnelData>) => void
  onNext: () => void
  onBack: () => void
  error: string | null
}) {
  const gridRow: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!data.vorname.trim()) errs.vorname = 'Pflichtfeld'
    if (!data.nachname.trim()) errs.nachname = 'Pflichtfeld'
    if (!data.email.trim()) errs.email = 'Pflichtfeld'
    else if (!validateEmail(data.email)) errs.email = 'Ungültige E-Mail-Adresse'
    if (!data.telefon.trim()) errs.telefon = 'Pflichtfeld'
    if (!data.geburtsdatum) errs.geburtsdatum = 'Pflichtfeld'
    else if (!validateDate(data.geburtsdatum)) errs.geburtsdatum = 'Mindestalter 14 Jahre'
    if (!data.strasse.trim()) errs.strasse = 'Pflichtfeld'
    if (!data.plz.trim()) errs.plz = 'Pflichtfeld'
    else if (!/^\d{5}$/.test(data.plz.trim())) errs.plz = 'Ungültige PLZ'
    if (!data.stadt.trim()) errs.stadt = 'Pflichtfeld'
    if (!data.gender) errs.gender = 'Pflichtfeld'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleNext() {
    if (validate()) onNext()
  }

  const fieldError = (key: string) => fieldErrors[key]
    ? <span style={{ fontSize: 11, color: C.error, marginTop: 2, display: 'block' }}>{fieldErrors[key]}</span>
    : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 className="font-display" style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: 700, color: C.cream,
          textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8,
        }}>
          Persönliche Daten
        </h3>
        <p style={{ color: C.muted, fontSize: 13 }}>
          Alle Felder sind Pflichtfelder.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Geschlecht */}
        <div>
          <label style={labelStyle}>Anrede *</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {([
              { value: 'MALE', label: 'Herr' },
              { value: 'FEMALE', label: 'Frau' },
              { value: 'DIVERSE', label: 'Divers' },
            ] as const).map(g => (
              <button
                key={g.value}
                onClick={() => onChange({ gender: g.value })}
                style={{
                  padding: '10px 20px', border: `1px solid ${data.gender === g.value ? C.burgund : C.border}`,
                  borderRadius: 3, background: data.gender === g.value ? 'rgba(196,69,82,0.1)' : C.inputBg,
                  color: data.gender === g.value ? C.cream : C.muted,
                  fontSize: 13, cursor: 'pointer', transition: 'all 0.2s', outline: 'none',
                  fontFamily: 'inherit',
                }}
              >
                {g.label}
              </button>
            ))}
          </div>
          {fieldError('gender')}
        </div>

        {/* Name */}
        <div style={gridRow}>
          <div>
            <label style={labelStyle}>Vorname *</label>
            <input
              style={{ ...inputStyle, borderColor: fieldErrors.vorname ? C.error : C.border }}
              value={data.vorname}
              onChange={e => { onChange({ vorname: e.target.value }); setFieldErrors(p => ({ ...p, vorname: '' })) }}
              placeholder="Max"
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = fieldErrors.vorname ? C.error : C.border)}
            />
            {fieldError('vorname')}
          </div>
          <div>
            <label style={labelStyle}>Nachname *</label>
            <input
              style={{ ...inputStyle, borderColor: fieldErrors.nachname ? C.error : C.border }}
              value={data.nachname}
              onChange={e => { onChange({ nachname: e.target.value }); setFieldErrors(p => ({ ...p, nachname: '' })) }}
              placeholder="Mustermann"
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = fieldErrors.nachname ? C.error : C.border)}
            />
            {fieldError('nachname')}
          </div>
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>E-Mail-Adresse *</label>
          <input
            style={{ ...inputStyle, borderColor: fieldErrors.email ? C.error : C.border }}
            type="email"
            value={data.email}
            onChange={e => { onChange({ email: e.target.value }); setFieldErrors(p => ({ ...p, email: '' })) }}
            placeholder="max@example.de"
            onFocus={e => (e.target.style.borderColor = C.burgund)}
            onBlur={e => (e.target.style.borderColor = fieldErrors.email ? C.error : C.border)}
          />
          {fieldError('email')}
        </div>

        {/* Tel + DOB */}
        <div style={gridRow}>
          <div>
            <label style={labelStyle}>Telefon *</label>
            <input
              style={{ ...inputStyle, borderColor: fieldErrors.telefon ? C.error : C.border }}
              type="tel"
              value={data.telefon}
              onChange={e => { onChange({ telefon: e.target.value }); setFieldErrors(p => ({ ...p, telefon: '' })) }}
              placeholder="+49 711 …"
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = fieldErrors.telefon ? C.error : C.border)}
            />
            {fieldError('telefon')}
          </div>
          <div>
            <label style={labelStyle}>Geburtsdatum *</label>
            <input
              style={{ ...inputStyle, colorScheme: 'dark', borderColor: fieldErrors.geburtsdatum ? C.error : C.border }}
              type="date"
              value={data.geburtsdatum}
              onChange={e => { onChange({ geburtsdatum: e.target.value }); setFieldErrors(p => ({ ...p, geburtsdatum: '' })) }}
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = fieldErrors.geburtsdatum ? C.error : C.border)}
            />
            {fieldError('geburtsdatum')}
          </div>
        </div>

        {/* Adresse */}
        <div>
          <label style={labelStyle}>Straße + Hausnummer *</label>
          <input
            style={{ ...inputStyle, borderColor: fieldErrors.strasse ? C.error : C.border }}
            value={data.strasse}
            onChange={e => { onChange({ strasse: e.target.value }); setFieldErrors(p => ({ ...p, strasse: '' })) }}
            placeholder="Bruckstraße 61"
            onFocus={e => (e.target.style.borderColor = C.burgund)}
            onBlur={e => (e.target.style.borderColor = fieldErrors.strasse ? C.error : C.border)}
          />
          {fieldError('strasse')}
        </div>

        {/* PLZ + Ort */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
          <div>
            <label style={labelStyle}>PLZ *</label>
            <input
              style={{ ...inputStyle, borderColor: fieldErrors.plz ? C.error : C.border }}
              value={data.plz}
              onChange={e => { onChange({ plz: e.target.value.replace(/\D/g, '').slice(0, 5) }); setFieldErrors(p => ({ ...p, plz: '' })) }}
              placeholder="70736"
              inputMode="numeric"
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = fieldErrors.plz ? C.error : C.border)}
            />
            {fieldError('plz')}
          </div>
          <div>
            <label style={labelStyle}>Ort *</label>
            <input
              style={{ ...inputStyle, borderColor: fieldErrors.stadt ? C.error : C.border }}
              value={data.stadt}
              onChange={e => { onChange({ stadt: e.target.value }); setFieldErrors(p => ({ ...p, stadt: '' })) }}
              placeholder="Fellbach"
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = fieldErrors.stadt ? C.error : C.border)}
            />
            {fieldError('stadt')}
          </div>
        </div>

      </div>

      {error && <ErrorBox message={error} />}

      <div style={{ display: 'flex', gap: 12 }}>
        <BackButton onClick={onBack} />
        <NextButton onClick={handleNext}>Weiter <span>→</span></NextButton>
      </div>
    </div>
  )
}

// ─── Step 4: Zahlungsdaten ───────────────────────────────────────────────────

function StepZahlung({
  data,
  onChange,
  onNext,
  onBack,
  error,
}: {
  data: FunnelData
  onChange: (patch: Partial<FunnelData>) => void
  onNext: () => void
  onBack: () => void
  error: string | null
}) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!data.kontoinhaber.trim()) errs.kontoinhaber = 'Pflichtfeld'
    const cleanIban = data.iban.replace(/\s/g, '')
    if (!cleanIban) errs.iban = 'Pflichtfeld'
    else if (!validateIBAN(cleanIban)) errs.iban = 'Ungültige IBAN (DE + 20 Ziffern)'
    if (!data.sepaMandat) errs.sepaMandat = 'SEPA-Mandat muss akzeptiert werden'
    if (!data.agb) errs.agb = 'AGB müssen akzeptiert werden'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleNext() {
    if (validate()) onNext()
  }

  const fieldError = (key: string) => fieldErrors[key]
    ? <span style={{ fontSize: 11, color: C.error, marginTop: 2, display: 'block' }}>{fieldErrors[key]}</span>
    : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 className="font-display" style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: 700, color: C.cream,
          textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8,
        }}>
          Zahlungsdaten
        </h3>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
          SEPA-Lastschrift — dein Beitrag wird wöchentlich abgebucht.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Kontoinhaber */}
        <div>
          <label style={labelStyle}>Kontoinhaber *</label>
          <input
            style={{ ...inputStyle, borderColor: fieldErrors.kontoinhaber ? C.error : C.border }}
            value={data.kontoinhaber}
            onChange={e => { onChange({ kontoinhaber: e.target.value }); setFieldErrors(p => ({ ...p, kontoinhaber: '' })) }}
            placeholder={`${data.vorname} ${data.nachname}`.trim() || 'Max Mustermann'}
            onFocus={e => (e.target.style.borderColor = C.burgund)}
            onBlur={e => (e.target.style.borderColor = fieldErrors.kontoinhaber ? C.error : C.border)}
          />
          {fieldError('kontoinhaber')}
        </div>

        {/* IBAN */}
        <div>
          <label style={labelStyle}>IBAN *</label>
          <input
            style={{ ...inputStyle, fontFamily: "'Barlow Condensed', monospace", letterSpacing: '0.1em', fontSize: 15, borderColor: fieldErrors.iban ? C.error : C.border }}
            value={formatIBAN(data.iban)}
            onChange={e => {
              const raw = e.target.value.replace(/\s/g, '').toUpperCase().slice(0, 22)
              onChange({ iban: raw })
              setFieldErrors(p => ({ ...p, iban: '' }))
            }}
            placeholder="DE89 3704 0044 0532 0130 00"
            autoComplete="off"
            onFocus={e => (e.target.style.borderColor = C.burgund)}
            onBlur={e => (e.target.style.borderColor = fieldErrors.iban ? C.error : C.border)}
          />
          {fieldError('iban')}
          {data.iban.length > 0 && data.iban.length < 22 && (
            <span style={{ fontSize: 11, color: C.muted, marginTop: 2, display: 'block' }}>
              {22 - data.iban.replace(/\s/g, '').length} Zeichen fehlen
            </span>
          )}
        </div>

        {/* SEPA Mandate */}
        <div style={{
          padding: '20px',
          background: 'rgba(245,240,232,0.03)',
          border: `1px solid ${C.border}`,
          borderRadius: 4,
        }}>
          <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: 10, fontWeight: 600 }}>
            SEPA-Lastschriftmandat
          </div>
          <p style={{ fontSize: 12, color: 'rgba(245,240,232,0.6)', lineHeight: 1.7, marginBottom: 16 }}>
            Ich ermächtige den Fitness Club Fellbach (Gläubiger-ID wird im Vertrag mitgeteilt),
            Zahlungen von meinem Konto mittels Lastschrift einzuziehen. Zugleich weise ich mein
            Kreditinstitut an, die vom Fitness Club Fellbach auf mein Konto gezogenen Lastschriften einzulösen.
            Hinweis: Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung
            des belasteten Betrages verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.
          </p>

          <label style={{ display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
            <div
              onClick={() => { onChange({ sepaMandat: !data.sepaMandat }); setFieldErrors(p => ({ ...p, sepaMandat: '' })) }}
              style={{
                width: 20, height: 20,
                border: `2px solid ${data.sepaMandat ? C.burgund : fieldErrors.sepaMandat ? C.error : 'rgba(245,240,232,0.3)'}`,
                borderRadius: 3,
                background: data.sepaMandat ? C.burgund : 'transparent',
                flexShrink: 0, marginTop: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {data.sepaMandat && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.7)', lineHeight: 1.5 }}>
              Ich akzeptiere das SEPA-Lastschriftmandat. *
            </span>
          </label>
          {fieldError('sepaMandat')}
        </div>

        {/* AGB */}
        <label style={{ display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
          <div
            onClick={() => { onChange({ agb: !data.agb }); setFieldErrors(p => ({ ...p, agb: '' })) }}
            style={{
              width: 20, height: 20,
              border: `2px solid ${data.agb ? C.burgund : fieldErrors.agb ? C.error : 'rgba(245,240,232,0.3)'}`,
              borderRadius: 3,
              background: data.agb ? C.burgund : 'transparent',
              flexShrink: 0, marginTop: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {data.agb && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.7)', lineHeight: 1.5 }}>
            Ich habe die <a href="/datenschutz" target="_blank" style={{ color: C.cream, textDecoration: 'underline' }}>Datenschutzerklärung</a> gelesen
            und akzeptiere die AGB des Fitness Club Fellbach. *
          </span>
        </label>
        {fieldError('agb')}
      </div>

      {error && <ErrorBox message={error} />}

      <div style={{ display: 'flex', gap: 12 }}>
        <BackButton onClick={onBack} />
        <NextButton onClick={handleNext}>Weiter zur Zusammenfassung <span>→</span></NextButton>
      </div>
    </div>
  )
}

// ─── Step 5: Zusammenfassung ─────────────────────────────────────────────────

function StepSummary({
  bundles,
  data,
  onBack,
  onSubmit,
  loading,
  error,
}: {
  bundles: RateBundle[]
  data: FunnelData
  onBack: () => void
  onSubmit: () => void
  loading: boolean
  error: string | null
}) {
  const selectedBundle = bundles.find(b => b.id === data.bundleId)
  const selectedTerm = selectedBundle?.terms.find(t => t.id === data.termId)
  const addons = selectedTerm?.optionalModules || []

  const basePrice = selectedTerm?.price || 0
  const addonTotal = data.selectedAddons.reduce((acc, id) => {
    const a = addons.find(x => x.id === id)
    return acc + (a ? a.price : 0)
  }, 0)
  const weeklyTotal = basePrice + addonTotal
  const flatFeeTotal = (selectedTerm?.flatFees || []).reduce((acc, f) => acc + f.price, 0)

  const selectedAddonNames = data.selectedAddons
    .map(id => addons.find(a => a.id === id)?.name)
    .filter(Boolean)

  const maskedIban = data.iban.length >= 4
    ? '****' + data.iban.slice(-4)
    : '****'

  const rowStyle: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '14px 0', borderBottom: `1px solid ${C.border}`,
  }
  const rowLabel: React.CSSProperties = {
    color: C.muted, fontSize: 12, letterSpacing: '0.1em',
    textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif",
  }
  const rowValue: React.CSSProperties = {
    color: C.cream, fontSize: 14, fontWeight: 500, textAlign: 'right', maxWidth: '60%',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 className="font-display" style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: 700, color: C.cream,
          textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 8,
        }}>
          Zusammenfassung
        </h3>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
          Prüfe deine Angaben, bevor du den Vertrag abschließt.
        </p>
      </div>

      {/* Summary Box */}
      <div style={{
        padding: '24px',
        background: 'rgba(245,240,232,0.03)',
        border: `1px solid ${C.border}`,
        borderRadius: 4,
      }}>
        <div style={rowStyle}>
          <span style={rowLabel}>Tarif</span>
          <span style={rowValue}>{selectedBundle?.displayName ?? selectedBundle?.name} — {selectedTerm?.termValue} Monate</span>
        </div>

        <div style={rowStyle}>
          <span style={rowLabel}>Wöchentlicher Beitrag</span>
          <span style={rowValue}>{fmt(basePrice)}€</span>
        </div>

        {selectedAddonNames.length > 0 && (
          <div style={rowStyle}>
            <span style={rowLabel}>Add-Ons</span>
            <span style={rowValue}>{selectedAddonNames.join(', ')} (+{fmt(addonTotal)}€/Wo)</span>
          </div>
        )}

        {flatFeeTotal > 0 && (
          <div style={rowStyle}>
            <span style={rowLabel}>Einmalige Gebühren</span>
            <span style={rowValue}>
              {(selectedTerm?.flatFees || []).map(f => `${f.name}: ${fmt(f.price)}€`).join(', ')}
            </span>
          </div>
        )}

        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <span style={rowLabel}>Wöchentlich gesamt</span>
          <span className="font-display" style={{ fontSize: 22, fontWeight: 700, color: C.gold }}>
            {fmt(weeklyTotal)}€/Woche
          </span>
        </div>
      </div>

      {/* Personal Data Summary */}
      <div style={{
        padding: '24px',
        background: 'rgba(245,240,232,0.03)',
        border: `1px solid ${C.border}`,
        borderRadius: 4,
      }}>
        <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: 14, fontWeight: 600 }}>
          Deine Daten
        </div>

        <div style={rowStyle}>
          <span style={rowLabel}>Name</span>
          <span style={rowValue}>{data.vorname} {data.nachname}</span>
        </div>
        <div style={rowStyle}>
          <span style={rowLabel}>E-Mail</span>
          <span style={rowValue}>{data.email}</span>
        </div>
        <div style={rowStyle}>
          <span style={rowLabel}>Telefon</span>
          <span style={rowValue}>{data.telefon}</span>
        </div>
        <div style={rowStyle}>
          <span style={rowLabel}>Adresse</span>
          <span style={rowValue}>{data.strasse}, {data.plz} {data.stadt}</span>
        </div>
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <span style={rowLabel}>Zahlung</span>
          <span style={rowValue}>SEPA-Lastschrift · IBAN {maskedIban}</span>
        </div>
      </div>

      {/* 14 Tage Widerruf Info */}
      <div style={{
        padding: '16px 20px',
        background: 'rgba(34,197,94,0.06)',
        border: '1px solid rgba(34,197,94,0.15)',
        borderRadius: 3,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.7)', lineHeight: 1.5 }}>
          <strong style={{ color: C.cream }}>14 Tage Widerrufsrecht</strong> — Du kannst innerhalb von 14 Tagen ohne Angabe von Gründen widerrufen und erhältst alle Kosten vollständig erstattet.
        </span>
      </div>

      {error && <ErrorBox message={error} />}

      <div style={{ display: 'flex', gap: 12 }}>
        <BackButton onClick={onBack} />
        <NextButton onClick={onSubmit} loading={loading} disabled={loading}>
          Jetzt Mitglied werden <span>→</span>
        </NextButton>
      </div>

      <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.35)', textAlign: 'center', lineHeight: 1.6 }}>
        Mit Klick auf "Jetzt Mitglied werden" schließt du einen kostenpflichtigen Vertrag ab.
        Die Zahlung erfolgt per SEPA-Lastschrift. Es gelten die AGB des Fitness Club Fellbach.
      </p>
    </div>
  )
}

// ─── Step 6: Erfolg ──────────────────────────────────────────────────────────

function StepSuccess({ data, bundles }: { data: FunnelData; bundles: RateBundle[] }) {
  const selectedBundle = bundles.find(b => b.id === data.bundleId)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(74,222,128,0.1)', border: '2px solid #4ade80',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
          <path d="M2 14L13 25L34 2" stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <div>
        <h2 className="font-display" style={{
          fontSize: 'clamp(1.5rem, 5vw, 2rem)',
          fontWeight: 700, color: C.cream,
          textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 12,
        }}>
          Willkommen im<br />Fitness Club Fellbach!
        </h2>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
          Dein Vertrag wurde erfolgreich abgeschlossen. Du erhältst in Kürze eine Bestätigung per E-Mail an <strong style={{ color: C.cream }}>{data.email}</strong>.
        </p>
      </div>

      <div style={{
        width: '100%', padding: '20px 24px',
        background: 'rgba(184,146,74,0.06)',
        border: '1px solid rgba(184,146,74,0.2)',
        borderRadius: 3,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: C.muted, fontSize: 13 }}>Dein Tarif</span>
          <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: C.gold }}>
            {selectedBundle?.displayName ?? selectedBundle?.name}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
          Komm einfach zu unseren Beratungszeiten vorbei und wir machen dich mit allem vertraut.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, display: 'block', marginBottom: 4 }}>Mo – Fr</span>
            <span style={{ fontSize: 14, color: C.cream, fontWeight: 600 }}>08–12 &amp; 16–21 Uhr</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, display: 'block', marginBottom: 4 }}>Sa + So</span>
            <span style={{ fontSize: 14, color: C.cream, fontWeight: 600 }}>09–14 Uhr</span>
          </div>
        </div>
      </div>

      <a
        href="/"
        style={{
          padding: '16px 40px',
          background: 'transparent',
          color: C.muted,
          border: `1px solid ${C.border}`,
          borderRadius: 3,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 13, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHover; e.currentTarget.style.color = C.cream }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted }}
      >
        Zur Startseite
      </a>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MitgliedFunnel() {
  const [data, setData] = useState<FunnelData>(DEFAULT_DATA)
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [bundles, setBundles] = useState<RateBundle[]>([])
  const [bundlesLoading, setBundlesLoading] = useState(true)
  const [bundlesError, setBundlesError] = useState<string | null>(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [leadError, setLeadError] = useState<string | null>(null)
  const [leadCreated, setLeadCreated] = useState(false)
  const ibanRef = useRef<string>('')
  const honeypotRef = useRef<HTMLInputElement>(null)

  const isSSR = typeof window === 'undefined'

  const update = useCallback((patch: Partial<FunnelData>) => {
    setData(prev => ({ ...prev, ...patch }))
  }, [])

  // Fetch rate bundles on mount
  useEffect(() => {
    if (isSSR) return
    let cancelled = false

    async function fetchBundles() {
      try {
        const res = await fetch(`${API_BASE}/rate-bundle?studioId=${STUDIO_ID}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json: RateBundle[] = await res.json()

        // Nur kuratierte Tarife zeigen — interne/alte Tarife ausblenden
        const curated = json
          .filter(b => MEMBERSHIP_CONFIG[b.id])
          .map(b => ({
            ...b,
            displayName: MEMBERSHIP_CONFIG[b.id].displayName,
            features: MEMBERSHIP_CONFIG[b.id].features,
          }))
          .sort((a, b) => MEMBERSHIP_CONFIG[a.id].order - MEMBERSHIP_CONFIG[b.id].order)

        if (!cancelled) {
          if (curated.length === 0) {
            // Aktion/Tarife geändert → lieber gar nichts anzeigen als falsche Preise
            setBundlesError('Unsere Online-Tarife werden gerade aktualisiert. Bitte ruf uns kurz an: 0711 588 654 — wir melden dich direkt an.')
          } else {
            setBundles(curated)
          }
          setBundlesLoading(false)
        }
      } catch {
        if (!cancelled) {
          setBundlesError('Tarife konnten nicht geladen werden. Bitte versuche es später erneut oder ruf uns an: 0711 588 654')
          setBundlesLoading(false)
        }
      }
    }

    fetchBundles()
    return () => { cancelled = true }
  }, [isSSR])

  // Scroll to top on step change
  useEffect(() => {
    if (!isSSR) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step, isSSR])

  function goNext() {
    setDirection(1)
    setSubmitError(null)
    setLeadError(null)
    setStep(s => s + 1)
  }

  function goBack() {
    setDirection(-1)
    setSubmitError(null)
    setLeadError(null)
    setStep(s => s - 1)
  }

  // After personal data: create lead
  async function handleAfterDaten() {
    if (leadCreated) {
      goNext()
      return
    }

    setLeadError(null)
    try {
      await fetch(`${API_BASE}/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studioId: parseInt(STUDIO_ID),
          firstname: data.vorname,
          lastname: data.nachname,
          email: data.email || undefined,
          gender: data.gender || undefined,
          birthday: data.geburtsdatum || undefined,
          phone: data.telefon || undefined,
          street: data.strasse || undefined,
          city: data.stadt || undefined,
          zipCode: data.plz || undefined,
        }),
      })

      // Lead creation is non-blocking — continue regardless of result
      setLeadCreated(true)
      goNext()
    } catch {
      // Lead creation is non-blocking — proceed anyway
      setLeadCreated(true)
      goNext()
    }
  }

  // Final submit: reCAPTCHA + contract
  async function handleSubmit() {
    // Honeypot — if a bot filled the hidden field, fake success silently
    if (honeypotRef.current?.value) {
      setDirection(1)
      setStep(6)
      return
    }

    setSubmitLoading(true)
    setSubmitError(null)

    // Store IBAN in ref temporarily for submission, then clear from state
    ibanRef.current = data.iban

    try {
      const token = await getRecaptchaToken('contract_submit')

      const contractBody = {
        studioId: parseInt(STUDIO_ID),
        firstname: data.vorname,
        lastname: data.nachname,
        email: data.email,
        phone: data.telefon,
        dateOfBirth: data.geburtsdatum,
        gender: data.gender,
        street: data.strasse,
        city: data.stadt,
        zipCode: data.plz,
        rateBundleTermId: data.termId,
        optionalModuleIds: data.selectedAddons,
        iban: ibanRef.current,
        accountHolder: data.kontoinhaber,
        sepaAccepted: data.sepaMandat,
        agbAccepted: data.agb,
      }

      const res = await fetch(
        `${API_BASE}/contracts?recaptchaToken=${encodeURIComponent(token)}&studioId=${STUDIO_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contractBody),
        }
      )

      if (!res.ok) {
        throw new Error('Vertrag konnte nicht erstellt werden.')
      }

      // Clear sensitive data
      ibanRef.current = ''
      update({ iban: '', kontoinhaber: '' })

      setDirection(1)
      setStep(6) // Success
    } catch (err: any) {
      setSubmitError(
        err?.message || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut oder ruf uns an: 0711 588 654'
      )
    } finally {
      setSubmitLoading(false)
    }
  }

  const variants = {
    enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
  }

  // Loading state
  if (bundlesLoading) {
    return (
      <div style={{
        minHeight: '100vh', background: C.bg, color: C.cream,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
      }}>
        <Spinner />
        <span className="font-condensed" style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted }}>
          Tarife werden geladen…
        </span>
        <style>{`@keyframes mitglied-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (bundlesError) {
    return (
      <div style={{
        minHeight: '100vh', background: C.bg, color: C.cream,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px', textAlign: 'center',
      }}>
        <ErrorBox message={bundlesError} />
        <a href="/" style={{ marginTop: 24, color: C.muted, fontSize: 13 }}>← Zur Startseite</a>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Progress Bar */}
      <ProgressBar step={step <= 5 ? step : 5} total={5} />

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px clamp(16px, 4vw, 48px)',
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
      }}>
        <a href="/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          color: C.muted, textDecoration: 'none',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Zurück
        </a>

        <div className="hidden sm:block">
          {step <= 5 && <StepIndicator currentStep={step} />}
        </div>

        <div style={{ width: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <Logo size="sm" variant="light" />
          </a>
        </div>
      </div>

      {/* Mobile Step Indicator */}
      {step <= 5 && (
        <div className="block sm:hidden" style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
          <StepIndicator currentStep={step} />
        </div>
      )}

      {/* Content */}
      <div style={{
        flex: 1, display: 'flex', justifyContent: 'center',
        padding: 'clamp(24px, 4vh, 56px) clamp(16px, 4vw, 48px)',
      }}>
        <div style={{ width: '100%', maxWidth: 680 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 1 && (
                <StepTarif bundles={bundles} data={data} onChange={update} onNext={goNext} />
              )}
              {step === 2 && (
                <StepAddons bundles={bundles} data={data} onChange={update} onNext={goNext} onBack={goBack} />
              )}
              {step === 3 && (
                <StepDaten data={data} onChange={update} onNext={handleAfterDaten} onBack={goBack} error={leadError} />
              )}
              {step === 4 && (
                <StepZahlung data={data} onChange={update} onNext={goNext} onBack={goBack} error={null} />
              )}
              {step === 5 && (
                <StepSummary
                  bundles={bundles} data={data}
                  onBack={goBack} onSubmit={handleSubmit}
                  loading={submitLoading} error={submitError}
                />
              )}
              {step === 6 && (
                <StepSuccess data={data} bundles={bundles} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Honeypot — hidden field, bots fill it, humans don't */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
      />

      {/* reCAPTCHA badge notice */}
      <div style={{
        padding: '12px 16px', textAlign: 'center',
        borderTop: `1px solid ${C.border}`,
      }}>
        <p style={{ fontSize: 10, color: 'rgba(245,240,232,0.25)', lineHeight: 1.5 }}>
          Diese Seite wird durch reCAPTCHA geschützt. Es gelten die{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(245,240,232,0.35)' }}>Datenschutzbestimmungen</a>
          {' '}und{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(245,240,232,0.35)' }}>Nutzungsbedingungen</a>
          {' '}von Google.
        </p>
      </div>

      <style>{`@keyframes mitglied-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
