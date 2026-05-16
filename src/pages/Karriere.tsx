import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'

interface Position {
  title: string
  type: string
  description: string
  tasks: string[]
  requirements: string[]
}

const POSITIONS: Position[] = [
  {
    title: 'Fitness-Trainer (m/w/d)',
    type: 'Voll- oder Teilzeit',
    description: 'Du betreust unsere Mitglieder auf der Trainingsfläche, erstellst individuelle Trainingspläne und führst Geräteeinweisungen durch.',
    tasks: [
      'Individuelle Trainingsberatung und Trainingsplanerstellung',
      'Geräteeinweisungen für neue Mitglieder',
      'Betreuung der Trainingsfläche',
      'Durchführung von Fitness-Checks und Körperanalysen',
      'Motivieren und begleiten unserer Mitglieder auf ihrem Weg',
    ],
    requirements: [
      'Abgeschlossene Ausbildung als Fitnesstrainer (B-Lizenz Minimum, A-Lizenz bevorzugt)',
      'Leidenschaft für Fitness und gesunden Lebensstil',
      'Kommunikationsstark und empathisch',
      'Teamplayer mit eigenständiger Arbeitsweise',
      'Früh- und Spätschicht-Bereitschaft',
    ],
  },
  {
    title: 'Thekenkraft / Empfang (m/w/d)',
    type: 'Teilzeit / Minijob',
    description: 'Du bist das erste Gesicht unseres Studios. Du empfängst unsere Mitglieder, berätst Interessenten und sorgst für einen reibungslosen Ablauf an der Theke.',
    tasks: [
      'Empfang und Betreuung der Mitglieder',
      'Beratung von Interessenten und Probetraining-Koordination',
      'Getränke- und Shake-Zubereitung an der Bar',
      'Administrative Aufgaben (Verträge, Check-In)',
      'Sauberkeit und Ordnung im Empfangsbereich',
    ],
    requirements: [
      'Freundliches und gepflegtes Auftreten',
      'Gute Deutschkenntnisse',
      'Zuverlässig und pünktlich',
      'Idealerweise Erfahrung im Dienstleistungsbereich',
      'Flexibel einsetzbar (auch abends und am Wochenende)',
    ],
  },
  {
    title: 'Kursleiter (m/w/d) - Yoga, Pilates, BodyPump',
    type: 'Freiberuflich / Honorar',
    description: 'Du leitest eigenständig Gruppenfitness-Kurse und bringst unsere Mitglieder ins Schwitzen. Wir suchen erfahrene Kursleiter für verschiedene Formate.',
    tasks: [
      'Eigenständige Planung und Durchführung von Gruppenkursen',
      'Teilnehmer motivieren und individuelle Korrekturen geben',
      'Kursformate weiterentwickeln und frisch halten',
      'Koordination mit dem Kursplan-Team',
    ],
    requirements: [
      'Gültige Trainer-Lizenz im jeweiligen Bereich',
      'Nachweisbare Erfahrung als Kursleiter (min. 1 Jahr)',
      'Ausstrahlung, Energie und natürliche Autorität',
      'Pünktlichkeit und Zuverlässigkeit',
      'Eigene Musik-Playlists und Kurs-Konzepte von Vorteil',
    ],
  },
  {
    title: 'Aushilfe / Werkstudent (m/w/d)',
    type: 'Minijob / Werkstudent',
    description: 'Du unterstützt unser Team flexibel im Tagesgeschaeft. Perfekt für Studierende oder alle, die sich etwas dazuverdienen möchten - und dabei kostenlos trainieren.',
    tasks: [
      'Unterstützung an der Theke und im Empfang',
      'Sauberkeit im Studio (Geräte, Kursräume, Umkleiden)',
      'Handtuch-Service und Getränke-Nachfüllung',
      'Aushilfe bei Events und Aktionen',
    ],
    requirements: [
      'Mindestalter 18 Jahre',
      'Zuverlässig und engagiert',
      'Affinität zu Fitness und Sport',
      'Flexibel einsetzbar (Abende, Wochenende)',
      'Keine Vorerfahrung nötig — wir bilden dich ein',
    ],
  },
]

const BENEFITS = [
  { icon: '01', title: 'Familiäres Team', desc: 'Inhabergeführt seit über 30 Jahren. Hier kennt jeder jeden.' },
  { icon: '02', title: 'Kostenlos trainieren', desc: 'Voller Zugang zu allen Bereichen, Kursen und Wellness — gratis.' },
  { icon: '03', title: 'Flexible Zeiten', desc: 'Wir passen Schichten an dein Leben an. Studium, Familie, Hobbys — geht alles.' },
  { icon: '04', title: 'Weiterbildung', desc: 'Wir investieren in dich. Lizenzen, Workshops, Zertifizierungen auf unsere Kosten.' },
  { icon: '05', title: 'Top-Ausstattung', desc: 'EGYM, Precor, Functional Area, Boxring — du arbeitest mit dem Besten.' },
  { icon: '06', title: 'Fellbach Zentral', desc: 'Bruckstraße 61. Bushaltestelle ca. 4 Min. zu Fuß, kostenlose Parkplätze direkt vor der Tür.' },
]

