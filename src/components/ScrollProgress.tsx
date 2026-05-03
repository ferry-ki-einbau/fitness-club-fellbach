import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Scroll-Progress Bar oben — premium detail, Awwwards-Stil.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, #C44552 0%, #B8924A 50%, #0d9488 100%)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 100,
      }}
    />
  )
}
