import PageV3 from "@/components/PageV3";
import { CONTACT } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";
import ContactForm, { type RdvLabels } from "@/components/vues/ContactForm";

/**
 * Page « Contact » — coordonnées, carte et formulaire de prise de rendez-vous
 * (poste vers /api/rdv/). Chrome partagé via PageV3 ; style propre scopé `.cx`,
 * aligné sur la charte du site (bleu nuit + or). Données réelles, aucun prix.
 */

const T = {
  fr: {
    fil1: "Accueil", fil2: "Contact",
    eb: "Contact",
    h1: "Nous contacter",
    sub: "Une question, un devis ou un rendez-vous ? Écrivez-nous ou passez au bureau de l’avenue Louise. Nous vous répondons rapidement.",
    formTitre: "Demander un rendez-vous",
    formSub: "Laissez vos coordonnées : le bureau vous recontacte pour confirmer le créneau. Aucun paiement n’est demandé avant que les conditions vous soient présentées.",
    infoTitre: "Coordonnées du bureau",
    hours: "Horaires",
    itin: "Obtenir l’itinéraire", write: "Nous écrire", call: "Appeler",
    rdv: {
      nom: "Nom et prénom", email: "E-mail",
      service: "Concerne", services: ["Visa", "Traduction", "Légalisation / Apostille", "Autre"],
      date: "Date souhaitée (indicative)", datePh: "ex. 12/09, matin", msg: "Votre message",
      submit: "Envoyer la demande", sending: "Envoi…",
      okTitre: "Demande envoyée", okTexte: "Merci ! Le bureau vous recontacte rapidement pour confirmer.",
      mailIntro: "L’envoi automatique n’est pas encore activé. Cliquez ci-dessous pour envoyer votre demande par e-mail :",
      mailBtn: "Ouvrir l’e-mail pré-rempli",
      err: "Connexion impossible. Réessayez ou écrivez à info@travisum.com.",
      required: "Indiquez votre nom et votre e-mail.",
    } as RdvLabels,
  },
  nl: {
    fil1: "Home", fil2: "Contact",
    eb: "Contact",
    h1: "Contacteer ons",
    sub: "Een vraag, een offerte of een afspraak? Schrijf ons of kom langs op ons kantoor aan de Louizalaan. Wij antwoorden snel.",
    formTitre: "Een afspraak aanvragen",
    formSub: "Laat uw gegevens achter: het kantoor neemt contact op om het tijdstip te bevestigen. Er wordt geen betaling gevraagd voordat de voorwaarden zijn voorgesteld.",
    infoTitre: "Gegevens van het kantoor",
    hours: "Openingsuren",
    itin: "Routebeschrijving", write: "Schrijf ons", call: "Bellen",
    rdv: {
      nom: "Naam en voornaam", email: "E-mail",
      service: "Betreft", services: ["Visum", "Vertaling", "Legalisatie / Apostille", "Andere"],
      date: "Gewenste datum (indicatief)", datePh: "bv. 12/09, ochtend", msg: "Uw bericht",
      submit: "Aanvraag versturen", sending: "Versturen…",
      okTitre: "Aanvraag verstuurd", okTexte: "Bedankt! Het kantoor neemt snel contact op ter bevestiging.",
      mailIntro: "Automatische verzending is nog niet actief. Klik hieronder om per e-mail te versturen:",
      mailBtn: "Vooraf ingevulde e-mail openen",
      err: "Verbinding mislukt. Probeer opnieuw of mail info@travisum.com.",
      required: "Vermeld uw naam en uw e-mail.",
    } as RdvLabels,
  },
  en: {
    fil1: "Home", fil2: "Contact",
    eb: "Contact",
    h1: "Contact us",
    sub: "A question, a quote or an appointment? Write to us or drop by our avenue Louise office. We reply quickly.",
    formTitre: "Request an appointment",
    formSub: "Leave your details: the office will contact you to confirm the slot. No payment is requested before the terms are presented to you.",
    infoTitre: "Office details",
    hours: "Opening hours",
    itin: "Get directions", write: "Write to us", call: "Call",
    rdv: {
      nom: "Full name", email: "Email",
      service: "Regarding", services: ["Visa", "Translation", "Legalisation / Apostille", "Other"],
      date: "Preferred date (indicative)", datePh: "e.g. 12/09, morning", msg: "Your message",
      submit: "Send request", sending: "Sending…",
      okTitre: "Request sent", okTexte: "Thank you! The office will contact you shortly to confirm.",
      mailIntro: "Automatic sending isn’t enabled yet. Click below to send your request by email:",
      mailBtn: "Open pre-filled email",
      err: "Connection failed. Try again or email info@travisum.com.",
      required: "Please provide your name and email.",
    } as RdvLabels,
  },
};

