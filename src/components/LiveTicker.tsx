import { useEffect, useState } from 'react'

function isOpenNow(d: Date) {
  const h = d.getHours()
  return h >= 5 && h < 24
}

function fmt(d: Date) {
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

export default function LiveTicker() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const open = isOpenNow(now)

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
        padding: '10px 16px',
        background: 'rgba(8,8,8,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--gray-border)',
        fontSize: 11,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#888',
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: open ? 'var(--lime)' : '#666',
          animation: open ? 'pulse 1.6s ease-in-out infinite' : 'none',
        }}
      />
      <span style={{ color: open ? 'var(--lime)' : '#888' }}>{open ? 'Offen jetzt' : 'Geschlossen'}</span>
      <span style={{ color: '#444' }}>·</span>
      <span style={{ color: '#888' }}>{fmt(now)}</span>
    </div>
  )
}
