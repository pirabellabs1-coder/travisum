import Page from "@/components/Page";
import { Faq } from "@/components/interactifs";
import { BandeauConversion } from "@/components/sections";
import { EnteteSection, Icone, MAXW, Section } from "@/components/ui";
import { CONTACT, FAQ } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";


const GUIDES = [
  {
    cat: "Légalisation",
    icone: "translate",
    titre: "Apostille ou légalisation complète : le tableau de décision",
    texte:
      "La Convention de La Haye supprime la chaîne consulaire pour les pays signataires. Comment savoir dans quel cas se trouve votre document, et ce que cela change en délai comme en coût.",
    href: "/legalisations/",
  },
  {
    cat: "Traduction",
    icone: "gavel",
    titre: "Traduction jurée : ce que l’administration vérifie vraiment",
    texte:
      "Signature, cachet, déclaration d’exactitude, inscription au registre du tribunal. Les quatre éléments qui font qu’une traduction est acceptée, ou refusée au guichet.",
    href: "/traductions/",
  },
  {
    cat: "Visas",
    icone: "flight_takeoff",
    titre: "Constituer un dossier de visa qui ne sera pas refusé",
    texte:
      "La majorité des refus tiennent à des motifs administratifs, pas au fond du dossier. Les pièces qui manquent le plus souvent, et l’ordre dans lequel les rassembler.",
    href: "/visas/",
  },
  {
    cat: "Belgique",
    icone: "account_balance",
    titre: "Faire reconnaître un diplôme étranger en Belgique",
    texte:
      "Traduction jurée, légalisation, équivalence : les trois étapes distinctes que l’on confond souvent, et l’ordre dans lequel les mener.",
    href: "/traductions/",
  },
  {
    cat: "International",
    icone: "public",
    titre: "Se marier à l’étranger : les documents à préparer",
    texte:
      "Acte de naissance, certificat de célibat, composition de ménage. Ce que réclament les administrations les plus fréquemment sollicitées.",
    href: "/legalisations/",
  },
  {
    cat: "Traduction",
    icone: "corporate_fare",
    titre: "Statuts de société : traduire pour l’export",
    texte:
      "Extrait BCE, statuts, procurations. Les documents que réclament les chambres de commerce étrangères et le circuit de légalisation associé.",
    href: "/traductions/",
  },
];

const LISTES = [
  {
    icone: "description",
    titre: "Liste de pièces — visa touristique",
    texte:
      "Le socle commun demandé par la majorité des consulats, à compléter selon la destination.",
  },
  {
    icone: "description",
    titre: "Liste de pièces — visa d’affaires",
    texte:
      "Lettre d’invitation, ordre de mission, extrait BCE : le dossier type pour un déplacement professionnel.",
  },
  {
    icone: "description",
    titre: "Préparer un document à légaliser",
    texte:
      "L’ordre des étapes, de la traduction jurée au cachet consulaire, avec les délais à prévoir.",
  },
];

export function RessourcesVue({ lang = "fr", cheminFr = "/ressources/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  return (
    <Page actif="ressources" lang={lang} cheminFr={cheminFr}>
      {/* ---------------------------------------------------------- BANNIÈRE */}
      <section className="w-full bg-surface relative overflow-hidden -mt-20 pt-28 md:pt-32 pb-16 border-b border-tertiary-fixed-dim/20">
        <div
          className="guilloche absolute inset-0 opacity-[0.10] pointer-events-none"
          aria-hidden="true"
        />
        <div className={`${MAXW} relative z-10 flex flex-col gap-6 max-w-3xl`}>
          <div className="flex items-center gap-4">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-fixed-variant">
              Service 05
            </span>
            <span className="h-px bg-tertiary-fixed-dim grow max-w-[120px]" />
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
            Guides, procédures et listes de pièces.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Les réponses aux questions qui reviennent le plus au téléphone, écrites une
            fois pour toutes. Consultables à toute heure, y compris quand le bureau est
            fermé.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ GUIDES */}
      <Section fond="surface" id="guides">
        <EnteteSection
          surtitre="Guides"
          titre="Comprendre avant de se déplacer"
          chapeau="Six guides pratiques sur les démarches les plus fréquentes."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {GUIDES.map((g) => (
            <a
              key={g.titre}
              className="group flex flex-col border border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest p-7 hover:border-tertiary-fixed-dim transition-colors"
              href={g.href}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1.5 border border-tertiary-fixed-dim/40 rounded-sm font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-fixed-variant">
                  {g.cat}
                </span>
                <Icone nom={g.icone} taille="text-[20px]" />
              </div>
              <h3 className="font-display-lg text-[21px] text-primary leading-snug mb-3 group-hover:text-on-tertiary-fixed-variant transition-colors">
                {g.titre}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant grow">
                {g.texte}
              </p>
              <span className="inline-flex items-center gap-2 mt-6 pt-5 border-t border-tertiary-fixed-dim/20 font-label-sm text-label-sm uppercase tracking-widest text-primary">
                Lire le guide
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

      {/* ------------------------------------------------------ TÉLÉCHARGEMENTS */}
      <Section fond="basse" id="documents">
        <EnteteSection
          surtitre="Listes de pièces"
          titre="Savoir exactement quoi rassembler"
          chapeau="Les listes sont adressées par e-mail et adaptées à votre destination et au motif de votre séjour."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {LISTES.map((l) => (
            <div
              key={l.titre}
              className="border border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest p-7"
            >
              <div className="flex items-start gap-5">
                <Icone nom={l.icone} taille="text-[24px] shrink-0 mt-1" />
                <div>
                  <h3 className="font-display-lg text-[20px] text-primary mb-2">
                    {l.titre}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-5">
                    {l.texte}
                  </p>
                  <a
                    className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-primary border-b border-tertiary-fixed-dim pb-1 hover:text-on-tertiary-fixed-variant transition-colors"
                    href={`mailto:${CONTACT.email}?subject=Demande%20de%20liste%20de%20pi%C3%A8ces`}
                  >
                    Recevoir par e-mail
                    <Icone nom="arrow_forward" taille="text-[16px]" couleur="" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Faq titre="Questions fréquentes" questions={FAQ.generale} />

      <BandeauConversion lang={lang}
        titre="Une question que ces guides ne couvrent pas ?"
        chapeau="Le bureau répond de manière claire et rapide, du lundi au vendredi de 9 h à 17 h sans interruption."
        action="Nous écrire"
        href={`mailto:${CONTACT.email}`}
      />
    </Page>
  );
}
