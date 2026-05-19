import Logo from './Logo'

/**
 * Shared Sub-Navbar for all non-homepage routes.
 * Consistent look: Logo + Back + Phone (mobile) — matches main Nav style.
 */
export default function SubNav() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(15,20,25,0.92)',
      backdropFilter: 'blur(24px) saturate(1.2)',
      borderBottom: '1px solid rgba(245,240,232,0.06)',
      boxShadow: '0 1px 0 rgba(245,240,232,0.06), 0 4px 20px rgba(0,0,0,0.3)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo → Home */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size="lg" variant="light" />
        </a>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Back link — all screens */}
          <a href="/" className="font-condensed" style={{
            fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#9A8878', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 6,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9A8878')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            <span className="hidden sm:inline">Startseite</span>
          </a>

          {/* Phone — desktop */}
          <a href="tel:+49711588654" className="hidden lg:flex font-condensed" style={{
            alignItems: 'center', gap: 8,
            fontSize: 14, letterSpacing: '0.15em', color: '#E8E0D8',
            textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#E8E0D8')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
            0711 588 654
          </a>

          {/* Phone CTA — mobile */}
          <a href="tel:+49711588654" className="flex lg:hidden font-condensed" style={{
            alignItems: 'center', gap: 6,
            padding: '8px 14px', background: 'var(--accent)', color: '#0F1419',
            textDecoration: 'none', fontSize: 10, letterSpacing: '0.2em',
            textTransform: 'uppercase', fontWeight: 700,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
            Anrufen
          </a>
        </div>
      </div>
    </nav>
  )
}
