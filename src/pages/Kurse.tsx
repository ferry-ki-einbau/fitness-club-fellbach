import { useEffect } from 'react'
import Logo from '../components/Logo'
import CookieBanner from '../components/CookieBanner'

const KURSE = ['BodyPump','Yoga','Pilates','Rückenfit','Zumba','Spinning','Bauch Beine Po','Bodytoning','Vinyasa Yoga','Zirkeltraining','Step','Bodycross']

export default function Kurse() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Kursplan — Fitness Club Fellbach | 30+ Kurse pro Woche'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Aktueller Kursplan Fitness Club Fellbach: BodyPump, Yoga, Pilates, Spinning, Rückenfit und 30+ weitere Kurse. Alle im Mitgliedsbeitrag inklusive.')
  }, [])

  return (
    <div style={{ background: '#0F1419', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(15,20,25,0.95)', backdropFilter: 'blur(24px)', boxShadow: '0 1px 0 rgba(245,240,232,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo size="lg" variant="light" />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="/" className="font-condensed" style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9A8878', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9A8878')}>
              ← Zurück
            </a>
            <a href="tel:+49711588654" className="font-condensed hidden sm:flex" style={{ alignItems: 'center', gap: 6, fontSize: 12, letterSpacing: '0.12em', color: '#9A8878', textDecoration: 'none' }}>
              0711 588 654
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header style={{ padding: 'clamp(48px, 8vh, 80px) clamp(16px, 4vw, 48px) clamp(32px, 5vh, 48px)', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
          <span style={{ width: 32, height: 1, background: '#C44552' }} />
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C44552', fontWeight: 600 }}>Kursprogramm</span>
          <span style={{ width: 32, height: 1, background: '#C44552' }} />
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, textTransform: 'uppercase', color: '#F5F0E8', lineHeight: 0.95, letterSpacing: '-0.025em', marginBottom: 16 }}>
          Dein Wochenplan.
        </h1>
        <p style={{ color: '#9A8878', fontSize: 15, maxWidth: 560, marginInline: 'auto', marginBottom: 28 }}>
          Alle Kurse im Mitgliedsbeitrag inklusive — Platz reservieren über die <span style={{ color: '#F5F0E8', fontWeight: 600 }}>MySports App</span>.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 640, marginInline: 'auto' }}>
          {KURSE.map(k => (
            <span key={k} className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 10px', border: '1px solid rgba(245,240,232,0.1)', color: '#9A8878' }}>{k}</span>
          ))}
        </div>
      </header>

      {/* Kursplan iframe */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) clamp(48px, 8vh, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
          <iframe
            src="https://courseplan.noexcuse.io/?origin=https%3A%2F%2Fwww.fitness-club-fellbach.de&id=Zml0bmVzcy1jbHViLWZlbGxiYWNoOjEyMTAwMTEzOTA%253D&disableEmployeeExpertises=true&height=auto&baseHost=mysports.com"
            width="100%"
            height="2200"
            className="kursplan-iframe"
            title="Kursplan Fitness Club Fellbach"
            style={{ display: 'block', border: 'none', marginTop: -52 }}
            loading="eager"
          />
          {/* Dropdown-Maske */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 52,
            background: '#0F1419', zIndex: 2, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#5A6770', fontWeight: 600 }}>
              Fitness Club Fellbach
            </span>
          </div>
        </div>
        <p style={{ fontSize: 11, color: '#5A6770', marginTop: 12, letterSpacing: '0.05em', maxWidth: 'none', textAlign: 'center' }}>
          Kursplan wird live geladen — immer aktuell, keine Pflege nötig.
        </p>
      </section>

      {/* App Download CTA */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) clamp(48px, 8vh, 80px)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '28px 32px', background: 'rgba(184,146,74,0.06)', border: '1px solid rgba(184,146,74,0.2)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', marginBottom: 4 }}>MySports App</div>
            <div style={{ fontSize: 13, color: '#9A8878' }}>Kurse buchen, Plätze reservieren, Trainings tracken.</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="https://apps.apple.com/de/app/mysports/id1206433997" target="_blank" rel="noopener noreferrer" className="font-condensed" style={{ padding: '10px 16px', border: '1px solid rgba(184,146,74,0.3)', color: '#F5F0E8', textDecoration: 'none', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'all 0.2s' }}>App Store</a>
            <a href="https://play.google.com/store/apps/details?id=io.noexcuse.android" target="_blank" rel="noopener noreferrer" className="font-condensed" style={{ padding: '10px 16px', border: '1px solid rgba(184,146,74,0.3)', color: '#F5F0E8', textDecoration: 'none', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'all 0.2s' }}>Google Play</a>
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <footer style={{ padding: '32px clamp(16px, 4vw, 48px)', borderTop: '1px solid rgba(245,240,232,0.06)', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#5A6770' }}>
          © {new Date().getFullYear()} Fitness Club Fellbach · Bruckstraße 61, 70734 Fellbach ·{' '}
          <a href="/impressum" style={{ color: '#9A8878', textDecoration: 'none' }}>Impressum</a> ·{' '}
          <a href="/datenschutz" style={{ color: '#9A8878', textDecoration: 'none' }}>Datenschutz</a>
        </p>
      </footer>

      <CookieBanner />
    </div>
  )
}
