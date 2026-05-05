import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ───────────────────────────────────────────────────────────────────

type Plan = 'BASIC' | 'ALL-IN'
type Term = '12' | '24'

interface Addon {
  id: string
  label: string
  price: number // €/Woche, 0 = gratis
}

interface FormData {
  plan: Plan
  term: Term
  addons: string[]
  vorname: string
  nachname: string
  email: string
  telefon: string
  geburtsdatum: string
  strasse: string
  hausnummer: string
  plz: string
  ort: string
  agb: boolean
  widerruf: boolean
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PRICES: Record<Term, Record<Plan, number>> = {
  '24': { 'BASIC': 13.99, 'ALL-IN': 16.99 },
  '12': { 'BASIC': 15.99, 'ALL-IN': 17.99 },
}

const ADDONS: Addon[] = [
  { id: 'egym',       label: 'EGYM Training',              price: 0 },
  { id: 'egym-plus',  label: 'EGYM Plus',                  price: 1.15 },
  { id: 'zirkel',     label: 'Betreutes Zirkeltraining',   price: 2.99 },
  { id: 'getraenke',  label: 'Mineralgetränke',             price: 3.46 },
  { id: 'kurse',      label: 'Gruppenfitness-Kurse',        price: 3.46 },
  { id: 'sauna',      label: 'Sauna & Wellness',            price: 4.60 },
]

const STEP_LABELS = ['01 PLAN', '02 ADD-ONS', '03 DATEN', '04 BESTÄTIGUNG']

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toFixed(2).replace('.', ',')
}

function totalPrice(data: FormData): number {
  const base = PRICES[data.term][data.plan]
  if (data.plan === 'ALL-IN') return base
  const addonSum = data.addons.reduce((acc, id) => {
    const a = ADDONS.find(x => x.id === id)
    return acc + (a ? a.price : 0)
  }, 0)
  return base + addonSum
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const C = {
  bg: '#0F1419',
  burgund: '#C44552',
  gold: '#B8924A',
  cream: '#F5F0E8',
  muted: '#9A8470',
  border: 'rgba(245,240,232,0.1)',
  borderHover: 'rgba(245,240,232,0.25)',
  inputBg: 'rgba(245,240,232,0.05)',
}

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

function StepIndicator({ currentStep, plan }: { currentStep: number; plan: Plan }) {
  const displaySteps = STEP_LABELS // always show all 4

  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
      {displaySteps.map((label, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isDone = stepNum < currentStep
        const isSkipped = plan === 'ALL-IN' && stepNum === 2

        return (
          <span
            key={label}
            className="font-condensed"
            style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: isActive ? C.cream : isDone ? C.gold : isSkipped ? 'rgba(245,240,232,0.15)' : 'rgba(245,240,232,0.3)',
              fontWeight: isActive ? 700 : 500,
              transition: 'color 0.3s',
            }}
          >
            {label}
            {i < displaySteps.length - 1 && (
              <span style={{ marginLeft: 6, opacity: 0.3 }}>·</span>
            )}
          </span>
        )
      })}
    </div>
  )
}

// ─── Step 1: Plan wählen ─────────────────────────────────────────────────────

