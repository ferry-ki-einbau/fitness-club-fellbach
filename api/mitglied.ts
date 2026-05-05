import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

export const config = {
  api: { bodyParser: { sizeLimit: '25mb' } },
}

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM || 'Fitness Club Fellbach <noreply@ferryemirer.de>'
const STUDIO_EMAIL = 'verwaltung@fitnessclubfellbach.de'

function escape(str: unknown): string {
  if (typeof str !== 'string') return String(str ?? '')
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body as Record<string, unknown>

  // Honeypot check
  if (body.website) {
    return res.status(200).json({ success: true })
  }

  const {
    plan,
    term,
    addons,
    addonLabels,
    vorname,
    nachname,
    email,
    telefon,
    geburtsdatum,
    strasse,
    hausnummer,
    plz,
    ort,
    widerruf,
    gesamtpreis,
  } = body

  // Validation
  if (!vorname || !nachname || !email || !telefon || !geburtsdatum || !strasse || !hausnummer || !plz || !ort) {
    return res.status(400).json({ error: 'Pflichtfelder fehlen' })
  }

  const addonList = Array.isArray(addonLabels) ? addonLabels : []
  const addonHtml = addonList.length > 0
    ? `<ul style="margin:8px 0;padding-left:20px;">${addonList.map((l: unknown) => `<li>${escape(l)}</li>`).join('')}</ul>`
    : '<p style="color:#6b7280;font-style:italic;">Keine Add-Ons</p>'

  // Studio email HTML
  const studioHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Neue Mitgliedsanmeldung</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8f9fa;padding:24px;">
  <div style="background:#0F1419;border-radius:8px;overflow:hidden;">
    <div style="background:#C44552;padding:24px 32px;">
      <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">Neue Mitgliedsanmeldung</h1>
      <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">Fitness Club Fellbach</p>
    </div>
    <div style="padding:32px;color:#F5F0E8;">
      <h2 style="color:#B8924A;font-size:16px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">Persönliche Daten</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#9A8470;width:40%;">Name</td><td style="padding:8px 0;font-weight:600;">${escape(vorname)} ${escape(nachname)}</td></tr>
        <tr><td style="padding:8px 0;color:#9A8470;">E-Mail</td><td style="padding:8px 0;">${escape(email)}</td></tr>
        <tr><td style="padding:8px 0;color:#9A8470;">Telefon</td><td style="padding:8px 0;">${escape(telefon)}</td></tr>
        <tr><td style="padding:8px 0;color:#9A8470;">Geburtsdatum</td><td style="padding:8px 0;">${escape(geburtsdatum)}</td></tr>
        <tr><td style="padding:8px 0;color:#9A8470;">Adresse</td><td style="padding:8px 0;">${escape(strasse)} ${escape(hausnummer)}, ${escape(plz)} ${escape(ort)}</td></tr>
      </table>

      <hr style="border:none;border-top:1px solid rgba(245,240,232,0.1);margin:24px 0;">

      <h2 style="color:#B8924A;font-size:16px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">Mitgliedschaft</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#9A8470;width:40%;">Plan</td><td style="padding:8px 0;font-weight:700;font-size:16px;">${escape(plan)}</td></tr>
        <tr><td style="padding:8px 0;color:#9A8470;">Laufzeit</td><td style="padding:8px 0;">${escape(term)} Monate</td></tr>
        <tr><td style="padding:8px 0;color:#9A8470;">Add-Ons</td><td style="padding:8px 0;">${addonHtml}</td></tr>
        <tr><td style="padding:8px 0;color:#9A8470;">Gesamtpreis</td><td style="padding:8px 0;font-weight:700;font-size:18px;color:#B8924A;">${escape(gesamtpreis)}€/Woche</td></tr>
        <tr><td style="padding:8px 0;color:#9A8470;">Widerrufsrecht</td><td style="padding:8px 0;">${widerruf ? '<span style="color:#4ade80;font-weight:600;">Ja — 14 Tage kostenlos testen</span>' : 'Nein'}</td></tr>
      </table>

      <div style="margin-top:32px;padding:16px;background:rgba(196,69,82,0.1);border-left:3px solid #C44552;border-radius:0 4px 4px 0;">
        <p style="margin:0;font-size:13px;color:#F5F0E8;"><strong>Aktion:</strong> Bitte innerhalb von 24 Stunden bei <strong>${escape(vorname)} ${escape(nachname)}</strong> melden — <a href="mailto:${escape(email)}" style="color:#C44552;">${escape(email)}</a> · ${escape(telefon)}</p>
      </div>
    </div>
  </div>
</body>
</html>`

  // Member confirmation email HTML
  const memberHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Willkommen im Fitness Club Fellbach!</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8f9fa;padding:24px;">
  <div style="background:#0F1419;border-radius:8px;overflow:hidden;">
    <div style="background:#C44552;padding:24px 32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700;">Willkommen, ${escape(vorname)}!</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:15px;">Deine Anmeldung beim Fitness Club Fellbach ist eingegangen.</p>
    </div>
    <div style="padding:32px;color:#F5F0E8;">
      <p style="font-size:15px;line-height:1.7;color:#C9BFB3;">
        Marcel und das Team freuen sich, dich bald im Studio zu sehen. Wir melden uns innerhalb von <strong style="color:#F5F0E8;">24 Stunden</strong> bei dir.
      </p>

      <hr style="border:none;border-top:1px solid rgba(245,240,232,0.1);margin:24px 0;">

      <h2 style="color:#B8924A;font-size:14px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">Deine Mitgliedschaft</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#9A8470;width:40%;">Plan</td><td style="padding:8px 0;font-weight:700;">${escape(plan)} · ${escape(term)} Monate</td></tr>
        ${addonList.length > 0 ? `<tr><td style="padding:8px 0;color:#9A8470;">Add-Ons</td><td style="padding:8px 0;">${addonList.map((l: unknown) => escape(l)).join(', ')}</td></tr>` : ''}
        <tr><td style="padding:8px 0;color:#9A8470;">Gesamtpreis</td><td style="padding:8px 0;font-weight:700;color:#B8924A;">${escape(gesamtpreis)}€/Woche</td></tr>
        ${widerruf ? `<tr><td style="padding:8px 0;color:#9A8470;">Widerrufsrecht</td><td style="padding:8px 0;color:#4ade80;font-weight:600;">14 Tage kostenlos testen</td></tr>` : ''}
      </table>

      <hr style="border:none;border-top:1px solid rgba(245,240,232,0.1);margin:24px 0;">

      <h2 style="color:#B8924A;font-size:14px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 12px;">So erreichst du uns</h2>
      <p style="font-size:13px;color:#9A8470;line-height:1.7;">
        Bruckstraße 61 · 70736 Fellbach<br>
        Tel: <a href="tel:+497115888654" style="color:#C44552;">07115 8 8654</a><br>
        E-Mail: <a href="mailto:verwaltung@fitnessclubfellbach.de" style="color:#C44552;">verwaltung@fitnessclubfellbach.de</a><br>
        24/7 geöffnet · 365 Tage im Jahr
      </p>

      <div style="margin-top:28px;text-align:center;">
        <a href="https://www.fitness-club-fellbach.de" style="display:inline-block;background:#C44552;color:#fff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:700;font-size:14px;letter-spacing:0.1em;text-transform:uppercase;">
          Zum Studio
        </a>
      </div>

      <p style="font-size:11px;color:#5A4030;text-align:center;margin-top:28px;line-height:1.6;">
        Fitness Club Fellbach · Bruckstraße 61 · 70736 Fellbach<br>
        Du hast dieses E-Mail erhalten, weil du dich für eine Mitgliedschaft angemeldet hast.
      </p>
    </div>
  </div>
</body>
</html>`

  try {
    // Send studio notification first (await — must arrive)
    await resend.emails.send({
      from: FROM,
      to: STUDIO_EMAIL,
      subject: `Neue Mitgliedsanmeldung: ${String(vorname)} ${String(nachname)} — ${String(plan)} ${String(term)}M · ${String(gesamtpreis)}€/Wo`,
      html: studioHtml,
      replyTo: String(email),
    })

    // Send member confirmation (non-blocking)
    resend.emails.send({
      from: FROM,
      to: String(email),
      subject: `Willkommen im Fitness Club Fellbach, ${String(vorname)}!`,
      html: memberHtml,
    }).catch(() => { /* non-critical */ })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'E-Mail-Versand fehlgeschlagen' })
  }
}
