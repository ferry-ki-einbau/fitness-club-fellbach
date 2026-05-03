import { useEffect, useState } from 'react'

/**
 * Soft Spotlight folgt der Maus — premium Hero-Effekt.
 * Disabled auf Touch/Mobile.
 */
type Props = {
  size?: number
  color?: string
  intensity?: number
}

export default function MouseSpotlight({ size = 600, color = '255, 235, 200', intensity = 0.12 }: Props) {
  const [pos, setPos] = useState({ x: -1000, y: -1000 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return
    setEnabled(true)
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (!enabled) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 6,
        background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, rgba(${color}, ${intensity}), transparent 70%)`,
        transition: 'background 0.05s ease-out',
        mixBlendMode: 'screen',
      }}
    />
  )
}