const IcPin = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>);
const IcPhone = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
const IcMail = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>);
const IcClock = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>);

export function ContactVue({ lang = "fr", cheminFr = "/contact/" }: { lang?: Locale; cheminFr?: string }) {
  const d = T[lang];
  const L = (c: string) => lien(lang, c);
  const mapQ = encodeURIComponent("Travisum Louise Office, 367 Avenue Louise, 1050 Bruxelles");
  const mapSrc = `https://www.google.com/maps?q=${mapQ}&z=16&hl=${lang}&output=embed`;
  const itin = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("367 Avenue Louise, 1050 Bruxelles, Belgique")}`;

  return (
    <PageV3 lang={lang} cheminFr={cheminFr}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cx">
        <nav className="cx-bread" aria-label={d.fil2}>
          <div className="cx-wrap">
            <a href={L("/")}>{d.fil1}</a>
            <span aria-hidden="true">›</span>
            <span className="cur">{d.fil2}</span>
          </div>
        </nav>

        <section className="cx-hero">
          <div className="cx-wrap">
            <span className="cx-eb">{d.eb}</span>
            <h1>{d.h1}</h1>
            <p className="cx-sub">{d.sub}</p>
            <div className="cx-chips">
              <a href={`tel:${CONTACT.telephone_tel}`}>{IcPhone} {CONTACT.telephone}</a>
              <a href={`mailto:${CONTACT.email}`}>{IcMail} {CONTACT.email}</a>
            </div>
          </div>
        </section>

        <section className="cx-main">
          <div className="cx-wrap cx-grid">
            {/* Formulaire RDV */}
            <div className="cx-card cx-formcard" id="rdv">
              <h2>{d.formTitre}</h2>
              <p className="cx-cardsub">{d.formSub}</p>
              <ContactForm lang={lang} t={d.rdv} />
            </div>

            {/* Coordonnées + carte */}
            <div className="cx-side">
              <div className="cx-card">
                <h2>{d.infoTitre}</h2>
                <p className="cx-raison">{CONTACT.raison}</p>
                <ul className="cx-list">
                  <li>{IcPin}<span>{CONTACT.rue}<br />{CONTACT.code_postal} {CONTACT.ville}, {CONTACT.pays}</span></li>
                  <li>{IcPhone}<a href={`tel:${CONTACT.telephone_tel}`}>{CONTACT.telephone}</a></li>
                  <li>{IcMail}<a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                  <li>{IcClock}<span><b>{d.hours}</b><br />{CONTACT.horaires}</span></li>
                </ul>
                <div className="cx-cta">
                  <a className="cx-btn cx-btn-p" href={itin} target="_blank" rel="noopener noreferrer">{d.itin}</a>
                  <a className="cx-btn cx-btn-line" href={`mailto:${CONTACT.email}`}>{d.write}</a>
                </div>
              </div>
              <div className="cx-map">
                <iframe title={`${CONTACT.raison} — ${CONTACT.rue}, ${CONTACT.ville}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageV3>
  );
}

