/**
 * Spartan/Greek wrestler mark — local copy for performance.
 * Sichtbar auf dunklem UND hellem Hintergrund.
 */
export default function SpartanMark({ size = 48, variant = 'light' }: { size?: number; variant?: 'light' | 'dark' }) {
  const isLight = variant === 'light'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        background: isLight ? 'rgba(184, 146, 74, 0.12)' : 'rgba(196, 69, 82, 0.12)',
        border: `1.5px solid ${isLight ? '#B8924A' : '#C44552'}`,
        borderRadius: '50%',
        flexShrink: 0,
        boxShadow: isLight ? '0 0 24px rgba(184, 146, 74, 0.25)' : '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      <img
        src="/images/logo-headermark.png"
        alt="Fitness Club Fellbach"
        width={size * 0.7}
        height={size * 0.7}
        style={{
          width: size * 0.7,
          height: size * 0.7,
          objectFit: 'contain',
          filter: isLight
            ? 'brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.4))'
            : 'brightness(0) saturate(100%) invert(13%) sepia(60%) saturate(2000%) hue-rotate(335deg) brightness(85%) contrast(95%)',
        }}
        loading="eager"
      />
    </span>
  )
}
