import { motion } from 'framer-motion'

const addons = [
  { name: 'Getränke', price: '2,99€/Wo', desc: 'Iso-Drink Flatrate' },
  { name: 'Zirkeltraining', price: '2,99€/Wo', desc: 'Gesundheitszirkel' },
  { name: 'Kurse', price: '2,99€/Wo', desc: 'Les Mills + alle Gruppenkurse' },
  { name: 'Wellness', price: '2,99€/Wo', desc: 'Sauna · Pool · Whirlpool' },
  { name: 'EGYM Smart', price: 'Im All-In', desc: 'Daten-getrackte Geräte' },
  { name: 'Boxen', price: '69€/Mo', desc: 'Kurs mit Boxexperten' },
]

export default function AddonsBand() {
  return (
    <section style={{
      position: 'relative',
      background: '#EDE7DD',
      padding: 'clamp(72px, 10vh, 120px) 24px',
      borderTop: '1px solid rgba(26, 15, 15, 0.08)',
      borderBottom: '1px solid rgba(26, 15, 15, 0.08)',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ marginBottom: 48, maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{ width: 32, height: 1, background: '#B8924A' }} />
            <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#B8924A', fontWeight: 600 }}>Module · Add-Ons</span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 4.5vw, 4rem)', fontWeight: 800,
            letterSpacing: '-0.025em', color: '#1A0F0F', textTransform: 'uppercase', lineHeight: 0.95,
          }}>
            Bau dir <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>deinen Plan.</span>
          </h2>
          <p style={{ color: '#3F2C2C', fontSize: 15, lineHeight: 1.65, marginTop: 16, maxWidth: 520 }}>
            Starte mit Basic, ergänze nach Bedarf. Alle Module sind monatlich kombinierbar — keine Zwangs-Pakete.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {addons.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{
                padding: '24px 20px',
                background: '#FFFFFF',
                border: '1px solid rgba(26, 15, 15, 0.08)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 1px 2px rgba(26,15,15,0.04)',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: 32, height: 1, background: 'var(--accent)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div className="font-display" style={{ fontSize: 17, fontWeight: 700, color: '#1A0F0F', textTransform: 'uppercase', letterSpacing: '-0.005em' }}>
                  {a.name}
                </div>
                <div className="font-condensed" style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>{a.price}</div>
              </div>
              <div style={{ fontSize: 13, color: '#5A4040', lineHeight: 1.5 }}>{a.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* MySports App callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: 56, padding: '28px 32px', background: '#1A0F0F', border: '1px solid rgba(184, 146, 74, 0.4)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}
        >
          <div>
            <div className="font-condensed" style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#B8924A', marginBottom: 6 }}>App · Kurs-Buchung</div>
            <div className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#F5F0E8', textTransform: 'uppercase', letterSpacing: '-0.005em' }}>MySports App</div>
            <div style={{ fontSize: 13, color: '#B5A99A', marginTop: 6 }}>Kurse buchen, Plätze reservieren, Trainings tracken.</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="https://apps.apple.com/de/app/mysports/id1206433997" target="_blank" rel="noopener noreferrer" className="font-condensed" style={{ padding: '10px 18px', border: '1px solid rgba(184, 146, 74, 0.4)', color: '#F5F0E8', textDecoration: 'none', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}>App Store</a>
            <a href="https://play.google.com/store/apps/details?id=io.noexcuse.android" target="_blank" rel="noopener noreferrer" className="font-condensed" style={{ padding: '10px 18px', border: '1px solid rgba(184, 146, 74, 0.4)', color: '#F5F0E8', textDecoration: 'none', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Google Play</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
