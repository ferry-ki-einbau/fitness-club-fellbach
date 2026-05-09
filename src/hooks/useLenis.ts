import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function useLenis() {
  useEffect(() => {
    // Framer Motion nutzt window.scrollY — Lenis muss darauf posten
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Kein wrapper/content — nativer window scroll
    })

    // RAF loop mit cancelAnimationFrame cleanup
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Framer Motion whileInView braucht scroll events — Lenis dispatcht sie
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll', { bubbles: false }))
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}