function PositionCard({ position, index }: { position: Position; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{
        background: 'rgba(245,240,232,0.02)',
        border: '1px solid rgba(245,240,232,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(184,146,74,0.3)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.08)')}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: 'clamp(20px, 3vw, 32px)', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 16, textAlign: 'left',
        }}
      >
        <div>
          <h3 className="font-display" style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#F5F0E8', marginBottom: 6 }}>
            {position.title}
          </h3>
          <span className="font-condensed" style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {position.type}
          </span>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          border: '1px solid rgba(184,146,74,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'transform 0.3s, background 0.3s',
          transform: expanded ? 'rotate(45deg)' : 'none',
          background: expanded ? 'rgba(184,146,74,0.1)' : 'transparent',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ padding: '0 clamp(20px, 3vw, 32px) clamp(20px, 3vw, 32px)', borderTop: '1px solid rgba(245,240,232,0.06)' }}
        >
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#B5A99A', marginBottom: 24, marginTop: 24 }}>
            {position.description}
          </p>

          <h4 className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F5F0E8', marginBottom: 12 }}>Deine Aufgaben</h4>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24 }}>
            {position.tasks.map((t, i) => (
              <li key={i} style={{ fontSize: 14, lineHeight: 1.7, color: '#B5A99A', paddingLeft: 16, position: 'relative', marginBottom: 6 }}>
                <span style={{ position: 'absolute', left: 0, top: 8, width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
                {t}
              </li>
            ))}
          </ul>

          <h4 className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F5F0E8', marginBottom: 12 }}>Das bringst du mit</h4>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
            {position.requirements.map((r, i) => (
              <li key={i} style={{ fontSize: 14, lineHeight: 1.7, color: '#B5A99A', paddingLeft: 16, position: 'relative', marginBottom: 6 }}>
                <span style={{ position: 'absolute', left: 0, top: 8, width: 4, height: 4, borderRadius: '50%', background: '#C44552' }} />
                {r}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Karriere() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

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

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(80px, 12vw, 140px) 0 clamp(60px, 8vw, 100px)' }}>
        {/* BG Image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/real-trainingsbereich-md.webp)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.15, filter: 'saturate(0.5)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,20,25,0.6) 0%, #0F1419 100%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', textAlign: 'center' }}
        >
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20, display: 'block' }}>
            Werde Teil der Familie
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.1, marginBottom: 24 }}>
            Arbeiten, wo andere<br />
            <span style={{ color: 'var(--accent)' }}>trainieren</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.7, color: '#B5A99A', maxWidth: 600, margin: '0 auto' }}>
            Seit über 30 Jahren ist der Fitness Club Fellbach mehr als ein Studio — er ist eine Familie. Wir suchen Menschen, die Fitness leben und andere inspirieren wollen.
          </p>
        </motion.div>
      </section>

      {/* Benefits */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#9A8878', marginBottom: 12, display: 'block' }}>Warum wir?</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#F5F0E8' }}>
            Das bekommst du bei uns
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                padding: 28,
                background: 'rgba(245,240,232,0.02)',
                border: '1px solid rgba(245,240,232,0.06)',
                borderRadius: 2,
              }}
            >
              <span className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--accent)', marginBottom: 12, display: 'block' }}>
                {b.icon}
              </span>
              <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#F5F0E8', marginBottom: 8 }}>
                {b.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#9A8878' }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Positions */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#9A8878', marginBottom: 12, display: 'block' }}>Offene Stellen</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#F5F0E8' }}>
            Aktuell gesucht
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {POSITIONS.map((p, i) => (
            <PositionCard key={p.title} position={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: 800, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px)',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            padding: 'clamp(40px, 5vw, 60px)',
            background: 'rgba(184,146,74,0.04)',
            border: '1px solid rgba(184,146,74,0.2)',
            borderRadius: 2,
          }}
        >
          <h2 className="font-display" style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#F5F0E8', marginBottom: 16 }}>
            Bereit für den nächsten Schritt?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#B5A99A', maxWidth: 500, margin: '0 auto 32px' }}>
            Schick uns deine Bewerbung per E-Mail oder ruf einfach an. Kein Anschreiben nötig — erzähl uns wer du bist und was dich antreibt.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            <a href="mailto:info@fitnessclubfellbach.de?subject=Bewerbung%20Fitness%20Club%20Fellbach" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 28px', background: '#C44552', color: '#fff',
              textDecoration: 'none', borderRadius: 2,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D45563'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C44552'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22,7 12,13 2,7" />
              </svg>
              <span className="font-condensed">E-Mail schreiben</span>
            </a>
            <a href="tel:+49711588654" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 28px', background: 'transparent', color: '#F5F0E8',
              textDecoration: 'none', borderRadius: 2,
              border: '1px solid rgba(245,240,232,0.2)',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
              </svg>
              <span className="font-condensed">0711 &ndash; 588 654</span>
            </a>
          </div>

          <p style={{ fontSize: 12, color: '#5A6770', marginTop: 24 }}>
            Marcel freut sich auf deine Nachricht.
          </p>
        </motion.div>
      </section>

      {/* Footer mini */}
      <footer style={{ borderTop: '1px solid rgba(245,240,232,0.06)', padding: '24px 0', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: '#5A6770', letterSpacing: '0.1em' }}>&copy; 2026 Fitness &amp; Sport GmbH &middot; Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  )
}
