import { useEffect, useState } from 'react'

function statusText(d: Date) {
  const h = d.getHours()
  const m = d.getMinutes()
  if (h >= 5 && h < 24) {
    // Schließt um 24:00 → Stunden bis Schließung
    const minsToClose = (24 - h) * 60 - m
    const ch = Math.floor(minsToClose / 60)
    const cm = minsToClose % 60
    return { open: true, label: 'Geöffnet', sub: `Schließt in ${ch}h ${String(cm).padStart(2, '0')}min` }
  }
  // 00:00 - 05:00 → Stunden bis Öffnung
  const minsToOpen = (5 - h - 1) * 60 + (60 - m)
  const oh = Math.floor(minsToOpen / 60)
  const om = minsToOpen % 60
  return { open: false, label: 'Geschlossen', sub: `Öffnet in ${oh}h ${String(om).padStart(2, '0')}min` }
}

export default function LiveTicker() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])

  const s = statusText(now)

  return (
    <div
      className="font-condensed"
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 18px',
        background: 'rgba(8,4,4,0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(184, 146, 74, 0.25)',
        fontSize: 10,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#9A8470',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: s.open ? '#22C55E' : '#DC2626',
          animation: s.open ? 'pulse 1.6s ease-in-out infinite' : 'none',
          boxShadow: s.open ? '0 0 12px rgba(34, 197, 94, 0.7)' : '0 0 8px rgba(220, 38, 38, 0.5)',
        }}
      />
      <span style={{ color: s.open ? '#22C55E' : '#DC2626', fontWeight: 600 }}>{s.label}</span>
      <span style={{ color: '#3A2020' }}>·</span>
      <span style={{ color: '#B8924A' }}>{s.sub}</span>
    </div>
  )
}
