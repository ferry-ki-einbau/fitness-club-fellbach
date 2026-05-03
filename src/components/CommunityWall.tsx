import { motion } from 'framer-motion'

const MEMBERS = [
  { initials: 'MA', color: '#C44552' }, { initials: 'SK', color: '#B8924A' },
  { initials: 'LW', color: '#0d9488' }, { initials: 'EH', color: '#6366f1' },
  { initials: 'MV', color: '#C44552' }, { initials: 'PK', color: '#B8924A' },
  { initials: 'JD', color: '#0d9488' }, { initials: 'AS', color: '#C44552' },
  { initials: 'RF', color: '#6366f1' }, { initials: 'TM', color: '#B8924A' },
  { initials: 'CL', color: '#C44552' }, { initials: 'BN', color: '#0d9488' },
  { initials: 'HK', color: '#6366f1' }, { initials: 'VB', color: '#C44552' },
  { initials: 'DW', color: '#B8924A' }, { initials: 'GR', color: '#0d9488' },
  { initials: 'NK', color: '#C44552' }, { initials: 'FM', color: '#6366f1' },
  { initials: 'SZ', color: '#B8924A' }, { initials: 'AL', color: '#C44552' },
  { initials: 'PW', color: '#0d9488' }, { initials: 'MH', color: '#B8924A' },
  { initials: 'TB', color: '#C44552' }, { initials: 'KS', color: '#6366f1' },
]

export default function CommunityWall() {
  return (
    <section style={{ background: '#111820', padding: 'clamp(64px,10vh,100px) clamp(16px,4vw,80px)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 32, height: 1, background: '#C44552' }} />
          <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#C44552', fontWeight: 600 }}>Echte Menschen · Echte Ergebnisse</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 'clamp(16px,3vw,48px)', marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem,5.5vw,5rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.025em', color: '#F5F0E8', lineHeight: 0.95, margin: 0 }}>
            500+ Mitglieder.<br />
            <span style={{ color: '#C44552', fontStyle: 'italic' }}>Eine Familie.</span>
          </h2>
          <p style={{ color: '#9A8878', fontSize: 15, lineHeight: 1.7, maxWidth: '38ch', marginBottom: 0 }}>
            Manche trainieren seit Jahren. Manche seit gestern. Alle haben sie hier angefangen — und sind geblieben.
          </p>
        </div>

        {/* Avatar Wall */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {MEMBERS.map((m, i) => (
            <motion.div
              key={m.initials}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.15, zIndex: 2 }}
              style={{
                width: 'clamp(44px,5vw,56px)',
                height: 'clamp(44px,5vw,56px)',
                borderRadius: '50%',
                background: `${m.color}22`,
                border: `1.5px solid ${m.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'default', position: 'relative',
              }}
            >
              <span className="font-display" style={{ fontSize: 12, fontWeight: 700, color: m.color, letterSpacing: '0.05em' }}>{m.initials}</span>
            </motion.div>
          ))}
          {/* "+mehr" Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: MEMBERS.length * 0.04 }}
            style={{
              width: 'clamp(44px,5vw,56px)', height: 'clamp(44px,5vw,56px)',
              borderRadius: '50%', background: 'rgba(184,146,74,0.1)',
              border: '1.5px solid rgba(184,146,74,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span className="font-condensed" style={{ fontSize: 10, color: '#B8924A', letterSpacing: '0.1em', fontWeight: 700 }}>+476</span>
          </motion.div>
        </div>

        <div style={{ marginTop: 32, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#F4B400', fontSize: 16 }}>★★★★★</span>
            <span style={{ color: '#9A8878', fontSize: 13 }}>4,7 · 200+ Google Bewertungen</span>
          </div>
          <a href="#preise" className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C44552', textDecoration: 'none', borderBottom: '1px solid rgba(196,69,82,0.4)', paddingBottom: 2 }}>
            Jetzt dazugehören →
          </a>
        </div>
      </div>
    </section>
  )
}
