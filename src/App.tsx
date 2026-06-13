import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import MagneticButton from './components/MagneticButton'
// MitgliedForm overlay replaced by /mitglied route (MitgliedFunnel)
import LiveTicker from './components/LiveTicker'
import Logo from './components/Logo'
import EgymSpotlight from './components/EgymSpotlight'
import WellnessSpotlight from './components/WellnessSpotlight'
import TrainingsflaecheSpotlight from './components/TrainingsflaecheSpotlight'
import KurseGrid from './components/KurseGrid'
import WelcomeIntro from './components/WelcomeIntro'
import ScrollProgress from './components/ScrollProgress'
import CookieBanner from './components/CookieBanner'
import PullQuote from './components/PullQuote'
import MouseSpotlight from './components/MouseSpotlight'
import MagneticNavLink from './components/MagneticNav'
import TiltCard from './components/TiltCard'
import AnimatedCounter from './components/AnimatedCounter'

// Lazy-loaded
// Direkt importiert (nicht lazy): werden per SSR gerendert → mit lazy+Suspense
// gäbe es einen Hydration-Mismatch (#419). Beide Komponenten sind winzig (~4KB).
import SpecialPrograms from './components/SpecialPrograms'
import PhysioBridge from './components/PhysioBridge'


const GALLERY_SECTIONS = [
  {
    title: 'Kraft & Ausdauer',
    items: [
      { src: '/images/real-freihantel-gross-md.webp', srcSm: '/images/real-freihantel-gross-sm.webp', label: 'Großer Hantelbereich', featured: true },
      { src: '/images/real-egym-md.webp', srcSm: '/images/real-egym-sm.webp', label: 'EGYM Zirkel' },
      { src: '/images/real-kraftbereich-md.webp', srcSm: '/images/real-kraftbereich-sm.webp', label: 'Kraftbereich' },
      { src: '/images/real-zirkel-md.webp', srcSm: '/images/real-zirkel-sm.webp', label: 'Zirkeltraining' },
      { src: '/images/real-hantelbereich-md.webp', srcSm: '/images/real-hantelbereich-sm.webp', label: 'Kleiner Hantelbereich' },
      { src: '/images/real-kraftbereich2-md.webp', srcSm: '/images/real-kraftbereich2-sm.webp', label: 'Gewichte & Racks' },
      { src: '/images/real-cardio-md.webp', srcSm: '/images/real-cardio-sm.webp', label: 'Cardio' },
      { src: '/images/real-crosstrainer-md.webp', srcSm: '/images/real-crosstrainer-sm.webp', label: 'Crosstrainer' },
      { src: '/images/real-spinning-md.webp', srcSm: '/images/real-spinning-sm.webp', label: 'Spinning' },
    ],
  },
  {
    title: 'Kurse & Kampfsport',
    items: [
      { src: '/images/real-boxring-1-md.webp', srcSm: '/images/real-boxring-1-sm.webp', label: 'Boxring', featured: true },
      { src: '/images/real-functional-md.webp', srcSm: '/images/real-functional-sm.webp', label: 'Functional Area' },
      { src: '/images/real-kursraum-1-md.webp', srcSm: '/images/real-kursraum-1-sm.webp', label: 'Kursraum' },
    ],
  },
  {
    title: 'Sauna & Erholung',
    items: [
      { src: '/images/real-sauna-md.webp', srcSm: '/images/real-sauna-sm.webp', label: 'Gemischte Sauna', featured: true },
      { src: '/images/real-damen-sauna-md.webp', srcSm: '/images/real-damen-sauna-sm.webp', label: 'Damen-Sauna' },
      { src: '/images/real-pool-area-md.webp', srcSm: '/images/real-pool-area-sm.webp', label: 'Entspannungsraum' },
      { src: '/images/real-wellness-area-md.webp', srcSm: '/images/real-wellness-area-sm.webp', label: 'Sauna-Lounge' },
    ],
  },
  {
    title: 'Lounge & Eingang',
    items: [
      { src: '/images/real-theke-md.webp', srcSm: '/images/real-theke-sm.webp', label: 'Theke & Bar', featured: true },
      { src: '/images/real-damen-umkleide-md.webp', srcSm: '/images/real-damen-umkleide-sm.webp', label: 'Empfangsbereich' },
    ],
  },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}


