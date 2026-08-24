import Page from "@/components/Page";
import { Faq } from "@/components/interactifs";
import {
  BandeauConversion,
  DestinationsPhares,
  GrilleLangues,
  LeBureau,
  ListeDocuments,
} from "@/components/sections";
import { EnteteSection, Icone, LienFleche, MAXW, Section } from "@/components/ui";
import { FAQ, LANGUES } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";
import { accueil, sections } from "@/lib/contenu-i18n";


/* Bandeau des langues — le défilement infini de la maquette. */
const MARQUEE = [
  "Anglais", "Néerlandais", "Allemand", "Espagnol", "Italien",
  "Portugais", "Russe", "Arabe", "Chinois", "Japonais",
];

const METIERS_META = [
  { icone: "g_translate", href: "/traductions/" },
  { icone: "verified", href: "/legalisations/" },
  { icone: "airplane_ticket", href: "/visas/" },
];
export function AccueilVue({ lang = "fr", cheminFr = "/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  const c = accueil(lang);
  const s = sections(lang);
  return (
    <Page lang={lang} cheminFr={cheminFr}>
      {/* ---------------------------------------------------------- BANNIÈRE */}
      <section className="relative w-full bg-primary overflow-hidden min-h-[85vh] flex flex-col justify-center -mt-20 pt-20">
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-1/2 h-full opacity-30 lg:opacity-60 bg-cover bg-center mix-blend-luminosity border-l border-tertiary-fixed-dim/20"
          style={{ backgroundImage: "url('/assets/img/photos/hero-avenue-louise.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent lg:w-3/4"
          aria-hidden="true"
        />

        <div className={`relative ${MAXW} w-full py-16 md:py-24 flex flex-col z-10`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-tertiary-fixed-dim" />
            <span className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest">
              {c.hero_surtitre}
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary max-w-4xl leading-none mb-6">
            {c.hero_titre}{" "}
            <span className="text-tertiary-fixed-dim italic">
              {c.hero_titre_italique}
            </span>
          </h1>

          <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-2xl mb-12">
            {c.hero_chapeau}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-8 py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 rounded-sm border border-tertiary-fixed-dim hover:border-white text-center"
              href={L("/tarifs/")}
            >
              {c.hero_cta1}
            </a>
            <a
              className="bg-transparent text-tertiary-fixed-dim border border-tertiary-fixed-dim px-8 py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-tertiary-fixed-dim/10 transition-colors duration-300 rounded-sm text-center"
              href="mailto:info@travisum.com?subject=D%C3%A9p%C3%B4t%20de%20document"
            >
              {c.hero_cta2}
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-tertiary-fixed-dim/30 mt-auto">
            {[
              `${LANGUES.length}`,
              "9h–17h",
              "100%",
              "4,5M",
            ].map((valeur, i) => {
              const libelle = c.stats[i];
              return (
              <div key={libelle} className="flex flex-col">
                <span className="font-display-lg text-headline-md text-tertiary-fixed-dim mb-1">
                  {valeur}
                </span>
                <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase">
                  {libelle}
                </span>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- MARQUEE */}
      <div className="marquee w-full bg-surface-container-highest border-b border-tertiary-fixed-dim/20 py-3 overflow-hidden flex whitespace-nowrap">
        <div className="marquee-track flex items-center gap-8 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          {[...MARQUEE, ...MARQUEE].map((langue, i) => (
            <span key={i} className="flex items-center gap-8">
              {langue}
              <span
                className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------ TROIS MÉTIERS */}
      <Section fond="surface">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <EnteteSection
            surtitre={c.metiers_surtitre}
            titre={
              <>
                {c.metiers_titre_1}
                <br />
                <span className="italic text-on-surface-variant">{c.metiers_titre_2}</span>
              </>
            }
            sansMarge
          />
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Nous simplifions la complexité administrative. De la traduction assermentée à
{c.metiers_intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {c.metiers.map((m, i) => (
            <div
              key={i}
              className="p-8 md:p-10 flex flex-col h-full border border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim hover:bg-surface-container-low transition-colors duration-500 group"
            >
              <div className="w-12 h-12 mb-8 text-on-tertiary-fixed-variant bg-surface-container flex items-center justify-center rounded-sm">
                <Icone nom={METIERS_META[i].icone} plein />
              </div>
              <h3 className="font-display-lg text-headline-md text-primary mb-4">
                {m.titre[0]}
                <br />
                {m.titre[1]}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 grow">
                {m.texte}
              </p>
              <ul className="flex flex-col gap-3 mb-12">
                {m.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 font-label-sm text-label-sm text-on-surface uppercase"
                  >
                    <span className="w-4 h-px bg-tertiary-fixed-dim" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary uppercase tracking-widest group-hover:text-on-tertiary-fixed-variant transition-colors mt-auto"
                href={L(METIERS_META[i].href)}
              >
                {m.decouvrir}
                <Icone
                  nom="arrow_forward"
                  taille="text-sm transform group-hover:translate-x-2 transition-transform"
                  couleur=""
                />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- PROCESSUS */}
      <Section fond="encre" guilloche>
        <div className="text-center mb-24">
          <span className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest mb-4 block">
            {c.processus_surtitre}
          </span>
          <h2 className="font-display-lg text-headline-md md:text-headline-lg text-on-primary">
            {c.processus_titre}
          </h2>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute top-[40px] left-0 w-full h-px bg-tertiary-fixed-dim/30"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {c.etapes.map(([titre, texte], i) => (
              <div
                key={titre}
                className="relative flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center font-display-lg text-headline-md mb-8 relative z-10 border ${
                    i === 3
                      ? "bg-tertiary-fixed-dim border-tertiary-fixed-dim text-primary"
                      : "bg-primary-container border-tertiary-fixed-dim/50 text-tertiary-fixed-dim"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary mb-3">
                  {titre}
                </h3>
                <p className="font-body-md text-body-md text-primary-fixed-dim">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <ListeDocuments variante="traduction" />
      <GrilleLangues
        lang={lang}
        titre={`${LANGUES.length} ${c.langues_titre}`}
        chapeau={c.langues_chapeau}
      />
      <DestinationsPhares lang={lang} />
      <LeBureau lang={lang} />
      <Faq titre="Les questions que l’on nous pose le plus" questions={FAQ.generale} />

      <BandeauConversion
        lang={lang}
        titre={c.cta_titre}
        chapeau={c.cta_chapeau}
      />
    </Page>
  );
}
