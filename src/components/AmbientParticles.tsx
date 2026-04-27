import { useEffect, useRef } from 'react'

interface Particle { x: number; y: number; size: number; sx: number; sy: number; o: number; od: number }

export default function AmbientParticles({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let parts: Particle[] = []
    const COUNT = 28

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${r.width}px`
      canvas.style.height = `${r.height}px`
    }
    const init = () => {
      resize()
      const r = canvas.getBoundingClientRect()
      parts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * r.width,
        y: Math.random() * r.height,
        size: Math.random() * 2 + 0.4,
        sx: (Math.random() - 0.5) * 0.25,
        sy: -(Math.random() * 0.2 + 0.05),
        o: Math.random() * 0.35 + 0.05,
        od: (Math.random() - 0.5) * 0.005,
      }))
    }
    const draw = () => {
      const r = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, r.width, r.height)
      parts.forEach(p => {
        p.x += p.sx; p.y += p.sy
        p.o += p.od
        if (p.o > 0.4 || p.o < 0.05) p.od *= -1
        if (p.x < 0) p.x = r.width
        if (p.x > r.width) p.x = 0
        if (p.y < 0) { p.y = r.height; p.x = Math.random() * r.width }
        ctx.fillStyle = `rgba(200, 255, 0, ${p.o})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    init()
    draw()
    window.addEventListener('resize', init)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init) }
  }, [])
  return <canvas ref={ref} className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }} />
}