function Step1({
  data,
  onChange,
  onNext,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
  onNext: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Term Toggle */}
      <div>
        <p style={{ textAlign: 'center', color: C.muted, fontSize: 12, marginBottom: 16, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>
          Laufzeit wählen
        </p>
        <div style={{
          display: 'flex',
          background: 'rgba(245,240,232,0.05)',
          border: `1px solid ${C.border}`,
          borderRadius: 4,
          padding: 3,
          width: 'fit-content',
          margin: '0 auto',
        }}>
          {(['24', '12'] as Term[]).map(t => (
            <button
              key={t}
              onClick={() => onChange({ term: t })}
              style={{
                padding: '10px 28px',
                borderRadius: 2,
                border: 'none',
                cursor: 'pointer',
                background: data.term === t ? C.burgund : 'transparent',
                color: data.term === t ? '#fff' : C.muted,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
            >
              {t} Monate
            </button>
          ))}
        </div>
      </div>

      {/* Plan Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {(['BASIC', 'ALL-IN'] as Plan[]).map(p => {
          const price = PRICES[data.term][p]
          const isSelected = data.plan === p
          const isAllin = p === 'ALL-IN'

          return (
            <motion.button
              key={p}
              onClick={() => onChange({ plan: p })}
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
              }}
            >
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: -1,
                left: '50%',
                transform: 'translateX(-50%)',
                background: C.gold,
                color: '#0F1419',
                fontSize: 9,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                padding: '4px 14px',
                borderRadius: '0 0 4px 4px',
                whiteSpace: 'nowrap',
              }}>
                2 Monate gratis sichern
              </div>

              {/* Checkmark */}
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: C.burgund,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}

              <div style={{ marginTop: 20 }}>
                <div style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: isAllin ? C.gold : C.muted,
                  marginBottom: 8,
                }}>
                  {p}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 36,
                    fontWeight: 700,
                    color: C.cream,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    {fmt(price)}€
                  </span>
                  <span style={{ color: C.muted, fontSize: 12 }}>/Woche</span>
                </div>

                <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.6, marginTop: 16, textAlign: 'left' }}>
                  {isAllin
                    ? 'Alles inklusive: Sauna, Kurse, EGYM, Getränke, Zirkel'
                    : 'Volle Trainingsfläche + Duschen inklusive + Add-Ons zubuchbar'}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>

      <button
        onClick={onNext}
        style={{
          padding: '16px 32px',
          background: C.burgund,
          color: '#fff',
          border: 'none',
          borderRadius: 3,
          fontFamily: "'Oswald', sans-serif",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Weiter <span>→</span>
      </button>
    </div>
  )
}

// ─── Step 2: Add-Ons ─────────────────────────────────────────────────────────

function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}) {
  function toggleAddon(id: string) {
    const current = data.addons
    const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id]
    onChange({ addons: next })
  }

  const addonTotal = data.addons.reduce((acc, id) => {
    const a = ADDONS.find(x => x.id === id)
    return acc + (a ? a.price : 0)
  }, 0)

  const base = PRICES[data.term]['BASIC']
  const total = base + addonTotal

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: 700,
          color: C.cream,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          marginBottom: 8,
        }}>
          Add-Ons zubuchbar
        </h3>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
          Ergänze dein BASIC-Paket nach Bedarf.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ADDONS.map(addon => {
          const isActive = data.addons.includes(addon.id)
          return (
            <motion.button
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              whileTap={{ scale: 0.99 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                border: `1px solid ${isActive ? C.burgund : C.border}`,
                borderRadius: 3,
                background: isActive ? 'rgba(196,69,82,0.06)' : 'rgba(245,240,232,0.02)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                outline: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* Toggle Dot */}
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: `2px solid ${isActive ? C.burgund : 'rgba(245,240,232,0.2)'}`,
                  background: isActive ? C.burgund : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}>
                  {isActive && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3L3.5 5.5L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span style={{ color: isActive ? C.cream : 'rgba(245,240,232,0.7)', fontSize: 14, fontWeight: 500 }}>
                  {addon.label}
                </span>
              </div>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: addon.price === 0 ? '#4ade80' : (isActive ? C.gold : C.muted),
                letterSpacing: '0.05em',
              }}>
                {addon.price === 0 ? 'GRATIS' : `+${fmt(addon.price)}€/Woche`}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Running Total */}
      <div style={{
        padding: '20px 24px',
        background: 'rgba(184,146,74,0.06)',
        border: `1px solid rgba(184,146,74,0.2)`,
        borderRadius: 3,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ color: C.muted, fontSize: 13 }}>
            {fmt(base)}€ Basis
            {addonTotal > 0 && ` + ${fmt(addonTotal)}€ Add-Ons`}
          </span>
          <span style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: C.cream,
            letterSpacing: '-0.01em',
          }}>
            Gesamt: {fmt(total)}€/Woche
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={onBack}
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
        <button
          onClick={onNext}
          style={{
            flex: 1,
            padding: '16px 24px',
            background: C.burgund,
            color: '#fff',
            border: 'none',
            borderRadius: 3,
            fontFamily: "'Oswald', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          Weiter <span>→</span>
        </button>
      </div>
    </div>
  )
}

// ─── Step 3: Persönliche Daten ───────────────────────────────────────────────

