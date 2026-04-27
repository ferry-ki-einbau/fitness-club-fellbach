import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [inHero, setInHero] = useState(false)
  const [hovering, setHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useSpring(cursorX, { stiffness: 800, damping: 40 })
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 40 })

  useEffect(() => {
    if (window.innerWidth < 768) return
    setMounted(true)
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      const el = e.target as HTMLElement
      setInHero(!!el.closest('[data-hero]'))
    }
    const enter = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role=button]')) setHovering(true)
    }
    const leave = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (!el.closest('a, button, [role=button]')) setHovering(false)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', enter)
    window.addEventListener('mouseout', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', enter)
      window.removeEventListener('mouseout', leave)
    }
  }, [cursorX, cursorY])

  if (!mounted || !inHero) return null

  return (
    <motion.div
      style={{
        x: dotX, y: dotY,
        translateX: '-50%', translateY: '-50%',
        scale: hovering ? 2.2 : 1,
        background: 'var(--lime)',
        boxShadow: hovering ? '0 0 24px var(--lime)' : '0 0 8px rgba(200,255,0,0.6)',
      }}
      transition={{ scale: { duration: 0.18 } }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-2.5 w-2.5 rounded-full"
    />
  )
}
