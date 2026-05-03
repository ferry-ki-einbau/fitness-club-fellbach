import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './index.css'
import Preloader from './components/Preloader'
import MagneticButton from './components/MagneticButton'
import LiveTicker from './components/LiveTicker'
import GreekMeander from './components/GreekMeander'
import Logo from './components/Logo'
import StatementBanner from './components/StatementBanner'
import EgymSpotlight from './components/EgymSpotlight'
import WellnessSpotlight from './components/WellnessSpotlight'
import SpecialPrograms from './components/SpecialPrograms'
import AddonsBand from './components/AddonsBand'
import TrainingsflaecheSpotlight from './components/TrainingsflaecheSpotlight'
import KurseGrid from './components/KurseGrid'
import WelcomeIntro from './components/WelcomeIntro'
import TrainerSection from './components/TrainerSection'
import StudioTour from './components/StudioTour'
import PhysioBridge from './components/PhysioBridge'
import ScrollProgress from './components/ScrollProgress'
import PullQuote from './components/PullQuote'
import MouseSpotlight from './components/MouseSpotlight'
import BigStats from './components/BigStats'
import MagneticNavLink from './components/MagneticNav'
import ZielRechner from './components/ZielRechner'
import TrainingsplanSection from './components/TrainingsplanSection'