function Step3({
  data,
  onChange,
  onNext,
  onBack,
  loading,
  error,
}: {
  data: FormData
  onChange: (patch: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
  loading: boolean
  error: string | null
}) {
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

  const gridRow = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }

  const total = totalPrice(data)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: 700,
          color: C.cream,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          marginBottom: 8,
        }}>
          Deine Daten
        </h3>
        <p style={{ color: C.muted, fontSize: 13 }}>
          Alle Felder erforderlich, außer wenn anders markiert.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Name */}
        <div style={gridRow}>
          <div>
            <label style={labelStyle}>Vorname</label>
            <input
              style={inputStyle}
              value={data.vorname}
              onChange={e => onChange({ vorname: e.target.value })}
              placeholder="Max"
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = C.border)}
            />
          </div>
          <div>
            <label style={labelStyle}>Nachname</label>
            <input
              style={inputStyle}
              value={data.nachname}
              onChange={e => onChange({ nachname: e.target.value })}
              placeholder="Mustermann"
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = C.border)}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>E-Mail-Adresse</label>
          <input
            style={inputStyle}
            type="email"
            value={data.email}
            onChange={e => onChange({ email: e.target.value })}
            placeholder="max@example.de"
            onFocus={e => (e.target.style.borderColor = C.burgund)}
            onBlur={e => (e.target.style.borderColor = C.border)}
          />
        </div>

        {/* Tel + DOB */}
        <div style={gridRow}>
          <div>
            <label style={labelStyle}>Telefonnummer</label>
            <input
              style={inputStyle}
              type="tel"
              value={data.telefon}
              onChange={e => onChange({ telefon: e.target.value })}
              placeholder="+49 711 …"
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = C.border)}
            />
          </div>
          <div>
            <label style={labelStyle}>Geburtsdatum</label>
            <input
              style={{ ...inputStyle, colorScheme: 'dark' }}
              type="date"
              value={data.geburtsdatum}
              onChange={e => onChange({ geburtsdatum: e.target.value })}
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = C.border)}
            />
          </div>
        </div>

        {/* Adresse */}
        <div style={gridRow}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Straße + Hausnummer</label>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
              <input
                style={inputStyle}
                value={data.strasse}
                onChange={e => onChange({ strasse: e.target.value })}
                placeholder="Musterstraße"
                onFocus={e => (e.target.style.borderColor = C.burgund)}
                onBlur={e => (e.target.style.borderColor = C.border)}
              />
              <input
                style={inputStyle}
                value={data.hausnummer}
                onChange={e => onChange({ hausnummer: e.target.value })}
                placeholder="12a"
                onFocus={e => (e.target.style.borderColor = C.burgund)}
                onBlur={e => (e.target.style.borderColor = C.border)}
              />
            </div>
          </div>
        </div>

        {/* PLZ + Ort */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
          <div>
            <label style={labelStyle}>PLZ</label>
            <input
              style={inputStyle}
              value={data.plz}
              onChange={e => onChange({ plz: e.target.value })}
              placeholder="70736"
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = C.border)}
            />
          </div>
          <div>
            <label style={labelStyle}>Ort</label>
            <input
              style={inputStyle}
              value={data.ort}
              onChange={e => onChange({ ort: e.target.value })}
              placeholder="Fellbach"
              onFocus={e => (e.target.style.borderColor = C.burgund)}
              onBlur={e => (e.target.style.borderColor = C.border)}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
          <label style={{ display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
            <div
              onClick={() => onChange({ agb: !data.agb })}
              style={{
                width: 20,
                height: 20,
                border: `2px solid ${data.agb ? C.burgund : 'rgba(245,240,232,0.3)'}`,
                borderRadius: 3,
                background: data.agb ? C.burgund : 'transparent',
                flexShrink: 0,
                marginTop: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {data.agb && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.7)', lineHeight: 1.5 }}>
              Ich habe die <span style={{ color: C.cream, textDecoration: 'underline', cursor: 'pointer' }}>AGB</span> und <span style={{ color: C.cream, textDecoration: 'underline', cursor: 'pointer' }}>Datenschutzerklärung</span> gelesen und akzeptiere diese. *
            </span>
          </label>

          <label style={{ display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
            <div
              onClick={() => onChange({ widerruf: !data.widerruf })}
              style={{
                width: 20,
                height: 20,
                border: `2px solid ${data.widerruf ? C.gold : 'rgba(245,240,232,0.3)'}`,
                borderRadius: 3,
                background: data.widerruf ? C.gold : 'transparent',
                flexShrink: 0,
                marginTop: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {data.widerruf && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#0F1419" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.7)', lineHeight: 1.5 }}>
              Ich möchte das <strong style={{ color: C.cream }}>14-Tage-Widerrufsrecht</strong> nutzen (kostenloses Probetraining) <span style={{ color: C.muted }}>(optional)</span>
            </span>
          </label>
        </div>

        {/* Honeypot */}
        <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, overflow: 'hidden' }} aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {error && (
        <div style={{
          padding: '14px 18px',
          background: 'rgba(196,69,82,0.1)',
          border: `1px solid rgba(196,69,82,0.3)`,
          borderRadius: 3,
          color: '#f87171',
          fontSize: 13,
          lineHeight: 1.5,
        }}>
          {error}
        </div>
      )}

      {/* Price Summary */}
      <div style={{
        padding: '16px 20px',
        background: 'rgba(184,146,74,0.05)',
        border: `1px solid rgba(184,146,74,0.15)`,
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <span style={{ color: C.muted, fontSize: 12 }}>
          {data.plan} · {data.term} Monate
          {data.plan === 'BASIC' && data.addons.length > 0 && ` + ${data.addons.length} Add-On${data.addons.length > 1 ? 's' : ''}`}
        </span>
        <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700, color: C.cream }}>
          {fmt(total)}€/Woche
        </span>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={onBack}
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
        <button
          onClick={onNext}
          disabled={loading}
          style={{
            flex: 1,
            padding: '16px 24px',
            background: data.agb ? C.burgund : 'rgba(196,69,82,0.4)',
            color: '#fff',
            border: 'none',
            borderRadius: 3,
            fontFamily: "'Oswald', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: data.agb && !loading ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? (
            <>
              <span style={{
                width: 16,
                height: 16,
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 0.7s linear infinite',
              }} />
              Wird gesendet…
            </>
          ) : (
            <>Jetzt Mitglied werden →</>
          )}
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ─── Step 4: Bestätigung ─────────────────────────────────────────────────────

function Step4({ data, onClose }: { data: FormData; onClose: () => void }) {
  const total = totalPrice(data)

  const addonLabels = data.addons
    .map(id => ADDONS.find(a => a.id === id)?.label)
    .filter(Boolean)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', textAlign: 'center' }}>
      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(74,222,128,0.1)',
          border: '2px solid #4ade80',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
          <path d="M2 14L13 25L34 2" stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <div>
        <h2 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 'clamp(1.5rem, 5vw, 2rem)',
          fontWeight: 700,
          color: C.cream,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          marginBottom: 12,
        }}>
          Willkommen im<br />Fitness Club Fellbach!
        </h2>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
          Wir haben deine Anmeldung erhalten. Marcel meldet sich innerhalb von <strong style={{ color: C.cream }}>24 Stunden</strong> bei dir.
        </p>
      </div>

      {/* Summary Box */}
      <div style={{
        width: '100%',
        padding: '24px',
        background: 'rgba(245,240,232,0.03)',
        border: `1px solid ${C.border}`,
        borderRadius: 4,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, paddingBottom: 14 }}>
          <span style={{ color: C.muted, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>Gewählter Plan</span>
          <span style={{ color: C.cream, fontSize: 14, fontWeight: 600 }}>{data.plan} · {data.term} Monate</span>
        </div>

        {data.plan === 'BASIC' && addonLabels.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, paddingBottom: 14 }}>
            <span style={{ color: C.muted, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>Add-Ons</span>
            <span style={{ color: C.cream, fontSize: 14, textAlign: 'right', maxWidth: 200 }}>{addonLabels.join(', ')}</span>
          </div>
        )}

        {data.widerruf && (
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, paddingBottom: 14 }}>
            <span style={{ color: C.muted, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>Widerrufsrecht</span>
            <span style={{ color: '#4ade80', fontSize: 13, fontWeight: 600 }}>14 Tage kostenlos testen</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: C.muted, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Barlow Condensed', sans-serif" }}>Gesamtpreis</span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, color: C.gold }}>{fmt(total)}€/Woche</span>
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          padding: '16px 40px',
          background: 'transparent',
          color: C.muted,
          border: `1px solid ${C.border}`,
          borderRadius: 3,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = C.borderHover
          e.currentTarget.style.color = C.cream
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = C.border
          e.currentTarget.style.color = C.muted
        }}
      >
        Zur Startseite
      </button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface MitgliedFormProps {
  onClose: () => void
}

const DEFAULT_DATA: FormData = {
  plan: 'ALL-IN',
  term: '24',
  addons: [],
  vorname: '',
  nachname: '',
  email: '',
  telefon: '',
  geburtsdatum: '',
  strasse: '',
  hausnummer: '',
  plz: '',
  ort: '',
  agb: false,
  widerruf: false,
}

export default function MitgliedForm({ onClose }: MitgliedFormProps) {
  const [data, setData] = useState<FormData>(DEFAULT_DATA)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [direction, setDirection] = useState(1) // 1=forward, -1=back

  const update = useCallback((patch: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...patch }))
  }, [])

  function goNext() {
    setDirection(1)
    // Skip step 2 if ALL-IN
    if (step === 1 && data.plan === 'ALL-IN') {
      setStep(3)
    } else {
      setStep(s => s + 1)
    }
  }

  function goBack() {
    setDirection(-1)
    if (step === 3 && data.plan === 'ALL-IN') {
      setStep(1)
    } else {
      setStep(s => s - 1)
    }
  }

  async function handleSubmit() {
    if (!data.agb) {
      setError('Bitte akzeptiere die AGB und Datenschutzerklärung.')
      return
    }
    if (!data.vorname || !data.nachname || !data.email || !data.telefon || !data.geburtsdatum || !data.strasse || !data.hausnummer || !data.plz || !data.ort) {
      setError('Bitte fülle alle Pflichtfelder aus.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/mitglied', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          gesamtpreis: fmt(totalPrice(data)),
          addonLabels: data.addons.map(id => {
            const a = ADDONS.find(x => x.id === id)
            return a ? `${a.label} (+${fmt(a.price)}€/Woche)` : id
          }),
        }),
      })

      if (!res.ok) throw new Error('Serverfehler')

      setDirection(1)
      setStep(4)
    } catch {
      setError('Es ist ein Fehler aufgetreten. Bitte versuche es nochmal oder ruf uns an: 07115 8 8654')
    } finally {
      setLoading(false)
    }
  }

  // Progress: map logical step to visual progress
  function visualProgress() {
    if (step === 1) return 1
    if (step === 2) return 2
    if (step === 3) return data.plan === 'ALL-IN' ? 2 : 3
    if (step === 4) return 4
    return step
  }

  const variants = {
    enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
  }

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: '#0F1419',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Progress Bar */}
        <ProgressBar step={visualProgress()} total={4} />

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px clamp(16px, 4vw, 48px)',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              color: C.muted,
              cursor: 'pointer',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              padding: '6px 0',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
            Schließen
          </button>

          <div className="hidden sm:block">
            <StepIndicator currentStep={step} plan={data.plan} />
          </div>

          {/* Logo placeholder */}
          <div style={{ width: 100, display: 'flex', justifyContent: 'flex-end' }}>
            <span className="font-display" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: C.burgund, textTransform: 'uppercase' }}>
              FCF
            </span>
          </div>
        </div>

        {/* Mobile Step Indicator */}
        <div className="block sm:hidden" style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}` }}>
          <StepIndicator currentStep={step} plan={data.plan} />
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
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
                {step === 1 && <Step1 data={data} onChange={update} onNext={goNext} />}
                {step === 2 && <Step2 data={data} onChange={update} onNext={goNext} onBack={goBack} />}
                {step === 3 && (
                  <Step3
                    data={data}
                    onChange={update}
                    onNext={handleSubmit}
                    onBack={goBack}
                    loading={loading}
                    error={error}
                  />
                )}
                {step === 4 && <Step4 data={data} onClose={onClose} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  )
}

// ─── MitgliedButton ───────────────────────────────────────────────────────────

interface MitgliedButtonProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  variant?: 'lime' | 'outline' | 'burgund'
}

export function MitgliedButton({ children, style, className }: MitgliedButtonProps) {
  const [open, setOpen] = useState(false)

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s',
    padding: '12px 24px',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    ...style,
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
        style={baseStyle}
      >
        {children}
      </button>

      <AnimatePresence>
        {open && <MitgliedForm onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
