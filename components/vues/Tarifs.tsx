import Page from "@/components/Page";
import { Faq, OngletsTarifs } from "@/components/interactifs";
import { BandeauConversion } from "@/components/sections";
import {
  Carte,
  CartoucheIcone,
  EnteteSection,
  Icone,
  MAXW,
  Section,
} from "@/components/ui";
import { CONTACT, TARIFS } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";


const NIVEAUX = [
  [
    "schedule",
    "Standard",
    "3 à 5 jours ouvrables",
    "Le rythme normal du bureau. Convient à toute démarche planifiée : mariage, inscription universitaire, constitution de société.",
  ],
  [
    "bolt",
    "Prioritaire",
    "48 heures",
    "Le dossier passe devant. Utile lorsqu’un rendez-vous consulaire ou une échéance administrative est déjà fixé.",
  ],
  [
    "priority_high",
    "Express",
    "24 heures",
    "Traitement le jour même lorsque le document est reçu avant midi. Soumis à disponibilité du traducteur juré pour la langue concernée.",
  ],
];

const COMPRIS = [
  "La traduction et sa relecture systématique",
  "Le cachet, la signature et la déclaration du traducteur juré",
  "Une copie certifiée du document",
  "Le conseil sur la chaîne de légalisation applicable",
  "Le suivi du dossier jusqu’à la remise",
];

const SUPPLEMENT = [
  "Les frais officiels réclamés par les administrations et consulats",
  "Les copies certifiées au-delà de la première",
  "L’envoi recommandé ou la livraison à domicile",
  "Les traitements prioritaire et express",
];

const QUESTIONS: [string, string][] = [
  [
    "Pourquoi un devis plutôt qu’un prix fixe ?",
    "Parce que le prix dépend de facteurs réels : la langue, le nombre de pages, la technicité du texte, la lisibilité du document source et la chaîne de légalisation exigée par le pays de destination. Un tarif unique serait soit trop cher pour les dossiers simples, soit intenable pour les dossiers complexes.",
  ],
  [
    "Les frais officiels sont-ils inclus ?",
    "Non. Les montants réclamés par le SPF Justice, les Affaires étrangères ou les consulats sont distincts des honoraires du bureau. Ils vous sont refacturés à l’euro près, sur justificatif.",
  ],
  [
    "Les prix affichés sont-ils TVA comprise ?",
    "Non, les montants sont indiqués hors TVA. Le devis nominatif précise le montant TVA comprise.",
  ],
  [
    "Où trouver le tarif exact pour un visa ?",
    "Chaque fiche pays publie la grille du consulat concerné, telle que le bureau la communique : frais consulaires et frais de service, par type de demandeur. Ouvrez la fiche de votre destination pour la consulter.",
  ],
  [
    "Comment régler ?",
    "Par virement bancaire ou sur place au bureau. Le règlement intervient à la remise des documents, sauf accord particulier pour les dossiers récurrents et les clients professionnels.",
  ],
];

export function TarifsVue({ lang = "fr", cheminFr = "/tarifs/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  return (
    <Page actif="tarifs" lang={lang} cheminFr={cheminFr}>
      {/* ---------------------------------------------------------- BANNIÈRE */}
      <section className="w-full bg-surface relative overflow-hidden -mt-20 pt-40 pb-20 border-b border-tertiary-fixed-dim/20">
        <div
          className="guilloche absolute inset-0 opacity-[0.10] pointer-events-none"
          aria-hidden="true"
        />
        <div className={`${MAXW} relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10`}>
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-fixed-variant">
                Service 04
              </span>
              <span className="h-px bg-tertiary-fixed-dim grow max-w-[120px]" />
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
              Tarifs et délais, publiés.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Le bureau publie ses prix. C’est la première question de tout visiteur, et la
              réponse ne devrait pas exiger un appel téléphonique.
            </p>
          </div>
          <div className="shrink-0 border border-tertiary-fixed-dim/60 rounded-sm px-8 py-6 text-center bg-surface-container-lowest">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
              Devis ferme en
            </p>
            <p className="font-display-lg text-headline-md text-on-tertiary-fixed-variant">
              2 h
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-2">
              ouvrables
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ GRILLE */}
      <Section fond="surface" id="grille">
        <EnteteSection
          surtitre="Tarifs et délais"
          titre="Nos prix, publiés"
          chapeau="Chaque montant distingue clairement les frais officiels reversés aux administrations des honoraires du bureau."
        />
        <OngletsTarifs
          onglets={[
            { cle: "traduction", libelle: "Traduction", bloc: TARIFS.traduction },
            { cle: "legalisation", libelle: "Légalisation", bloc: TARIFS.legalisation },
            { cle: "visa", libelle: "Visa", bloc: TARIFS.visa },
          ]}
        />

        <div className="mt-10 p-6 border border-tertiary-fixed-dim/30 border-l-2 border-l-tertiary-fixed-dim rounded-sm bg-surface-container-lowest flex items-start gap-4 max-w-3xl">
          <Icone nom="draft" taille="text-[20px] mt-0.5 shrink-0" />
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
              Montants indicatifs
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Ces tarifs de traduction et de légalisation sont des ordres de grandeur hors
              TVA, donnés pour situer le budget. Les tarifs de visa, eux, sont publiés
              destination par destination dans chaque fiche pays. Le prix ferme dépend de la
              langue, du volume, de la technicité du document et du pays de destination.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ NIVEAUX */}
      <Section fond="basse" id="delais">
        <EnteteSection
          surtitre="Niveaux d’urgence"
          titre="Trois rythmes de traitement"
          chapeau="Le même travail, la même valeur juridique : seule la place dans la file change."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {NIVEAUX.map(([ic, titre, delai, texte]) => (
            <Carte key={titre} accent="laiton">
              <CartoucheIcone nom={ic} />
              <h3 className="font-display-lg text-[24px] text-primary mb-2">{titre}</h3>
              <p className="font-label-sm text-label-sm text-on-tertiary-fixed-variant uppercase tracking-widest mb-4">
                {delai}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">{texte}</p>
            </Carte>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- INCLUS */}
      <Section fond="surface" id="inclus">
        <EnteteSection
          surtitre="Ce que couvre le prix"
          titre="Sans mauvaise surprise"
          chapeau="Les frais officiels sont refacturés à l’euro près, sur justificatif. Le bureau ne prend aucune marge dessus."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {[
            ["Compris dans le prix", COMPRIS, "check_circle", "text-secondary"],
            ["Facturé en supplément", SUPPLEMENT, "add_circle", "text-on-tertiary-fixed-variant"],
          ].map(([titre, items, ic, couleur]) => (
            <Carte key={titre as string}>
              <h3 className="font-display-lg text-[22px] text-primary mb-5 pb-4 border-b border-tertiary-fixed-dim/30">
                {titre as string}
              </h3>
              <ul className="flex flex-col gap-3">
                {(items as string[]).map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <Icone
                      nom={ic as string}
                      taille="text-[16px] mt-1 shrink-0"
                      couleur={couleur as string}
                    />
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      {x}
                    </span>
                  </li>
                ))}
              </ul>
            </Carte>
          ))}
        </div>
      </Section>

      <Faq titre="Questions sur les tarifs" questions={QUESTIONS} />

      <BandeauConversion lang={lang}
        titre="Un chiffre ferme, pas une fourchette."
        chapeau="Envoyez le scan de vos documents et la destination : vous recevez le détail poste par poste, frais officiels distingués des honoraires."
        action="Demander mon devis"
        href={`mailto:${CONTACT.email}`}
      />
    </Page>
  );
}
