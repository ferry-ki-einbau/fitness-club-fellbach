/**
 * Spartan/Greek wrestler mark — sourced from the original site CDN.
 * Used in nav and footer for brand continuity.
 */
export default function SpartanMark({ size = 36, color = '#F5F0E8' }: { size?: number; color?: string }) {
  return (
    <img
      src="https://cdn.prod.website-files.com/64c8b8357249be90e806d8b9/64c8cadbb333794837fd7952_Headerlogo.png"
      alt="Fitness Club Fellbach"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        filter: color === '#F5F0E8' ? 'brightness(0) invert(1)' : 'none',
      }}
      loading="eager"
    />
  )
}
