/**
 * Sections de contenu partagées entre plusieurs pages.
 *
 * Chaque section accepte `lang` (défaut « fr ») et préfixe ses liens de
 * navigation par la locale. Le texte reste en français en attendant la
 * traduction ; seuls les liens changent, pour qu'une page NL reste dans la
 * locale NL au clic.
 */

import type { ReactNode } from "react";
import {
  CONTACT,
  DESTINATIONS,
  DESTINATIONS_PHARES,
  DOCUMENTS_LEGALISATION,
  DOCUMENTS_TRADUCTION,
  INSTANCES,
  LANGUES,
  LANGUES_PHARES,
  PROCEDURE_VISA,
  SLUGS,
  aplatir,
} from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";
import { GrilleFiltrable, PlanAcces } from "./interactifs";
import {
  BoutonLaiton,
  EnteteSection,
  Icone,
  LienFleche,
  MAXW,
  Section,
  type Fond,
} from "./ui";

// --------------------------------------------------------------------------
export function BandeauConversion({
  titre,
  chapeau,
  action = "Demander un devis",
  href = "/tarifs/",
  secondaire = true,
  lang = "fr",
}: {
  titre: string;
  chapeau: string;
  action?: string;
  href?: string;
  secondaire?: boolean;
  lang?: Locale;
}) {
  return (
    <section className="w-full bg-primary text-on-primary relative overflow-hidden py-20 md:py-28">
      <div
        className="guilloche absolute inset-0 opacity-[0.09] pointer-events-none"
        aria-hidden="true"
      />
      <div className={`${MAXW} relative z-10 flex flex-col items-center text-center gap-6`}>
        <div className="flex items-center gap-4">
          <span className="w-8 h-px bg-tertiary-fixed-dim" />
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed-dim">
            Votre devis
          </span>
          <span className="w-8 h-px bg-tertiary-fixed-dim" />
        </div>
        <h2 className="font-display-lg text-headline-md md:text-headline-lg max-w-3xl leading-tight">
          {titre}
        </h2>
        <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-2xl">
          {chapeau}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <BoutonLaiton href={lien(lang, href)}>{action}</BoutonLaiton>
          {secondaire && (
            <a
              className="inline-flex items-center justify-center gap-2 border border-tertiary-fixed-dim text-tertiary-fixed-dim px-7 py-4 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-tertiary-fixed-dim/10 transition-colors"
              href={`tel:${CONTACT.telephone_tel}`}
            >
              Appeler le {CONTACT.telephone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
export function GrilleLangues({
  titre = "Les langues que nous traduisons",
  chapeau,
  fond = "surface",
  lang = "fr",
}: {
  titre?: string;
  chapeau?: string;
  fond?: Fond;
  lang?: Locale;
}) {
  const phares = new Set(LANGUES_PHARES.map(aplatir));

  const entrees = LANGUES.map((nom) => {
    const estPhare = phares.has(aplatir(nom));
    return {
      cle: nom,
      terme: aplatir(nom),
      noeud: (
        <a
          className={
            "inline-flex items-center gap-2 px-3.5 py-2 border rounded-sm font-body-md text-[15px] transition-colors duration-200 " +
            (estPhare
              ? "border-seal/35 bg-seal/[0.07] text-primary hover:border-seal hover:bg-seal/[0.12]"
              : "border-tertiary-fixed-dim/25 bg-surface-container-lowest text-on-surface-variant hover:border-tertiary-fixed-dim hover:text-primary")
          }
          href={lien(lang, "/traductions/#langues")}
          title={estPhare ? "Traducteur juré disponible" : "Traduction libre"}
        >
          <span
            className={
              "w-1.5 h-1.5 rounded-full shrink-0 " +
              (estPhare ? "bg-seal" : "bg-tertiary-fixed-dim/40")
            }
            aria-hidden="true"
          />
          {nom}
        </a>
      ),
    };
  });

  return (
    <Section fond={fond} id="langues">
      <EnteteSection surtitre="Langues" titre={titre} chapeau={chapeau} />
      <GrilleFiltrable
        entrees={entrees}
        libelleChamp="Rechercher une langue"
        placeholder="Ex : neerlandais, arabe, mandarin…"
        uniteCompteur="langues affichées"
        rendu="pastilles"
        classesGrille="flex flex-wrap gap-2.5 p-6 md:p-7 border border-tertiary-fixed-dim/20 rounded-sm bg-surface-container-lowest"
        repli={{
          titre: "Votre langue n’est pas dans la liste ?",
          texte:
            "Le réseau du bureau dépasse cette liste. Décrivez votre besoin : vous aurez une réponse claire et rapide d’un membre de notre équipe.",
          action: "Poser la question",
          href: `mailto:${CONTACT.email}`,
        }}
      />
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-10 pt-6 border-t border-tertiary-fixed-dim/20">
        <span className="flex items-center gap-2.5 font-body-md text-[15px] text-on-surface">
          <span className="w-2 h-2 rounded-full bg-seal shrink-0" aria-hidden="true" />
          Traducteur juré assermenté disponible
        </span>
        <span className="flex items-center gap-2.5 font-body-md text-[15px] text-on-surface-variant">
          <span
            className="w-2 h-2 rounded-full bg-tertiary-fixed-dim/40 shrink-0"
            aria-hidden="true"
          />
          Traduction libre
        </span>
      </div>
    </Section>
  );
}

// --------------------------------------------------------------------------
export function ToutesDestinations({
  fond = "basse",
  lang = "fr",
}: {
  fond?: Fond;
  lang?: Locale;
}) {
  const entrees = DESTINATIONS.map((pays) => ({
    cle: pays,
    terme: aplatir(pays),
    noeud: (
      <a
        className="group flex items-center justify-between gap-3 px-5 py-4 border border-tertiary-fixed-dim/25 rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim transition-colors"
        href={lien(lang, `/visas/${SLUGS[pays]}/`)}
      >
        <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
          {pays}
        </span>
        <Icone
          nom="arrow_forward"
          taille="text-[16px] opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </a>
    ),
  }));

  return (
    <Section fond={fond} id="toutes">
      <EnteteSection
        surtitre="Toutes les destinations"
        titre={`${DESTINATIONS.length} pays pris en charge`}
        chapeau="Pour toute autre destination, prenez contact avec le bureau : nous traitons également les demandes hors liste."
      />
      <GrilleFiltrable
        entrees={entrees}
        libelleChamp="Rechercher un pays"
        placeholder="Ex : Chine, Guinée, Qatar…"
        uniteCompteur="destinations affichées"
        repli={{
          titre: "Cette destination n’est pas dans la liste ?",
          texte:
            "Le bureau traite également les demandes hors liste. Contactez-nous avec votre destination et le motif du séjour.",
          action: "Nous écrire",
          href: `mailto:${CONTACT.email}`,
        }}
      />
    </Section>
  );
}

// --------------------------------------------------------------------------
export function DestinationsPhares({
  fond = "basse",
  lang = "fr",
}: {
  fond?: Fond;
  lang?: Locale;
}) {
  return (
    <Section fond={fond} id="destinations">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <EnteteSection
          surtitre="Destinations phares"
          titre="Destinations fréquentes"
          chapeau="Les corridors diplomatiques les plus demandés pour les professionnels belges."
          sansMarge
        />
        <LienFleche href={lien(lang, "/visas/#toutes")}>Toutes les destinations</LienFleche>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {DESTINATIONS_PHARES.map((d) => (
          <a
            key={d.court}
            className="group relative flex flex-col justify-end min-h-[440px] border border-tertiary-fixed-dim/30 rounded-sm overflow-hidden bg-primary hover:border-tertiary-fixed-dim transition-colors duration-300"
            href={lien(lang, `/${d.lien ?? "visas/"}`)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-[0.68] group-hover:opacity-90 group-hover:scale-[1.06] transition-all duration-700 ease-out"
              src={`/${d.image}`}
              alt={d.alt}
              loading="lazy"
              width={800}
              height={1000}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/10"
              aria-hidden="true"
            />
            {/* filet laiton qui se trace au survol */}
            <span
              className="absolute inset-x-0 top-0 h-0.5 bg-tertiary-fixed-dim origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20"
              aria-hidden="true"
            />

            {/* badge type, ancré en haut */}
            <span className="absolute top-5 left-5 z-10 px-3 py-1.5 border border-tertiary-fixed-dim/50 rounded-sm font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed-dim bg-primary/50 backdrop-blur-sm">
              {d.type}
            </span>

            <div className="relative z-10 p-7 flex flex-col gap-5">
              <h3 className="font-display-lg text-[26px] md:text-[30px] text-on-primary leading-tight">
                {d.nom}
              </h3>
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-tertiary-fixed-dim/30">
                <div>
                  <p className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest mb-1">
                    Délai moyen
                  </p>
                  <p className="font-body-md text-body-md text-on-primary">{d.delai}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest mb-1">
                    À partir de
                  </p>
                  <p className="font-body-md text-body-md text-on-primary">{d.prix}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 pt-1 font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed-dim">
                Voir les conditions
                <Icone
                  nom="arrow_forward"
                  taille="text-[16px] group-hover:translate-x-1 transition-transform"
                  couleur=""
                />
              </span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

// --------------------------------------------------------------------------
/** Icône de catégorie déduite du libellé du document (rendu plus lisible). */
function iconeDocument(nom: string): string {
  const n = aplatir(nom);
  if (/(naissance|mariage|deces|divorce|celibat|etat civil|filiation|residence|nationalite)/.test(n))
    return "family_restroom";
  if (/(diplome|releve|note|bulletin|scolaire|etude|academique|universit)/.test(n)) return "school";
  if (/(apostille|legalis)/.test(n)) return "verified";
  if (/(commercial|procuration|power of attorney|facture|contrat|statut|societe|entreprise|brochure)/.test(n))
    return "gavel";
  if (/(casier|judiciaire|police)/.test(n)) return "policy";
  if (/(technique|manuel|notice|ingenier)/.test(n)) return "engineering";
  if (/(site web|\bweb\b|numerique|logiciel)/.test(n)) return "language";
  if (/(medic|sante|vaccin)/.test(n)) return "medical_services";
  return "description";
}

export function ListeDocuments({
  variante,
  fond = "basse",
}: {
  variante: "traduction" | "legalisation";
  fond?: Fond;
}) {
  const docs = variante === "traduction" ? DOCUMENTS_TRADUCTION : DOCUMENTS_LEGALISATION;
  const titre =
    variante === "traduction"
      ? "Les documents que nous traduisons"
      : "Les documents que nous légalisons";
  const chapeau =
    variante === "traduction"
      ? "Une expertise couvrant l’ensemble des besoins légaux, commerciaux et académiques. Si votre document ne figure pas ici, envoyez-le : la réponse arrive le jour même."
      : "Cachet officiel, dépôt et récupération auprès des instances belges et des représentations diplomatiques.";

  return (
    <Section fond={fond} id="documents">
      <EnteteSection surtitre="Documents traités" titre={titre} chapeau={chapeau} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {docs.map((d) => (
          <li key={d}>
            <div className="group h-full flex items-start gap-4 p-5 border border-tertiary-fixed-dim/25 rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim hover:bg-surface-container-low transition-colors duration-300">
              <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-sm bg-surface-container border border-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant group-hover:border-tertiary-fixed-dim/60 transition-colors">
                <Icone nom={iconeDocument(d)} taille="text-[20px]" plein />
              </span>
              <span className="font-body-md text-body-md text-on-surface leading-snug pt-1.5">
                {d}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

// --------------------------------------------------------------------------
export function ListeInstances({ fond = "surface" }: { fond?: Fond }) {
  return (
    <Section fond={fond} id="instances">
      <EnteteSection
        surtitre="Instances couvertes"
        titre="Où nous nous déplaçons quotidiennement"
        chapeau="Notre présence physique quotidienne auprès des instances officielles à Bruxelles nous permet de raccourcir considérablement les délais de traitement."
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 border-t border-tertiary-fixed-dim/20">
        {INSTANCES.map((i) => (
          <li
            key={i}
            className="flex items-start gap-4 py-4 border-b border-tertiary-fixed-dim/20"
          >
            <Icone
              nom="check_circle"
              taille="text-[16px] mt-1 shrink-0"
              couleur="text-secondary"
            />
            <span className="font-body-md text-body-md text-on-surface">{i}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

// --------------------------------------------------------------------------
export function ProcedureVisa({ fond = "encre" }: { fond?: Fond }) {
  return (
    <Section fond={fond} id="procedure" guilloche>
      <EnteteSection
        surtitre="Notre service"
        titre="En quoi consiste notre facilitation d’obtention de visas ?"
        sombre
      />
      <div className="relative">
        <div
          className="hidden md:block absolute top-8 left-0 w-full h-px bg-tertiary-fixed-dim/30"
          aria-hidden="true"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-gutter relative">
          {PROCEDURE_VISA.map((texte, i) => (
            <div key={i} className="relative flex flex-col gap-5">
              <div className="w-16 h-16 rounded-full bg-primary-container border border-tertiary-fixed-dim/50 flex items-center justify-center font-display-lg text-[22px] text-tertiary-fixed-dim shrink-0 relative z-10">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="font-body-md text-body-md text-primary-fixed-dim max-w-sm">
                {texte}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-tertiary-fixed-dim/25">
        <div className="flex items-start gap-4 max-w-3xl">
          <Icone nom="gavel" taille="text-[20px] mt-1 shrink-0" couleur="text-tertiary-fixed-dim" />
          <p className="font-body-md text-body-md text-primary-fixed-dim">
            <strong className="text-on-primary font-semibold">
              La décision appartient au consulat.
            </strong>{" "}
            Notre prestation porte sur la conformité et la complétude du dossier, la prise
            de rendez-vous, le dépôt et le suivi. Aucun intermédiaire ne peut garantir la
            délivrance d’un visa.
          </p>
        </div>
      </div>
    </Section>
  );
}

// --------------------------------------------------------------------------
export function LeBureau({
  id = "bureau",
  fond = "surface",
  lang = "fr",
}: {
  id?: string;
  fond?: Fond;
  lang?: Locale;
}) {
  const lignes: [string, string, ReactNode][] = [
    ["location_on", "Adresse", `${CONTACT.rue}, ${CONTACT.code_postal} ${CONTACT.ville}, ${CONTACT.pays}`],
    ["schedule", "Horaires", CONTACT.horaires],
    [
      "call",
      "Téléphone",
      <>
        <a className="hover:text-primary transition-colors" href={`tel:${CONTACT.telephone_tel}`}>
          {CONTACT.telephone}
        </a>
        <br />
        <a className="hover:text-primary transition-colors" href={`tel:${CONTACT.mobile_tel}`}>
          {CONTACT.mobile}
        </a>
      </>,
    ],
    [
      "mail",
      "E-mail",
      <a className="hover:text-primary transition-colors" href={`mailto:${CONTACT.email}`}>
        {CONTACT.email}
      </a>,
    ],
  ];

  return (
    <Section fond={fond} id={id}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
        <div>
          <EnteteSection
            surtitre="Le bureau"
            titre="367, avenue Louise"
            chapeau="Le bureau reçoit du lundi au vendredi pour déposer et récupérer vos documents. Rendez-vous et conseils personnalisés également possibles."
          />
          <PlanAcces />
        </div>

        <div className="border-t border-tertiary-fixed-dim/20">
          {lignes.map(([ic, titre, valeur]) => (
            <div
              key={titre}
              className="flex items-start gap-4 py-5 border-b border-tertiary-fixed-dim/20"
            >
              <Icone nom={ic} taille="text-[20px] mt-0.5 shrink-0" />
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1.5">
                  {titre}
                </p>
                <p className="font-body-md text-body-md text-on-surface">{valeur}</p>
              </div>
            </div>
          ))}

          <div className="mt-8 p-6 border border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest flex items-start gap-4">
            <Icone nom="verified" taille="text-[22px] shrink-0" plein />
            <div>
              <p className="font-display-lg text-[20px] text-primary leading-snug">
                4 500 000 vues
              </p>
              <p className="font-body-md text-[15px] text-on-surface-variant mt-1">
                sur la fiche Google Local Guide du bureau.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// --------------------------------------------------------------------------
/**
 * Bandeau carte, pleine largeur — bas de la page d'accueil.
 *
 * Uniquement le plan d'accès (les coordonnées détaillées restent sur la page
 * contact). En-tête sobre aligné sur la grille, carte en pleine largeur.
 */
export function BandeauCarte({ lang = "fr" }: { lang?: Locale }) {
  return (
    <section
      id="bureau"
      className="w-full bg-surface-container-lowest border-t border-tertiary-fixed-dim/20 pt-14 md:pt-16"
    >
      <div
        className={`${MAXW} flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8`}
      >
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="w-8 h-px bg-tertiary-fixed-dim" aria-hidden="true" />
            <span className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest">
              Le bureau
            </span>
          </div>
          <h2 className="font-display-lg text-headline-md text-primary leading-tight">
            367, avenue Louise · 1050 Bruxelles
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
            {CONTACT.horaires}. Dépôt et récupération des documents sur place.
          </p>
        </div>
        <LienFleche href={lien(lang, "/a-propos/#contact")}>
          Nous contacter
        </LienFleche>
      </div>

      <PlanAcces bandeau />
    </section>
  );
}