const CSS = String.raw`
.cx{--nuit:#0B1B2E;--nuit-2:#0F2438;--or:#C9A96A;--or-d:#A8863F;--or-l:#DFC38C;--bg:#F7F8FA;--ink:#16202C;--ink2:#6B7785;--bord:#E4E8EC;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif}
.cx *{box-sizing:border-box}
.cx h1,.cx h2,.cx h3{font-family:Outfit,Inter,sans-serif;color:var(--nuit);letter-spacing:-.02em;line-height:1.14;margin:0}
.cx p{margin:0}
.cx a{color:inherit;text-decoration:none}
.cx-wrap{max-width:1120px;margin:0 auto;padding:0 24px}
.cx-eb{display:inline-block;font:600 11px/1 Inter;letter-spacing:.16em;text-transform:uppercase;color:var(--or);margin-bottom:14px}

.cx-bread{background:var(--nuit)}
.cx-bread .cx-wrap{display:flex;align-items:center;gap:9px;padding:16px 24px 4px;font-size:13px;color:rgba(255,255,255,.5)}
.cx-bread a{color:rgba(255,255,255,.72)}
.cx-bread a:hover{color:var(--or)}
.cx-bread .cur{color:#fff;font-weight:600}

.cx-hero{background:linear-gradient(135deg,#0B1B2E 0%,#0F2438 60%,#16314A 100%);color:#fff;padding:56px 0}
.cx-hero h1{color:#fff;font-size:clamp(28px,4vw,44px);margin-bottom:14px}
.cx-sub{color:rgba(255,255,255,.85);font-size:16.5px;line-height:1.6;max-width:60ch;margin-bottom:22px}
.cx-chips{display:flex;flex-wrap:wrap;gap:12px}
.cx-chips a{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:9px 15px;font-size:14px;color:#fff;transition:.15s}
.cx-chips a:hover{background:rgba(255,255,255,.16)}
.cx-chips svg{width:17px;height:17px;color:var(--or)}

.cx-main{padding:56px 0 70px}
.cx-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:26px;align-items:start}
.cx-card{background:#fff;border:1px solid var(--bord);border-radius:16px;padding:28px;box-shadow:0 10px 30px rgba(11,27,46,.05)}
.cx-card h2{font-size:22px;margin-bottom:8px}
.cx-cardsub{color:var(--ink2);font-size:14.5px;line-height:1.6;margin-bottom:20px}
.cx-side{display:flex;flex-direction:column;gap:20px}
.cx-raison{font-family:Outfit,sans-serif;font-size:18px;font-weight:600;color:var(--nuit);margin-bottom:16px}
.cx-list{list-style:none;padding:0;margin:0 0 20px;display:flex;flex-direction:column;gap:14px}
.cx-list li{display:flex;gap:12px;align-items:flex-start;font-size:14.5px;color:var(--ink)}
.cx-list svg{width:20px;height:20px;color:var(--or-d);flex:none;margin-top:2px}
.cx-list a:hover{color:var(--or-d);text-decoration:underline}
.cx-cta{display:flex;gap:10px;flex-wrap:wrap}
.cx-map{border:1px solid var(--bord);border-radius:16px;overflow:hidden;min-height:260px}
.cx-map iframe{display:block;width:100%;height:100%;min-height:260px;border:0}

/* boutons */
.cx-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 20px;border-radius:11px;font:600 14.5px Inter;cursor:pointer;border:1px solid transparent;transition:.15s;text-align:center}
.cx-btn-p{background:var(--or);color:var(--nuit)}
.cx-btn-p:hover{background:var(--or-l);transform:translateY(-1px)}
.cx-btn-line{background:#fff;color:var(--nuit);border-color:var(--bord)}
.cx-btn-line:hover{border-color:var(--or-d);color:var(--or-d)}
.cx-btn:focus-visible{outline:3px solid rgba(201,169,106,.4);outline-offset:2px}

/* formulaire */
.cx-form{display:flex;flex-direction:column;gap:15px}
.cx-row{display:grid;grid-template-columns:1fr 1fr;gap:15px}
.cx-field{display:flex;flex-direction:column;gap:6px;min-width:0}
.cx-field label{font:600 12.5px Inter;color:var(--ink)}
.cx-field input,.cx-field select,.cx-field textarea{width:100%;border:1px solid var(--bord);border-radius:10px;padding:11px 13px;font:400 14.5px Inter;color:var(--ink);background:#fff;resize:vertical}
.cx-field input,.cx-field select{height:46px}
.cx-field select{cursor:pointer}
.cx-field input:focus,.cx-field select:focus,.cx-field textarea:focus{outline:0;border-color:var(--or);box-shadow:0 0 0 3px rgba(201,169,106,.2)}
.cx-submit{margin-top:4px;width:100%}
.cx-err{color:#8a2b2b;background:#fdecec;border:1px solid #f6c6c6;border-radius:10px;padding:10px 14px;font-size:14px;margin:0}
.cx-ok{background:#f2f8f3;border:1px solid #cfe7d4;border-radius:12px;padding:26px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px}
.cx-ok-ico{color:#2f7d46}
.cx-ok h3{font-size:19px}
.cx-ok p{color:var(--ink2);font-size:14.5px}

@media(max-width:860px){
  .cx-grid{grid-template-columns:1fr;gap:20px}
}
@media(max-width:520px){
  .cx-row{grid-template-columns:1fr}
  .cx-cta{flex-direction:column}
}
@media(prefers-reduced-motion:reduce){.cx *{transition:none!important}}
`;
