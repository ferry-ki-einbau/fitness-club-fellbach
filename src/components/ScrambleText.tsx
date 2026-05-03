import { useEffect, useState, useRef } from 'react'
import type { CSSProperties } from 'react'

/**
 * Scramble Text Effekt — characters cycle through random glyphs before settling.
 * Wie bei Premium Awwwards Sites (Cuberto, Active Theory).
 */
type Props = {
  text: string
  delay?: number
  speed?: number  // ms per scramble step
  className?: string
  style?: CSSProperties
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

export default function ScrambleText({ text, delay = 0, speed = 40, className, style }: Props) {
  const [display, setDisplay] = useState(text.replace(/[^\s]/g, ' '))
  const ranRef = useRef(false)

  useEffect(() => {
    if (ranRef.current) return
    ranRef.current = true

    const startTimer = setTimeout(() => {
      let iteration = 0
      const totalChars = text.length
      const stepsPerChar = 4

      const interval = setInterval(() => {
        const revealed = Math.floor(iteration / stepsPerChar)
        if (revealed >= totalChars) {
          setDisplay(text)
          clearInterval(interval)
          return
        }

        const newDisplay = text
          .split('')
          .map((char, i) => {
            if (i < revealed) return char
            if (char === ' ' || char === '\n') return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')

        setDisplay(newDisplay)
        iteration++
      }, speed)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [text, delay, speed])

  return (
    <span className={className} style={style}>
      {display}
    </span>
  )
}
