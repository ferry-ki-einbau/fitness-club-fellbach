import { useEffect, useRef } from 'react'

/**
 * Subtle floating particles in dark sections.
 * Performance-friendly Canvas — wenige Partikel, langsam, soft glow.
 */
type Props = {
  count?: number
  color?: string
  opacity?: number
}

export default function Particles({ count = 30, color = '#B8924A', opacity = 0.5 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const w = () => canvas.offsetWidth
    const h = () => canvas.offsetHeight

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number }
    const particles: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      r: 0.5 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.05 - Math.random() * 0.15,
      a: 0.2 + Math.random() * opacity,
    }))

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, w(), h())
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -5) { p.y = h() + 5; p.x = Math.random() * w() }
        if (p.x < -5) p.x = w() + 5
        if (p.x > w() + 5) p.x = -5
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.globalAlpha = p.a
        ctx.shadowBlur = 8
        ctx.shadowColor = color
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count, color, opacity])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  )
}
