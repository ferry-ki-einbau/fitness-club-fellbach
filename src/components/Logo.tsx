/**
 * Custom Logo Lockup für Fitness Club Fellbach.
 * Monogram "FCF" in goldenem Medaillon + Wordmark.
 * Visible auf Light UND Dark — passt sich automatisch an.
 */
type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark'  // light = für dunklen Hintergrund (helles Logo)
  showWordmark?: boolean
}

const SIZES = {
  sm: { mark: 36, wordmark: 11, sub: 8, gap: 10 },
  md: { mark: 48, wordmark: 14, sub: 9, gap: 12 },
  lg: { mark: 64, wordmark: 17, sub: 10, gap: 14 },
  xl: { mark: 88, wordmark: 22, sub: 11, gap: 18 },
}

export default function Logo({ size = 'md', variant = 'light', showWordmark = true }: LogoProps) {
  const s = SIZES[size]
  const isLight = variant === 'light'
  const text = isLight ? '#F5F0E8' : '#1A0F0F'
  const sub = isLight ? '#B8924A' : '#B8924A'
  const gold = '#B8924A'
  const accent = '#C44552'
  const bg = isLight ? '#1A0F0F' : '#FFFFFF'

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap, color: text }}>
      {/* Custom medallion mark */}
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: isLight ? 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }}
      >
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4AF6E" />
            <stop offset="100%" stopColor="#9B7838" />
          </linearGradient>
        </defs>
        {/* Outer medallion ring */}
        <circle cx="32" cy="32" r="30" fill={bg} stroke="url(#goldGrad)" strokeWidth="2.5" />
        {/* Inner thin ring */}
        <circle cx="32" cy="32" r="26" fill="none" stroke={gold} strokeOpacity="0.35" strokeWidth="0.8" />
        {/* Greek meander accents — top and bottom */}
        <g stroke={gold} strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M22 13 L22 16 L25 16 L25 13" />
          <path d="M28 13 L28 16 L31 16 L31 13" />
          <path d="M34 13 L34 16 L37 16 L37 13" />
          <path d="M40 13 L40 16 L43 16 L43 13" />
        </g>
        <g stroke={gold} strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M22 51 L22 48 L25 48 L25 51" />
          <path d="M28 51 L28 48 L31 48 L31 51" />
          <path d="M34 51 L34 48 L37 48 L37 51" />
          <path d="M40 51 L40 48 L43 48 L43 51" />
        </g>
        {/* "FCF" monogram - Spartan-inspired bold */}
        <text
          x="32"
          y="40"
          textAnchor="middle"
          fontFamily="Oswald, Arial Black, sans-serif"
          fontSize="22"
          fontWeight="700"
          fill={text}
          letterSpacing="-0.5"
        >
          FCF
        </text>
        {/* Burgundy underline accent */}
        <line x1="22" y1="44" x2="42" y2="44" stroke={accent} strokeWidth="1.5" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span
            className="font-display"
            style={{
              fontSize: s.wordmark,
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: text,
            }}
          >
            Fitness Club
          </span>
          <span
            className="font-condensed"
            style={{
              fontSize: s.sub,
              fontWeight: 600,
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: sub,
              marginTop: 4,
              paddingLeft: 1,
            }}
          >
            Fellbach
          </span>
        </span>
      )}
    </span>
  )
}
