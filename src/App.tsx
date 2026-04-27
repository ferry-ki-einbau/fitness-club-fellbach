import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './index.css'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import MagneticButton from './components/MagneticButton'
import HorizontalBereiche from './components/HorizontalBereiche'
import LiveTicker from './components/LiveTicker'
import Konfigurator from './components/Konfigurator'
import GreekMeander from './components/GreekMeander'
import SpartanMark from './components/SpartanMark'

const CDN = 'https://cdn.prod.website-files.com/64c8b8357249be90e806d8b9'
const img = (path: string) => `${CDN}/${path}`

const GALLERY = [
  { src: img('64c8f4a51bf8dc010d2f3801_DSC02040%202.png'), label: 'Box-Ring' },
  { src: img('64c8ee1414476c15c5c9e632_DSC02147%201.png'), label: 'Trainingsbereich' },
  { src: img('64ca17b393996cd8252f4065_DSC02123%201.png'), label: 'Kursraum' },
  { src: img('64f83856658cd0d76e14a167_Cardioarea.png'), label: 'Cardio' },
  { src: img('64f838771c7353d88f0e13fe_Eingangsbereich.png'), label: 'Eingang' },
  { src: img('64f8392473ca306920e2b4ca_Poolarea.png'), label: 'Wellness Pool' },
  { src: img('64f8390773ca306920e2892e_Wellnessarea.png'), label: 'Sauna' },
  { src: img('64f839c3c0bf005c90ea03e4_Kursraum%202.png'), label: 'Gruppenraum' },
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

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setCount(Math.round(ease * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  return { count, ref }
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [
    { label: 'Bereiche', href: '#bereiche' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Konfigurator', href: '#konfigurator' },
    { label: 'Preise', href: '#preise' },
    { label: 'Kontakt', href: '#kontakt' },
  ]
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass' : ''}`}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <a href="#" style={{ color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <SpartanMark size={40} />
          <span className="font-display" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1.15 }}>
            FITNESS CLUB
            <span style={{ display: 'block', fontSize: 9, letterSpacing: '0.4em', fontWeight: 300, color: 'var(--text-muted)', fontFamily: 'Barlow Condensed, sans-serif' }}>FELLBACH</span>
          </span>
        </a>
        <div className="hidden md:flex" style={{ gap: 32, alignItems: 'center' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="font-condensed"
               style={{ fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
               onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
               onMouseLeave={e => (e.target as HTMLElement).style.color = '#666'}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="#preise" className="btn-lime hidden md:inline-flex" style={{ padding: '12px 24px', fontSize: 12 }}>
          <span>Mitglied werden</span>
        </a>
        <button className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} onClick={() => setOpen(!open)}>
          <div style={{ width: 24, height: 2, background: '#fff', marginBottom: 5, transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <div style={{ width: 24, height: 2, background: '#fff', marginBottom: 5, opacity: open ? 0 : 1, transition: 'opacity 0.3s' }} />
          <div style={{ width: 24, height: 2, background: '#fff', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>
      {open && (
        <div style={{ background: 'var(--black)', borderTop: '1px solid var(--gray-border)', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="font-condensed"
               style={{ fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#666', textDecoration: 'none' }}
               onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#preise" className="btn-lime" style={{ justifyContent: 'center', marginTop: 8 }} onClick={() => setOpen(false)}>
            <span>Mitglied werden</span>
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const heroImg = img('64c8f4a51bf8dc010d2f3801_DSC02040%202.png')
  const sideImg = img('64c8ee1414476c15c5c9e632_DSC02147%201.png')
  return (
    <section data-hero style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#0A0505' }}>
      {/* Full-bleed gym photograph — sharp, no filters */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', imageRendering: 'crisp-edges', filter: 'contrast(1.12) saturate(0.85)' }} />
      </motion.div>

      {/* Gradient — left dark for type, right reveal */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(95deg, rgba(8,4,4,0.96) 0%, rgba(8,4,4,0.85) 35%, rgba(8,4,4,0.45) 65%, rgba(8,4,4,0.2) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(8,4,4,0.7) 0%, transparent 22%, transparent 65%, rgba(8,4,4,0.95) 100%)', pointerEvents: 'none' }} />

      {/* Greek meander, larger + brighter behind the right side */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <GreekMeander />
      </div>

      {/* Film grain */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 4, opacity: 0.14, mixBlendMode: 'overlay', pointerEvents: 'none', backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />

      {/* Vertical edge label — left */}
      <div style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%) rotate(180deg)', writingMode: 'vertical-rl', zIndex: 5, fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 500 }}>EST · MMXVIII · Fellbach</div>

      {/* Content grid */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1440, margin: '0 auto', padding: 'clamp(140px, 18vh, 200px) clamp(56px, 6vw, 96px) clamp(64px, 10vh, 120px)', width: '100%', minHeight: '100vh', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.85fr)', gap: 'clamp(24px, 4vw, 80px)', alignItems: 'end' }}>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
            <span style={{ width: 48, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.55em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>ΜΟΛΩΝ ΛΑΒΕ</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)', fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.035em', margin: '0 0 32px', textTransform: 'uppercase', color: '#F5F0E8', maxWidth: '14ch' }}>
            <span style={{ display: 'block' }}>Stärke.</span>
            <span style={{ display: 'block', color: 'var(--accent-bright)', fontStyle: 'italic', fontWeight: 700, transform: 'translateX(0.08em)' }}>Disziplin.</span>
            <span style={{ display: 'block', WebkitTextStroke: '1.5px #F5F0E8', color: 'transparent' }}>Gemeinschaft.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.35 }}
            style={{ color: '#C9BFB3', fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)', lineHeight: 1.55, marginBottom: 44, maxWidth: 520, fontWeight: 400 }}>
            Box-Ring, Cardio, Kraft, Kurse, Sauna, Pool. <span style={{ color: '#F5F0E8' }}>Alles unter einem Dach</span> — mitten in Fellbach, 24 Stunden am Tag.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 64 }}>
            <MagneticButton href="#preise" variant="lime">
              <span>14 Tage kostenlos testen</span><span>→</span>
            </MagneticButton>
            <MagneticButton href="#bereiche" variant="outline">
              <span>Studio entdecken</span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.7 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 'clamp(20px, 3vw, 56px)', paddingTop: 32, borderTop: '1px solid rgba(184, 146, 74, 0.25)' }}>
            {[['24/7', 'Geöffnet'], ['3', 'Bereiche'], ['500+', 'Mitglieder'], ['2018', 'Seit']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display" style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', fontWeight: 700, color: '#B8924A', lineHeight: 1, letterSpacing: '-0.02em' }}>{n}</div>
                <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A7A66', marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: floating editorial card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
          className="hero-side-card"
          style={{ position: 'relative', aspectRatio: '3/4', maxHeight: '60vh', alignSelf: 'center', justifySelf: 'end', width: '100%', maxWidth: 380 }}>
          <div style={{ position: 'absolute', inset: -2, border: '1px solid #B8924A', transform: 'translate(12px, 12px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)' }}>
            <img src={sideImg} alt="Trainingsbereich Fitness Club Fellbach" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) saturate(0.9)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(8,4,4,0.85) 100%)' }} />
            <div style={{ position: 'absolute', left: 20, bottom: 20, right: 20 }}>
              <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#B8924A', marginBottom: 6 }}>01 — Trainingsbereich</div>
              <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#F5F0E8', letterSpacing: '-0.01em' }}>Kraft · Cardio · Functional</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom-right scroll indicator */}
      <div style={{ position: 'absolute', bottom: 24, right: 32, display: 'flex', alignItems: 'center', gap: 12, zIndex: 5 }}>
        <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#B8924A' }}>Scroll</span>
        <div style={{ width: 64, height: 1, background: 'linear-gradient(90deg, #B8924A, transparent)' }} />
      </div>
    </section>
  )
}

function Marquee() {
  const items = ['Training', 'Wellness', 'Sauna', 'Kurse', 'BodyPump', 'Yoga', 'Cardio', 'Box-Ring', 'Pilates', 'EGYM', '24/7', 'Zirkeltraining', 'Fitness', 'Pool']
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--gray-border)', borderBottom: '1px solid var(--gray-border)', background: 'var(--gray-mid)', padding: '16px 0' }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '0 20px', whiteSpace: 'nowrap' }}>
            <span className="font-condensed" style={{ fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#444' }}>{item}</span>
            <span style={{ color: 'var(--lime)', fontSize: 5 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Stat({ target, suffix, label }: { target: number; suffix?: string; label: string }) {
  const { count, ref } = useCounter(target)
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--lime)', lineHeight: 1 }}>
        <span ref={ref}>{count}</span>{suffix}
      </div>
      <div className="label" style={{ color: 'var(--text-muted)', marginTop: 10 }}>{label}</div>
    </div>
  )
}

function Stats() {
  return (
    <section style={{ background: 'var(--black)', padding: 'var(--section-spacing) 0', borderBottom: '1px solid var(--gray-border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--container-padding)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }} className="md:grid-cols-4">
          <Stat target={24} suffix="h" label="Täglich geöffnet" />
          <Stat target={3} label="Bereiche" />
          <Stat target={30} suffix="+" label="Kurse / Woche" />
          <Stat target={14} label="Tage gratis testen" />
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section id="galerie" style={{ background: 'var(--gray-dark)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px 32px' }}>
        <div className="label reveal" style={{ marginBottom: 12 }}>Einblick</div>
        <h2 className="font-display reveal delay-1" style={{ fontSize: 'var(--heading-lg)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 48 }}>
          IN DEN <span style={{ color: 'var(--lime)' }}>CLUB.</span>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto', gap: 1, background: 'var(--gray-border)' }}>
        {GALLERY.map((item, i) => (
          <div key={item.label}
               className={`gallery-item reveal delay-${Math.min(i + 1, 5)}`}
               style={{
                 gridColumn: i === 0 ? 'span 2' : i === 5 ? 'span 2' : 'span 1',
                 aspectRatio: i === 0 || i === 5 ? '16/9' : '1/1',
                 background: '#0d0d0d',
               }}>
            <img src={item.src} alt={item.label} loading="lazy" />
            <div className="cap">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function PromoBand() {
  return (
    <section style={{ background: 'var(--lime)', padding: '80px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
        <div>
          <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: 12 }}>Jubiläums-Aktion</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700, color: '#000', lineHeight: 1, letterSpacing: '-0.02em' }}>
            2 MONATE<br />GRATIS.
          </h2>
        </div>
        <div style={{ maxWidth: 440 }}>
          <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
            Bei einer Basic- oder All-In-Mitgliedschaft mit 12 oder 24 Monaten Laufzeit bekommst du am Ende 2 Monate geschenkt. Jetzt sichern.
          </p>
          <a href="#preise" className="font-display"
             style={{ display: 'inline-flex', background: '#000', color: '#fff', padding: '16px 36px', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Jetzt sichern →
          </a>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'Basic',
      amount: '29',
      featured: false,
      features: ['Volle Trainingsfläche', 'Duschen inklusive', 'Getränke inklusive', '24/7 Zugang', 'Add-Ons ab 3,49€/Woche zubuchbar'],
      cta: 'Basic starten',
    },
    {
      name: 'All-In',
      amount: '49',
      featured: true,
      features: ['Trainingsfläche inklusive', 'Duschen & Getränke', 'Sauna inklusive', 'Alle Gruppenkurse', 'EGYM-Training', 'Betreutes Zirkeltraining', '24/7 Zugang'],
      cta: 'All-In starten',
    },
  ]
  return (
    <section id="preise" style={{ background: 'var(--black)', padding: '96px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <div className="label reveal" style={{ marginBottom: 12 }}>Mitgliedschaft</div>
        <h2 className="font-display reveal delay-1" style={{ fontSize: 'var(--heading-lg)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
          DEIN <span style={{ color: 'var(--lime)' }}>PLAN.</span>
        </h2>
        <p className="reveal delay-2" style={{ color: '#555', fontSize: 14, lineHeight: 1.7, marginBottom: 56, maxWidth: 480 }}>
          Keine versteckten Kosten. 14 Tage Widerrufsrecht. Starte sofort — 100% risikofrei.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {plans.map((p, i) => (
            <div key={p.name} className={`card reveal delay-${i + 2}`}
                 style={{ padding: 36, borderColor: p.featured ? 'var(--lime)' : undefined, position: 'relative' }}>
              {p.featured && (
                <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>◆</span> Beliebteste Wahl
                </div>
              )}
              <div className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#555', marginBottom: 8 }}>{p.name}</div>
              <div className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: p.featured ? 'var(--lime)' : '#fff', lineHeight: 1, marginBottom: 6 }}>
                {p.amount}€
              </div>
              <div style={{ fontSize: 12, color: '#444', marginBottom: 32 }}>/ Monat · Preis variiert nach Laufzeit</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 13, color: '#888' }}>
                    <span style={{ color: 'var(--lime)', flexShrink: 0, marginTop: 1 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <MagneticButton
                href="https://www.fitness-club-fellbach.de/membership/memberships"
                target="_blank" rel="noopener noreferrer"
                variant={p.featured ? 'lime' : 'outline'}
                className="w-full"
              >
                <span>{p.cta}</span><span>→</span>
              </MagneticButton>
            </div>
          ))}
        </div>
        <p className="reveal" style={{ textAlign: 'center', color: '#333', fontSize: 11, marginTop: 28, letterSpacing: '0.05em' }}>
          Einmalige Aufnahmegebühr: 20,00€ (Transponder-Armband) · Monatlich kündbar nach Laufzeitende
        </p>
      </div>
    </section>
  )
}

function Testimonials() {
  const reviews = [
    { name: 'David M.', text: 'Endlich ein Fitnessstudio das wirklich 24h geöffnet ist. Die Geräte sind top, immer sauber und das Personal super freundlich.', stars: 5 },
    { name: 'Teresa K.', text: 'Die Sauna nach dem Training ist der Hammer. Selten so ein vollständiges Paket gefunden. Der Kursplan ist super abwechslungsreich.', stars: 5 },
    { name: 'Gunter F.', text: 'Ich bin jetzt seit 8 Monaten dabei. Die Trainer motivieren wirklich und ich sehe echte Ergebnisse.', stars: 5 },
    { name: 'Sarah L.', text: 'BodyPump und Yoga in einem Studio — das hat mir wirklich gefehlt. Top Atmosphäre, nie überfüllt.', stars: 5 },
    { name: 'Marco B.', text: 'Der Box-Ring ist ein absolutes Alleinstellungsmerkmal. Als Kampfsportler finde ich hier alles was ich brauche.', stars: 5 },
  ]
  return (
    <section style={{ background: 'var(--gray-dark)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="label reveal" style={{ marginBottom: 12 }}>Mitglieder</div>
        <h2 className="font-display reveal delay-1" style={{ fontSize: 'var(--heading-lg)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 48 }}>
          WAS ANDERE <span style={{ color: 'var(--lime)' }}>SAGEN.</span>
        </h2>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
          {reviews.map((r, i) => (
            <div key={r.name} className={`reveal delay-${Math.min(i + 1, 5)}`}
                 style={{ flexShrink: 0, width: 300, background: 'var(--gray-mid)', border: '1px solid var(--gray-border)', padding: 28 }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {Array(r.stars).fill(0).map((_, j) => <span key={j} style={{ color: 'var(--lime)', fontSize: 13 }}>★</span>)}
              </div>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.75, marginBottom: 20 }}>"{r.text}"</p>
              <div className="font-display" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.name}</div>
            </div>
          ))}
        </div>
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
    <section style={{ background: 'var(--black)', padding: '96px 0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <div className="label reveal" style={{ marginBottom: 12 }}>FAQ</div>
        <h2 className="font-display reveal delay-1" style={{ fontSize: 'var(--heading-lg)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 48 }}>
          NOCH <span style={{ color: 'var(--lime)' }}>FRAGEN?</span>
        </h2>
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--gray-border)' }}>
            <button className="reveal" onClick={() => setOpen(open === i ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', gap: 16, textAlign: 'left' }}>
              <span className="font-display" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', fontWeight: 500, letterSpacing: '0.02em' }}>{item.q}</span>
              <span style={{ color: 'var(--lime)', flexShrink: 0, fontSize: 22, lineHeight: 1, transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none', display: 'block' }}>+</span>
            </button>
            <div className={`faq-answer ${open === i ? 'open' : ''}`}>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.75, paddingBottom: 20 }}>{item.a}</p>
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
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
        <div>
          <div className="label reveal" style={{ marginBottom: 16 }}>Kontakt</div>
          <h2 className="font-display reveal delay-1" style={{ fontSize: 'var(--heading-lg)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
            KOMM VORBEI.<br /><span style={{ color: 'var(--lime)' }}>JEDERZEIT.</span>
          </h2>
          <div className="reveal delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
            {[['📍', 'Bruckstraße 61, 70734 Fellbach', '#'], ['📞', '+49 711 58 8654', 'tel:+4971158 8654'], ['✉', 'info@fitnessclubfellbach.de', 'mailto:info@fitnessclubfellbach.de']].map(([icon, text, href]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 14, color: '#666' }}>
                <span style={{ color: 'var(--lime)' }}>{icon}</span>
                <a href={href} style={{ color: '#666', textDecoration: 'none' }}
                   onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
                   onMouseLeave={e => (e.target as HTMLElement).style.color = '#666'}>{text}</a>
              </div>
            ))}
          </div>
          <div className="reveal delay-3" style={{ background: 'var(--black)', border: '1px solid var(--gray-border)', padding: 24 }}>
            <div className="label" style={{ color: '#444', marginBottom: 14 }}>Öffnungszeiten</div>
            {[['Studio (täglich)', '05:00 – 00:00', true], ['Betreuung Mo–Fr', '08–12 · 16–21 Uhr', false], ['Betreuung Sa+So', '09–14 Uhr', false]].map(([k, v, highlight]) => (
              <div key={String(k)} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: '#555' }}>{k}</span>
                <span style={{ color: highlight ? 'var(--lime)' : '#666' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal delay-2" style={{ background: 'var(--black)', border: '1px solid var(--gray-border)', padding: '48px 40px' }}>
          <div className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 16 }}>
            BEREIT ZUM<br /><span style={{ color: 'var(--lime)' }}>TRAINING?</span>
          </div>
          <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
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
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ background: 'var(--black)', borderTop: '1px solid var(--gray-border)', padding: '32px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SpartanMark size={28} />
          <span className="font-display" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text)' }}>
            FITNESS CLUB FELLBACH
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {[['Datenschutz', 'https://www.fitness-club-fellbach.de/datenschutz'], ['Impressum', 'https://www.fitness-club-fellbach.de/impressum'], ['Kündigung', 'https://www.fitness-club-fellbach.de/kundigung'], ['Karriere', 'https://www.fitness-club-fellbach.de/karriere']].map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noopener noreferrer"
               style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#333', textDecoration: 'none' }}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#2a2a2a', letterSpacing: '0.1em' }}>© 2025 Fitness Club GmbH</div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Preloader />
      <CustomCursor />
      <LiveTicker />
      <Nav />
      <Hero />
      <Marquee />
      <div id="bereiche">
        <HorizontalBereiche />
      </div>
      <Stats />
      <Gallery />
      <PromoBand />
      <div id="konfigurator">
        <Konfigurator />
      </div>
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  )
}
