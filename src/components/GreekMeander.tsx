import { motion } from 'framer-motion'

/**
 * Animated Greek meander ring — the signature element from the original
 * Fitness Club Fellbach branding. SVG-based so it scales crisply.
 * Slowly rotates behind the hero, providing brand continuity.
 */
export default function GreekMeander({
  size = 'min(110vmin, 1100px)',
  opacity = 0.12,
}: { size?: string; opacity?: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 240, ease: 'linear', repeat: Infinity }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
        opacity,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    >
      <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="meanderFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C44552" stopOpacity="0" />
            <stop offset="60%" stopColor="#C44552" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8E2A35" stopOpacity="0.9" />
          </radialGradient>
          <pattern id="meanderPattern" patternUnits="userSpaceOnUse" width="48" height="48" patternTransform="rotate(0)">
            <path
              d="M0 24 L0 12 L12 12 L12 24 L24 24 L24 0 L36 0 L36 36 L0 36 Z"
              fill="none"
              stroke="url(#meanderFade)"
              strokeWidth="2.5"
            />
          </pattern>
          <mask id="ringMask">
            <rect width="800" height="800" fill="black" />
            <circle cx="400" cy="400" r="340" fill="white" />
            <circle cx="400" cy="400" r="280" fill="black" />
          </mask>
        </defs>
        {/* The meander band */}
        <g mask="url(#ringMask)">
          <rect width="800" height="800" fill="url(#meanderPattern)" />
        </g>
        {/* outer + inner ring lines */}
        <circle cx="400" cy="400" r="340" fill="none" stroke="#C44552" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="400" cy="400" r="280" fill="none" stroke="#C44552" strokeOpacity="0.5" strokeWidth="1" />
      </svg>
    </motion.div>
  )
}
