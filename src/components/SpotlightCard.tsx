import { useRef, useState } from 'react'
import type { ReactNode, MouseEvent, CSSProperties } from 'react'

/**
 * Card mit Cursor-Spotlight Effekt — Apple/Linear style.
 * Soft glow folgt dem Cursor über der Card.
 */
type Props = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  glowColor?: string
}

export default function SpotlightCard({ children, className, style, glowColor = '184, 146, 74' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: -200, y: -200, opacity: 0 })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 })
  }
  const onLeave = () => setPos(p => ({ ...p, opacity: 0 }))

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(${glowColor}, 0.15), transparent 50%)`,
          opacity: pos.opacity,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  )
}
