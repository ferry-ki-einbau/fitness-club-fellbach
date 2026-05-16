import { useEffect, useRef, useState } from 'react'

interface Props {
  src: string
  srcSet?: string
  sizes?: string
  alt: string
  speed?: number // 0.05 = subtle, 0.15 = noticeable
  style?: React.CSSProperties
  imgStyle?: React.CSSProperties
  children?: React.ReactNode
  className?: string
}

/**
 * Dezenter Parallax — Bild bewegt sich langsamer als der Scroll.
 * speed=0.08 ist subtle, speed=0.15 ist deutlicher.
 * Bild wird 20% größer gerendert um den Versatz aufzufangen.
 */
export default function ParallaxImage({ src, srcSet, sizes, alt, speed = 0.08, style, imgStyle, children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Nur auf Desktop — Mobile spart Performance
    if (window.innerWidth < 768) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const viewH = window.innerHeight
          // Nur berechnen wenn sichtbar
          if (rect.bottom > 0 && rect.top < viewH) {
            const center = rect.top + rect.height / 2
            const fromCenter = center - viewH / 2
            setOffset(fromCenter * speed)
          }
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '120%', // extra height for parallax travel
          objectFit: 'cover',
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: 'transform',
          position: 'absolute',
          top: '-10%',
          left: 0,
          ...imgStyle,
        }}
      />
      {children}
    </div>
  )
}
