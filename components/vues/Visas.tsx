import PageV3 from "@/components/PageV3";
import { CONTACT, fichePays, type SousPage } from "@/lib/donnees";
import { listePaysVisa } from "@/lib/pays-meta";
import { lien, type Locale } from "@/lib/i18n";
import { RechercheDestination, GrilleDestinations } from "@/components/vues/VisasClient";

/**
 * Page « Visas » — refonte moderne. Chrome partagé (PageV3 : en-tête, pied,
 * assistant). Contenu et styles propres, scopés sous `.vz`. Données réelles
 * (lib/donnees + lib/pays-meta) ; aucun contenu fictif ; aucun prix.
 */

/* ------------------------------------------------------------------ i18n */
const T = {
  fr: {
    fil1: "Accueil", fil2: "Visas",
    heroEb: "Service visas",
    h1: "Votre visa, sans démarches compliquées",
    intro:
      "Travisum vous accompagne dans vos demandes de visa, e-visa et carte touristique, pour vos voyages touristiques, professionnels ou vos études.",
    reassure: "Vérification de votre dossier avant transmission aux autorités compétentes.",
    heroBtn1: "Rechercher une destination", heroBtn2: "Écrire un e-mail",
    tb1: "Dossier vérifié", tb2: "Accompagnement personnalisé", tb3: "Livraison sécurisée",
    // recherche
    schTitle: "De quel visa avez-vous besoin ?",
    schText: "Sélectionnez votre destination pour consulter les formalités et les documents nécessaires.",
    rDest: "Pays de destination", rDestPh: "Rechercher un pays…",
    rNat: "Nationalité", rNatPh: "Ex. Belge",
    rMotif: "Motif du voyage", rMotifs: ["Tourisme", "Affaires", "Études"],
    rDate: "Date de départ (facultatif)",
    rSubmit: "Voir les formalités",
    rNotFound: "Nous n’avons pas encore de fiche pour cette destination.",
    rContact: "Contactez notre bureau",
    // populaires
    popTitle: "Les destinations les plus demandées",
    popText: "Accédez rapidement aux informations et aux formalités pour nos destinations les plus consultées.",
    evEb: "e-Visa",
    evTitle: "Destinations disponibles en e-Visa",
    evText: "De nombreuses destinations délivrent un visa électronique (e-Visa), demandé en ligne, accessible aux voyageurs de nationalité européenne — sans déposer physiquement son passeport. Retrouvez la liste complète par région, les documents et la procédure sur notre page e-Visa.",
    evCta: "Voir toutes les destinations e-Visa",
    evNote: "Ouvert aux voyageurs de nationalité européenne (dont la Belgique). Les conditions, les frais et la validité varient selon la destination ; la décision finale appartient aux autorités du pays.",
    voir: "Voir les formalités",
    // toutes
    allTitle: "Toutes les destinations",
    allText: "Retrouvez les informations nécessaires pour préparer votre demande de visa selon votre destination.",
    gSearchPh: "Rechercher une destination…", gTous: "Tous",
    gEmpty: "Aucune destination ne correspond à votre recherche. Essayez un autre nom ou contactez notre bureau.",
    gFiche: "Voir les formalités",
    // non dispo
    nfTitle: "Vous ne trouvez pas votre destination ?",
    nfText:
      "Nos conseillers peuvent également vous renseigner pour d’autres pays. Contactez notre bureau afin que nous puissions vérifier les formalités correspondant à votre voyage.",
    nfBtn1: "Contacter un conseiller", nfBtn2: "Écrire un e-mail",
    // process
    prEb: "Notre accompagnement", prTitle: "Comment Travisum vous accompagne",
    prText: "Un accompagnement en trois étapes pour réduire les erreurs et faciliter vos démarches.",
    p1t: "Nous vous informons",
    p1p: "Nous vous expliquons clairement la procédure, les documents nécessaires, les délais estimés et les conditions liées à votre destination.",
    p2t: "Nous vérifions votre dossier",
    p2p: "Nos conseillers contrôlent les documents fournis avant leur transmission au consulat ou à l’autorité compétente.",
    p3t: "Nous vous remettons vos documents",
    p3p: "Après délivrance du visa, votre passeport peut être récupéré à notre bureau ou livré à l’adresse de votre choix.",
    // trust
    trEb: "Pourquoi Travisum", trTitle: "Un accompagnement humain, du début à la fin.",
    t1t: "Accompagnement humain", t1p: "Un interlocuteur dédié qui répond à vos questions à chaque étape.",
    t2t: "Vérification des documents", t2p: "Un contrôle attentif de votre dossier avant toute transmission.",
    t3t: "Suivi de la demande", t3p: "Vous êtes tenu informé de l’avancement de votre dossier.",
    t4t: "Retour sécurisé du passeport", t4p: "Récupération au bureau ou livraison sécurisée à l’adresse de votre choix.",
    trDisc:
      "La décision finale d’accorder ou de refuser un visa appartient exclusivement aux autorités consulaires compétentes.",
    // contact
    ctEb: "Nous trouver", ctTitle: "Contacter notre bureau de Bruxelles",
    ctHours: "Horaires", ctItin: "Obtenir l’itinéraire", ctWrite: "Nous écrire",
    // final
    fEb: "Prêt à commencer", fTitle: "Besoin d’aide pour votre demande de visa ?",
    fText:
      "Expliquez-nous votre destination et votre situation. Un conseiller Travisum vous indiquera les prochaines étapes et les documents à préparer.",
    fBtn1: "Commencer ma demande", fBtn2: "Contacter Travisum",
    fNote: "Aucun paiement ne vous sera demandé avant que les conditions du service vous soient clairement présentées.",
    mailVisa: "Demande de visa",
  },
  nl: {
    fil1: "Home", fil2: "Visa",
    heroEb: "Visumdienst",
    h1: "Uw visum, zonder ingewikkelde formaliteiten",
    intro:
      "Travisum begeleidt u bij uw aanvragen voor een visum, e-visum en toeristenkaart, voor uw toeristische of zakelijke reizen of uw studie.",
    reassure: "Controle van uw dossier vóór verzending naar de bevoegde autoriteiten.",
    heroBtn1: "Een bestemming zoeken", heroBtn2: "Een e-mail sturen",
    tb1: "Gecontroleerd dossier", tb2: "Persoonlijke begeleiding", tb3: "Beveiligde levering",
    schTitle: "Welk visum heeft u nodig?",
    schText: "Kies uw bestemming om de formaliteiten en de vereiste documenten te bekijken.",
    rDest: "Land van bestemming", rDestPh: "Zoek een land…",
    rNat: "Nationaliteit", rNatPh: "Bv. Belg",
    rMotif: "Reismotief", rMotifs: ["Toerisme", "Zaken", "Studie"],
    rDate: "Vertrekdatum (optioneel)",
    rSubmit: "Formaliteiten bekijken",
    rNotFound: "We hebben nog geen fiche voor deze bestemming.",
    rContact: "Neem contact op met ons kantoor",
    popTitle: "De meest gevraagde bestemmingen",
    popText: "Krijg snel toegang tot de informatie en formaliteiten voor onze meest geraadpleegde bestemmingen.",
    evEb: "e-Visa",
    evTitle: "Bestemmingen beschikbaar met een e-Visum",
    evText: "Talrijke bestemmingen geven een elektronisch visum (e-Visum) af, online aan te vragen, toegankelijk voor reizigers met een Europese nationaliteit — zonder uw paspoort fysiek af te geven. Bekijk de volledige lijst per regio, de documenten en de procedure op onze e-Visum-pagina.",
    evCta: "Alle e-Visum-bestemmingen bekijken",
    evNote: "Toegankelijk voor reizigers met een Europese nationaliteit (waaronder België). Voorwaarden, kosten en geldigheid verschillen per bestemming; de eindbeslissing ligt bij de autoriteiten van het land.",
    voir: "Formaliteiten bekijken",
    allTitle: "Alle bestemmingen",
    allText: "Vind de nodige informatie om uw visumaanvraag voor te bereiden volgens uw bestemming.",
    gSearchPh: "Een bestemming zoeken…", gTous: "Alle",
    gEmpty: "Geen bestemming komt overeen met uw zoekopdracht. Probeer een andere naam of neem contact op met ons kantoor.",
    gFiche: "Formaliteiten bekijken",
    nfTitle: "Vindt u uw bestemming niet?",
    nfText:
      "Onze adviseurs kunnen u ook informeren over andere landen. Neem contact op met ons kantoor zodat wij de formaliteiten voor uw reis kunnen nagaan.",
    nfBtn1: "Een adviseur contacteren", nfBtn2: "Een e-mail sturen",
    prEb: "Onze begeleiding", prTitle: "Hoe Travisum u begeleidt",
    prText: "Een begeleiding in drie stappen om fouten te beperken en uw formaliteiten te vergemakkelijken.",
    p1t: "Wij informeren u",
    p1p: "Wij leggen u duidelijk de procedure, de vereiste documenten, de geschatte termijnen en de voorwaarden voor uw bestemming uit.",
    p2t: "Wij controleren uw dossier",
    p2p: "Onze adviseurs controleren de aangeleverde documenten vóór verzending naar het consulaat of de bevoegde autoriteit.",
    p3t: "Wij bezorgen u uw documenten",
    p3p: "Na afgifte van het visum kan uw paspoort op ons kantoor worden afgehaald of geleverd op het adres van uw keuze.",
    trEb: "Waarom Travisum", trTitle: "Menselijke begeleiding, van begin tot eind.",
    t1t: "Menselijke begeleiding", t1p: "Een vast aanspreekpunt dat uw vragen bij elke stap beantwoordt.",
    t2t: "Controle van de documenten", t2p: "Een zorgvuldige controle van uw dossier vóór elke verzending.",
    t3t: "Opvolging van de aanvraag", t3p: "U wordt op de hoogte gehouden van de voortgang van uw dossier.",
    t4t: "Beveiligde terugkeer van het paspoort", t4p: "Afhaling op kantoor of beveiligde levering op het adres van uw keuze.",
    trDisc:
      "De uiteindelijke beslissing om een visum toe te kennen of te weigeren, ligt uitsluitend bij de bevoegde consulaire autoriteiten.",
    ctEb: "Ons vinden", ctTitle: "Contacteer ons kantoor in Brussel",
    ctHours: "Openingsuren", ctItin: "Routebeschrijving", ctWrite: "Schrijf ons",
    fEb: "Klaar om te beginnen", fTitle: "Hulp nodig bij uw visumaanvraag?",
    fText:
      "Leg ons uw bestemming en uw situatie uit. Een Travisum-adviseur geeft u de volgende stappen en de voor te bereiden documenten.",
    fBtn1: "Mijn aanvraag starten", fBtn2: "Travisum contacteren",
    fNote: "Er wordt geen betaling gevraagd voordat de voorwaarden van de dienst u duidelijk zijn voorgesteld.",
    mailVisa: "Visumaanvraag",
  },
  en: {
    fil1: "Home", fil2: "Visas",
    heroEb: "Visa service",
    h1: "Your visa, without the complicated paperwork",
    intro:
      "Travisum supports you with your visa, e-visa and travel-card applications, for your leisure or business trips and your studies.",
    reassure: "Your file is checked before it is sent to the competent authorities.",
    heroBtn1: "Find a destination", heroBtn2: "Send an email",
    tb1: "Checked file", tb2: "Personalised support", tb3: "Secure delivery",
    schTitle: "Which visa do you need?",
    schText: "Select your destination to see the requirements and the documents needed.",
    rDest: "Destination country", rDestPh: "Search a country…",
    rNat: "Nationality", rNatPh: "e.g. Belgian",
    rMotif: "Purpose of travel", rMotifs: ["Tourism", "Business", "Studies"],
    rDate: "Departure date (optional)",
    rSubmit: "See the requirements",
    rNotFound: "We don’t have a page for this destination yet.",
    rContact: "Contact our office",
    popTitle: "The most requested destinations",
    popText: "Quickly access the information and requirements for our most consulted destinations.",
    evEb: "e-Visa",
    evTitle: "Destinations available with an e-Visa",
    evText: "Many destinations issue an electronic visa (e-Visa), applied for online, available to travellers of European nationality — without physically submitting your passport. See the full list by region, the documents and the procedure on our e-Visa page.",
    evCta: "See all e-Visa destinations",
    evNote: "Open to travellers of European nationality (including Belgium). Conditions, fees and validity vary by destination; the final decision rests with the country's authorities.",
    voir: "See the requirements",
    allTitle: "All destinations",
    allText: "Find the information you need to prepare your visa application by destination.",
    gSearchPh: "Search a destination…", gTous: "All",
    gEmpty: "No destination matches your search. Try another name or contact our office.",
    gFiche: "See the requirements",
    nfTitle: "Can’t find your destination?",
    nfText:
      "Our advisers can also help you with other countries. Contact our office so we can check the requirements for your trip.",
    nfBtn1: "Contact an adviser", nfBtn2: "Send an email",
    prEb: "Our support", prTitle: "How Travisum supports you",
    prText: "A three-step support process to reduce errors and make your formalities easier.",
    p1t: "We inform you",
    p1p: "We clearly explain the procedure, the documents needed, the estimated timelines and the conditions for your destination.",
    p2t: "We check your file",
    p2p: "Our advisers review the documents provided before they are sent to the consulate or the competent authority.",
    p3t: "We hand over your documents",
    p3p: "Once the visa is issued, your passport can be collected at our office or delivered to the address of your choice.",
    trEb: "Why Travisum", trTitle: "Human support, from start to finish.",
    t1t: "Human support", t1p: "A dedicated contact who answers your questions at every step.",
    t2t: "Document checking", t2p: "A careful review of your file before any submission.",
    t3t: "Application tracking", t3p: "You are kept informed of the progress of your file.",
    t4t: "Secure passport return", t4p: "Collection at the office or secure delivery to the address of your choice.",
    trDisc:
      "The final decision to grant or refuse a visa rests exclusively with the competent consular authorities.",
    ctEb: "Find us", ctTitle: "Contact our Brussels office",
    ctHours: "Opening hours", ctItin: "Get directions", ctWrite: "Write to us",
    fEb: "Ready to start", fTitle: "Need help with your visa application?",
    fText:
      "Tell us your destination and your situation. A Travisum adviser will give you the next steps and the documents to prepare.",
    fBtn1: "Start my application", fBtn2: "Contact Travisum",
    fNote: "No payment will be requested before the terms of the service have been clearly presented to you.",
    mailVisa: "Visa request",
  },
} as const;