function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [staffStatus, setStaffStatus] = useState<'staffed'|'open'>('open')
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => {
    const check = () => {
      const now = new Date()
      const h = now.getHours(), d = now.getDay()
      const weekday = d >= 1 && d <= 5
      const staffed = weekday ? ((h >= 8 && h < 12) || (h >= 16 && h < 21)) : (h >= 9 && h < 14)
      setStaffStatus(staffed ? 'staffed' : 'open')
    }
    check()
    const t = setInterval(check, 60000)
    return () => clearInterval(t)
  }, [])
  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  const links = [
    { label: 'Training', href: '#training' },
    { label: 'Kurse', href: '#kurse' },
    { label: 'Preise', href: '#preise' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Kontakt', href: '#kontakt' },
  ]
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 120,
      transition: 'box-shadow 0.4s ease',
      background: open ? '#0F1419' : 'rgba(15,20,25,0.92)',
      backdropFilter: open ? 'none' : 'blur(24px) saturate(1.2)',
      boxShadow: scrolled && !open ? '0 1px 0 rgba(245,240,232,0.06), 0 4px 20px rgba(0,0,0,0.3)' : 'none',
      borderBottom: open ? 'none' : '1px solid rgba(245,240,232,0.06)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

        {/* Logo + Status */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size="lg" variant="light" />
          <span className="hidden sm:flex" style={{ alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: staffStatus === 'staffed' ? 'rgba(34,197,94,0.08)' : 'rgba(196,69,82,0.06)', border: `1px solid ${staffStatus === 'staffed' ? 'rgba(34,197,94,0.2)' : 'rgba(245,240,232,0.08)'}` }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: staffStatus === 'staffed' ? '#22c55e' : '#B5A99A', animation: staffStatus === 'staffed' ? 'pulse 2s ease-in-out infinite' : 'none' }} />
            <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: staffStatus === 'staffed' ? '#22c55e' : '#B5A99A', fontWeight: 700 }}>
              {staffStatus === 'staffed' ? 'Personal vor Ort' : 'Geöffnet'}
            </span>
          </span>
          {/* Mobile — nur Dot */}
          <span className="flex sm:hidden" style={{ alignItems: 'center', justifyContent: 'center', width: 16, height: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: staffStatus === 'staffed' ? '#22c55e' : '#B5A99A', boxShadow: staffStatus === 'staffed' ? '0 0 6px #22c55e' : 'none' }} />
          </span>
        </a>

        {/* Desktop Links — centered */}
        <div className="hidden md:flex" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', gap: 2, alignItems: 'center' }}>
          {links.map(l => (
            <MagneticNavLink key={l.href} href={l.href}>{l.label}</MagneticNavLink>
          ))}
        </div>

        {/* Right side CTA group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Desktop — Telefonnummer */}
          <a href="tel:+49711588654" className="hidden lg:flex font-condensed" style={{ alignItems: 'center', gap: 8, fontSize: 13, letterSpacing: '0.15em', color: '#C9BFB3', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#C9BFB3')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
            0711 588 654
          </a>
          {/* Desktop — 14 Tage CTA */}
          <a href="/mitglied" className="btn-lime hidden md:inline-flex" style={{ padding: '7px 16px', fontSize: 10, letterSpacing: '0.15em', minHeight: 'auto', lineHeight: 1.2, textDecoration: 'none' }}>
            <span>14 Tage gratis</span>
          </a>
          {/* Mobile — kleiner Anrufen-Button, nur Icon + Text */}
          <a href="tel:+49711588654" className="flex md:hidden font-condensed" style={{ alignItems: 'center', gap: 5, padding: '7px 12px', background: 'rgba(196,69,82,0.15)', border: '1px solid rgba(196,69,82,0.3)', borderRadius: 6, color: '#F5F0E8', textDecoration: 'none', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, WebkitTapHighlightColor: 'transparent' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
            Anrufen
          </a>

          {/* Mobile Burger */}
          <button className="md:hidden nav-burger" onClick={() => setOpen(!open)} aria-label="Menü" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 10, display: 'flex', flexDirection: 'column', gap: 5, position: 'relative', zIndex: 60, WebkitTapHighlightColor: 'transparent' }}>
            <span style={{ width: 24, height: 2, background: '#F5F0E8', display: 'block', borderRadius: 1, transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ width: 16, height: 2, background: '#F5F0E8', display: 'block', borderRadius: 1, transition: 'all 0.2s ease', opacity: open ? 0 : 1, marginLeft: 'auto' }} />
            <span style={{ width: 24, height: 2, background: '#F5F0E8', display: 'block', borderRadius: 1, transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu — fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, top: 0,
              background: '#0F1419',
              display: 'flex', flexDirection: 'column',
              paddingTop: 80, padding: '80px 28px 28px',
              zIndex: 115, overflowY: 'auto',
            }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(245,240,232,0.08)', textDecoration: 'none' }}>
                  <span className="font-display" style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#F5F0E8' }}>{l.label}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,232,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </motion.a>
              ))}
            </div>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>
              <a href="tel:+49711588654" className="font-display" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px 0', background: 'var(--accent)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 15, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                Jetzt anrufen
              </a>
              <a href="/mitglied" className="font-condensed" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 0', background: 'transparent', border: '1px solid rgba(245,240,232,0.12)', color: '#B5A99A', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                14 Tage gratis testen →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function Hero() {
  const SLIDES = [
    { src: '/images/real-freihantel-hero-md.webp', srcSm: '/images/real-freihantel-hero-sm.webp', label: 'Freihantel' },
    { src: '/images/real-egym-hero-md.webp', srcSm: '/images/real-egym-hero-sm.webp', label: 'EGYM' },
    { src: '/images/real-cardio-hero-md.webp', srcSm: '/images/real-cardio-hero-sm.webp', label: 'Cardio' },
    { src: '/images/real-hantelbereich-hero-md.webp', srcSm: '/images/real-hantelbereich-hero-sm.webp', label: 'Hantelbereich' },
    { src: '/images/real-zirkel-hero-md.webp', srcSm: '/images/real-zirkel-hero-sm.webp', label: 'Zirkeltraining' },
    { src: '/images/real-kursraum-1-hero-md.webp', srcSm: '/images/real-kursraum-1-hero-sm.webp', label: 'Kursraum' },
    { src: '/images/real-spinning-hero-md.webp', srcSm: '/images/real-spinning-hero-sm.webp', label: 'Spinning' },
    { src: '/images/real-crosstrainer-hero-md.webp', srcSm: '/images/real-crosstrainer-hero-sm.webp', label: 'Crosstrainer' },
    { src: '/images/real-kraftbereich2-hero-md.webp', srcSm: '/images/real-kraftbereich2-hero-sm.webp', label: 'Kraftbereich' },
    { src: '/images/real-theke-hero-md.webp', srcSm: '/images/real-theke-hero-sm.webp', label: 'Theke & Bar' },
  ]
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(c => {
        setPrev(c)
        return (c + 1) % SLIDES.length
      })
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const goTo = (i: number) => {
    setPrev(current)
    setCurrent(i)
  }

  return (
    <section data-hero style={{ position: 'relative', minHeight: 'clamp(640px, 100vh, 1000px)', overflow: 'hidden', background: '#0F1419' }}>
      {/* Slideshow images */}
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            opacity: i === current ? 1 : i === prev ? 0 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <img
            src={s.src}
            srcSet={`${s.srcSm} 800w, ${s.src} 1600w`}
            sizes="100vw"
            alt={s.label}
            fetchPriority={i === 0 ? 'high' : 'low'}
            decoding="async"
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%' }}
          />
        </div>
      ))}

      {/* Left gradient — text readability on left, image visible on right */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(90deg, rgba(15,20,25,0.85) 0%, rgba(15,20,25,0.6) 30%, rgba(15,20,25,0.2) 55%, transparent 75%)', pointerEvents: 'none' }} />
      {/* Top vignette — dezent für Bildkante */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8%', zIndex: 2, background: 'linear-gradient(180deg, rgba(15,20,25,0.3) 0%, transparent 100%)', pointerEvents: 'none' }} />
      {/* Bottom fade into next section */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%', zIndex: 2, background: 'linear-gradient(180deg, transparent 0%, rgba(15,20,25,0.85) 100%)', pointerEvents: 'none' }} />

      {/* Google Badge */}
      <div
        className="hero-google-badge"
        style={{ position: 'absolute', top: 84, right: 'clamp(20px,5vw,80px)', zIndex: 11 }}
      >
        <div style={{ padding: '8px 16px', background: 'rgba(15,20,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(184, 146, 74, 0.4)', display: 'flex', alignItems: 'center', gap: 8, borderRadius: 999 }}>
          <svg width="14" height="14" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 35.2 44 30 44 24c0-1.3-.1-2.6-.4-3.9z"/>
          </svg>
          <span className="font-condensed badge-text" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 500 }}>
            <span style={{ color: '#F4B400', fontWeight: 700 }}>4,7 ★</span>
            <span style={{ color: '#6E5050', margin: '0 6px' }}>·</span>
            <span>200+ Bewertungen</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1440, margin: '0 auto', paddingLeft: 'clamp(20px,5vw,80px)', paddingRight: 'clamp(20px,5vw,80px)', paddingTop: 'max(80px, calc(64px + 2vh))', paddingBottom: 48, minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <span style={{ width: 48, height: 1, background: 'var(--accent)' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.55em', textTransform: 'uppercase', color: 'var(--accent-bright)', fontWeight: 600 }}>Bruckstraße 61 · Fellbach</span>
          </div>

          <h1
            className="font-display"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 24px', color: '#F5F0E8', textTransform: 'uppercase' }}>
            HIER KENNT MAN<br />
            <span style={{ color: 'var(--accent-bright)', fontStyle: 'italic' }}>deinen</span>{' '}
            NAMEN.
          </h1>

          <p style={{ color: '#F0E5D5', fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', lineHeight: 1.8, marginBottom: 32, maxWidth: 520, fontWeight: 400, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
            Familienstudio seit über 25 Jahren. 2.000m², Sauna, 30+ Kurse pro Woche — und ein Team, das dich beim Namen kennt.<br />
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Täglich 05–24 Uhr.</span> Ab <span style={{ color: '#FFFFFF', fontWeight: 600 }}>13,99€/Woche.</span>
          </p>

          <div
            className="hero-cta-group"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 40 }}>
            <MagneticButton href="/mitglied" variant="lime">
              <span>14 Tage gratis testen</span><span>→</span>
            </MagneticButton>
            <MagneticButton href="tel:+49711588654" variant="outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
              <span>Jetzt anrufen</span>
            </MagneticButton>
          </div>

          <div className="hero-stats-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(28px,4vw,56px)', paddingTop: 28, borderTop: '1px solid rgba(184, 146, 74, 0.2)' }}>
            {[
              { end: 2000, suffix: 'm²', label: 'Fläche' },
              { end: 30, suffix: '+', label: 'Kurse/Woche' },
              { end: 500, suffix: '+', label: 'Mitglieder' },
              { end: 14, suffix: '', label: 'Tage gratis' },
            ].map(s => (
              <div key={s.label}>
                <AnimatedCounter end={s.end} suffix={s.suffix} duration={2} className="font-display" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, color: 'var(--accent-bright)', lineHeight: 1, letterSpacing: '-0.02em' }} />
                <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4B098', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="hero-slide-dots" style={{ position: 'absolute', bottom: 'clamp(32px,5vh,60px)', right: 'clamp(20px,5vw,80px)', display: 'flex', gap: 8, alignItems: 'center' }}>
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="hero-dot"
              style={{
                width: i === current ? 28 : 8, height: 8, borderRadius: 4,
                background: i === current ? '#C44552' : 'rgba(245,240,232,0.3)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
              aria-label={s.label}
            />
          ))}
          <span className="font-condensed hero-dot-label" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(245,240,232,0.4)', marginLeft: 4, textTransform: 'uppercase' }}>
            {SLIDES[current].label}
          </span>
        </div>
      </div>

    </section>
  )
}

function Marquee() {
  const items = ['Training', 'Sauna', 'Kurse', 'BodyPump', 'Yoga', 'Cardio', 'Spinning', 'Pilates', 'EGYM', '24/7', 'Zirkeltraining', 'Fitness', 'Familienstudio', 'Boxen',]
  const doubled = [...items, ...items]
  return (
    <div className="marquee-band" style={{ overflow: 'hidden', borderTop: '1px solid var(--gray-border)', borderBottom: '1px solid var(--gray-border)', background: 'var(--gray-mid)', padding: '16px 0' }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '0 20px', whiteSpace: 'nowrap' }}>
            <span className="font-condensed" style={{ fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9A8470' }}>{item}</span>
            <span style={{ color: 'var(--accent)', fontSize: 5 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GalleryLightbox({ item, onClose, onPrev, onNext, current, total }: {
  item: { src: string; srcSm: string; label: string }
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  current: number
  total: number
}) {
  // Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey) }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      onTouchStart={e => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={e => {
        if (touchStart === null) return
        const diff = e.changedTouches[0].clientX - touchStart
        if (diff > 60) onPrev()
        else if (diff < -60) onNext()
        setTouchStart(null)
      }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out',
      }}
    >
      {/* Close */}
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer', zIndex: 2, lineHeight: 1, padding: 12 }} aria-label="Schließen">✕</button>
      {/* Counter */}
      <div className="font-condensed" style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', fontSize: 11, letterSpacing: '0.3em', color: 'var(--accent)', fontWeight: 600 }}>
        {current + 1} / {total}
      </div>
      {/* Image */}
      <motion.img
        key={item.src}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        src={item.src}
        alt={item.label}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '92vw', maxHeight: '80vh', objectFit: 'contain',
          cursor: 'default',
          borderRadius: 0,
        }}
      />
      {/* Label */}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{item.label}</div>
      </div>
      {/* Nav arrows — desktop */}
      <button onClick={e => { e.stopPropagation(); onPrev() }} className="lightbox-nav-btn" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', width: 48, height: 48, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} aria-label="Vorheriges Bild">‹</button>
      <button onClick={e => { e.stopPropagation(); onNext() }} className="lightbox-nav-btn" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', width: 48, height: 48, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} aria-label="Nächstes Bild">›</button>
      {/* Swipe hint mobile */}
      <div className="lightbox-swipe-hint font-condensed" style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>← Wischen →</div>
    </motion.div>
  )
}

