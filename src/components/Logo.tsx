/**
 * Original-Logo vom Fitness Club Fellbach (echtes Wordmark-SVG).
 */

type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark'  // light = helles Logo für dunklen Hintergrund
}

const SIZES = {
  sm: 130,
  md: 170,
  lg: 210,
  xl: 280,
}

export default function Logo({ size = 'md', variant = 'light' }: LogoProps) {
  const w = SIZES[size]
  const isLight = variant === 'light'
  const svgFilter = isLight
    ? 'none'  // SVG ist schon weiß
    : 'brightness(0) saturate(100%) invert(8%) sepia(13%) saturate(900%) hue-rotate(330deg) brightness(96%) contrast(98%)'  // → dark navy

  return (
    <img
      src="/images/logo-original.svg"
      alt="Fitness Club Fellbach"
      width={w}
      height={w * 0.18}
      style={{
        width: w,
        height: 'auto',
        filter: svgFilter,
        flexShrink: 0,
        display: 'block',
      }}
    />
  )
}
