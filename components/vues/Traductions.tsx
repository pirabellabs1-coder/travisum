import Page from "@/components/Page";
import { EstimateurTraduction, Faq, TableauTarifs } from "@/components/interactifs";
import { BandeauConversion, GrilleLangues, ListeDocuments } from "@/components/sections";
import { EnteteSection, Icone, LienFleche, MAXW, Section } from "@/components/ui";
import { FAQ, LANGUES, TARIFS } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";


const ASSERMENTEE = [
  "Réalisée par un traducteur expert agréé par un Tribunal de Première Instance belge.",
  "Comporte la signature, le cachet et la déclaration du traducteur attestant de l'exactitude.",
  "Obligatoire pour les actes d'état civil, diplômes, jugements, statuts de société destinés à une administration.",
  "Légalisation supplémentaire souvent requise (Apostille ou consulaire) selon la destination.",
];

const LIBRE = [
  "Réalisée par un traducteur professionnel spécialisé dans le domaine du texte.",
  "Ne possède pas de valeur légale officielle pour les autorités de l'État.",
  "Idéale pour la communication d'entreprise, sites web, manuels techniques, documents internes.",
  "Focus sur la fluidité, le style et l'adaptation culturelle du message.",
];

function Colonne({
  titre,
  icone,
  points,
}: {
  titre: string;
  icone: string;
  points: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-4 border-b border-tertiary-fixed-dim pb-4 mb-6">
        <Icone nom={icone} taille="text-3xl" couleur="text-tertiary-fixed-dim" plein />
        <h3 className="font-display-lg text-[24px] text-primary">{titre}</h3>
      </div>
      <ul className="flex flex-col gap-4 font-body-md text-on-surface">
        {points.map((p) => (
          <li
            key={p}
            className="flex items-start gap-3 border-b border-surface-container-high pb-4 last:border-b-0"
          >
            <Icone nom="check_circle" taille="text-sm mt-1 shrink-0" couleur="text-secondary" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TraductionsVue({ lang = "fr", cheminFr = "/traductions/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  return (
    <Page actif="traductions" lang={lang} cheminFr={cheminFr}>
      {/* ---------------------------------------------------------- BANNIÈRE */}
      <section
        className="w-full bg-primary relative overflow-hidden -mt-20 pt-28 md:pt-32 pb-16 md:pb-20"
        id="estimation"
      >
        <div
          className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/assets/img/photos/hero-traductions.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary pointer-events-none"
          aria-hidden="true"
        />

        <div className={`${MAXW} relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center`}>
          <div className="lg:col-span-7 flex flex-col gap-6 text-on-primary">
            <div className="flex items-center gap-4">
              <span className="w-8 h-px bg-tertiary-fixed-dim" />
              <span className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest">
                Service 01
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary">
              Traductions assermentées,
              <br />
              <span className="text-tertiary-fixed-dim italic font-light">
                jurées et libres
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl mt-4">
              Reconnues par les autorités belges et internationales. Notre réseau de
              traducteurs experts garantit l&apos;exactitude absolue et la conformité légale
              de vos documents.
            </p>
          </div>

          <div className="lg:col-span-5 relative mt-12 lg:mt-0 z-30">
            <EstimateurTraduction />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- ASSERMENTÉE / LIBRE */}
      <Section fond="surface">
        <div className="lg:w-7/12 lg:pr-24 mb-16">
          <h2 className="font-display-lg text-headline-md md:text-headline-lg text-primary mb-6">
            Assermentée ou libre ?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Comprendre la différence est crucial pour la validité de vos démarches. Une
            traduction assermentée est exigée pour tout document destiné à une autorité
            officielle.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-12">
          <Colonne titre="Traduction Assermentée" icone="verified" points={ASSERMENTEE} />
          <Colonne titre="Traduction Libre" icone="description" points={LIBRE} />
        </div>
      </Section>

      <ListeDocuments variante="traduction" />

      <GrilleLangues lang={lang}
        titre={`Les ${LANGUES.length} langues que nous traduisons`}
        chapeau="Assermentée ou libre, à partir et vers toute autre langue."
      />

      <Section fond="basse" id="tarifs">
        <EnteteSection
          surtitre="Délais et tarifs"
          titre="Délais et tarifs de traduction"
          chapeau="Trois niveaux d’urgence, du standard à l’express 24 heures."
        />
        <TableauTarifs bloc={TARIFS.traduction} />
        <div className="mt-8">
          <LienFleche href={L("/tarifs/")}>Voir la grille complète</LienFleche>
        </div>
      </Section>

      <Faq titre="Questions sur la traduction" questions={FAQ.traduction} />

      <BandeauConversion lang={lang}
        titre="Faites estimer votre traduction."
        chapeau="Un scan lisible suffit pour obtenir un prix ferme et un délai."
      />
    </Page>
  );
}
