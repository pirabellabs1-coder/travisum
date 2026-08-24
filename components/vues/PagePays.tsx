import { notFound } from "next/navigation";
import Page from "@/components/Page";
import { Accordeon } from "@/components/interactifs";
import { BandeauConversion, ProcedureVisa } from "@/components/sections";
import {
  CartoucheIcone,
  EnteteSection,
  Icone,
  LienFleche,
  MAXW,
  Section,
} from "@/components/ui";
import {
  ARTICLES,
  CONTACT,
  PAYS,
  URL_SITE,
  articleDe,
  fichePays,
  voisinsDe,
  type DocumentRequis,
  type FichePays,
  type SousPage,
} from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";

/**
 * Fiche pays — écran 05 du devis : « le gabarit le plus important pour le
 * référencement. Il est conçu une fois et alimenté par une base de données. »
 *
 * Les URL reproduisent celles du site actuel (`/visas/inde/`) : les positions
 * acquises sur Google sont préservées sans plan de redirection. Les
 * sous-pages du site actuel, dont les adresses suivaient trois schémas
 * incohérents, sont fusionnées ici.
 */

const VOLETS: { cle: SousPage["type"]; libelle: string; icone: string }[] = [
  { cle: "visa-tourisme", libelle: "Visa tourisme", icone: "luggage" },
  { cle: "visa-business", libelle: "Visa affaires", icone: "work" },
  { cle: "e-visa", libelle: "e-Visa", icone: "bolt" },
  { cle: "autre", libelle: "Autre procédure", icone: "description" },
];

// --------------------------------------------------------------------------
/** Les tableaux de tarifs ont été aplatis en lignes « a | b | c ». */
function estTableau(details: string[]) {
  return details.filter((d) => d.includes(" | ")).length >= 2;
}

