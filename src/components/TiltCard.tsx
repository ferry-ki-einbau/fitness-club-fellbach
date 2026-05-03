import { useRef } from 'react'
import type { MouseEvent, ReactNode, CSSProperties } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * 3D Tilt Card — Mausbewegung gibt subtle 3D-Tilt.
 * Premium Hover-Detail. Disabled auf Mobile (Touch).
 */
type Props = {
  children: ReactNode
  intensity?: number
  className?: string
  style?: CSSProperties
}

export default function TiltCard({ children, intensity = 8, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-intensity, intensity])

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    if (window.innerWidth < 768) return
    const rect = ref.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        perspective: 800,
      }}
    >
      {children}
    </motion.div>
  )
}
