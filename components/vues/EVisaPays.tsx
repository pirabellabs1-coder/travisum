import PageV3 from "@/components/PageV3";
import { CONTACT } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";
import { evisaParSlug, evisaNom, EVISA_ETAPES } from "@/lib/evisa-contenu";
import { EVISA_CSS } from "@/lib/evisa-styles";
import { T } from "@/components/vues/EVisa";

/**
 * Page e-Visa dédiée à un pays — `/e-visa/{evSlug}/`. Reprend le détail d'un
 * pays de lib/evisa-contenu (intro, nationalités, tourisme/affaires, documents,
 * délai, validité) et le rappel de procédure. Chrome via PageV3, styles `.ev`
 * partagés. UI traduite FR/NL/EN ; le détail par pays reste en français.
 */

const T2 = {
  fr: {
    retour: "Toutes les destinations e-Visa",
    fiche: "Voir la fiche visa complète",
    docsTitre: "Documents généralement nécessaires",
    enBref: "En bref",
    aucunDoc: "Les documents requis dépendent de la catégorie de visa ; ils vous sont précisés lors de la vérification de votre dossier.",
    proc: "Comment se déroule la demande",
    intro2: "Nous préparons votre demande d’e-Visa depuis la Belgique et l’Europe, selon votre nationalité, la durée et le motif de votre séjour.",
  },
  nl: {
    retour: "Alle e-Visum-bestemmingen",
    fiche: "Volledige visumfiche bekijken",
    docsTitre: "Doorgaans vereiste documenten",
    enBref: "In het kort",
    aucunDoc: "De vereiste documenten hangen af van de visumcategorie; ze worden u meegedeeld bij de controle van uw dossier.",
    proc: "Hoe verloopt de aanvraag",
    intro2: "Wij bereiden uw e-Visumaanvraag voor vanuit België en Europa, volgens uw nationaliteit, de duur en het motief van uw verblijf.",
  },
  en: {
    retour: "All e-Visa destinations",
    fiche: "See the full visa page",
    docsTitre: "Documents usually required",
    enBref: "At a glance",
    aucunDoc: "The required documents depend on the visa category; they are confirmed to you when we review your file.",
    proc: "How the application works",
    intro2: "We prepare your e-Visa application from Belgium and Europe, based on your nationality and the length and purpose of your stay.",
  },
} as const;

const IcCheck = (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>);
const IcShield = (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>);

export function EVisaPaysVue({ slug, lang = "fr", cheminFr }: { slug: string; lang?: Locale; cheminFr: string }) {
  const p = evisaParSlug(slug);
  const d = T[lang];
  const d2 = T2[lang];
  const L = (c: string) => lien(lang, c);
  const pre = lang === "fr" ? "" : "/" + lang;

  if (!p) {
    // Sécurité : slug inconnu (ne devrait pas arriver via generateStaticParams).
    return (
      <PageV3 lang={lang} cheminFr={cheminFr}>
        <div className="ev"><section className="ev-sec"><div className="ev-wrap"><p>—</p></div></section></div>
      </PageV3>
    );
  }

  const nom = evisaNom(p, lang);

  return (
    <PageV3 lang={lang} cheminFr={cheminFr}>
      <style dangerouslySetInnerHTML={{ __html: EVISA_CSS }} />
      <div className="ev">
        <nav className="ev-bread" aria-label={nom}>
          <div className="ev-wrap">
            <a href={L("/")}>{d.fil1}</a>
            <span aria-hidden="true">›</span>
            <a href={L("/e-visa/")}>{d.fil2}</a>
            <span aria-hidden="true">›</span>
            <span className="cur">{nom}</span>
          </div>
        </nav>

        <section className="ev-hero">
          <div className="ev-wrap">
            <span className="ev-eb">{d.eb}</span>
            <h1>{d.eb} {nom}</h1>
            <p className="ev-lead">{p.intro}</p>
            <p className="ev-nat">{d2.intro2}</p>
            {p.nationalites && (
              <p className="ev-warn"><span className="ev-warn-ic" aria-hidden="true">!</span><span><strong>{d.natLbl}</strong> {p.nationalites}</span></p>
            )}
            <div className="evp-badges">
              {p.tourisme && <span className="ev-b ev-b-t">{d.tourisme}</span>}
              {p.affaires && <span className="ev-b ev-b-a">{d.affaires}</span>}
            </div>
          </div>
        </section>

        <section className="ev-sec">
          <div className="ev-wrap evp-grid">
            {/* Colonne principale : documents */}
            <div className="ev-panel">
              <h3>{d2.docsTitre}</h3>
              {p.documents && p.documents.length > 0 ? (
                <div className="ev-docs" style={{ marginTop: "12px" }}>
                  <ul>{p.documents.map((x, i) => (<li key={i}>{IcCheck}<span>{x}</span></li>))}</ul>
                </div>
              ) : (
                <p style={{ marginTop: "10px" }}>{d2.aucunDoc}</p>
              )}
            </div>

            {/* Aside : en bref + liens */}
            <aside className="ev-panel ev-panel-b evp-aside">
              <h3>{d2.enBref}</h3>
              <dl className="ev-meta" style={{ marginTop: "12px" }}>
                {p.tourisme && (<><dt>{d.tourisme}</dt><dd>{p.tourisme}</dd></>)}
                {p.affaires && (<><dt>{d.affaires}</dt><dd>{p.affaires}</dd></>)}
                {p.delai && (<><dt>{d.delai}</dt><dd>{p.delai}</dd></>)}
                {p.validite && (<><dt>{d.validite}</dt><dd>{p.validite}</dd></>)}
              </dl>
              <div className="evp-links">
                <a className="ev-btn ev-btn-s" href={L("/contact/")}>{d.ctaBtn} →</a>
                {p.slug && (
                  <a className="ev-btn ev-btn-so" href={`${pre}/visas/${p.slug}/`}>{d2.fiche}</a>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* Rappel de procédure */}
        <section className="ev-sec ev-tint">
          <div className="ev-wrap">
            <h2 className="ev-h2">{d2.proc}</h2>
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

        {/* CTA final */}
        <section className="ev-final">
          <div className="ev-wrap">
            <span className="ev-final-ic" aria-hidden="true">{IcShield}</span>
            <h2>{d.ctaTitre}</h2>
            <p>{d.ctaText}</p>
            <div className="ev-cta">
              <a className="ev-btn ev-btn-p" href={L("/contact/")}>{d.ctaBtn} →</a>
              <a className="ev-btn ev-btn-out" href={`mailto:${CONTACT.email}`}>{d.ctaCall}</a>
            </div>
            <div className="evp-backrow">
              <a className="evp-back" href={L("/e-visa/")}>← {d2.retour}</a>
            </div>
            <p className="ev-disc" style={{ marginTop: "22px" }}>{d.disc}</p>
          </div>
        </section>
      </div>
    </PageV3>
  );
}
