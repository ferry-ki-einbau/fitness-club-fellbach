import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'

export default function Kuendigung() {
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

  const liStyle: React.CSSProperties = {
    fontSize: 15,
    lineHeight: 1.75,
    color: '#B5A99A',
    marginBottom: 8,
    paddingLeft: 8,
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
          <a href="/" style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A8470', textDecoration: 'none' }}>
            ← Zurück zur Startseite
          </a>
        </div>
      </header>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 48px)',
        }}
      >
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
          marginBottom: 12,
        }}>
          Kündigung
        </h1>
        <p style={{ ...pStyle, fontSize: 17, marginBottom: 48 }}>
          Informationen zur Beendigung deiner Mitgliedschaft beim Fitness Club Fellbach.
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Kündigungsfrist</h2>
          <p style={pStyle}>
            Deine Mitgliedschaft kann mit einer Frist von <strong style={{ color: '#F5F0E8' }}>13 Wochen zum Ende der jeweiligen Vertragslaufzeit</strong> gekündigt werden.
          </p>
          <p style={pStyle}>
            Wird die Kündigung nicht fristgerecht eingereicht, verlängert sich der Vertrag automatisch um die ursprünglich vereinbarte Laufzeit.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>So kündigst du</h2>
          <p style={pStyle}>Du hast mehrere Möglichkeiten, deine Mitgliedschaft zu kündigen:</p>
          <ol style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={liStyle}>
              <strong style={{ color: '#F5F0E8' }}>Persönlich vor Ort</strong> — Komm an unserer Theke vorbei (Bruckstraße 61, 70734 Fellbach) und bringe dein Transponder-Armband mit.
            </li>
            <li style={liStyle}>
              <strong style={{ color: '#F5F0E8' }}>Schriftlich per Post</strong> — Sende deine Kündigung an:<br />
              Fitness &amp; Sport GmbH<br />
              Bruckstraße 61<br />
              70734 Fellbach
            </li>
            <li style={liStyle}>
              <strong style={{ color: '#F5F0E8' }}>Per E-Mail</strong> — Schreibe an{' '}
              <a href="mailto:info@fitnessclubfellbach.de" style={{ color: 'var(--accent-bright)', textDecoration: 'underline' }}>
                info@fitnessclubfellbach.de
              </a>{' '}
              mit deinem vollständigen Namen, Geburtsdatum und Mitgliedsnummer.
            </li>
          </ol>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Was du angeben solltest</h2>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={liStyle}>Vollständiger Name</li>
            <li style={liStyle}>Geburtsdatum</li>
            <li style={liStyle}>Mitgliedsnummer (falls vorhanden)</li>
            <li style={liStyle}>Gewünschter Kündigungstermin</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>14 Tage Widerrufsrecht</h2>
          <p style={pStyle}>
            Bei Neuabschluss hast du ein <strong style={{ color: '#F5F0E8' }}>14-tägiges Widerrufsrecht mit voller Erstattung</strong>. Innerhalb dieser Frist kannst du deinen Vertrag ohne Angabe von Gründen widerrufen.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Fragen?</h2>
          <p style={pStyle}>
            Unser Team hilft dir gerne weiter — persönlich, telefonisch unter{' '}
            <a href="tel:+49711588654" style={{ color: 'var(--accent-bright)', textDecoration: 'underline' }}>
              0711 588 654
            </a>{' '}
            oder per E-Mail an{' '}
            <a href="mailto:info@fitnessclubfellbach.de" style={{ color: 'var(--accent-bright)', textDecoration: 'underline' }}>
              info@fitnessclubfellbach.de
            </a>.
          </p>
        </div>

        <div style={{
          marginTop: 56,
          padding: '32px 40px',
          background: 'rgba(196,69,82,0.08)',
          borderRadius: 12,
          border: '1px solid rgba(196,69,82,0.2)',
        }}>
          <p style={{ ...pStyle, color: '#F5F0E8', fontSize: 16, marginBottom: 8, fontWeight: 600 }}>
            Bevor du gehst — sprich mit uns.
          </p>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            Vielleicht können wir gemeinsam eine Lösung finden. Ob Tarifwechsel, Pause oder ein anderes Angebot — wir schauen, was für dich passt.
          </p>
        </div>
      </motion.main>
    </div>
  )
}
