import PageV3 from "@/components/PageV3";
import { CONTACT } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";
import { EVISA_REGIONS, EVISA_ETAPES, EVISA_BUSINESS_MOTIFS } from "@/lib/evisa-contenu";

/**
 * Page « e-Visa » — visa électronique en ligne. Contenu par région + détail par
 * pays (données FR de lib/evisa-contenu), et sections explicatives. Chrome via
 * PageV3 ; style scopé `.ev` aligné sur la charte (bleu nuit + or). Aucun prix.
 * L'UI et les sections générales sont traduites FR/NL/EN ; le détail par pays
 * est pour l'instant en français.
 */

const T = {
  fr: {
    fil1: "Accueil", fil2: "e-Visa",
    eb: "e-Visa",
    h1: "e-Visa — demandez votre visa électronique en ligne",
    lead: "De nombreuses destinations permettent désormais d’obtenir un e-Visa, ou visa électronique, sans devoir déposer physiquement son passeport auprès d’une ambassade ou d’un consulat. Nous accompagnons particuliers, voyageurs d’affaires et entreprises dans leurs demandes depuis la Belgique et l’Europe.",
    nat: "Nos services concernent notamment les titulaires de passeports belges, français, néerlandais, luxembourgeois, allemands et espagnols, ainsi que les autres nationalités éligibles.",
    warn: "L’éligibilité à un e-Visa dépend principalement de la nationalité indiquée sur le passeport utilisé pour voyager, et non du pays de résidence du demandeur.",
    destTitre: "Destinations e-Visa par région",
    tourisme: "Tourisme", affaires: "Affaires", docs: "Documents",
    delai: "Délai", validite: "Validité", voir: "Voir la fiche",
    stepsTitre: "Comment demander un e-Visa ?",
    tourTitre: "e-Visa touristique",
    tourText: "Vous voyagez pour des vacances, une visite familiale ou un séjour privé ? Nous vérifions si votre destination propose un visa électronique et préparons votre demande en fonction de votre nationalité et de la durée du séjour.",
    bizTitre: "e-Visa business — voyages d’affaires",
    bizText: "De nombreux pays proposent désormais des e-Visas spécifiques pour les voyages d’affaires. Les formalités sont généralement plus détaillées : une invitation de la société locale, un ordre de mission, une preuve d’emploi ou des documents d’entreprise peuvent être exigés. Il est important de sélectionner la bonne catégorie : un e-Visa touristique ne permet pas automatiquement les activités d’un visa business.",
    bizMotifs: "Vous devez vous rendre à l’étranger pour :",
    natTitre: "Quelles nationalités peuvent demander un e-Visa ?",
    natText: "Nous traitons notamment les demandes pour les titulaires de passeports : Belgique, France, Pays-Bas, Luxembourg, Allemagne, Espagne et autres pays européens selon la destination. L’éligibilité est toujours déterminée sur la base du passeport utilisé pour voyager. Une personne résidant en Belgique mais titulaire d’un passeport d’un autre pays peut donc être soumise à des conditions différentes.",
    timeTitre: "Combien de temps faut-il pour obtenir un e-Visa ?",
    timeText: "Les délais peuvent varier de quelques heures à plusieurs jours ouvrables selon le pays. Même lorsqu’une destination annonce un traitement rapide, nous recommandons d’introduire la demande suffisamment tôt : un dossier peut faire l’objet d’un contrôle complémentaire ou nécessiter des documents supplémentaires.",
    diffTitre: "e-Visa ou visa traditionnel : quelle différence ?",
    diffText: "L’e-Visa est un visa obtenu par une procédure électronique. Contrairement au visa consulaire traditionnel, il n’est généralement pas nécessaire de déposer physiquement le passeport auprès d’une ambassade ou d’un consulat. L’autorisation est reçue sous format électronique et est liée aux informations du passeport utilisées lors de la demande. L’e-Visa ne doit pas être confondu avec une simple autorisation électronique de voyage.",
    ctaTitre: "Besoin d’un e-Visa ?",
    ctaText: "Envoyez-nous votre nationalité, votre destination, votre date de départ, la durée du séjour et le motif du voyage (tourisme ou affaires). Nous vérifions la procédure applicable et les documents nécessaires.",
    ctaBtn: "Demander mon e-Visa", ctaCall: "Appeler le bureau",
    disc: "Les conditions d’entrée, l’éligibilité, les délais et la validité des visas sont déterminés exclusivement par les autorités du pays de destination et peuvent être modifiés sans préavis. L’acceptation d’une demande reste de la compétence exclusive des autorités concernées.",
  },
  nl: {
    fil1: "Home", fil2: "e-Visum",
    eb: "e-Visum",
    h1: "e-Visum — vraag uw elektronisch visum online aan",
    lead: "Talrijke bestemmingen laten nu toe om een e-Visum (elektronisch visum) te verkrijgen zonder uw paspoort fysiek bij een ambassade of consulaat af te geven. Wij begeleiden particulieren, zakenreizigers en bedrijven bij hun aanvragen vanuit België en Europa.",
    nat: "Onze diensten gelden onder meer voor houders van Belgische, Franse, Nederlandse, Luxemburgse, Duitse en Spaanse paspoorten, en andere in aanmerking komende nationaliteiten.",
    warn: "De toegang tot een e-Visum hangt vooral af van de nationaliteit vermeld op het reispaspoort, en niet van het land van verblijf van de aanvrager.",
    destTitre: "e-Visum-bestemmingen per regio",
    tourisme: "Toerisme", affaires: "Zaken", docs: "Documenten",
    delai: "Termijn", validite: "Geldigheid", voir: "Fiche bekijken",
    stepsTitre: "Hoe vraagt u een e-Visum aan?",
    tourTitre: "Toeristisch e-Visum",
    tourText: "Reist u voor vakantie, familiebezoek of een privéverblijf? Wij controleren of uw bestemming een elektronisch visum aanbiedt en bereiden uw aanvraag voor volgens uw nationaliteit en de duur van het verblijf.",
    bizTitre: "Zakelijk e-Visum — zakenreizen",
    bizText: "Talrijke landen bieden nu specifieke e-Visa voor zakenreizen. De formaliteiten zijn doorgaans uitgebreider: een uitnodiging van het lokale bedrijf, een zendingsopdracht, een bewijs van tewerkstelling of bedrijfsdocumenten kunnen vereist zijn. Kies de juiste categorie: een toeristisch e-Visum staat niet automatisch de activiteiten van een zakelijk visum toe.",
    bizMotifs: "U moet naar het buitenland voor:",
    natTitre: "Welke nationaliteiten kunnen een e-Visum aanvragen?",
    natText: "Wij behandelen onder meer aanvragen voor houders van paspoorten uit: België, Frankrijk, Nederland, Luxemburg, Duitsland, Spanje en andere Europese landen naargelang de bestemming. De toegang wordt steeds bepaald op basis van het reispaspoort. Wie in België woont maar een paspoort van een ander land heeft, kan dus onderworpen zijn aan andere voorwaarden.",
    timeTitre: "Hoelang duurt het om een e-Visum te verkrijgen?",
    timeText: "De termijnen kunnen variëren van enkele uren tot meerdere werkdagen naargelang het land. Zelfs bij een snelle behandeling raden wij aan de aanvraag tijdig in te dienen: een dossier kan een bijkomende controle of extra documenten vergen.",
    diffTitre: "e-Visum of traditioneel visum: wat is het verschil?",
    diffText: "Het e-Visum is een visum verkregen via een elektronische procedure. In tegenstelling tot het traditionele consulaire visum hoeft u het paspoort meestal niet fysiek af te geven. De machtiging wordt elektronisch ontvangen en is gekoppeld aan de bij de aanvraag gebruikte paspoortgegevens. Verwar het e-Visum niet met een eenvoudige elektronische reismachtiging.",
    ctaTitre: "Nood aan een e-Visum?",
    ctaText: "Stuur ons uw nationaliteit, uw bestemming, uw vertrekdatum, de duur van het verblijf en het reismotief (toerisme of zaken). Wij controleren de toepasselijke procedure en de nodige documenten.",
    ctaBtn: "Mijn e-Visum aanvragen", ctaCall: "Het kantoor bellen",
    disc: "De toegangsvoorwaarden, de ontvankelijkheid, de termijnen en de geldigheid van visa worden uitsluitend bepaald door de autoriteiten van het land van bestemming en kunnen zonder voorafgaande kennisgeving worden gewijzigd. De aanvaarding van een aanvraag blijft de exclusieve bevoegdheid van de betrokken autoriteiten.",
  },
  en: {
    fil1: "Home", fil2: "e-Visa",
    eb: "e-Visa",
    h1: "e-Visa — apply for your electronic visa online",
    lead: "Many destinations now allow you to obtain an e-Visa (electronic visa) without physically submitting your passport to an embassy or consulate. We support individuals, business travellers and companies with their applications from Belgium and Europe.",
    nat: "Our services cover holders of Belgian, French, Dutch, Luxembourg, German and Spanish passports, as well as other eligible nationalities.",
    warn: "Eligibility for an e-Visa depends mainly on the nationality shown on the passport used for travel, not on the applicant's country of residence.",
    destTitre: "e-Visa destinations by region",
    tourisme: "Tourism", affaires: "Business", docs: "Documents",
    delai: "Timeline", validite: "Validity", voir: "View the page",
    stepsTitre: "How to apply for an e-Visa?",
    tourTitre: "Tourist e-Visa",
    tourText: "Travelling for a holiday, a family visit or a private stay? We check whether your destination offers an electronic visa and prepare your application based on your nationality and length of stay.",
    bizTitre: "Business e-Visa — business trips",
    bizText: "Many countries now offer specific e-Visas for business trips. The formalities are usually more detailed: an invitation from the local company, an assignment letter, proof of employment or company documents may be required. Choose the right category: a tourist e-Visa does not automatically allow business-visa activities.",
    bizMotifs: "You need to travel abroad to:",
    natTitre: "Which nationalities can apply for an e-Visa?",
    natText: "We handle applications for holders of passports from: Belgium, France, the Netherlands, Luxembourg, Germany, Spain and other European countries depending on the destination. Eligibility is always determined on the basis of the passport used for travel. Someone residing in Belgium but holding another country's passport may therefore be subject to different conditions.",
    timeTitre: "How long does it take to get an e-Visa?",
    timeText: "Timelines can range from a few hours to several working days depending on the country. Even when a destination advertises fast processing, we recommend applying well in advance: a file may be subject to additional checks or require further documents.",
    diffTitre: "e-Visa or traditional visa: what's the difference?",
    diffText: "The e-Visa is a visa obtained through an electronic procedure. Unlike a traditional consular visa, you generally don't need to physically submit your passport to an embassy or consulate. The authorisation is received electronically and is linked to the passport details used in the application. The e-Visa should not be confused with a simple electronic travel authorisation.",
    ctaTitre: "Need an e-Visa?",
    ctaText: "Send us your nationality, your destination, your departure date, the length of stay and the purpose of the trip (tourism or business). We check the applicable procedure and the required documents.",
    ctaBtn: "Request my e-Visa", ctaCall: "Call the office",
    disc: "Entry conditions, eligibility, timelines and visa validity are determined exclusively by the authorities of the destination country and may change without notice. Acceptance of an application remains the sole responsibility of the relevant authorities.",
  },
} as const;

