import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const DURATION = 800 // ms total scramble time

type Props = {
  text: string
  className?: string
  style?: CSSProperties
  delay?: number
}

export default function ScrambleHeadline({ text, className, style, delay = 0 }: Props) {
  const [display, setDisplay] = useState(text)
  const elRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const scramble = () => {
      const now = performance.now()
      if (startTimeRef.current === null) startTimeRef.current = now

      const elapsed = now - startTimeRef.current
      const progress = Math.min(elapsed / DURATION, 1)

      const newDisplay = text
        .split('')
        .map((char, i) => {
          // Preserve spaces, punctuation, line breaks
          if (char === ' ' || char === '\n' || char === '\t') return char
          if (/[^a-zA-Z0-9]/.test(char)) return char

          // Lock char when enough time has passed for this position
          const charThreshold = i / text.length
          if (progress >= charThreshold) return char

          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplay(newDisplay)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(scramble)
      } else {
        setDisplay(text)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          observer.disconnect()

          const timer = setTimeout(() => {
            startTimeRef.current = null
            rafRef.current = requestAnimationFrame(scramble)
          }, delay)

          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay])

  return (
    <span ref={elRef} className={className} style={style}>
      {display}
    </span>
  )
}
