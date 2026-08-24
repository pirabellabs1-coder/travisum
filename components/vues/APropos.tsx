import Page from "@/components/Page";
import { BandeauConversion, LeBureau } from "@/components/sections";
import {
  Carte,
  CartoucheIcone,
  EnteteSection,
  Icone,
  MAXW,
  Section,
} from "@/components/ui";
import { CONTACT, DESTINATIONS, LANGUES } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";


const CHIFFRES: [string, string][] = [
  [`${LANGUES.length}`, "Langues traitées"],
  [`${DESTINATIONS.length}`, "Destinations visa"],
  ["4,5 M", "Vues Google Local Guide"],
  ["9h–17h", "Sans interruption"],
];

const ENGAGEMENTS = [
  [
    "verified_user",
    "Traducteurs jurés",
    "Les traductions assermentées sont réalisées par des traducteurs experts agréés par un Tribunal de première instance belge, et reconnues par les autorités belges et internationales.",
  ],
  [
    "directions_walk",
    "Présence quotidienne",
    "Le bureau se déplace chaque jour auprès des instances bruxelloises. C’est ce qui permet de raccourcir des délais que la voie postale allongerait.",
  ],
  [
    "lock",
    "Confidentialité",
    "Les documents transmis sont traités comme confidentiels, ne sont ni communiqués ni réutilisés, et les copies numériques sont supprimées une fois le dossier clôturé.",
  ],
  [
    "hub",
    "Un seul interlocuteur",
    "Traduction, légalisation et visa dans la même maison : une demande peut enchaîner les trois sans que vous ayez à coordonner trois prestataires.",
  ],
];

const CARTES_LEGALES = [
  ["/mentions-legales/", "gavel", "Mentions légales", "Éditeur, directeur de la publication, hébergement et limites de responsabilité."],
  ["/confidentialite/", "lock", "Politique de confidentialité", "Ce que deviennent les copies de passeports, actes et diplômes que vous nous confiez."],
  ["/cgv/", "description", "Conditions générales", "Devis, délais, prix, responsabilité et réclamations."],
  ["/cookies/", "cookie", "Politique cookies", "Aucun traceur publicitaire. Ce que le site dépose réellement."],
];

export function AProposVue({ lang = "fr", cheminFr = "/a-propos/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  return (
    <Page actif="a-propos" lang={lang} cheminFr={cheminFr}>
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
                Service 06
              </span>
              <span className="h-px bg-tertiary-fixed-dim grow max-w-[120px]" />
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
              Le bureau, avenue Louise.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {CONTACT.raison} accompagne particuliers et entreprises dans leurs démarches
              documentaires internationales : traduction jurée, légalisation et visas de
              voyage.
            </p>
          </div>
          <div className="shrink-0 border border-tertiary-fixed-dim/60 rounded-sm px-8 py-6 text-center bg-surface-container-lowest">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
              Vues Google
            </p>
            <p className="font-display-lg text-headline-md text-on-tertiary-fixed-variant">
              4,5 M
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-2">
              Local Guide
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- MANIFESTE */}
      <Section fond="surface" id="manifeste">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
          <div>
            <EnteteSection
              surtitre="Notre métier"
              titre="Supprimer la corvée administrative"
            />
            <div className="flex flex-col gap-5 font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              <p>
                Faire traduire, légaliser puis déposer un document auprès d’un consulat
                suppose de connaître l’ordre exact des étapes, les guichets compétents et
                les pièces attendues. Une erreur au début de la chaîne se paie à la fin, en
                semaines perdues.
              </p>
              <p>
                Le bureau prend cette chaîne en charge de bout en bout. Vous confiez un
                document ; vous récupérez un dossier conforme, dans un délai annoncé
                d’avance.
              </p>
              <p>
                C’est un métier de précision et de présence : nos traducteurs sont
                assermentés près les tribunaux belges, et le bureau se rend chaque jour
                auprès des administrations bruxelloises.
              </p>
            </div>
          </div>

          <div className="border border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest p-8">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-6">
              En chiffres
            </p>
            <div className="flex flex-wrap gap-y-8">
              {CHIFFRES.map(([valeur, libelle], i) => (
                <div
                  key={libelle}
                  className={`flex flex-col gap-2 px-6 basis-1/2 border-l border-tertiary-fixed-dim/30 ${
                    i % 2 === 0 ? "first:pl-0 [&:nth-child(3)]:pl-0 [&:nth-child(3)]:border-l-0 first:border-l-0" : ""
                  }`}
                >
                  <span className="font-display-lg text-headline-md text-on-tertiary-fixed-variant">
                    {valeur}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                    {libelle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- ENGAGEMENTS */}
      <Section fond="basse" id="engagements">
        <EnteteSection
          surtitre="Nos engagements"
          titre="Ce sur quoi nous nous engageons"
          chapeau="Le client confie des originaux : acte de naissance, diplôme, passeport. Cela impose un niveau d’exigence particulier."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {ENGAGEMENTS.map(([ic, titre, texte]) => (
            <Carte key={titre}>
              <CartoucheIcone nom={ic} />
              <h3 className="font-display-lg text-[21px] text-primary mb-3">{titre}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{texte}</p>
            </Carte>
          ))}
        </div>
      </Section>

      <LeBureau lang={lang} id="contact" />

      {/* ------------------------------------------------- INFORMATIONS LÉGALES */}
      <Section fond="surface" id="legal" filetBas={false}>
        <EnteteSection
          surtitre="Informations légales"
          titre="Mentions, conditions et confidentialité"
          chapeau="Quatre textes distincts, consultables à tout moment et accessibles depuis le pied de page de chaque page du site."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {CARTES_LEGALES.map(([href, ic, titre, texte]) => (
            <a
              key={href}
              className="group flex flex-col gap-3 p-7 border border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim transition-colors"
              href={href}
            >
              <Icone nom={ic} taille="text-[22px]" />
              <h3 className="font-display-lg text-[20px] text-primary group-hover:text-on-tertiary-fixed-variant transition-colors">
                {titre}
              </h3>
              <p className="font-body-md text-[15px] text-on-surface-variant">{texte}</p>
              <span className="inline-flex items-center gap-2 mt-2 font-label-sm text-label-sm uppercase tracking-widest text-primary">
                Consulter
                <Icone
                  nom="arrow_forward"
                  taille="text-[16px] group-hover:translate-x-1 transition-transform"
                  couleur=""
                />
              </span>
            </a>
          ))}
        </div>
      </Section>

      <BandeauConversion lang={lang}
        titre="Passez au bureau, ou envoyez un scan."
        chapeau="367 avenue Louise, du lundi au vendredi de 9 h à 17 h sans interruption. Rendez-vous et conseils personnalisés également possibles."
        action="Nous contacter"
        href={`mailto:${CONTACT.email}`}
      />
    </Page>
  );
}