const GALLERY = [
  { src: '/images/real-boxring-1-md.webp', srcSm: '/images/real-boxring-1-sm.webp', label: 'Boxring', tag: '01' },
  { src: '/images/real-trainingsbereich-md.webp', srcSm: '/images/real-trainingsbereich-sm.webp', label: 'Trainingsbereich', tag: '02' },
  { src: '/images/real-cardio-md.webp', srcSm: '/images/real-cardio-sm.webp', label: 'Cardio', tag: '03' },
  { src: '/images/real-geraete-md.webp', srcSm: '/images/real-geraete-sm.webp', label: 'Krafttraining', tag: '04' },
  { src: '/images/real-kursraum-1-md.webp', srcSm: '/images/real-kursraum-1-sm.webp', label: 'Kursraum', tag: '05' },
  { src: '/images/real-pool-area-md.webp', srcSm: '/images/real-pool-area-sm.webp', label: 'Whirlpool', tag: '06' },
  { src: '/images/real-wellness-area-md.webp', srcSm: '/images/real-wellness-area-sm.webp', label: 'Sauna & Wellness', tag: '07' },
  { src: '/images/real-eingang-md.webp', srcSm: '/images/real-eingang-sm.webp', label: 'Eingang', tag: '08' },
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
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => {
    const check = () => {
      const h = new Date().getHours()
      setIsOpen(h >= 5 && h < 24)
    }
    check()
    const t = setInterval(check, 60000)
    return () => clearInterval(t)
  }, [])
  const links = [
    { label: 'Kurse', href: '#kurse' },
    { label: 'Preise', href: '#preise' },
    { label: 'Kontakt', href: '#kontakt' },
  ]
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      background: scrolled ? 'rgba(15,20,25,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(245,240,232,0.06)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

        {/* Logo + Status */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Logo size="lg" variant="light" />
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 999, background: isOpen ? 'rgba(34,197,94,0.1)' : 'rgba(196,69,82,0.1)', border: `1px solid ${isOpen ? 'rgba(34,197,94,0.25)' : 'rgba(196,69,82,0.25)'}` }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: isOpen ? '#22c55e' : '#C44552', animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="font-condensed hidden md:inline" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: isOpen ? '#22c55e' : '#C44552', fontWeight: 700 }}>
              {isOpen ? 'Geöffnet' : 'Geschlossen'}
            </span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex" style={{ gap: 4, alignItems: 'center' }}>
          {links.map(l => (
            <MagneticNavLink key={l.href} href={l.href}>{l.label}</MagneticNavLink>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="tel:+4971158 8654" className="hidden md:flex font-condensed" style={{ alignItems: 'center', gap: 6, fontSize: 13, letterSpacing: '0.1em', color: '#B5A99A', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#B5A99A')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
            07115 8 8654
          </a>
          <a href="#preise" className="btn-lime hidden md:inline-flex" style={{ padding: '10px 22px', fontSize: 11 }}>
            <span>Jetzt Mitglied</span>
          </a>

          {/* Mobile Burger */}
          <button className="md:hidden nav-burger" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5 }} onClick={() => setOpen(!open)}>
            <span style={{ width: 22, height: 1.5, background: '#F5F0E8', display: 'block', transition: 'all 0.25s', transform: open ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
            <span style={{ width: 22, height: 1.5, background: '#F5F0E8', display: 'block', transition: 'opacity 0.25s', opacity: open ? 0 : 1 }} />
            <span style={{ width: 22, height: 1.5, background: '#F5F0E8', display: 'block', transition: 'all 0.25s', transform: open ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ background: 'rgba(15,20,25,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(245,240,232,0.07)', padding: '28px 24px 32px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {links.map((l, i) => (
            <a key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '16px 0', borderBottom: i < links.length - 1 ? '1px solid rgba(245,240,232,0.06)' : 'none', textDecoration: 'none' }}>
              <span className="font-display" style={{ fontSize: 22, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#F5F0E8' }}>{l.label}</span>
            </a>
          ))}
          <a href="#preise" className="btn-lime" style={{ justifyContent: 'center', marginTop: 24 }} onClick={() => setOpen(false)}>
            <span>Jetzt Mitglied werden</span>
          </a>
          <a href="tel:+4971158 8654" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, color: '#8A7A6A', fontSize: 13, textDecoration: 'none' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
            07115 8 8654
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const heroImg = '/images/real-trainingsbereich-md.webp'
  const tiles = [
    { src: '/images/real-cardio-sm.webp', label: 'Cardio' },
    { src: '/images/real-wellness-area-sm.webp', label: 'Sauna' },
    { src: '/images/real-pool-area-sm.webp', label: 'Whirlpool' },
    { src: '/images/real-kursraum-1-sm.webp', label: 'Kurse' },
  ]
  return (
    <section data-hero style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#0F1419' }}>
      {/* Hero Video — Kling generated, loop */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <video
          autoPlay muted loop playsInline
          poster={heroImg}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%',
            filter: 'contrast(1.05) brightness(0.95) saturate(1.1)',
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          {/* Fallback Foto */}
          <img src={heroImg} alt="Fitness Club Fellbach" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </video>
      </motion.div>

      {/* Smoother gradient — readable text but image bright */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(15,20,25,0.55) 0%, rgba(15,20,25,0.25) 30%, rgba(15,20,25,0.55) 75%, rgba(15,20,25,0.95) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(95deg, rgba(15,20,25,0.85) 0%, rgba(15,20,25,0.4) 50%, rgba(15,20,25,0.15) 100%)', pointerEvents: 'none' }} />

      {/* Greek meander */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', opacity: 0.6 }}>
        <GreekMeander />
      </div>

      {/* Live status pill — top center */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{ position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 11, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}
      >
        <div style={{ padding: '8px 16px', background: 'rgba(15,20,25,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(184, 146, 74, 0.4)', display: 'flex', alignItems: 'center', gap: 8, borderRadius: 999 }}>
          <svg width="14" height="14" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 35.2 44 30 44 24c0-1.3-.1-2.6-.4-3.9z"/>
          </svg>
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5F0E8', fontWeight: 500 }}>
            <span style={{ color: '#F4B400', fontWeight: 700 }}>4,7 ★</span>
            <span style={{ color: '#6E5050', margin: '0 6px' }}>·</span>
            <span>200+ Bewertungen</span>
          </span>
        </div>
      </motion.div>

      {/* Content grid */}
      <div className="hero-content-grid" style={{ position: 'relative', zIndex: 10, maxWidth: 1440, margin: '0 auto', padding: 'clamp(160px, 22vh, 240px) clamp(20px, 5vw, 80px) clamp(48px, 8vh, 100px)', width: '100%', minHeight: '100vh', display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'end' }}>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <span style={{ width: 48, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Bruckstraße 61 · Fellbach</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 7.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 28px', color: '#F5F0E8', textTransform: 'uppercase' }}>
            Kein Discounter.<br />
            <span style={{ color: 'var(--accent-bright)', fontStyle: 'italic' }}>Dein</span> Studio.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45 }}
            style={{ color: '#F0E5D5', fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', lineHeight: 1.8, marginBottom: 44, maxWidth: 520, fontWeight: 400, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
            1.500m² · EGYM · Box-Ring · Sauna · Whirlpool · 30+ Kurse pro Woche.<br />
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>24h offen. 7 Tage. 365 Tage.</span> Ab <span style={{ color: '#FFFFFF', fontWeight: 600 }}>13,99€/Woche</span> — inkl. persönlichem Trainingsplan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.55 }}
            className="hero-cta-group"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 56 }}>
            <MagneticButton href="#preise" variant="lime">
              <span>14 Tage gratis testen</span><span>→</span>
            </MagneticButton>
            <MagneticButton href="#tour" variant="outline">
              <span>Studio Tour</span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.7 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(28px, 4vw, 56px)', paddingTop: 28, borderTop: '1px solid rgba(184, 146, 74, 0.2)' }}>
            {[['24/7', 'geöffnet'], ['8', 'Bereiche'], ['500+', 'Mitglieder'], ['14', 'Tage gratis']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, color: '#B8924A', lineHeight: 1, letterSpacing: '-0.02em' }}>{n}</div>
                <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9A8470', marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 4-tile mosaic of zones */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="hero-mosaic"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, alignSelf: 'center' }}
        >
          {tiles.map((t, i) => (
            <motion.a
              key={t.label}
              href="#tour"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.7 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03 }}
              style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', cursor: 'pointer', textDecoration: 'none', display: 'block', boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)' }}
            >
              <img src={t.src} alt={t.label} decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.02) brightness(1.05) saturate(1.05)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(15,20,25,0.85) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                <div className="font-display" style={{ fontSize: 14, fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{t.label}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

    </section>
  )
}

function Marquee() {
  const items = ['Training', 'Wellness', 'Sauna', 'Kurse', 'BodyPump', 'Yoga', 'Cardio', 'Box-Ring', 'Pilates', 'EGYM', '24/7', 'Zirkeltraining', 'Fitness', 'Whirlpool', 'Kaltbecken']
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--gray-border)', borderBottom: '1px solid var(--gray-border)', background: 'var(--gray-mid)', padding: '16px 0' }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '0 20px', whiteSpace: 'nowrap' }}>
            <span className="font-condensed" style={{ fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9A8470' }}>{item}</span>
            <span style={{ color: 'var(--lime)', fontSize: 5 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Gallery() {
  return (
    <section id="galerie" style={{ background: '#0F1419', padding: 'clamp(80px, 12vh, 140px) 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(16px, 4vw, 56px) 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <span style={{ width: 32, height: 1, background: '#B8924A' }} />
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Einblick</span>
        </div>
        <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 0.95 }}>
          In den <span style={{ color: 'var(--accent-bright)', fontStyle: 'italic' }}>Club.</span>
        </h2>
      </div>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(16px, 4vw, 56px)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}
        className="gallery-grid"
      >
        {GALLERY.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridColumn: i === 0 ? 'span 2' : i === 5 ? 'span 2' : 'span 1',
              aspectRatio: i === 0 || i === 5 ? '16/9' : '1/1',
              position: 'relative',
              overflow: 'hidden',
              background: '#0d0d0d',
            }}>
            <img
              src={item.src}
              srcSet={`${item.srcSm} 800w, ${item.src} 1600w`}
              sizes="(max-width: 768px) 50vw, 25vw"
              alt={item.label}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.02) brightness(1.05) saturate(1.05)', transition: 'transform 0.6s ease' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(15,20,25,0.85) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 16, left: 16, padding: '6px 10px', background: 'rgba(15,20,25,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(184, 146, 74, 0.3)' }}>
              <span className="font-condensed" style={{ fontSize: 9, letterSpacing: '0.4em', color: '#B8924A', fontWeight: 700 }}>{item.tag}</span>
            </div>
            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, pointerEvents: 'none' }}>
              <div className="font-display" style={{ fontSize: 14, fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{item.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function PromoBand() {
  return (
    <section style={{ position: 'relative', background: '#0A0E12', overflow: 'hidden', padding: 'clamp(56px, 8vh, 96px) clamp(16px, 4vw, 80px)' }}>
      {/* Burgund glow */}
      <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', width: 700, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(196,69,82,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Top border accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #C44552 30%, #C44552 70%, transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(32px, 5vw, 64px)', position: 'relative' }}>
        <div>
          <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C44552', marginBottom: 16, fontWeight: 700 }}>— Jubiläums-Aktion</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 800, color: '#F5F0E8', lineHeight: 0.9, letterSpacing: '-0.035em', margin: 0 }}>
            2 MONATE<br /><span style={{ color: '#C44552' }}>GRATIS.</span>
          </h2>
        </div>
        <div style={{ maxWidth: 400 }}>
          <p style={{ color: '#9A8878', fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>
            Bei 12 oder 24 Monaten Laufzeit bekommst du 2 Monate komplett geschenkt. Kein Haken. Kein Kleingedrucktes.
          </p>
          <a href="#preise"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C44552', color: '#fff', padding: '16px 36px', textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#E15464')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C44552')}>
            <span className="font-display" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Jetzt sichern</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [term, setTerm] = useState<'3' | '12' | '24'>('24')

  // Echte Preise vom Original (Stand 2026)
  const pricing: Record<string, { basic: { promo: string; reg: string }; premium: { promo: string; reg: string }; allin: { promo: string; reg: string }; bonus?: string }> = {
    '3': { basic: { promo: '15,99', reg: '15,99' }, premium: { promo: '16,99', reg: '16,99' }, allin: { promo: '17,99', reg: '17,99' } },
    '12': { basic: { promo: '15,99', reg: '13,99' }, premium: { promo: '6,99', reg: '13,99' }, allin: { promo: '18,99', reg: '15,99' }, bonus: '2 Monate gratis' },
    '24': { basic: { promo: '13,99', reg: '12,99' }, premium: { promo: '6,49', reg: '12,99' }, allin: { promo: '16,99', reg: '14,99' }, bonus: '2 Monate gratis' },
  }
  const p = pricing[term]

  const plans = [
    { key: 'basic', name: 'Basic', tag: 'Best Value', featured: false, price: p.basic, features: ['Volle Trainingsfläche', 'Duschen inklusive', '24/7 Zugang (05 – 24 Uhr)', 'Add-Ons ab 2,99€/Woche zubuchbar'] },
    { key: 'premium', name: 'Premium', tag: 'Bestseller', featured: false, price: p.premium, features: ['Volle Trainingsfläche', 'Duschen inklusive', '1 Add-On für 2,99€ inkl.', 'Weitere Add-Ons ab 2,99€/Woche'] },
    { key: 'allin', name: 'All-In', tag: 'Komplett', featured: true, price: p.allin, features: ['Trainingsfläche & Duschen', 'Getränke-Flatrate', 'Sauna-Oase', 'Alle Gruppenkurse', 'EGYM Training', 'Betreutes Zirkeltraining'] },
  ]

  return (
    <section id="preise" style={{ background: '#0F1419', padding: 'clamp(80px, 12vh, 160px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <span style={{ width: 32, height: 1, background: '#B8924A' }} />
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Mitgliedschaft</span>
        </div>
        <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 16, textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 0.95 }}>
          Dein Plan. <span style={{ color: 'var(--accent-bright)', fontStyle: 'italic' }}>Dein Preis.</span>
        </h2>
        <p style={{ color: '#9A8470', fontSize: 15, lineHeight: 1.7, marginBottom: 48, maxWidth: 540 }}>
          Echte Preise. Keine Tricks. 14 Tage testen — voller Erstattung wenn's nicht passt.
        </p>

        {/* Term tabs */}
        <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: 'rgba(58, 32, 32, 0.4)', border: '1px solid rgba(184, 146, 74, 0.2)', marginBottom: 48 }}>
          {(['3', '12', '24'] as const).map(t => (
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
                background: term === t ? '#B8924A' : 'transparent',
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {plans.map((plan, i) => {
            const hasPromo = plan.price.promo !== plan.price.reg
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  padding: 36,
                  background: plan.featured ? 'linear-gradient(180deg, #1A2128 0%, #1A2128 100%)' : '#1A2128',
                  border: plan.featured ? '1px solid #B8924A' : '1px solid rgba(184, 146, 74, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Top corner — Bonus badge */}
                {p.bonus && plan.featured && (
                  <div style={{ position: 'absolute', top: -1, right: -1, padding: '8px 14px', background: '#B8924A', color: '#0F1419' }}>
                    <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 }}>{p.bonus}</span>
                  </div>
                )}

                {/* Tag */}
                <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: plan.featured ? '#B8924A' : '#5A4030', marginBottom: 8, fontWeight: 600 }}>{plan.tag}</div>

                {/* Plan name */}
                <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', marginBottom: 24, letterSpacing: '-0.01em' }}>{plan.name}</div>

                {/* Price block */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span className="font-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, color: plan.featured ? 'var(--accent-bright)' : '#F5F0E8', lineHeight: 1, letterSpacing: '-0.03em' }}>
                      {plan.price.promo}€
                    </span>
                    <span className="font-condensed" style={{ fontSize: 12, color: '#9A8470', letterSpacing: '0.15em', textTransform: 'uppercase' }}>/ Woche</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6E5A48', marginTop: 8, lineHeight: 1.5 }}>
                    {hasPromo ? (
                      <>Erste 4 Monate · danach <span style={{ color: '#9A8470' }}>{plan.price.reg}€/Woche</span></>
                    ) : (
                      <>Konstanter Preis über {term} Monate</>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 36, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 13, color: '#C9BFB3', lineHeight: 1.5 }}>
                      <span style={{ color: '#B8924A', flexShrink: 0, marginTop: 1, fontWeight: 700 }}>+</span>{f}
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  href="https://www.fitness-club-fellbach.de/membership/memberships"
                  target="_blank" rel="noopener noreferrer"
                  variant={plan.featured ? 'lime' : 'outline'}
                  className="w-full"
                >
                  <span>14 Tage testen</span><span>→</span>
                </MagneticButton>
              </motion.div>
            )
          })}
        </div>

        <p style={{ textAlign: 'center', color: '#5A4030', fontSize: 11, marginTop: 36, letterSpacing: '0.08em', lineHeight: 1.6 }}>
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
    <section style={{ background: '#F5F0E8', padding: 'clamp(80px, 12vh, 140px) 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(24px, 5vw, 80px)', alignItems: 'end', marginBottom: 56 }} className="testimonials-header">
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
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(26,15,15,0.08)', padding: 28, boxShadow: '0 4px 16px rgba(26,15,15,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 35.2 44 30 44 24c0-1.3-.1-2.6-.4-3.9z"/>
              </svg>
              <div>
                <div style={{ fontSize: 11, color: '#5A4040', letterSpacing: '0.05em' }}>Google Bewertungen</div>
                <div className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#0F1419', lineHeight: 1 }}>4,7 / 5,0</div>
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
          <div style={{ display: 'flex', gap: 16, animation: 'marquee-left 45s linear infinite' }}
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

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <a href="https://www.google.com/search?q=fitness+club+fellbach" target="_blank" rel="noopener noreferrer" className="font-condensed" style={{ display: 'inline-block', padding: '12px 28px', border: '1px solid rgba(26,15,15,0.2)', color: '#0F1419', textDecoration: 'none', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', background: '#FFFFFF' }}>
            Alle Bewertungen auf Google ansehen →
          </a>
        </div>
      </div>
    </section>
  )
}

function KursplanWidget() {
  return (
    <section style={{ background: 'linear-gradient(180deg, #0F1419 0%, #111820 100%)', padding: 'clamp(64px, 10vh, 100px) clamp(16px, 4vw, 80px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 32, height: 1, background: '#C44552' }} />
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C44552', fontWeight: 600 }}>Kursprogramm</span>
        </div>
        <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.025em' }}>
          Dein Wochenplan.
        </h2>
        <p style={{ color: '#9A8878', fontSize: 14, marginBottom: 40, maxWidth: 'none' }}>
          Alle Kurse inkl. im Mitgliedsbeitrag — Platz reservieren über die <span style={{ color: '#F5F0E8', fontWeight: 600 }}>MySports App</span>.
        </p>
        {/* iframe wrapper — auf echter Domain lädt Widget, Fallback darunter immer sichtbar wenn blocked */}
        <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', minHeight: 420 }}>
          {/* Fallback — sichtbar wenn iframe geblockt */}
          <div style={{ position: 'absolute', inset: 0, background: '#1A2128', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: 40 }}>
            <div style={{ textAlign: 'center' }}>
              <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C44552', marginBottom: 12, fontWeight: 600 }}>Live · Immer aktuell</div>
              <div className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 700, textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 1.1, marginBottom: 12 }}>
                30+ Kurse pro Woche.
              </div>
              <p style={{ color: '#9A8878', fontSize: 14, marginBottom: 28, maxWidth: 'none', marginInline: 'auto' }}>
                BodyPump · Yoga · Pilates · Rückenfit · Zumba · Spinning · Zirkeltraining und viele mehr — alle im Mitgliedsbeitrag inklusive.
              </p>
              <a
                href="https://www.fitness-club-fellbach.de/kurse"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime"
                style={{ padding: '14px 32px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 10 }}
              >
                <span>Kompletten Kursplan ansehen</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 600 }}>
              {['BodyPump','Yoga','Pilates','Rückenfit','Zumba','Spinning','Bauch Beine Po','Bodytoning','Vinyasa Yoga','Zirkeltraining','Step','Bodycross'].map(k => (
                <span key={k} className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '5px 10px', border: '1px solid rgba(245,240,232,0.1)', color: '#9A8878' }}>{k}</span>
              ))}
            </div>
          </div>
          {/* Live iframe — überlagert Fallback wenn geladen */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <iframe
              src="https://courseplan.noexcuse.io/?origin=https%3A%2F%2Fwww.fitness-club-fellbach.de&id=Zml0bmVzcy1jbHViLWZlbGxiYWNoOjEyMTAwMTEzOTA%253D&disableEmployeeExpertises=true&height=auto&baseHost=mysports.com"
              width="100%"
              height="750"
              frameBorder="0"
              title="Kursplan Fitness Club Fellbach"
              style={{ display: 'block', border: 'none', marginTop: -52 }}
              loading="lazy"
            />
            {/* Dropdown-Maske — blendet Standort-Auswahl aus */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 52,
              background: '#ffffff', zIndex: 2, pointerEvents: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9A8878', fontWeight: 600 }}>
                Fitness Club Fellbach
              </span>
            </div>
          </div>
        </div>
        <p style={{ fontSize: 11, color: '#5A6770', marginTop: 12, letterSpacing: '0.05em', maxWidth: 'none' }}>
          Kursplan wird live geladen — immer aktuell, keine Pflege nötig.
        </p>
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
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(64px, 10vh, 96px) clamp(16px, 4vw, 48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(32px, 6vw, 64px)', alignItems: 'center' }}>
        <div>
          <div className="label reveal" style={{ marginBottom: 16 }}>Kontakt</div>
          <h2 className="font-display reveal delay-1" style={{ fontSize: 'var(--heading-lg)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
            KOMM VORBEI.<br /><span style={{ color: 'var(--lime)' }}>JEDERZEIT.</span>
          </h2>
          <div className="reveal delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {[
              { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C44552" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: 'Bruckstraße 61, 70736 Fellbach', href: 'https://maps.google.com/?q=Bruckstraße+61+Fellbach' },
              { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C44552" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>, text: '+49 711 58 8654', href: 'tel:+4971158 8654' },
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
        <div className="reveal delay-2" style={{ background: 'var(--black)', border: '1px solid var(--gray-border)', padding: '48px 40px' }}>
          <div className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 16 }}>
            BEREIT ZUM<br /><span style={{ color: 'var(--lime)' }}>TRAINING?</span>
          </div>
          <p style={{ color: '#C9BFB3', fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
            Starte noch heute mit 14 Tagen komplett kostenlos. Kein Risiko — voller Zugang ab Tag 1.
          </p>
          <MagneticButton
            href="https://www.fitness-club-fellbach.de/membership/memberships"
            target="_blank" rel="noopener noreferrer"
            variant="lime" className="w-full"
          >
            <span>14 Tage gratis starten</span><span>→</span>
          </MagneticButton>
          <div style={{ height: 12 }} />
          <MagneticButton href="tel:+4971158 8654" variant="outline" className="w-full">
            <span>Anrufen</span>
          </MagneticButton>
        </div>
      </div>

      {/* Google Maps */}
      <div style={{ position: 'relative', height: 300, overflow: 'hidden', borderTop: '1px solid var(--gray-border)' }}>
        <iframe
          src="https://maps.google.com/maps?q=Fitness+Club+Fellbach,+Bruckstraße+61,+70736+Fellbach&z=16&output=embed&hl=de"
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
        <div style={{
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

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <Logo size="md" variant="light" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {[['Datenschutz', '/datenschutz'], ['Impressum', '/impressum'], ['Kündigung', '/kuendigung'], ['Karriere', '/karriere']].map(([l, h]) => (
              <a key={l} href={h}
                 style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9A8470', textDecoration: 'none' }}>
                {l}
              </a>
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#5A6770', letterSpacing: '0.1em' }}>© 2026 Fitness Club GmbH</div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <MouseSpotlight />
      <LiveTicker />
      <Nav />
      <Hero />
      <Marquee />
      <WelcomeIntro />
      <StudioTour />
      <StatementBanner />
      <div id="bereiche">
        <TrainingsflaecheSpotlight />
      </div>
      <EgymSpotlight />
      <KurseGrid />
      <WellnessSpotlight />
      <PullQuote
        before="05:00 — 24:00 · Täglich"
        text="Kein Mensch der dir sagt wann du trainieren kannst."
        highlight="kein Mensch"
        variant="dark"
      />
      <BigStats />
      <ZielRechner />
      <Gallery />
      <KursplanWidget />
      <TrainerSection />
      <SpecialPrograms />
      <AddonsBand />
      <PullQuote
        before="500+ Mitglieder · Fellbach"
        text="Manche kommen für die Geräte. Alle bleiben wegen der Menschen."
        highlight="Alle bleiben"
        variant="light"
        bg="#F5F0E8"
      />
      <PromoBand />
      <Pricing />
      <TrainingsplanSection />
      <Testimonials />
      <PullQuote
        before="Bruckstraße 61"
        text="Eine Tür weiter — eine ganze Welt weiter."
        highlight="eine ganze Welt weiter."
        after="Physio Zentrum Fellbach · vom selben Inhaber"
        variant="dark"
      />
      <PhysioBridge />
      <FAQ />
      <Contact />
      <Footer />

    </>
  )
}
