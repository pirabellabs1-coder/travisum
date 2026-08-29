/**
 * Fonction serverless — Demande de rendez-vous / dépôt de document.
 *
 * Reçoit les coordonnées saisies dans le chat et envoie une demande par e-mail
 * au bureau (info@travisum.com), qui recontacte la personne pour confirmer.
 *
 * Variables d'environnement (Vercel → Settings → Environment) :
 *   RESEND_API_KEY  (obligatoire pour l'envoi réel — https://resend.com)
 *   RDV_TO          (optionnel, défaut : info@travisum.com)
 *   RDV_FROM        (optionnel, défaut : "Travisum <onboarding@resend.dev>")
 *                   En production, utilisez une adresse d'un domaine vérifié
 *                   chez Resend, ex. "Site Travisum <site@travisum.com>".
 */

const DESTINATAIRE = process.env.RDV_TO || "info@travisum.com";
const EXPEDITEUR = process.env.RDV_FROM || "Travisum <onboarding@resend.dev>";

function texte(s, max = 400) {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

function emailValide(e) {
  return typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
}

function echapper(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, service: "rdv", configured: !!process.env.RESEND_API_KEY });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  let corps = req.body;
  if (typeof corps === "string") {
    try {
      corps = JSON.parse(corps);
    } catch {
      corps = {};
    }
  }

  const nom = texte(corps?.nom, 120);
  const email = texte(corps?.email, 160);
  const telephone = texte(corps?.telephone, 60);
  const service = texte(corps?.service, 60);
  const date = texte(corps?.date, 80);
  const message = texte(corps?.message, 2000);

  if (!nom || (!emailValide(email) && !telephone)) {
    return res.status(400).json({
      error: "champs_manquants",
      message: "Nom et au moins un moyen de contact (e-mail ou téléphone) sont requis.",
    });
  }

  const sujet = `Demande de rendez-vous — ${nom}${service ? " (" + service + ")" : ""}`;
  const lignes = [
    ["Nom", nom],
    ["E-mail", email || "—"],
    ["Téléphone", telephone || "—"],
    ["Service", service || "—"],
    ["Date souhaitée", date || "—"],
    ["Message", message || "—"],
  ];
  const html =
    `<h2 style="font-family:sans-serif">Nouvelle demande de rendez-vous</h2>` +
    `<table style="font-family:sans-serif;border-collapse:collapse">` +
    lignes
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#555;vertical-align:top"><strong>${k}</strong></td>` +
          `<td style="padding:4px 0">${echapper(v).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("") +
    `</table><p style="font-family:sans-serif;color:#888;font-size:12px">Envoyé depuis le chat du site travisum.</p>`;

  const texteBrut = lignes.map(([k, v]) => `${k}: ${v}`).join("\n");

  if (!process.env.RESEND_API_KEY) {
    // Pas encore configuré : on renvoie un repli mailto que le widget peut proposer.
    return res.status(200).json({
      ok: false,
      reason: "email_non_configure",
      mailto: `mailto:${DESTINATAIRE}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(texteBrut)}`,
    });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: EXPEDITEUR,
        to: [DESTINATAIRE],
        reply_to: emailValide(email) ? email : undefined,
        subject: sujet,
        html,
        text: texteBrut,
      }),
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("Resend error", r.status, detail.slice(0, 500));
      return res.status(502).json({
        ok: false,
        reason: "envoi_echoue",
        mailto: `mailto:${DESTINATAIRE}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(texteBrut)}`,
      });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("rdv handler crash", e);
    return res.status(500).json({
      ok: false,
      reason: "erreur_interne",
      mailto: `mailto:${DESTINATAIRE}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(texteBrut)}`,
    });
  }
}
