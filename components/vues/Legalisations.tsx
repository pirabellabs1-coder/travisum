import Page from "@/components/Page";
import { Faq, TableauTarifs } from "@/components/interactifs";
import {
  BandeauConversion,
  ListeDocuments,
  ListeInstances,
} from "@/components/sections";
import { Carte, EnteteSection, Icone, LienFleche, MAXW, Section } from "@/components/ui";
import { FAQ, TARIFS } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";


const PARCOURS = [
  {
    icone: "translate",
    titre: "Traduction Jurée",
    texte:
      "Traduction de votre document original par un traducteur expert assermenté.",
    delai: "1–2 jours",
  },
  {
    icone: "gavel",
    titre: "Tribunal de 1ère Instance",
    texte:
      "Authentification de la signature du traducteur juré par le greffe du tribunal de son arrondissement.",
    delai: "Immédiat",
  },
  {
    icone: "account_balance",
    titre: "SPF Justice & Affaires Étrangères",
    texte:
      "Double légalisation au niveau fédéral. Pose de l'Apostille de La Haye si applicable à la destination.",
    delai: "2–3 jours",
  },
  {
    icone: "flag",
    titre: "Ambassade / Consulat",
    texte:
      "Légalisation finale par la représentation consulaire du pays de destination (pour les pays non signataires de la Convention de La Haye).",
    delai: "Variable (2–14 jours)",
  },
];

export function LegalisationsVue({ lang = "fr", cheminFr = "/legalisations/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  return (
    <Page actif="legalisations" lang={lang} cheminFr={cheminFr}>
      {/* ---------------------------------------------------------- BANNIÈRE */}
      <section className="w-full bg-surface relative overflow-hidden -mt-20 pt-40 pb-20 border-b border-tertiary-fixed-dim/20">
        <div
          className="guilloche absolute inset-0 opacity-[0.10] pointer-events-none"
          aria-hidden="true"
        />
        <div className={`${MAXW} relative z-10 flex flex-col gap-6 max-w-3xl`}>
          <div className="flex items-center gap-4">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-fixed-variant">
              Service 02
            </span>
            <span className="h-px bg-tertiary-fixed-dim grow max-w-[120px]" />
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
            Légalisations, apostilles et dépôts officiels.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Nous prenons en charge l&apos;intégralité du processus de légalisation de vos
            documents auprès des instances gouvernementales belges et des représentations
            diplomatiques étrangères.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- PARCOURS */}
      <Section fond="encre" guilloche id="parcours">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          <div className="lg:w-1/3 flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-display-lg text-headline-md md:text-headline-lg text-on-primary">
              Parcours de votre document
            </h2>
            <p className="font-body-md text-body-md text-primary-fixed-dim">
              Un processus rigoureux en 4 étapes, coordonné de bout en bout pour garantir
              la validité internationale de vos actes.
            </p>
            <div className="hidden lg:block mt-8 w-16 h-px bg-tertiary-fixed-dim/30" />
          </div>

          <div className="lg:w-2/3 relative">
            <div
              className="absolute left-6 md:left-[39px] top-8 bottom-8 w-px bg-tertiary-fixed-dim/40"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-12">
              {PARCOURS.map((etape, i) => (
                <div key={etape.titre} className="flex gap-6 md:gap-12 relative group">
                  <div className="relative z-10 w-12 h-12 md:w-20 md:h-20 rounded-full bg-surface flex items-center justify-center border border-tertiary-fixed-dim shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <Icone
                      nom={etape.icone}
                      taille="text-2xl md:text-3xl"
                      couleur="text-on-tertiary-fixed-variant"
                    />
                  </div>
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center gap-4">
                      <span className="font-label-sm text-label-sm text-tertiary-fixed-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display-lg text-[22px] text-on-primary">
                        {etape.titre}
                      </h3>
                    </div>
                    <p className="font-body-md text-body-md text-primary-fixed-dim max-w-xl">
                      {etape.texte}
                    </p>
                    <p className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed-dim">
                      <Icone nom="schedule" taille="text-[14px]" couleur="" />
                      {etape.delai}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------- APOSTILLE OU LÉGALISATION */}
      <Section fond="surface" id="apostille">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
          <Carte accent="laiton">
            <p className="flex items-center gap-3 font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-fixed-variant mb-5">
              <Icone nom="help" taille="text-[18px]" />
              Le saviez-vous ?
            </p>
            <h2 className="font-display-lg text-headline-md text-primary mb-4">
              Apostille ou légalisation complète ?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              La nécessité d&apos;une apostille ou d&apos;une légalisation consulaire dépend
              exclusivement du pays de destination de votre document.
            </p>

            <div className="flex flex-col gap-4">
              <div className="p-5 border border-tertiary-fixed-dim/25 rounded-sm bg-surface">
                <p className="flex items-center gap-3 font-label-sm text-label-sm uppercase tracking-widest text-primary mb-2">
                  <Icone nom="verified" taille="text-[16px]" couleur="text-secondary" plein />
                  Pays convention de La Haye
                </p>
                <p className="font-body-md text-[15px] text-on-surface-variant">
                  Une simple apostille délivrée par le SPF Affaires étrangères suffit. Pas
                  de passage en ambassade requis.
                </p>
              </div>
              <div className="p-5 border border-tertiary-fixed-dim/25 rounded-sm bg-surface">
                <p className="flex items-center gap-3 font-label-sm text-label-sm uppercase tracking-widest text-primary mb-2">
                  <Icone nom="public" taille="text-[16px]" />
                  Autres pays
                </p>
                <p className="font-body-md text-[15px] text-on-surface-variant">
                  Nécessite la procédure complète incluant la légalisation finale par
                  l&apos;ambassade ou le consulat.
                </p>
              </div>
            </div>
          </Carte>

          <div>
            <EnteteSection
              surtitre="Notre présence"
              titre="Une chaîne coordonnée de bout en bout"
              chapeau="Chaque maillon suppose de connaître le bon guichet, le bon ordre et les bonnes pièces. Une erreur au début de la chaîne se paie à la fin, en semaines perdues."
            />
            <LienFleche href="#instances">Voir les instances couvertes</LienFleche>
          </div>
        </div>
      </Section>

      <ListeDocuments variante="legalisation" />
      <ListeInstances />

      <Section fond="basse" id="tarifs">
        <EnteteSection
          surtitre="Délais et tarifs"
          titre="Délais et frais par instance"
          chapeau="Les frais officiels réclamés par l’administration sont distingués des honoraires du bureau."
        />
        <TableauTarifs bloc={TARIFS.legalisation} />
        <div className="mt-8">
          <LienFleche href={L("/tarifs/")}>Voir la grille complète</LienFleche>
        </div>
      </Section>

      <Faq titre="Questions sur la légalisation" questions={FAQ.legalisation} />

      <BandeauConversion lang={lang}
        titre="Besoin de légaliser vos documents ?"
        chapeau="Obtenez une analyse précise de votre dossier et un devis détaillé dans les 2 heures ouvrables."
      />
    </Page>
  );
}