function RenduDetails({ details }: { details: string[] }) {
  if (details.length === 0) {
    return (
      <p className="font-body-md text-[15px] text-on-surface-variant italic">
        Aucune précision fournie par le bureau pour ce document.
      </p>
    );
  }

  if (estTableau(details)) {
    const lignes = details.filter((d) => d.includes(" | ")).map((d) => d.split(" | "));
    const reste = details.filter((d) => !d.includes(" | "));
    const largeur = Math.max(...lignes.map((l) => l.length));
    const normalisees = lignes.map((l) => [...l, ...Array(largeur - l.length).fill("")]);
    const [entete, ...corps] = normalisees;

    return (
      <>
        {reste.map((r, i) => (
          <p key={i} className="font-body-md text-body-md text-on-surface-variant mb-4">
            {r}
          </p>
        ))}
        <div className="border border-tertiary-fixed-dim/30 rounded-sm overflow-x-auto bg-surface-container-lowest">
          <table className="w-full min-w-[420px]">
            <thead className="border-b border-tertiary-fixed-dim bg-surface-container-low">
              <tr>
                {entete.map((c, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="text-left font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest px-4 py-3 whitespace-nowrap"
                  >
                    {c || "—"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {corps.map((l, i) => (
                <tr key={i} className="border-b border-tertiary-fixed-dim/20 last:border-b-0">
                  {l.map((c, j) => (
                    <td
                      key={j}
                      className="px-4 py-3 font-body-md text-[15px] text-on-surface tabular-nums"
                    >
                      {c || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {details.map((d, i) => (
        <li
          key={i}
          className="flex items-start gap-3 font-body-md text-body-md text-on-surface-variant"
        >
          <span className="w-3.5 h-px bg-tertiary-fixed-dim mt-3 shrink-0" aria-hidden="true" />
          <span>{d}</span>
        </li>
      ))}
    </ul>
  );
}

function documentsEnItems(documents: DocumentRequis[]) {
  return documents.map((doc) => ({
    titre: doc.nom,
    contenu: <RenduDetails details={doc.details} />,
  }));
}

// --------------------------------------------------------------------------
function Resume({ fiche }: { fiche: FichePays }) {
  const infos = fiche.sous_pages.find((s) => s.type === "informations-generales");
  let delai: string | undefined;
  let livraison: string | undefined;
  let tarif: string | undefined;

  infos?.documents.forEach((doc) => {
    const nom = doc.nom.toLowerCase();
    const premier = doc.details.find((d) => d.trim());
    if (nom.includes("délai") || nom.includes("delai")) delai = premier;
    else if (nom.includes("tarif")) tarif = "Voir la grille détaillée";
    else if (nom.includes("livraison")) livraison = premier;
  });

  const procedures =
    VOLETS.filter((v) => fiche.sous_pages.some((s) => s.type === v.cle))
      .map((v) => v.libelle)
      .join(", ") || "Sur demande";

  const lignes: [string, string][] = [
    ["Procédures traitées", procedures],
    ["Délai d’obtention", delai ?? "Communiqué au devis"],
    ["Tarifs", tarif ?? "Sur devis"],
    ["Livraison", livraison ?? "Retrait au bureau ou envoi"],
  ];

  return (
    <div className="border border-tertiary-fixed-dim/40 rounded-sm bg-surface-container-lowest p-7 lg:sticky lg:top-28">
      <p className="font-label-sm text-label-sm text-on-tertiary-fixed-variant uppercase tracking-widest pb-4 mb-4 border-b border-tertiary-fixed-dim/30">
        En résumé
      </p>
      {lignes.map(([titre, valeur]) => (
        <div
          key={titre}
          className="py-3.5 border-b border-tertiary-fixed-dim/20 last:border-b-0"
        >
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1.5">
            {titre}
          </p>
          <p className="font-body-md text-[15px] text-on-surface">{valeur}</p>
        </div>
      ))}
      <a
        className="mt-6 flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-4 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors"
        href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
          `Demande de visa — ${fiche.nom}`
        )}`}
      >
        Lancer ma demande
      </a>
    </div>
  );
}

// --------------------------------------------------------------------------

export function PagePaysVue({
  slug,
  lang = "fr",
  cheminFr,
}: {
  slug: string;
  lang?: Locale;
  cheminFr: string;
}) {
  const fiche = fichePays(slug);
  if (!fiche) notFound();
  const L = (c: string) => lien(lang, c);

  const voisins = voisinsDe(fiche.slug);
  const infos = fiche.sous_pages.find((s) => s.type === "informations-generales");
  const volets = VOLETS.flatMap((v) =>
    fiche.sous_pages.filter((s) => s.type === v.cle).map((sp) => ({ ...v, sp }))
  );

  const filAriane = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_SITE}/` },
      { "@type": "ListItem", position: 2, name: "Visas", item: `${URL_SITE}/visas/` },
      {
        "@type": "ListItem",
        position: 3,
        name: fiche.nom,
        item: `${URL_SITE}/visas/${fiche.slug}/`,
      },
    ],
  };

  return (
    <Page actif="visas" lang={lang} cheminFr={cheminFr}>
      {/* ---------------------------------------------------------- BANNIÈRE */}
      <section className="w-full bg-surface relative overflow-hidden -mt-20 pt-36 pb-16 border-b border-tertiary-fixed-dim/20">
        <div
          className="guilloche absolute inset-0 opacity-[0.09] pointer-events-none"
          aria-hidden="true"
        />
        <div className={`${MAXW} relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start`}>
          <div className="lg:col-span-7">
            <nav
              className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-8"
              aria-label="Fil d’Ariane"
            >
              <a className="hover:text-primary transition-colors" href={L("/")}>
                Accueil
              </a>
              <span aria-hidden="true">/</span>
              <a className="hover:text-primary transition-colors" href={L("/visas/")}>
                Visas
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-primary">{fiche.nom}</span>
            </nav>

            <div className="flex items-center gap-4 mb-5">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-fixed-variant">
                Destination
              </span>
              <span className="h-px bg-tertiary-fixed-dim grow max-w-[100px]" />
            </div>

            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight mb-6">
              Visa {articleDe(fiche.nom)}
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Procédure, pièces à fournir, délai et tarifs pour une demande déposée depuis
              la Belgique. Le bureau constitue le dossier, prend le rendez-vous consulaire,
              dépose et récupère votre passeport.
            </p>
          </div>

          <div className="lg:col-span-5">
            <Resume fiche={fiche} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ VOLETS */}
      {volets.map(({ cle, libelle, icone, sp }) => (
        <Section key={cle} fond="surface" id={cle}>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <CartoucheIcone nom={icone} marge={false} />
            <h2 className="font-display-lg text-headline-lg text-primary">{libelle}</h2>
            {sp.documents.length > 0 && (
              <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant uppercase tracking-widest">
                {sp.documents.length} documents
              </span>
            )}
          </div>

          {[...sp.intro, ...sp.texte_libre].map((t, i) => (
            <p
              key={i}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-3"
            >
              {t}
            </p>
          ))}

          {sp.documents.length > 0 && (
            <div className="mt-6">
              <Accordeon items={documentsEnItems(sp.documents)} niveau="h4" />
            </div>
          )}
        </Section>
      ))}

      {infos && infos.documents.length > 0 && (
        <Section fond="surface" id="infos">
          <EnteteSection
            surtitre="Informations générales"
            titre="Délais, tarifs et livraison"
            chapeau="Les frais consulaires sont fixés par la représentation diplomatique ; ils sont distincts des honoraires du bureau."
          />
          <Accordeon items={documentsEnItems(infos.documents)} niveau="h4" />
        </Section>
      )}

      {volets.length === 0 && !infos && (
        <Section fond="surface">
          <EnteteSection
            surtitre="Cette destination"
            titre="Fiche en cours de rédaction"
            chapeau="Le bureau traite cette destination, mais le détail des pièces n’est pas encore publié. Contactez-nous : la réponse arrive le jour même."
          />
          <a
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors"
            href={`mailto:${CONTACT.email}`}
          >
            Nous écrire
          </a>
        </Section>
      )}

      <ProcedureVisa />

      {/* ------------------------------------------------- AUTRES DESTINATIONS */}
      <Section fond="surface">
        <EnteteSection surtitre="Autres destinations" titre="Voir aussi" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {voisins.map((v) => (
            <a
              key={v.slug}
              className="group flex items-center justify-between gap-3 px-5 py-4 border border-tertiary-fixed-dim/25 rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim transition-colors"
              href={L(`/visas/${v.slug}/`)}
            >
              <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                {v.nom}
              </span>
              <Icone nom="arrow_forward" taille="text-[16px]" />
            </a>
          ))}
        </div>
        <div className="mt-8">
          <LienFleche href={L("/visas/#toutes")}>Les {PAYS.length} destinations</LienFleche>
        </div>
      </Section>

      <BandeauConversion lang={lang}
        titre={`Préparez votre dossier ${articleDe(fiche.nom)}.`}
        chapeau="Envoyez-nous votre passeport en scan et le motif du séjour : nous vérifions les conditions applicables et la liste des pièces."
        action="Demander un devis"
        href={`mailto:${CONTACT.email}`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filAriane) }}
      />
    </Page>
  );
}