function Gallery() {
  let globalCounter = 0
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const allItems = GALLERY_SECTIONS.flatMap(s => s.items)

  // Grid config per section — no empty cells, editorial feel
  type GridConfig = { cols: number; tallFeatured: boolean; rowHeight: string; lastFill: number }
  const getGridConfig = (items: typeof allItems): GridConfig => {
    const hasFeatured = items.some(it => 'featured' in it && it.featured)
    const count = items.length
    if (hasFeatured && count >= 5)
      return { cols: 4, tallFeatured: true, rowHeight: 'clamp(180px, 22vw, 280px)', lastFill: 0 }
    if (hasFeatured && count === 4)
      return { cols: 4, tallFeatured: false, rowHeight: 'clamp(200px, 24vw, 320px)', lastFill: 4 }
    if (hasFeatured && count === 3)
      return { cols: 4, tallFeatured: false, rowHeight: 'clamp(220px, 26vw, 360px)', lastFill: 0 }
    if (hasFeatured && count === 2)
      return { cols: 3, tallFeatured: false, rowHeight: 'clamp(220px, 26vw, 360px)', lastFill: 0 }
    return { cols: 4, tallFeatured: false, rowHeight: 'clamp(200px, 22vw, 280px)', lastFill: 0 }
  }

  return (
    <section id="galerie" style={{ background: '#0F1419', padding: 'clamp(80px, 12vh, 140px) 0' }}>
      {/* Header */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(16px, 4vw, 56px) 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <span style={{ width: 32, height: 1, background: 'var(--accent)' }} />
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Einblick</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 1.05 }}>
            In den <span style={{ color: 'var(--accent-bright)', fontStyle: 'italic' }}>Club.</span>
          </h2>
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A94A0', fontWeight: 500, paddingBottom: 8 }}>{allItems.length} Bereiche</span>
        </div>
      </div>

      {/* Gallery sections */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(16px, 4vw, 56px)' }}>
        {GALLERY_SECTIONS.map((section, si) => {
          const sectionStartIdx = GALLERY_SECTIONS.slice(0, si).reduce((acc, s) => acc + s.items.length, 0)
          const config = getGridConfig(section.items)
          return (
            <div key={section.title} className="gallery-category" style={{ marginBottom: si < GALLERY_SECTIONS.length - 1 ? 64 : 0 }}>
              {/* Section divider */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}
              >
                <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#8A94A0', fontWeight: 600, whiteSpace: 'nowrap' }}>{section.title}</span>
                <span style={{ flex: 1, height: 1, background: 'rgba(245,240,232,0.08)' }} />
                <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.2em', color: '#6A7480' }}>{String(si + 1).padStart(2, '0')}</span>
              </motion.div>
              {/* Grid */}
              <div className="gallery-grid" style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
                gridAutoRows: config.rowHeight,
                gap: 'clamp(4px, 0.5vw, 8px)',
              }}>
                {section.items.map((item, itemIdx) => {
                  const d = globalCounter++ * 0.03
                  const flatIdx = sectionStartIdx + itemIdx
                  const isFeatured = 'featured' in item && item.featured
                  const isTall = isFeatured && config.tallFeatured
                  // Last non-featured item fills remaining cols (e.g. 4-item section: last item spans full width)
                  const lastFillSpan = config.lastFill > 0 && itemIdx === section.items.length - 1 && !isFeatured ? config.lastFill : 0
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] }}
                      className={isFeatured ? 'gallery-featured' : 'gallery-item'}
                      onClick={() => setLightboxIdx(flatIdx)}
                      style={{
                        gridColumn: lastFillSpan ? `span ${lastFillSpan}` : isFeatured ? 'span 2' : 'span 1',
                        gridRow: isTall ? 'span 2' : 'span 1',
                        position: 'relative',
                        overflow: 'hidden',
                        background: '#0d0d0d',
                        cursor: 'pointer',
                      }}
                    >
                      <img
                        src={item.src}
                        srcSet={`${item.srcSm} 800w, ${item.src} 1600w`}
                        sizes={isFeatured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                        alt={item.label}
                        loading="lazy"
                        decoding="async"
                        className="gallery-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s cubic-bezier(0.16,1,0.3,1), filter 0.8s ease' }}
                      />
                      <div className="gallery-overlay" style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent ${isFeatured ? '20%' : '30%'}, rgba(15,20,25,${isFeatured ? '0.9' : '0.85'}) 100%)`, transition: 'opacity 0.5s ease', pointerEvents: 'none' }} />
                      {/* Number */}
                      <div style={{ position: 'absolute', top: 16, right: 16, pointerEvents: 'none' }}>
                        <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(245,240,232,0.2)', fontWeight: 600 }}>{String(flatIdx + 1).padStart(2, '0')}</span>
                      </div>
                      {/* Label */}
                      <div className="gallery-label" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isFeatured ? '32px 36px' : '16px 20px', pointerEvents: 'none', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s' }}>
                        <div className="font-display" style={{ fontSize: isFeatured ? 22 : 13, fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.2 }}>{item.label}</div>
                        {isFeatured && <div className="font-condensed gallery-sublabel" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginTop: 8, opacity: 0, transition: 'opacity 0.4s 0.1s' }}>Klicken zum Vergrößern</div>}
                      </div>
                      {/* Corner accents */}
                      <div style={{ position: 'absolute', top: 0, left: 0, width: 36, height: 1, background: 'var(--accent)', transition: 'opacity 0.4s, width 0.5s' }} className="gallery-accent" />
                      <div style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 36, background: 'var(--accent)', transition: 'opacity 0.4s, height 0.5s' }} className="gallery-accent" />
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 36, height: 1, background: 'var(--accent)', transition: 'opacity 0.4s' }} className="gallery-accent" />
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 1, height: 36, background: 'var(--accent)', transition: 'opacity 0.4s' }} className="gallery-accent" />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <GalleryLightbox
            item={allItems[lightboxIdx]}
            current={lightboxIdx}
            total={allItems.length}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx(i => i !== null ? (i - 1 + allItems.length) % allItems.length : null)}
            onNext={() => setLightboxIdx(i => i !== null ? (i + 1) % allItems.length : null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function Pricing() {
  const [term, setTerm] = useState<'12' | '24'>('24')

  // Echte Preise 1:1 von fitness-club-fellbach.de/membership/memberships
  const pricing = {
    '12': { basic: '15,99', allin: '18,99' },
    '24': { basic: '13,99', allin: '16,99' },
  }
  const p = pricing[term]

  const plans = [
    { key: 'basic', name: 'Basic', tag: 'Einstieg', featured: false, price: p.basic, features: ['Fitnessfläche', 'Duschen', 'Zubuchbare Add-Ons ab 2,99€/Woche'] },
    { key: 'allin', name: 'All-In', tag: 'Empfohlen', featured: true, price: p.allin, features: ['Fitnessfläche', 'Duschen', 'Getränkeflatrate', 'Sauna-Oase', 'Vielfältige Kurse', 'EGYM Training', 'Betreutes Zirkeltraining', 'Weitere Add-Ons ab 3,49€'] },
  ]

  return (
    <section id="preise" style={{ background: '#0F1419', padding: 'clamp(80px, 12vh, 160px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center', marginBottom: 24 }}>
            <span style={{ width: 32, height: 1, background: 'var(--accent)' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Mitgliedschaft</span>
            <span style={{ width: 32, height: 1, background: 'var(--accent)' }} />
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 16, textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 0.95 }}>
            Dein Plan. <span style={{ color: 'var(--accent-bright)', fontStyle: 'italic' }}>Dein Preis.</span>
          </h2>
          <p style={{ color: '#9A8470', fontSize: 15, lineHeight: 1.7, maxWidth: 540, marginInline: 'auto' }}>
            Echte Preise. Keine Tricks. 14 Tage testen — voller Erstattung wenn's nicht passt.
          </p>
        </div>

        {/* Term toggle + Live-Preis-Preview */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="pricing-tabs" style={{ display: 'inline-flex', gap: 4, padding: 4, background: 'rgba(58, 32, 32, 0.4)', border: '1px solid rgba(184, 146, 74, 0.2)' }}>
            {(['12', '24'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className="font-condensed"
                style={{
                  padding: '12px 24px',
                  fontSize: 11,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  background: term === t ? 'var(--accent)' : 'transparent',
                  color: term === t ? '#0F1419' : '#9A8470',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {t} Monate
              </button>
            ))}
          </div>

          {/* Mobile: Preis-Preview direkt unter Toggle sichtbar */}
          <div className="pricing-preview-mobile" style={{ display: 'none', marginTop: 20, gap: 12, justifyContent: 'center' }}>
            {plans.map(plan => (
              <motion.div
                key={`${plan.key}-${term}`}
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '12px 20px',
                  background: plan.featured ? 'rgba(184, 146, 74, 0.12)' : 'rgba(245, 240, 232, 0.04)',
                  border: plan.featured ? '1px solid rgba(184, 146, 74, 0.4)' : '1px solid rgba(245, 240, 232, 0.08)',
                }}
              >
                <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9A8470', display: 'block', marginBottom: 4 }}>{plan.name}</span>
                <span className="font-display" style={{ fontSize: 22, fontWeight: 800, color: plan.featured ? 'var(--accent-bright)' : '#F5F0E8', letterSpacing: '-0.02em' }}>{plan.price}€</span>
                <span className="font-condensed" style={{ fontSize: 10, color: '#9A8470', letterSpacing: '0.1em' }}> /Wo</span>
              </motion.div>
            ))}
          </div>

          {term === '24' && (
            <div className="font-condensed" style={{ marginTop: 12, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase' }}>
              2 Monate gratis · Bester Preis
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, maxWidth: 760, margin: '0 auto' }}>
          {plans.map((plan, i) => {
            return (
              <TiltCard key={plan.key} intensity={6} style={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={plan.featured ? 'pricing-shimmer' : ''}
                style={{
                  position: 'relative',
                  padding: 36,
                  background: plan.featured ? 'linear-gradient(180deg, #1A2128 0%, #1A2128 100%)' : '#1A2128',
                  border: plan.featured ? '1px solid var(--accent)' : '1px solid rgba(196, 69, 82, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                {/* Top corner badge */}
                {plan.featured && (
                  <div style={{ position: 'absolute', top: -1, right: -1, padding: '8px 16px', background: 'var(--accent)', color: '#fff' }}>
                    <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 }}>★ Empfohlen</span>
                  </div>
                )}

                {/* Tag */}
                <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: plan.featured ? 'var(--accent-bright)' : '#5A4030', marginBottom: 8, fontWeight: 600 }}>{plan.tag}</div>

                {/* Plan name */}
                <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', marginBottom: 24, letterSpacing: '-0.01em' }}>{plan.name}</div>

                {/* Price block */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <motion.span
                      key={`price-${plan.key}-${term}`}
                      initial={{ scale: 1.12, opacity: 0.6 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="font-display"
                      style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, color: plan.featured ? 'var(--accent-bright)' : '#F5F0E8', lineHeight: 1, letterSpacing: '-0.03em' }}
                    >
                      {plan.price}€
                    </motion.span>
                    <span className="font-condensed" style={{ fontSize: 12, color: '#9A8470', letterSpacing: '0.15em', textTransform: 'uppercase' }}>/ Woche</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#9A8878', marginTop: 8, lineHeight: 1.5 }}>
                    Laufzeit {term} Monate{term === '24' ? ' · 2 Monate gratis' : ''}
                  </div>
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 36, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 13, color: '#C9BFB3', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1, fontWeight: 700 }}>+</span>{f}
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  href="/mitglied"
                  variant={plan.featured ? 'lime' : 'outline'}
                  className="w-full"
                >
                  <span>14 Tage testen</span><span>→</span>
                </MagneticButton>
              </motion.div>
              </TiltCard>
            )
          })}
        </div>

        <div style={{ marginTop: 40, maxWidth: 560, marginInline: 'auto', padding: '24px 28px', background: 'linear-gradient(135deg, rgba(34,197,94,0.04), rgba(245,240,232,0.02))', border: '1px solid rgba(34,197,94,0.12)', borderRadius: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 14 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.4)' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#22c55e', fontWeight: 700 }}>Probetraining &amp; Beratung</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px, 4vw, 32px)', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9A8470', display: 'block', marginBottom: 4 }}>Mo – Fr</span>
              <span style={{ fontSize: 14, color: '#F5F0E8', fontWeight: 600 }}>08–12</span>
              <span style={{ fontSize: 12, color: '#9A8470', margin: '0 4px' }}>&amp;</span>
              <span style={{ fontSize: 14, color: '#F5F0E8', fontWeight: 600 }}>16–21 Uhr</span>
            </div>
            <span style={{ width: 1, height: 32, background: 'rgba(245,240,232,0.08)', alignSelf: 'center' }} />
            <div style={{ textAlign: 'center' }}>
              <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9A8470', display: 'block', marginBottom: 4 }}>Sa + So</span>
              <span style={{ fontSize: 14, color: '#F5F0E8', fontWeight: 600 }}>09–14 Uhr</span>
            </div>
          </div>
        </div>
        <p style={{ textAlign: 'center', color: '#8A7A68', fontSize: 12, marginTop: 16, letterSpacing: '0.08em', lineHeight: 1.6 }}>
          Einmalige Aufnahmegebühr: 20,00€ (Transponder-Armband) · 14 Tage Widerrufsrecht mit voller Erstattung · Kündigungsfrist 13 Wochen zum Laufzeitende
        </p>
      </div>
    </section>
  )
}

function Testimonials() {
  // Echte Google Reviews — nur positive 5-Stern
  const reviews = [
    { name: 'Vivien', when: 'vor einer Woche', text: 'Sehr zufrieden mit diesem Fitnessstudio! Die Geräte sind sauber und in einem sehr guten Zustand. Besonders gefällt mir die freundliche Atmosphäre — das Team ist immer hilfsbereit und motivierend.' },
    { name: 'Ekaterina Blehm', when: 'vor 2 Monaten', text: 'Absolut tolles Fitnessstudio! Übersichtlich, immer sauber, alles da was man braucht. Die Trainer immer freundlich, zuvorkommend und hilfsbereit!' },
    { name: 'Lea Wolfgarten', when: 'vor 3 Monaten', text: 'Man sieht wirklich wie viel Mühe und Liebe in dieses Fitness Studio investiert wird. Egal ob neue Umkleiden, Sauna oder Geräte — alles wird konstant optimiert. Das Umfeld ist sehr familiär.' },
    { name: 'Eva Heckmann', when: 'vor 3 Monaten', text: 'Als Fitness Neuling wurde mir das Studio empfohlen — und ich bin absolut überzeugt! Die Umbauten machen das Studio schöner und neuer, die Trainer begleiten kompetent.' },
    { name: 'Malik Lord', when: 'vor 9 Monaten', text: 'Top Fitnessstudio mit richtig guter Atmosphäre! Die Geräte sind sauber und modern, das Team freundlich und immer hilfsbereit. Man fühlt sich motiviert, sobald man reinkommt.' },
    { name: 'Patrick', when: 'vor einer Woche', text: 'Ich trainiere seit mehreren Jahren im Fitness Club Fellbach und kann wirklich nur Positives berichten. Vom ersten Tag an habe ich mich hier unglaublich wohlgefühlt — motivierend, familiär.' },
    { name: 'Marcello Vulcano', when: 'vor 5 Tagen', text: 'Ich bin rundum sehr zufrieden! Das gesamte Team ist super freundlich, motiviert und immer hilfsbereit. Man fühlt sich direkt wohl und gut aufgehoben. Klare Empfehlung!' },
    { name: 'Mara Falkenstein', when: 'vor einer Woche', text: 'Top Fitnessclub! Modern, sauber und super ausgestattet. Das Team ist freundlich, kompetent und immer hilfsbereit. Große Kursauswahl und motivierende Atmosphäre. Klare Empfehlung! 💪' },
    { name: 'Aum Modha', when: 'vor 2 Jahren', text: 'Einer der am besten ausgestatteten Gyms in der Umgebung von Fellbach und Waiblingen. Alle Geräte werden ständig auf höchstem Stand gehalten.' },
    { name: 'Hannes De', when: 'vor 2 Monaten', text: 'Bombenstudio, Marcel ein Bombentyp — was will man mehr!?' },
  ]
  return (
    <section className="testimonials-section" style={{ background: '#F5F0E8', padding: 'clamp(80px, 12vh, 140px) 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(24px, 5vw, 80px)', alignItems: 'end', marginBottom: 'clamp(28px, 5vw, 56px)' }} className="testimonials-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <span style={{ width: 32, height: 1, background: 'var(--accent)' }} />
              <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Was Mitglieder sagen</span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0F1419', textTransform: 'uppercase', lineHeight: 0.95, margin: 0 }}>
              200+ Bewertungen.<br /><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Eine Sache.</span>
            </h2>
          </div>

          {/* Google Reviews badge */}
          <div className="google-badge-box" style={{ background: '#FFFFFF', border: '1px solid rgba(26,15,15,0.08)', padding: 28, boxShadow: '0 4px 16px rgba(26,15,15,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 35.2 44 30 44 24c0-1.3-.1-2.6-.4-3.9z"/>
              </svg>
              <div>
                <div style={{ fontSize: 11, color: '#5A4040', letterSpacing: '0.05em' }}>Google Bewertungen</div>
                <div className="font-display badge-title" style={{ fontSize: 22, fontWeight: 700, color: '#0F1419', lineHeight: 1 }}>4,7 / 5,0</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
              {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#F4B400', fontSize: 16 }}>★</span>)}
            </div>
            <div style={{ fontSize: 12, color: '#5A4040' }}>Aus über <span style={{ fontWeight: 600, color: '#0F1419' }}>200+ echten Mitglieder-Bewertungen</span></div>
          </div>
        </div>

        {/* Auto-scroll marquee — zwei Reihen, entgegengesetzte Richtung */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(to right, #F5F0E8, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(to left, #F5F0E8, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div className="testimonials-scroll" style={{ display: 'flex', gap: 16, animation: 'marquee-left 45s linear infinite' }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
            {[...reviews, ...reviews].map((r, i) => (
              <div key={i} style={{ flexShrink: 0, width: 'clamp(280px, 30vw, 340px)', background: '#FFFFFF', border: '1px solid rgba(26,15,15,0.07)', padding: '24px 28px', boxShadow: '0 2px 12px rgba(26,15,15,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1,2,3,4,5].map(j => <span key={j} style={{ color: '#F4B400', fontSize: 13 }}>★</span>)}
                  </div>
                  <svg width="13" height="13" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5 }}>
                    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 35.2 44 30 44 24c0-1.3-.1-2.6-.4-3.9z"/>
                  </svg>
                </div>
                <p style={{ color: '#3F2C2C', fontSize: 13, lineHeight: 1.7, marginBottom: 18, flex: 1 }}>"{r.text}"</p>
                <div style={{ borderTop: '1px solid rgba(26,15,15,0.07)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div className="font-display" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0F1419' }}>{r.name}</div>
                  <div style={{ fontSize: 10, color: '#8A7060' }}>{r.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-link" style={{ marginTop: 40, textAlign: 'center' }}>
          <a href="https://www.google.com/search?q=fitness+club+fellbach" target="_blank" rel="noopener noreferrer" className="font-condensed" style={{ display: 'inline-block', padding: '12px 28px', border: '1px solid rgba(26,15,15,0.2)', color: '#0F1419', textDecoration: 'none', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', background: '#FFFFFF' }}>
            Alle Bewertungen auf Google ansehen →
          </a>
        </div>
      </div>
    </section>
  )
}

function KursplanTeaser() {
  const kurse = ['BodyPump','Yoga','Pilates','Rückenfit','Zumba','Spinning','Bauch Beine Po','Bodytoning','Vinyasa Yoga','Zirkeltraining','Step','Bodycross']
  return (
    <section id="kurse" style={{ background: 'linear-gradient(180deg, #0F1419 0%, #111820 100%)', padding: 'clamp(64px, 10vh, 100px) clamp(16px, 4vw, 80px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
          <span style={{ width: 32, height: 1, background: '#C44552' }} />
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C44552', fontWeight: 600 }}>Kursprogramm</span>
          <span style={{ width: 32, height: 1, background: '#C44552' }} />
        </div>
        <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 1, marginBottom: 12, letterSpacing: '-0.025em' }}>
          30+ Kurse pro Woche.
        </h2>
        <p style={{ color: '#9A8878', fontSize: 15, marginBottom: 32, maxWidth: 520, marginInline: 'auto' }}>
          Alle Kurse im Mitgliedsbeitrag inklusive — Platz reservieren über die <span style={{ color: '#F5F0E8', fontWeight: 600 }}>MySports App</span>.
        </p>
        <div className="kurse-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 40 }}>
          {kurse.map(k => (
            <span key={k} className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '6px 12px', border: '1px solid rgba(245,240,232,0.1)', color: '#9A8878', transition: 'all 0.2s' }}>{k}</span>
          ))}
        </div>
        <a href="/kurse" className="btn-lime" style={{ padding: '16px 40px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span>Kursplan & Zeiten ansehen</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const items = [
    { q: 'Wie funktionieren die 14 Tage testen?', a: 'Du meldest dich an und erhältst sofort Zugang zum kompletten Studio. Innerhalb von 14 Tagen kannst du jederzeit ohne Begründung widerrufen — und bekommst alle Kosten vollständig erstattet.' },
    { q: 'Welche Vorteile hat die All-In Mitgliedschaft?', a: 'All-In beinhaltet alle Gruppenkurse, Sauna, EGYM-Training und betreutes Zirkeltraining ohne zusätzliche Kosten. Das perfekte Paket wenn du das volle Angebot nutzen möchtest.' },
    { q: 'Wann ist das Studio geöffnet?', a: 'Die Trainingsfläche und Sauna sind täglich von 05:00 bis 24:00 Uhr zugänglich. Betreuung Mo–Fr 08–12 & 16–21 Uhr, Sa+So 09–14 Uhr.' },
    { q: 'Kann ich Kurse zur Basic-Mitgliedschaft dazubuchen?', a: 'Ja — Kurse können als Add-On für 2,99€/Woche gebucht werden. Weitere Add-Ons (Sauna, EGYM, Zirkel) ab 3,49€/Woche.' },
    { q: 'Wie beende ich meine Mitgliedschaft?', a: 'Innerhalb der ersten 14 Tage per E-Mail an verwaltung@fitnessclubfellbach.de. Danach mit 13 Wochen Frist zum Ende der Laufzeit. Danach läuft sie monatlich kündbar weiter.' },
    { q: 'Gibt es eine Altersbeschränkung?', a: 'Für eine Mitgliedschaft ohne elterliche Zustimmung min. 18 Jahre. Für Jugendliche ab 14 Jahren gibt es spezielle Angebote — einfach direkt anfragen.' },
  ]
  return (
    <section style={{ background: '#EDE7DD', padding: 'clamp(80px, 12vh, 140px) 0' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 clamp(16px, 5vw, 48px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <span style={{ width: 32, height: 1, background: 'var(--accent)' }} />
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>FAQ</span>
        </div>
        <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 48, color: '#0F1419', textTransform: 'uppercase', lineHeight: 0.95 }}>
          Noch <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Fragen?</span>
        </h2>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(26,15,15,0.12)' }}>
            <button onClick={() => setOpen(open === i ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 0', background: 'none', border: 'none', color: '#0F1419', cursor: 'pointer', gap: 16, textAlign: 'left' }}>
              <span className="font-display" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: 500, letterSpacing: '0.02em' }}>{item.q}</span>
              <span style={{ color: 'var(--accent)', flexShrink: 0, fontSize: 22, lineHeight: 1, transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none', display: 'block' }}>+</span>
            </button>
            <div className={`faq-answer ${open === i ? 'open' : ''}`}>
              <p style={{ color: '#3F2C2C', fontSize: 14.5, lineHeight: 1.75, paddingBottom: 24 }}>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="kontakt" style={{ background: 'var(--gray-mid)', borderTop: '1px solid var(--gray-border)' }}>
      <div className="contact-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(64px, 10vh, 96px) clamp(16px, 4vw, 48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(32px, 6vw, 64px)', alignItems: 'center' }}>
        <div>
          <div className="label reveal" style={{ marginBottom: 16 }}>Kontakt</div>
          <h2 className="font-display reveal delay-1" style={{ fontSize: 'var(--heading-lg)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
            KOMM VORBEI.<br /><span style={{ color: 'var(--lime)' }}>JEDERZEIT.</span>
          </h2>
          <div className="reveal delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {[
              { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C44552" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: 'Bruckstraße 61, 70734 Fellbach', href: 'https://maps.google.com/?q=Bruckstraße+61+Fellbach' },
              { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C44552" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>, text: '+49 711 58 8654', href: 'tel:+49711588654' },
              { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C44552" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: 'info@fitnessclubfellbach.de', href: 'mailto:info@fitnessclubfellbach.de' },
            ].map(({ icon, text, href }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 14 }}>
                <span style={{ flexShrink: 0, display: 'flex' }}>{icon}</span>
                <a href={href} style={{ color: '#B5A99A', textDecoration: 'none', transition: 'color 0.2s' }}
                   onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
                   onMouseLeave={e => (e.currentTarget.style.color = '#B5A99A')}>{text}</a>
              </div>
            ))}
          </div>
          <div className="reveal delay-3" style={{ background: 'var(--black)', border: '1px solid var(--gray-border)', padding: 24 }}>
            <div className="label" style={{ color: '#9A8470', marginBottom: 14 }}>Öffnungszeiten</div>
            {[['Studio (täglich)', '05:00 – 00:00', true], ['Betreuung Mo–Fr', '08–12 · 16–21 Uhr', false], ['Betreuung Sa+So', '09–14 Uhr', false]].map(([k, v, highlight]) => (
              <div key={String(k)} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: '#C9BFB3' }}>{k}</span>
                <span style={{ color: highlight ? 'var(--lime)' : '#666' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal delay-2 contact-cta-box" style={{ background: 'var(--black)', border: '1px solid var(--gray-border)', padding: '48px 40px' }}>
          <div className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 16 }}>
            BEREIT ZUM<br /><span style={{ color: 'var(--lime)' }}>TRAINING?</span>
          </div>
          <p style={{ color: '#C9BFB3', fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
            Starte noch heute mit 14 Tagen komplett kostenlos. Kein Risiko — voller Zugang ab Tag 1.
          </p>
          <MagneticButton
            href="/mitglied"
            variant="lime" className="w-full"
          >
            <span>14 Tage gratis starten</span><span>→</span>
          </MagneticButton>
          <div style={{ height: 12 }} />
          <MagneticButton href="tel:+49711588654" variant="outline" className="w-full">
            <span>Anrufen</span>
          </MagneticButton>
        </div>
      </div>

      {/* Google Maps */}
      <div className="contact-map" style={{ position: 'relative', height: 300, overflow: 'hidden', borderTop: '1px solid var(--gray-border)' }}>
        <iframe
          src="https://maps.google.com/maps?q=Fitness+Club+Fellbach,+Bruckstraße+61,+70734+Fellbach&z=16&output=embed&hl=de"
          width="100%" height="100%"
          style={{ border: 'none', display: 'block', filter: 'invert(90%) hue-rotate(180deg) contrast(0.85) brightness(0.9)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Fitness Club Fellbach Standort"
        />
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          <a href="https://maps.google.com/?q=Bruckstraße+61+Fellbach" target="_blank" rel="noopener noreferrer"
            className="btn-lime" style={{ padding: '12px 24px', fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span>Route starten</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ background: 'var(--black)', borderTop: '1px solid var(--gray-border)', padding: '40px 0 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        {/* Family Badge — Bruckstraße 61 */}
        <div className="family-badge" style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 14,
          padding: '14px 24px', marginBottom: 32,
          background: 'rgba(13, 148, 136, 0.08)',
          border: '1px solid rgba(13, 148, 136, 0.25)',
        }}>
          <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#9A8470', fontWeight: 500 }}>Bruckstraße 61 · Familie</span>
          <span style={{ color: '#34404B' }}>·</span>
          <span className="font-display" style={{ fontSize: 12, fontWeight: 700, color: '#F5F0E8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Fitness Club Fellbach</span>
          <span style={{ color: '#34404B' }}>·</span>
          <a href="https://www.physio-zentrum-fellbach.de" target="_blank" rel="noopener noreferrer" className="font-display" style={{ fontSize: 12, fontWeight: 700, color: '#5EEAD4', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Physio Zentrum Fellbach →
          </a>
        </div>

        <div className="footer-inner" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <Logo size="md" variant="light" />
          </div>
          <div className="footer-links" style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {[['Blog', '/blog/'], ['Datenschutz', '/datenschutz'], ['Impressum', '/impressum'], ['Kündigung', '/kuendigung'], ['Karriere', '/karriere']].map(([l, h]) => (
              <a key={l} href={h}
                 style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9A8470', textDecoration: 'none' }}>
                {l}
              </a>
            ))}
          </div>
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <a href="https://www.instagram.com/fitnessclubfellbach/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#9A8470', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#E15464')} onMouseLeave={e => (e.currentTarget.style.color = '#9A8470')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.facebook.com/Fitnessclubfellbach/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: '#9A8470', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#E15464')} onMouseLeave={e => (e.currentTarget.style.color = '#9A8470')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>
          <div style={{ fontSize: 11, color: '#5A6770', letterSpacing: '0.1em' }}>© 2026 Fitness & Sport GmbH</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--gray-border)' }}>
          <a href="https://ferryemirer.de" target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4A5568', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4A5568')}
          >
            Design & Entwicklung — ferryemirer.de
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  const [pastHero, setPastHero] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)

  useEffect(() => {
    const fn = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.8)
      setNearFooter(window.scrollY + window.innerHeight > document.body.scrollHeight - 300)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <>
      <a href="#main" className="skip-link" style={{
        position: 'absolute', top: -9999, left: -9999,
        background: '#C44552', color: '#fff', padding: '12px 24px',
        zIndex: 9999, fontSize: 14, fontWeight: 600,
      }} onFocus={(e) => { e.currentTarget.style.top = '0'; e.currentTarget.style.left = '0' }}
         onBlur={(e) => { e.currentTarget.style.top = '-9999px'; e.currentTarget.style.left = '-9999px' }}>
        Zum Inhalt springen
      </a>
      <ScrollProgress />
      <MouseSpotlight />
      <LiveTicker />
      <Nav />
      <main id="main">
      <Hero />
      <Marquee />

      {/* 1. PREIS — Früh zeigen, kein Geheimnis */}
      <Pricing />

      {/* 2. INTRO — Was macht den Club besonders */}
      <WelcomeIntro />

      {/* 3. BEREICHE — Was bekommt man im Detail */}
      <div id="bereiche">
        <TrainingsflaecheSpotlight />
      </div>
      <EgymSpotlight />
      <WellnessSpotlight />

      {/* 4. GALERIE — Visueller Beweis */}
      <Gallery />

      {/* 5. KURSE & PROGRAMME */}
      <KurseGrid />
      <KursplanTeaser />
      <SpecialPrograms />

      {/* 6. TRUST — Social Proof nach dem Rundgang */}
      <Testimonials />

      {/* 7. PULLQUOTE */}
      <PullQuote
        before="500+ Mitglieder · Fellbach"
        text="Manche kommen für die Geräte. Alle bleiben wegen der Menschen."
        highlight="Alle bleiben"
        variant="dark"
      />

      {/* 8. FAQ — Einwände abbauen vor Kontakt */}
      <FAQ />

      {/* 9. KONTAKT — Abschluss */}
      <Contact />

      {/* 10. PHYSIO-BRIDGE — Cross-Sell ganz am Ende */}
      <PhysioBridge />

      <Footer />
      </main>

      {/* Mobile Sticky Call Bar — nur Mobile, erst nach Hero */}
      <div className="mobile-sticky-bar" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: '#0F1419',
        gap: 1, boxShadow: '0 -4px 24px rgba(0,0,0,0.4)',
        transform: pastHero && !nearFooter ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <a href="tel:+49711588654" style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: '#C44552', color: '#fff', padding: '16px 12px', textDecoration: 'none',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
          </svg>
          <span className="font-display" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Anrufen</span>
        </a>
        <a href="/mitglied" style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: '#0F1419', color: '#F5F0E8', padding: '16px 12px',
          borderTop: '1px solid rgba(245,240,232,0.1)', textDecoration: 'none',
        }}>
          <span className="font-display" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Mitglied werden</span>
        </a>
      </div>

      {/* Cookie Consent Banner — DSGVO Pflicht */}
      <CookieBanner />
    </>
  )
}