const IcCheck = (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>);
const IcShield = (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>);

export function EVisaVue({ lang = "fr", cheminFr = "/e-visa/" }: { lang?: Locale; cheminFr?: string }) {
  const d = T[lang];
  const L = (c: string) => lien(lang, c);
  const pre = lang === "fr" ? "" : "/" + lang;

  return (
    <PageV3 lang={lang} cheminFr={cheminFr}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ev">
        <nav className="ev-bread" aria-label={d.fil2}>
          <div className="ev-wrap">
            <a href={L("/")}>{d.fil1}</a>
            <span aria-hidden="true">›</span>
            <span className="cur">{d.fil2}</span>
          </div>
        </nav>

        <section className="ev-hero">
          <div className="ev-wrap">
            <span className="ev-eb">{d.eb}</span>
            <h1>{d.h1}</h1>
            <p className="ev-lead">{d.lead}</p>
            <p className="ev-nat">{d.nat}</p>
            <p className="ev-warn"><span className="ev-warn-ic" aria-hidden="true">!</span><span>{d.warn}</span></p>
          </div>
        </section>

        {/* Destinations par région */}
        <section className="ev-sec">
          <div className="ev-wrap">
            <h2 className="ev-h2">{d.destTitre}</h2>
            {EVISA_REGIONS.map((r) => (
              <div key={r.region} className="ev-region">
                <h3 className="ev-region-h">{r.region}</h3>
                <div className="ev-cards">
                  {r.pays.map((p) => (
                    <details key={p.nom} className="ev-card">
                      <summary>
                        <span className="ev-cname">{p.nom}</span>
                        <span className="ev-badges">
                          {p.tourisme && <span className="ev-b ev-b-t">{d.tourisme}</span>}
                          {p.affaires && <span className="ev-b ev-b-a">{d.affaires}</span>}
                        </span>
                      </summary>
                      <div className="ev-body">
                        <p>{p.intro}</p>
                        <dl className="ev-meta">
                          {p.tourisme && (<><dt>{d.tourisme}</dt><dd>{p.tourisme}</dd></>)}
                          {p.affaires && (<><dt>{d.affaires}</dt><dd>{p.affaires}</dd></>)}
                          {p.delai && (<><dt>{d.delai}</dt><dd>{p.delai}</dd></>)}
                          {p.validite && (<><dt>{d.validite}</dt><dd>{p.validite}</dd></>)}
                        </dl>
                        {p.documents && p.documents.length > 0 && (
                          <div className="ev-docs">
                            <p className="ev-docs-h">{d.docs}</p>
                            <ul>{p.documents.map((x, i) => (<li key={i}>{IcCheck}<span>{x}</span></li>))}</ul>
                          </div>
                        )}
                        {p.slug && (
                          <a className="ev-flink" href={`${pre}/visas/${p.slug}/`}>{d.voir} →</a>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comment demander */}
        <section className="ev-sec ev-tint">
          <div className="ev-wrap">
            <h2 className="ev-h2">{d.stepsTitre}</h2>
            <ol className="ev-steps">
              {EVISA_ETAPES.map((s, i) => (
                <li key={i}>
                  <span className="ev-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.titre}</h3>
                  <p>{s.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tourisme + Business */}
        <section className="ev-sec">
          <div className="ev-wrap ev-two">
            <div className="ev-panel">
              <h3>{d.tourTitre}</h3>
              <p>{d.tourText}</p>
            </div>
            <div className="ev-panel ev-panel-b">
              <h3>{d.bizTitre}</h3>
              <p>{d.bizText}</p>
              <p className="ev-motifs-h">{d.bizMotifs}</p>
              <ul className="ev-motifs">
                {EVISA_BUSINESS_MOTIFS.map((m, i) => (<li key={i}>{IcCheck}<span>{m}</span></li>))}
              </ul>
            </div>
          </div>
        </section>

        {/* Infos : nationalités / délais / différence */}
        <section className="ev-sec ev-tint">
          <div className="ev-wrap ev-info">
            <div><h3>{d.natTitre}</h3><p>{d.natText}</p></div>
            <div><h3>{d.timeTitre}</h3><p>{d.timeText}</p></div>
            <div><h3>{d.diffTitre}</h3><p>{d.diffText}</p></div>
          </div>
        </section>

        {/* CTA final */}
        <section className="ev-final">
          <div className="ev-wrap">
            <span className="ev-final-ic" aria-hidden="true">{IcShield}</span>
            <h2>{d.ctaTitre}</h2>
            <p>{d.ctaText}</p>
            <div className="ev-cta">
              <a className="ev-btn ev-btn-p" href={L("/contact/")}>{d.ctaBtn} →</a>
              <a className="ev-btn ev-btn-out" href={`tel:${CONTACT.telephone_tel}`}>{d.ctaCall}</a>
            </div>
            <p className="ev-disc">{d.disc}</p>
          </div>
        </section>
      </div>
    </PageV3>
  );
}

const CSS = String.raw`
.ev{--nuit:#0B1B2E;--nuit-2:#0F2438;--or:#C9A96A;--or-d:#A8863F;--or-l:#DFC38C;--clair:#F7F3EA;--bg:#F7F8FA;--ink:#16202C;--ink2:#6B7785;--bord:#E4E8EC;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif}
.ev *{box-sizing:border-box}
.ev h1,.ev h2,.ev h3{font-family:Outfit,Inter,sans-serif;color:var(--nuit);letter-spacing:-.02em;line-height:1.15;margin:0}
.ev p{margin:0}
.ev a{color:inherit;text-decoration:none}
.ev-wrap{max-width:1120px;margin:0 auto;padding:0 24px}
.ev-eb{display:inline-block;font:600 11px/1 Inter;letter-spacing:.16em;text-transform:uppercase;color:var(--or);margin-bottom:14px}
.ev-h2{font-size:clamp(22px,3vw,30px);margin-bottom:8px}

.ev-bread{background:var(--nuit)}
.ev-bread .ev-wrap{display:flex;align-items:center;gap:9px;padding:16px 24px 4px;font-size:13px;color:rgba(255,255,255,.5)}
.ev-bread a{color:rgba(255,255,255,.72)}.ev-bread a:hover{color:var(--or)}
.ev-bread .cur{color:#fff;font-weight:600}

.ev-hero{background:linear-gradient(135deg,#0B1B2E 0%,#0F2438 60%,#16314A 100%);color:#fff;padding:52px 0 56px}
.ev-hero h1{color:#fff;font-size:clamp(26px,3.8vw,40px);margin-bottom:16px;max-width:20ch}
.ev-lead{color:rgba(255,255,255,.86);font-size:16.5px;line-height:1.65;max-width:75ch;margin-bottom:14px}
.ev-nat{color:rgba(255,255,255,.72);font-size:14.5px;line-height:1.6;max-width:75ch;margin-bottom:18px}
.ev-warn{display:flex;gap:11px;align-items:flex-start;background:rgba(201,169,106,.12);border:1px solid rgba(201,169,106,.4);border-radius:12px;padding:14px 16px;max-width:75ch;font-size:14px;line-height:1.55;color:#fff}
.ev-warn-ic{flex:none;width:22px;height:22px;border-radius:50%;background:var(--or);color:var(--nuit);font:800 14px Inter;display:flex;align-items:center;justify-content:center}

.ev-sec{padding:56px 0}
.ev-tint{background:var(--clair)}
.ev-region{margin-top:30px}
.ev-region-h{font-size:15px;text-transform:uppercase;letter-spacing:.1em;color:var(--or-d);margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid var(--bord)}
.ev-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ev-card{background:#fff;border:1px solid var(--bord);border-radius:12px;overflow:hidden}
.ev-card summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px}
.ev-card summary::-webkit-details-marker{display:none}
.ev-card summary::after{content:"+";color:var(--or);font-size:22px;line-height:1;font-weight:400;flex:none}
.ev-card[open] summary::after{content:"–"}
.ev-card[open] summary{border-bottom:1px solid var(--bord)}
.ev-cname{font:600 16px Outfit;color:var(--nuit)}
.ev-badges{display:flex;gap:6px;margin-left:auto}
.ev-b{font:600 10px Inter;letter-spacing:.03em;border-radius:999px;padding:3px 8px}
.ev-b-t{color:var(--or-d);background:var(--clair);border:1px solid #EADFC9}
.ev-b-a{color:#365a86;background:#eef3f9;border:1px solid #d8e4f0}
.ev-body{padding:16px 18px 18px}
.ev-body>p{font-size:14.5px;line-height:1.6;color:var(--ink);margin-bottom:14px}
.ev-meta{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;margin:0 0 14px}
.ev-meta dt{font:600 12px Inter;color:var(--or-d);text-transform:uppercase;letter-spacing:.05em;padding-top:1px}
.ev-meta dd{margin:0;font-size:13.5px;color:var(--ink);line-height:1.5}
.ev-docs-h{font:600 12px Inter;color:var(--or-d);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px}
.ev-docs ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px}
.ev-docs li,.ev-motifs li{display:flex;gap:9px;align-items:flex-start;font-size:13.5px;color:var(--ink);line-height:1.5}
.ev-docs svg,.ev-motifs svg{color:var(--or-d);flex:none;margin-top:1px}
.ev-flink{display:inline-block;margin-top:14px;font:600 13.5px Inter;color:var(--or-d)}
.ev-flink:hover{color:var(--nuit)}

.ev-steps{list-style:none;padding:0;margin:22px 0 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px}
.ev-steps li{background:#fff;border:1px solid var(--bord);border-radius:12px;padding:20px}
.ev-num{font:700 12px Inter;color:var(--or);letter-spacing:.1em}
.ev-steps h3{font-size:16px;margin:10px 0 8px}
.ev-steps p{font-size:13.5px;line-height:1.55;color:var(--ink2)}

.ev-two{display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:start}
.ev-panel{background:#fff;border:1px solid var(--bord);border-radius:14px;padding:26px}
.ev-panel-b{border-top:3px solid var(--or)}
.ev-panel h3{font-size:19px;margin-bottom:10px}
.ev-panel p{font-size:14.5px;line-height:1.6;color:var(--ink)}
.ev-motifs-h{font-weight:600;margin:16px 0 10px!important;color:var(--nuit)}
.ev-motifs{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:7px}

.ev-info{display:grid;grid-template-columns:1fr 1fr 1fr;gap:26px}
.ev-info h3{font-size:17px;margin-bottom:10px}
.ev-info p{font-size:14px;line-height:1.6;color:var(--ink2)}

.ev-final{background:linear-gradient(135deg,#16314A,#0B1B2E);color:#fff;padding:64px 0;text-align:center}
.ev-final-ic{display:inline-flex;width:52px;height:52px;border-radius:50%;background:rgba(201,169,106,.15);border:1px solid rgba(201,169,106,.4);align-items:center;justify-content:center;color:var(--or);margin-bottom:18px}
.ev-final h2{color:#fff;font-size:clamp(24px,3vw,32px);margin-bottom:12px}
.ev-final>.ev-wrap>p{color:rgba(255,255,255,.82);font-size:16px;line-height:1.6;max-width:60ch;margin:0 auto 24px}
.ev-cta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:26px}
.ev-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 24px;border-radius:11px;font:600 15px Inter;cursor:pointer;border:1px solid transparent;transition:.15s}
.ev-btn-p{background:var(--or);color:var(--nuit)}.ev-btn-p:hover{background:var(--or-l);transform:translateY(-1px)}
.ev-btn-out{background:transparent;color:#fff;border-color:rgba(255,255,255,.35)}.ev-btn-out:hover{background:rgba(255,255,255,.1)}
.ev-disc{color:rgba(255,255,255,.55);font-size:12.5px;line-height:1.6;max-width:80ch;margin:0 auto}

@media(max-width:820px){
  .ev-cards,.ev-two,.ev-info{grid-template-columns:1fr}
}
@media(prefers-reduced-motion:reduce){.ev *{transition:none!important}}
`;
