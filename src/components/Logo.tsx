/**
 * Original-Logo Lockup vom Fitness Club Fellbach.
 * - Verwendet das ECHTE Wordmark-SVG vom CDN (lokal gespeichert)
 * - Goldener Medaillon-Mark als Brand-Element davor
 */

type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark'  // light = für dunklen Hintergrund (helles Logo)
}

const SIZES = {
  sm: { mark: 36, wordmarkW: 130, gap: 12 },
  md: { mark: 48, wordmarkW: 170, gap: 14 },
  lg: { mark: 60, wordmarkW: 210, gap: 16 },
  xl: { mark: 80, wordmarkW: 280, gap: 20 },
}

export default function Logo({ size = 'md', variant = 'light' }: LogoProps) {
  const s = SIZES[size]
  const isLight = variant === 'light'
  const fillColor = isLight ? '#F5F0E8' : '#0F1419'
  const accent = '#B8924A'
  // Filter to color the white SVG appropriately
  const svgFilter = isLight
    ? 'none'  // SVG ist schon weiß, passt für dark mode
    : 'brightness(0) saturate(100%) invert(8%) sepia(13%) saturate(900%) hue-rotate(330deg) brightness(96%) contrast(98%)'  // → #0F1419 dunkel

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap }}>
      {/* Goldener Medaillon-Mark */}
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: isLight ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="goldGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4AF6E" />
            <stop offset="100%" stopColor="#9B7838" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="29" fill={isLight ? '#0F1419' : '#FFFFFF'} stroke="url(#goldGrad2)" strokeWidth="2.2" />
        <circle cx="32" cy="32" r="24" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="0.8" />
        <g stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="square">
          <path d="M22 13 L22 16 L26 16 L26 13 M30 13 L30 16 L34 16 L34 13 M38 13 L38 16 L42 16 L42 13" />
          <path d="M22 51 L22 48 L26 48 L26 51 M30 51 L30 48 L34 48 L34 51 M38 51 L38 48 L42 48 L42 51" />
        </g>
        <text
          x="32"
          y="40"
          textAnchor="middle"
          fontFamily="Oswald, Impact, sans-serif"
          fontSize="20"
          fontWeight="700"
          fill={fillColor}
          letterSpacing="-0.5"
        >
          FCF
        </text>
        <line x1="22" y1="43" x2="42" y2="43" stroke="#C44552" strokeWidth="1.5" />
      </svg>

      {/* Echtes Original-Wordmark SVG */}
      <img
        src="/images/logo-original.svg"
        alt="Fitness Club Fellbach"
        width={s.wordmarkW}
        height={s.wordmarkW * 0.18}
        style={{
          width: s.wordmarkW,
          height: 'auto',
          filter: svgFilter,
          flexShrink: 0,
        }}
      />
    </span>
  )
}