/* --------------------------------------------------------------- petites icônes */
const IcInfo = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" /></svg>
);
const IcShield = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
);
const IcSend = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>
);
const IcUser = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
);
const IcCheck = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);
const IcTrack = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const IcLock = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
const IcPhone = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const IcMail = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>
);
const IcPin = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const IcClock = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>
);
const IcArrow = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);

const VOL_LABEL: Record<SousPage["type"], string> = {
  "visa-tourisme": "Visa tourisme",
  "visa-business": "Visa affaires",
  "e-visa": "e-Visa",
  "informations-generales": "Infos générales",
  "autre": "Autre",
};

export function VisasVue({ lang = "fr", cheminFr = "/visas/" }: { lang?: Locale; cheminFr?: string }) {
  const d = T[lang];
  const L = (c: string) => lien(lang, c);
  const pre = lang === "fr" ? "" : "/" + lang;
  const pays = listePaysVisa();

  const POP = ["inde", "russie", "chine"].map((slug) => {
    const f = fichePays(slug);
    const meta = pays.find((p) => p.slug === slug);
    const types = f
      ? Array.from(new Set(f.sous_pages.filter((s) => s.documents.length > 0).map((s) => VOL_LABEL[s.type]))).slice(0, 3)
      : [];
    return { slug, nom: f?.nom ?? slug, drapeau: meta?.drapeau ?? "", iso2: meta?.iso2 ?? "", types };
  });

  const contactHref = `${pre}/contact/`;
  const mapQ = encodeURIComponent("Travisum Louise Office, 367 Avenue Louise, 1050 Bruxelles");
  const mapSrc = `https://www.google.com/maps?q=${mapQ}&z=16&hl=${lang}&output=embed`;
  const itin = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("367 Avenue Louise, 1050 Bruxelles, Belgique")}`;
  const mailStart = `mailto:${CONTACT.email}?subject=${encodeURIComponent(d.mailVisa)}`;

  return (
    <PageV3 lang={lang} cheminFr={cheminFr}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="vz">
        {/* Fil d'Ariane */}
        <nav className="vz-bread" aria-label={d.fil2}>
          <div className="vz-wrap">
            <a href={L("/")}>{d.fil1}</a>
            <span aria-hidden="true">›</span>
            <span className="cur">{d.fil2}</span>
          </div>
        </nav>

        {/* HERO */}
        <section className="vz-hero">
          <div className="vz-wrap vz-hero-grid">
            <div className="vz-hero-txt">
              <span className="vz-eb light">{d.heroEb}</span>
              <h1>{d.h1}</h1>
              <p className="vz-lead">{d.intro}</p>
              <p className="vz-reassure">{IcShield} {d.reassure}</p>
              <div className="vz-hero-cta">
                <a className="vz-btn vz-btn-primary" href="#recherche">{d.heroBtn1} {IcArrow}</a>
                <a className="vz-btn vz-btn-ghost" href={`mailto:${CONTACT.email}`}>{d.heroBtn2}</a>
              </div>
              <ul className="vz-badges">
                <li>{IcCheck} {d.tb1}</li>
                <li>{IcUser} {d.tb2}</li>
                <li>{IcLock} {d.tb3}</li>
              </ul>
            </div>
            <div className="vz-hero-art" aria-hidden="true">
              <Illustration />
            </div>
          </div>
        </section>

        {/* MOTEUR DE RECHERCHE (superposé) */}
        <section className="vz-search-sec" id="recherche">
          <div className="vz-wrap">
            <div className="vz-search-card">
              <h2>{d.schTitle}</h2>
              <p>{d.schText}</p>
              <RechercheDestination
                pays={pays}
                pre={pre}
                t={{
                  dest: d.rDest, destPh: d.rDestPh, nat: d.rNat, natPh: d.rNatPh,
                  motif: d.rMotif, motifs: [...d.rMotifs], date: d.rDate, submit: d.rSubmit,
                  notFound: d.rNotFound, contact: d.rContact, contactHref,
                }}
              />
            </div>
          </div>
        </section>

        {/* POPULAIRES */}
        <section className="vz-sec">
          <div className="vz-wrap">
            <h2 className="vz-h2">{d.popTitle}</h2>
            <p className="vz-sub">{d.popText}</p>
            <div className="vz-pop">
              {POP.map((p) => (
                <a key={p.slug} className="vz-pcard" href={`${pre}/visas/${p.slug}/`}>
                  <span
                    className="vz-pimg"
                    style={{ backgroundImage: `url(/assets/img/photos/visa-${p.slug}.jpg)` }}
                  />
                  <span className="vz-pbody">
                    <span className="vz-phead">
                      {p.iso2 ? (
                        <img className="vz-flag-img" src={`https://flagcdn.com/${p.iso2.toLowerCase()}.svg`} alt="" loading="lazy" width={26} height={19} />
                      ) : (
                        <span className="vz-flag" aria-hidden="true">{p.nom.slice(0, 2)}</span>
                      )}
                      <b>{p.nom}</b>
                    </span>
                    {p.types.length > 0 && (
                      <span className="vz-ptypes">
                        {p.types.map((tp) => (
                          <span key={tp} className="vz-tag">{tp}</span>
                        ))}
                      </span>
                    )}
                    <span className="vz-plink">{d.voir} {IcArrow}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* E-VISA */}
        <section className="vz-sec vz-evsec" id="e-visa">
          <div className="vz-wrap">
            <span className="vz-eb">{d.evEb}</span>
            <h2 className="vz-h2">{d.evTitle}</h2>
            <p className="vz-sub">{d.evText}</p>
            <a className="vz-btn vz-btn-primary vz-evbtn" href={`${pre}/e-visa/`}>{d.evCta} →</a>
            <p className="vz-evnote">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
              <span>{d.evNote}</span>
            </p>
          </div>
        </section>

        {/* TOUTES LES DESTINATIONS */}
        <section className="vz-sec vz-tint" id="toutes">
          <div className="vz-wrap">
            <h2 className="vz-h2">{d.allTitle}</h2>
            <p className="vz-sub">{d.allText}</p>
            <GrilleDestinations
              pays={pays}
              pre={pre}
              t={{ searchPh: d.gSearchPh, tous: d.gTous, empty: d.gEmpty, fiche: d.gFiche }}
            />

            {/* Non disponible */}
            <div className="vz-nf">
              <div className="vz-nf-txt">
                <h3>{d.nfTitle}</h3>
                <p>{d.nfText}</p>
                <p className="vz-nf-mail"><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
              </div>
              <div className="vz-nf-cta">
                <a className="vz-btn vz-btn-primary" href={contactHref}>{d.nfBtn1}</a>
                <a className="vz-btn vz-btn-line" href={`mailto:${CONTACT.email}`}>{IcMail} {d.nfBtn2}</a>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="vz-sec">
          <div className="vz-wrap">
            <span className="vz-eb">{d.prEb}</span>
            <h2 className="vz-h2">{d.prTitle}</h2>
            <p className="vz-sub">{d.prText}</p>
            <ol className="vz-steps">
              <li><span className="vz-sico">{IcInfo}</span><span className="vz-snum">1</span><h3>{d.p1t}</h3><p>{d.p1p}</p></li>
              <li><span className="vz-sico">{IcShield}</span><span className="vz-snum">2</span><h3>{d.p2t}</h3><p>{d.p2p}</p></li>
              <li><span className="vz-sico">{IcSend}</span><span className="vz-snum">3</span><h3>{d.p3t}</h3><p>{d.p3p}</p></li>
            </ol>
          </div>
        </section>

        {/* TRUST */}
        <section className="vz-sec vz-tint">
          <div className="vz-wrap">
            <span className="vz-eb">{d.trEb}</span>
            <h2 className="vz-h2">{d.trTitle}</h2>
            <div className="vz-trust">
              <div><span className="vz-tico">{IcUser}</span><h3>{d.t1t}</h3><p>{d.t1p}</p></div>
              <div><span className="vz-tico">{IcCheck}</span><h3>{d.t2t}</h3><p>{d.t2p}</p></div>
              <div><span className="vz-tico">{IcTrack}</span><h3>{d.t3t}</h3><p>{d.t3p}</p></div>
              <div><span className="vz-tico">{IcLock}</span><h3>{d.t4t}</h3><p>{d.t4p}</p></div>
            </div>
            <p className="vz-disc">{d.trDisc}</p>
          </div>
        </section>

        {/* CONTACT */}
        <section className="vz-sec" id="contact">
          <div className="vz-wrap">
            <span className="vz-eb">{d.ctEb}</span>
            <h2 className="vz-h2">{d.ctTitle}</h2>
            <div className="vz-contact">
              <div className="vz-ccard">
                <p className="vz-craison">{CONTACT.raison}</p>
                <ul className="vz-clist">
                  <li>{IcPin}<span>{CONTACT.rue}<br />{CONTACT.code_postal} {CONTACT.ville}, {CONTACT.pays}</span></li>
                  <li>{IcMail}<a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                  <li>{IcClock}<span><b>{d.ctHours}</b><br />{CONTACT.horaires}</span></li>
                </ul>
                <div className="vz-ccta">
                  <a className="vz-btn vz-btn-primary" href={itin} target="_blank" rel="noopener noreferrer">{d.ctItin}</a>
                  <a className="vz-btn vz-btn-line" href={`mailto:${CONTACT.email}`}>{d.ctWrite}</a>
                </div>
              </div>
              <div className="vz-map">
                <iframe
                  title={`${CONTACT.raison} — ${CONTACT.rue}, ${CONTACT.ville}`}
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="vz-final">
          <div className="vz-wrap">
            <span className="vz-eb light">{d.fEb}</span>
            <h2>{d.fTitle}</h2>
            <p>{d.fText}</p>
            <div className="vz-final-cta">
              <a className="vz-btn vz-btn-gold" href={mailStart}>{d.fBtn1} {IcArrow}</a>
              <a className="vz-btn vz-btn-ghost" href={contactHref}>{d.fBtn2}</a>
            </div>
            <p className="vz-final-note">{d.fNote}</p>
          </div>
        </section>
      </div>
    </PageV3>
  );
}

