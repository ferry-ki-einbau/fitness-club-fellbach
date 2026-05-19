import { useEffect } from 'react'
import { motion } from 'framer-motion'
import SubNav from '../components/SubNav'

export default function Datenschutz() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const sectionStyle: React.CSSProperties = { marginBottom: 40 }

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

  const h3Style: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    color: '#F5F0E8',
    marginBottom: 8,
    marginTop: 24,
  }

  const pStyle: React.CSSProperties = {
    fontSize: 15,
    lineHeight: 1.75,
    color: '#B5A99A',
    marginBottom: 12,
  }

  const ulStyle: React.CSSProperties = {
    fontSize: 15,
    lineHeight: 1.75,
    color: '#B5A99A',
    marginBottom: 12,
    paddingLeft: 24,
  }

  return (
    <div style={{ background: '#0F1419', minHeight: '100vh', color: '#F5F0E8' }}>
      <SubNav />

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 48px)' }}
      >
        <span className="font-condensed" style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12, display: 'block' }}>Rechtliches</span>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: '#F5F0E8', marginBottom: 16 }}>
          Datenschutz&shy;erkl&auml;rung
        </h1>
        <p style={{ ...pStyle, marginBottom: 48 }}>Stand: Mai 2026</p>

        {/* 1. Verantwortlicher */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>1. Verantwortlicher</h2>
          <p style={pStyle}>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          </p>
          <p style={pStyle}>
            Fitness &amp; Sport GmbH<br />
            Marcel R&ouml;hrle<br />
            Bruckstra&szlig;e 61<br />
            70734 Fellbach<br />
            Telefon: 0711 &ndash; 588 654<br />
            E-Mail: <a href="mailto:info@fitnessclubfellbach.de" style={{ color: 'var(--accent)', textDecoration: 'none' }}>info@fitnessclubfellbach.de</a>
          </p>
        </div>

        {/* 2. Uebersicht */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>2. &Uuml;bersicht der Verarbeitungen</h2>
          <p style={pStyle}>
            Die nachfolgende &Uuml;bersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.
          </p>
          <h3 style={h3Style}>Arten der verarbeiteten Daten</h3>
          <ul style={ulStyle}>
            <li>Bestandsdaten (z.&thinsp;B. Namen, Adressen)</li>
            <li>Kontaktdaten (z.&thinsp;B. E-Mail, Telefonnummer)</li>
            <li>Inhaltsdaten (z.&thinsp;B. Eingaben in Formularen)</li>
            <li>Nutzungsdaten (z.&thinsp;B. besuchte Seiten, Zugriffszeiten)</li>
            <li>Meta-/Kommunikationsdaten (z.&thinsp;B. IP-Adressen, Ger&auml;teinformationen)</li>
          </ul>
        </div>

        {/* 3. Server-Log-Dateien */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>3. Bereitstellung der Website und Erstellung von Server-Log-Dateien</h2>
          <p style={pStyle}>
            Unser Hosting-Anbieter erhebt auf Grundlage unserer berechtigten Interessen im Sinne des Art. 6 Abs. 1 lit. f DSGVO Daten &uuml;ber jeden Zugriff auf den Server, auf dem sich dieser Dienst befindet (sogenannte Serverlogfiles). Zu den Zugriffsdaten geh&ouml;ren: Name der abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs, &uuml;bertragene Datenmenge, Meldung &uuml;ber erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL, IP-Adresse und der anfragende Provider.
          </p>
          <p style={pStyle}>
            Die Serverlogfile-Informationen werden f&uuml;r maximal 30 Tage gespeichert und anschlie&szlig;end gel&ouml;scht. Die Speicherung der Daten erfolgt aus Sicherheitsgr&uuml;nden, um z.&thinsp;B. Missbrauchsf&auml;lle aufkl&auml;ren zu k&ouml;nnen.
          </p>
        </div>

        {/* 4. Hosting */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>4. Hosting</h2>
          <p style={pStyle}>
            Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet. Vercel kann beim Aufruf dieser Website technisch bedingt personenbezogene Daten (insbesondere IP-Adressen) verarbeiten.
          </p>
          <p style={pStyle}>
            Details entnehmen Sie der Datenschutzerkl&auml;rung von Vercel:{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>https://vercel.com/legal/privacy-policy</a>.
          </p>
          <p style={pStyle}>
            Die Nutzung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer zuverl&auml;ssigen und schnellen Bereitstellung unserer Website.
          </p>
        </div>

        {/* 5. SSL/TLS */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>5. SSL- bzw. TLS-Verschl&uuml;sselung</h2>
          <p style={pStyle}>
            Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der &Uuml;bertragung vertraulicher Inhalte, wie z.&thinsp;B. Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschl&uuml;sselung. Eine verschl&uuml;sselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
          </p>
        </div>

        {/* 6. Kontaktformular */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>6. Kontaktformular</h2>
          <p style={pStyle}>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und f&uuml;r den Fall von Anschlussfragen bei uns verarbeitet.
          </p>
          <p style={pStyle}>
            Die Daten werden per E-Mail an uns &uuml;bermittelt (Dienstleister: Resend, 548 Market Street, San Francisco, CA 94104, USA). Es erfolgt keine Speicherung in einer Datenbank. Die E-Mails werden ausschlie&szlig;lich f&uuml;r die Bearbeitung Ihrer Anfrage verwendet.
          </p>
          <p style={pStyle}>
            Die Verarbeitung der in das Formular eingegebenen Daten erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie k&ouml;nnen diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns.
          </p>
        </div>

        {/* 7. Cookies & Analytics */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>7. Cookies und Analyse-Werkzeuge</h2>

          <h3 style={h3Style}>Cookies</h3>
          <p style={pStyle}>
            Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endger&auml;t speichert. Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt, da wir ein berechtigtes Interesse an einer funktionierenden Website haben.
          </p>
          <p style={pStyle}>
            Cookies f&uuml;r Analyse- und Marketingzwecke werden erst nach Ihrer ausdr&uuml;cklichen Einwilligung gesetzt. Beim ersten Besuch unserer Website erscheint ein Cookie-Consent-Banner, &uuml;ber das Sie Ihre Einwilligung erteilen oder verweigern k&ouml;nnen.
          </p>

          <h3 style={h3Style}>Google Analytics / Google Tag Manager</h3>
          <p style={pStyle}>
            Diese Website nutzt Google Analytics (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) sowie den Google Tag Manager. Google Analytics verwendet Cookies, die eine Analyse der Benutzung der Website erm&ouml;glichen. Die durch Cookies erzeugten Informationen werden in der Regel an einen Server von Google in den USA &uuml;bertragen und dort gespeichert.
          </p>
          <p style={pStyle}>
            IP-Anonymisierung ist auf dieser Website aktiviert. Google Analytics wird ausschlie&szlig;lich nach Ihrer Einwilligung &uuml;ber den Cookie-Consent-Banner geladen (Art. 6 Abs. 1 lit. a DSGVO). Ohne Ihre Einwilligung werden keine Analyse-Cookies gesetzt und keine Daten an Google &uuml;bermittelt.
          </p>
          <p style={pStyle}>
            Sie k&ouml;nnen Ihre Einwilligung jederzeit mit Wirkung f&uuml;r die Zukunft widerrufen, indem Sie Ihre Browser-Cookies l&ouml;schen und beim n&auml;chsten Besuch den Cookie-Consent erneut konfigurieren.
          </p>
        </div>

        {/* 8. Google Maps */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>8. Google Maps</h2>
          <p style={pStyle}>
            Diese Website nutzt den Kartendienst Google Maps (Google Ireland Limited). Durch die Einbindung von Google Maps kann Google Informationen &uuml;ber die Nutzung dieser Website einschlie&szlig;lich Ihrer IP-Adresse erheben und an Server in den USA &uuml;bertragen.
          </p>
          <p style={pStyle}>
            Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
          </p>
          <p style={pStyle}>
            Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerkl&auml;rung von Google:{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>https://policies.google.com/privacy</a>.
          </p>
        </div>

        {/* 9. Betroffenenrechte */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>9. Ihre Rechte als betroffene Person</h2>
          <p style={pStyle}>
            Ihnen stehen als betroffene Person nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: '#F5F0E8' }}>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, eine Best&auml;tigung dar&uuml;ber zu verlangen, ob Sie betreffende personenbezogene Daten verarbeitet werden. Ist dies der Fall, haben Sie ein Recht auf Auskunft &uuml;ber diese personenbezogenen Daten sowie auf weitere in Art. 15 DSGVO genannte Informationen.</li>
            <li><strong style={{ color: '#F5F0E8' }}>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie haben das Recht, unverz&uuml;glich die Berichtigung Sie betreffender unrichtiger personenbezogener Daten und ggf. die Vervollst&auml;ndigung unvollst&auml;ndiger Daten zu verlangen.</li>
            <li><strong style={{ color: '#F5F0E8' }}>Recht auf L&ouml;schung (Art. 17 DSGVO):</strong> Sie haben das Recht zu verlangen, dass Sie betreffende personenbezogene Daten unverz&uuml;glich gel&ouml;scht werden, sofern einer der in Art. 17 DSGVO genannten Gr&uuml;nde zutrifft.</li>
            <li><strong style={{ color: '#F5F0E8' }}>Recht auf Einschr&auml;nkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer Daten zu verlangen, wenn eine der in Art. 18 DSGVO genannten Voraussetzungen gegeben ist.</li>
            <li><strong style={{ color: '#F5F0E8' }}>Recht auf Daten&uuml;bertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre Daten in einem strukturierten, g&auml;ngigen und maschinenlesbaren Format zu erhalten oder die &Uuml;bermittlung an einen anderen Verantwortlichen zu verlangen.</li>
            <li><strong style={{ color: '#F5F0E8' }}>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, aus Gr&uuml;nden, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden Daten Widerspruch einzulegen, soweit die Verarbeitung auf Art. 6 Abs. 1 lit. e oder f DSGVO beruht.</li>
          </ul>
        </div>

        {/* 10. Widerspruchsrecht */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>10. Widerspruch gegen Werbe-E-Mails</h2>
          <p style={pStyle}>
            Der Nutzung von im Rahmen der Impressumspflicht ver&ouml;ffentlichten Kontaktdaten zur &Uuml;bersendung von nicht ausdr&uuml;cklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdr&uuml;cklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
          </p>
        </div>

        {/* 11. Aufsichtsbehoerde */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>11. Beschwerderecht bei einer Aufsichtsbeh&ouml;rde</h2>
          <p style={pStyle}>
            Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbeh&ouml;rde zu, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutma&szlig;lichen Versto&szlig;es, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verst&ouml;&szlig;t.
          </p>
          <p style={pStyle}>
            Die f&uuml;r uns zust&auml;ndige Aufsichtsbeh&ouml;rde ist:<br /><br />
            Der Landesbeauftragte f&uuml;r den Datenschutz und die Informationsfreiheit Baden-W&uuml;rttemberg<br />
            Lautenschlagerstra&szlig;e 20<br />
            70173 Stuttgart<br />
            Telefon: 0711 / 615541-0<br />
            E-Mail: poststelle@lfdi.bwl.de
          </p>
        </div>

        {/* 12. Aenderung */}
        <div style={sectionStyle}>
          <h2 className="font-display" style={h2Style}>12. &Auml;nderung dieser Datenschutzerkl&auml;rung</h2>
          <p style={pStyle}>
            Wir behalten uns vor, diese Datenschutzerkl&auml;rung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um &Auml;nderungen unserer Leistungen in der Datenschutzerkl&auml;rung umzusetzen. F&uuml;r Ihren erneuten Besuch gilt dann die neue Datenschutzerkl&auml;rung.
          </p>
        </div>

      </motion.main>
    </div>
  )
}
