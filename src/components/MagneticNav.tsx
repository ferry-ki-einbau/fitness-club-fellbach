import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Magnetic Link — folgt der Maus subtil mit Spring physics.
 */
type Props = {
  href: string
  children: ReactNode
  strength?: number
}

export default function MagneticNavLink({ href, children, strength = 0.4 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    if (window.matchMedia('(hover: none)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="font-condensed nav-link"
      style={{
        x: springX, y: springY,
        fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase',
        color: '#C9BFB3', textDecoration: 'none',
        padding: '8px 16px', position: 'relative',
        display: 'inline-block',
      }}
    >
      {children}
    </motion.a>
  )
}