/* Illustration passeport / monde / tampon — composition SVG sobre. */
function Illustration() {
  return (
    <svg viewBox="0 0 420 360" role="img" className="vz-illu">
      <defs>
        <linearGradient id="vzg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16314A" />
          <stop offset="1" stopColor="#0B1B2E" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="120" r="86" fill="rgba(255,255,255,.06)" />
      <circle cx="300" cy="120" r="86" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.5" />
      <g stroke="rgba(255,255,255,.28)" strokeWidth="1.2" fill="none">
        <ellipse cx="300" cy="120" rx="86" ry="34" />
        <ellipse cx="300" cy="120" rx="40" ry="86" />
        <line x1="214" y1="120" x2="386" y2="120" />
      </g>
      <circle cx="284" cy="98" r="4" fill="#C9A96A" />
      <circle cx="322" cy="150" r="3" fill="#C9A96A" />
      {/* passeport */}
      <g transform="rotate(-8 150 210)">
        <rect x="80" y="120" width="180" height="230" rx="16" fill="url(#vzg)" />
        <rect x="80" y="120" width="180" height="230" rx="16" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" />
        <circle cx="170" cy="205" r="40" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" />
        <path d="M130 205h80M170 165v80" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" />
        <ellipse cx="170" cy="205" rx="18" ry="40" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" />
        <rect x="120" y="288" width="100" height="8" rx="4" fill="rgba(255,255,255,.5)" />
        <rect x="132" y="304" width="76" height="6" rx="3" fill="rgba(255,255,255,.3)" />
      </g>
      {/* tampon visa */}
      <g transform="rotate(12 300 280)">
        <circle cx="300" cy="280" r="46" fill="none" stroke="#C9A96A" strokeWidth="3" opacity=".9" />
        <circle cx="300" cy="280" r="34" fill="none" stroke="#C9A96A" strokeWidth="1.4" opacity=".7" />
        <text x="300" y="286" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="20" fill="#C9A96A">VISA</text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------- CSS */
const CSS = String.raw`
.vz{--nuit:#0B1B2E;--nuit-2:#0F2438;--bleu:#A8863F;--clair:#F7F3EA;--or:#C9A96A;--or-d:#A8863F;--or-l:#DFC38C;--bg:#F7F8FA;--ink:#16202C;--ink2:#6B7785;--bord:#E4E8EC;--r:14px;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif}
.vz *{box-sizing:border-box}
.vz h1,.vz h2,.vz h3{font-family:Outfit,Inter,sans-serif;color:var(--nuit);letter-spacing:-.02em;line-height:1.12;margin:0}
.vz p{margin:0}
.vz a{color:inherit;text-decoration:none}
.vz-wrap{max-width:1160px;margin:0 auto;padding:0 24px}
.vz-eb{display:inline-flex;align-items:center;gap:8px;font:600 11px/1 Inter;letter-spacing:.16em;text-transform:uppercase;color:var(--bleu);margin-bottom:14px}
.vz-eb.light{color:var(--or)}
.vz-h2{font-size:clamp(24px,3vw,32px)}
.vz-sub{color:var(--ink2);font-size:16px;max-width:640px;margin:10px 0 30px}

/* boutons */
.vz-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:11px;font:600 14.5px Inter;cursor:pointer;border:1px solid transparent;transition:transform .15s ease,background .15s ease,box-shadow .15s ease;white-space:nowrap}
.vz-btn svg{width:16px;height:16px}
.vz-btn-primary{background:var(--or);color:var(--nuit)}
.vz-btn-primary:hover{background:var(--or-l);transform:translateY(-1px)}
.vz-btn-gold{background:var(--or);color:#3a2a06}
.vz-btn-gold:hover{background:var(--or-d);transform:translateY(-1px)}
.vz-btn-ghost{background:rgba(255,255,255,.08);color:#fff;border-color:rgba(255,255,255,.3)}
.vz-btn-ghost:hover{background:rgba(255,255,255,.16)}
.vz-btn-line{background:#fff;color:var(--nuit);border-color:var(--bord)}
.vz-btn-line:hover{border-color:var(--bleu);color:var(--bleu)}
.vz-btn:focus-visible{outline:3px solid rgba(201,169,106,.4);outline-offset:2px}

/* fil d'ariane */
.vz-bread{background:var(--nuit)}
.vz-bread .vz-wrap{display:flex;align-items:center;gap:9px;padding-top:16px;padding-bottom:4px;font-size:13px;color:rgba(255,255,255,.5)}
.vz-bread a{color:rgba(255,255,255,.72)}
.vz-bread a:hover{color:var(--or)}
.vz-bread .cur{color:#fff;font-weight:600}

/* hero */
.vz-hero{background:linear-gradient(135deg,#0B1B2E 0%,#0F2438 55%,#16314A 100%);color:#fff;padding:64px 0 120px;position:relative;overflow:hidden}
.vz-hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}
.vz-hero-txt h1{color:#fff;font-size:clamp(30px,4.4vw,50px);margin-bottom:18px;max-width:12ch}
.vz-lead{color:rgba(255,255,255,.86);font-size:17.5px;line-height:1.6;max-width:44ch;margin-bottom:22px}
.vz-reassure{display:flex;align-items:flex-start;gap:10px;color:rgba(255,255,255,.92);font-size:14px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:10px;padding:13px 16px;max-width:46ch;margin-bottom:34px}
.vz-reassure svg{width:18px;height:18px;flex:none;color:var(--or)}
.vz-hero-cta{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:36px}
.vz-badges{list-style:none;display:flex;flex-wrap:wrap;gap:16px 26px;padding:26px 0 0;margin:0;border-top:1px solid rgba(255,255,255,.12)}
.vz-badges li{display:flex;align-items:center;gap:8px;font-size:13.5px;color:rgba(255,255,255,.9)}
.vz-badges svg{width:18px;height:18px;color:var(--or)}
.vz-hero-art{display:flex;justify-content:center}
.vz-illu{width:100%;max-width:420px;height:auto}

/* recherche superposée */
.vz-search-sec{margin-top:-84px;position:relative;z-index:3}
.vz-search-card{background:#fff;border:1px solid var(--bord);border-radius:18px;box-shadow:0 24px 60px rgba(11,27,46,.14);padding:26px 26px 28px}
.vz-search-card h2{font-size:22px;margin-bottom:6px}
.vz-search-card>p{color:var(--ink2);font-size:14.5px;margin-bottom:18px}
.vz-fields{display:grid;grid-template-columns:1.6fr minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) auto;gap:14px;align-items:end}
.vz-field{display:flex;flex-direction:column;gap:6px;min-width:0}
.vz-field label{font:600 12px Inter;color:var(--ink)}
.vz-field input,.vz-field select{width:100%;height:46px;border:1px solid var(--bord);border-radius:10px;padding:0 13px;font:400 14.5px Inter;color:var(--ink);background:#fff}
.vz-field select{cursor:pointer}
.vz-field input:focus,.vz-field select:focus{outline:0;border-color:var(--bleu);box-shadow:0 0 0 3px rgba(201,169,106,.16)}
.vz-input-ico{position:relative}
.vz-input-ico svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--ink2)}
.vz-input-ico input{padding-left:38px!important}
.vz-field-dest{position:relative}
.vz-suggest{position:absolute;top:100%;left:0;right:0;margin:6px 0 0;padding:6px;list-style:none;background:#fff;border:1px solid var(--bord);border-radius:12px;box-shadow:0 18px 40px rgba(11,27,46,.16);z-index:20;max-height:280px;overflow:auto}
.vz-suggest li button{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;background:none;padding:9px 10px;border-radius:8px;cursor:pointer;font:400 14.5px Inter;color:var(--ink)}
.vz-suggest li button:hover{background:var(--clair)}
.vz-search-go{height:46px}
.vz-search-err{margin-top:14px;color:#8a2b2b;background:#fdecec;border:1px solid #f6c6c6;border-radius:10px;padding:10px 14px;font-size:14px}
.vz-search-err a{color:var(--bleu);font-weight:600;text-decoration:underline}

/* sections */
.vz-sec{padding:64px 0}
.vz-tint{background:#fff;border-top:1px solid var(--bord);border-bottom:1px solid var(--bord)}

/* populaires */
.vz-pop{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px}
.vz-pcard{display:flex;flex-direction:column;background:#fff;border:1px solid var(--bord);border-radius:16px;overflow:hidden;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}
.vz-pcard:hover{transform:translateY(-4px);box-shadow:0 18px 44px rgba(11,27,46,.12);border-color:#d5dbe2}
.vz-pimg{display:block;height:150px;background-size:cover;background-position:center;background-color:var(--clair)}
.vz-pbody{display:flex;flex-direction:column;gap:12px;padding:18px}
.vz-phead{display:flex;align-items:center;gap:10px}
.vz-phead b{font-family:Outfit,sans-serif;font-size:19px;color:var(--nuit)}
.vz-flag{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:22px;padding:0 5px;border-radius:5px;background:var(--clair);border:1px solid var(--bord);font-size:12px;font-weight:700;color:var(--nuit);line-height:1;flex:none}
.vz-flag-img{width:26px;height:19px;object-fit:cover;border-radius:4px;border:1px solid var(--bord);display:inline-block;flex:none;box-shadow:0 1px 2px rgba(11,27,46,.12);background:var(--clair)}
.vz-ptypes{display:flex;flex-wrap:wrap;gap:6px}
/* section e-Visa */
.vz-evsec{background:var(--clair)}
.vz-evbtn{margin-top:20px}
.vz-evgrid{list-style:none;padding:0;margin:22px 0 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:10px}
.vz-evgrid a{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--bord);border-radius:11px;padding:11px 14px;text-decoration:none;color:var(--ink);transition:border-color .15s,box-shadow .15s,transform .15s}
.vz-evgrid a:hover{border-color:var(--or);box-shadow:0 8px 22px rgba(11,27,46,.08);transform:translateY(-1px)}
.vz-evgrid .vz-dname{flex:1;min-width:0;font-weight:600;font-size:14.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.vz-etag{font:600 10px Inter;letter-spacing:.03em;color:var(--or-d);background:var(--clair);border:1px solid #EADFC9;border-radius:999px;padding:3px 8px;flex:none}
.vz-evnote{display:flex;gap:9px;align-items:flex-start;margin:20px 0 0;font-size:13.5px;line-height:1.55;color:var(--ink2);max-width:70ch}
.vz-evnote svg{color:var(--or-d);flex:none;margin-top:1px}
.vz-tag{font:600 11px Inter;color:var(--bleu);background:var(--clair);border:1px solid #EADFC9;border-radius:999px;padding:4px 10px}
.vz-plink{display:inline-flex;align-items:center;gap:7px;margin-top:2px;font:600 13.5px Inter;color:var(--or-d)}
.vz-pcard:hover .vz-plink svg{transform:translateX(3px)}
.vz-plink svg{transition:transform .15s ease}

/* outils grille */
.vz-tools{display:flex;gap:14px;flex-wrap:wrap;align-items:center;justify-content:space-between;margin-bottom:16px}
.vz-tools-search{flex:1;min-width:220px;max-width:380px}
.vz-tools-search input{width:100%;height:44px;border:1px solid var(--bord);border-radius:10px;padding:0 13px 0 38px;font:400 14.5px Inter;background:#fff;color:var(--ink)}
.vz-tools-search input:focus{outline:0;border-color:var(--bleu);box-shadow:0 0 0 3px rgba(201,169,106,.16)}
.vz-chips{display:flex;flex-wrap:wrap;gap:8px}
.vz-chips button{border:1px solid var(--bord);background:#fff;color:var(--ink2);border-radius:999px;padding:8px 14px;font:600 13px Inter;cursor:pointer;transition:.14s}
.vz-chips button:hover{border-color:var(--bleu);color:var(--bleu)}
.vz-chips button.on{background:var(--nuit);border-color:var(--nuit);color:#fff}
.vz-alpha{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:22px}
.vz-alpha button{min-width:32px;height:32px;padding:0 6px;border:1px solid var(--bord);background:#fff;color:var(--ink);border-radius:8px;font:600 12.5px Inter;cursor:pointer;transition:.12s}
.vz-alpha button:hover:not(:disabled){border-color:var(--bleu);color:var(--bleu)}
.vz-alpha button.on{background:var(--bleu);border-color:var(--bleu);color:#fff}
.vz-alpha button:disabled{opacity:.32;cursor:not-allowed}

/* grille */
.vz-grid{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}
.vz-grid a{display:flex;align-items:center;gap:11px;background:#fff;border:1px solid var(--bord);border-radius:12px;padding:12px 14px;transition:.15s}
.vz-grid a:hover{border-color:var(--bleu);box-shadow:0 8px 22px rgba(11,27,46,.08);transform:translateY(-2px)}
.vz-dname{font:500 14.5px Inter;color:var(--ink);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.vz-darr{color:var(--ink2);display:inline-flex}
.vz-grid a:hover .vz-darr{color:var(--bleu)}
.vz-empty{background:var(--clair);border:1px solid #EADFC9;border-radius:12px;padding:22px;color:var(--nuit);text-align:center;font-size:15px}

/* non disponible */
.vz-nf{margin-top:34px;background:var(--clair);border:1px solid #EADFC9;border-radius:18px;padding:28px 30px;display:flex;gap:24px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.vz-nf-txt{max-width:560px}
.vz-nf-txt h3{font-size:20px;margin-bottom:8px}
.vz-nf-txt p{color:var(--ink2);font-size:15px}
.vz-nf-mail{margin-top:8px!important}
.vz-nf-mail a{color:var(--bleu);font-weight:600;text-decoration:underline}
.vz-nf-cta{display:flex;flex-direction:column;gap:10px;flex:none}

/* process */
.vz-steps{list-style:none;padding:0;margin:26px 0 0;display:grid;grid-template-columns:repeat(3,1fr);gap:22px;position:relative}
.vz-steps::before{content:"";position:absolute;top:30px;left:16%;right:16%;height:2px;background:linear-gradient(90deg,var(--bord),var(--bleu),var(--bord))}
.vz-steps li{position:relative;background:var(--bg);padding:0 6px;text-align:center}
.vz-sico{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:50%;background:#fff;border:1px solid var(--bord);color:var(--nuit);box-shadow:0 8px 22px rgba(11,27,46,.08)}
.vz-sico svg{width:26px;height:26px}
.vz-snum{position:absolute;top:-6px;left:calc(50% + 20px);width:22px;height:22px;border-radius:50%;background:var(--or);color:#3a2a06;font:700 12px Inter;display:flex;align-items:center;justify-content:center;z-index:2}
.vz-steps h3{font-size:18px;margin:14px 0 8px}
.vz-steps p{color:var(--ink2);font-size:14.5px;line-height:1.6;max-width:34ch;margin:0 auto}

/* trust */
.vz-trust{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:20px;margin-top:8px}
.vz-trust>div{background:#fff;border:1px solid var(--bord);border-radius:14px;padding:22px}
.vz-tico{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:11px;background:var(--clair);color:var(--bleu);margin-bottom:14px}
.vz-tico svg{width:24px;height:24px}
.vz-trust h3{font-size:16.5px;margin-bottom:7px}
.vz-trust p{color:var(--ink2);font-size:14px;line-height:1.55}
.vz-disc{margin-top:22px;font-size:13.5px;color:var(--ink2);border-left:3px solid var(--or);padding:6px 0 6px 14px;background:linear-gradient(90deg,rgba(217,164,65,.06),transparent)}

/* contact */
.vz-contact{display:grid;grid-template-columns:1fr 1.1fr;gap:24px;margin-top:8px}
.vz-ccard{background:#fff;border:1px solid var(--bord);border-radius:16px;padding:26px}
.vz-craison{font-family:Outfit,sans-serif;font-size:19px;font-weight:600;color:var(--nuit);margin-bottom:16px}
.vz-clist{list-style:none;padding:0;margin:0 0 20px;display:flex;flex-direction:column;gap:14px}
.vz-clist li{display:flex;gap:12px;align-items:flex-start;font-size:14.5px;color:var(--ink)}
.vz-clist svg{width:20px;height:20px;color:var(--bleu);flex:none;margin-top:2px}
.vz-clist a:hover{color:var(--bleu);text-decoration:underline}
.vz-ccta{display:flex;gap:10px;flex-wrap:wrap}
.vz-map{border:1px solid var(--bord);border-radius:16px;overflow:hidden;min-height:320px}
.vz-map iframe{display:block;width:100%;height:100%;min-height:320px;border:0}

/* final */
.vz-final{background:linear-gradient(135deg,#16314A,#0B1B2E);color:#fff;padding:70px 0;text-align:center}
.vz-final h2{color:#fff;font-size:clamp(24px,3.2vw,34px);margin-bottom:14px}
.vz-final>.vz-wrap>p{color:rgba(255,255,255,.85);font-size:16.5px;max-width:60ch;margin:0 auto 26px}
.vz-final-cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.vz-final-note{color:rgba(255,255,255,.6)!important;font-size:12.5px;margin-top:22px!important;max-width:52ch;margin-left:auto;margin-right:auto}

/* responsive */
@media(max-width:1080px){
  .vz-fields{grid-template-columns:1fr 1fr}
  .vz-search-go{grid-column:1 / -1}
}
@media(max-width:960px){
  .vz-hero-grid{grid-template-columns:1fr;gap:22px}
  .vz-hero-art{order:-1;max-width:300px;margin:0 auto}
  .vz-steps{grid-template-columns:1fr;gap:14px}
  .vz-steps::before{display:none}
  .vz-snum{left:calc(50% + 20px)}
  .vz-contact{grid-template-columns:1fr}
}
@media(max-width:560px){
  .vz-fields{grid-template-columns:1fr}
  .vz-nf{flex-direction:column;align-items:stretch}
  .vz-nf-cta{flex-direction:column}
  .vz-hero{padding-bottom:100px}
}
@media(prefers-reduced-motion:reduce){.vz *{transition:none!important}}
`;
