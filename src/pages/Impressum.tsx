import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'

export default function Impressum() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const sectionStyle: React.CSSProperties = {
    marginBottom: 40,
  }

  const h2Style: React.CSSProperties = {
    fontSize: 'clamp(18px, 2.5vw, 22px)',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    color: '#F5F0E8',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottom: '1px solid rgba(184,146,74,0.25)',
  }

  const pStyle: React.CSSProperties = {
    fontSize: 15,
    lineHeight: 1.75,
    color: '#B5A99A',
    marginBottom: 12,
  }

  return (
    <div style={{ background: '#0F1419', minHeight: '100vh', color: '#F5F0E8' }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(15,20,25,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(245,240,232,0.06)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Logo size="lg" variant="light" />
          </a>
          <a href="/" className="font-condensed" style={{
            fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#9A8878', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9A8878')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Startseite
          </a>
        </div>
      </header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 48px)' }}
      >
        <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12, display: 'block' }}>Rechtliches</span>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#F5F0E8', marginBottom: 48 }}>
          Impressum
        </h1>

        {/* Angaben gemaess §5 TMG */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>Angaben gem. &sect; 5 TMG</h2>
          <p style={pStyle}>
            Fitness &amp; Sport GmbH<br />
            (handelnd als Fitness Club Fellbach)<br />
            Bruckstra&szlig;e 61<br />
            70734 Fellbach
          </p>
          <p style={pStyle}>
            <strong style={{ color: '#F5F0E8' }}>Vertreten durch:</strong><br />
            Marcel R&ouml;hrle, Gesch&auml;ftsf&uuml;hrer
          </p>
        </div>

        {/* Kontakt */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>Kontakt</h2>
          <p style={pStyle}>
            Telefon: <a href="tel:+49711588654" style={{ color: 'var(--accent)', textDecoration: 'none' }}>0711 &ndash; 588 654</a><br />
            E-Mail: <a href="mailto:info@fitnessclubfellbach.de" style={{ color: 'var(--accent)', textDecoration: 'none' }}>info@fitnessclubfellbach.de</a>
          </p>
        </div>

        {/* Handelsregister */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>Registereintrag</h2>
          <p style={pStyle}>
            Eintragung im Handelsregister.<br />
            Registergericht: Amtsgericht Waiblingen<br />
            Registernummer: HRB 260750
          </p>
        </div>

        {/* USt-IdNr */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>Umsatzsteuer-ID</h2>
          <p style={pStyle}>
            Umsatzsteuer-Identifikationsnummer gem. &sect; 27a Umsatzsteuergesetz:<br />
            DE147320679
          </p>
        </div>

        {/* Verantwortlich */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>Verantwortlich f&uuml;r den Inhalt nach &sect; 55 Abs. 2 RStV</h2>
          <p style={pStyle}>
            Marcel R&ouml;hrle<br />
            Bruckstra&szlig;e 61<br />
            70734 Fellbach
          </p>
        </div>

        {/* EU Streitschlichtung */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>EU-Streitschlichtung</h2>
          <p style={pStyle}>
            Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            {' '}<a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>https://ec.europa.eu/consumers/odr/</a>.
          </p>
          <p style={pStyle}>
            Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>

        {/* Haftung Inhalte */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>Haftung f&uuml;r Inhalte</h2>
          <p style={pStyle}>
            Als Diensteanbieter sind wir gem. &sect; 7 Abs. 1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.
          </p>
          <p style={pStyle}>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </div>

        {/* Haftung Links */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>Haftung f&uuml;r Links</h2>
          <p style={pStyle}>
            Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <p style={pStyle}>
            Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf m&ouml;gliche Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </div>

        {/* Urheberrecht */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>Urheberrecht</h2>
          <p style={pStyle}>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
          <p style={pStyle}>
            Downloads und Kopien dieser Seite sind nur f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </div>

      </motion.main>
    </div>
  )
}
