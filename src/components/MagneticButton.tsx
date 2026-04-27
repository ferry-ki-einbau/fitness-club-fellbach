import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Props = {
  href?: string
  children: ReactNode
  variant?: 'lime' | 'outline'
  className?: string
  target?: string
  rel?: string
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({
  href, children, variant = 'lime', className = '', target, rel, onClick, strength = 0.35,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    if (window.innerWidth < 768) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`${variant === 'lime' ? 'btn-lime' : 'btn-outline'} ${className}`}
    >
      {children}
    </motion.a>
  )
}
