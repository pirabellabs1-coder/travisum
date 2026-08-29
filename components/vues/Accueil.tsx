import Page from "@/components/Page";
import { Faq } from "@/components/interactifs";
import {
  BandeauCarte,
  BandeauConversion,
  DestinationsPhares,
  GrilleLangues,
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

/* Icônes des 4 étapes du processus, par ordre (indépendant de la langue). */
const ICONES_PROCESSUS = ["upload_file", "request_quote", "workspace_premium", "local_shipping"];
export function AccueilVue({ lang = "fr", cheminFr = "/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  const c = accueil(lang);
  const s = sections(lang);
  return (
    <Page lang={lang} cheminFr={cheminFr}>
      {/* ---------------------------------------------------------- BANNIÈRE */}
      <section className="relative w-full bg-primary overflow-hidden -mt-20 pt-28 md:pt-32 pb-16">
        <div
          className="guilloche absolute inset-0 opacity-[0.05] pointer-events-none"
          aria-hidden="true"
        />
        <div className={`relative ${MAXW} z-10`}>
          {/* Deux colonnes : texte à gauche, image à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* ---- Colonne texte ---- */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-4 mb-5">
                <span className="w-10 h-px bg-tertiary-fixed-dim" />
                <span className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest">
                  {c.hero_surtitre}
                </span>
              </div>

              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary leading-[1.06] mb-5">
                {c.hero_titre}{" "}
                <span className="text-tertiary-fixed-dim italic">{c.hero_titre_italique}</span>
              </h1>

              <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl mb-7">
                {c.hero_chapeau}
              </p>

              {/* Portes d'entrée */}
              <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim/60 mb-3">
                {c.doors_label}
              </p>
              <div className="grid gap-2 max-w-md mb-8">
                {c.doors.map(([label, href]) => (
                  <a
                    key={label}
                    href={L(href)}
                    className="group flex items-center justify-between gap-3 px-4 py-3 rounded-sm border border-tertiary-fixed-dim/25 hover:border-tertiary-fixed-dim/60 hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="font-body-md text-body-md text-on-primary">{label}</span>
                    <Icone
                      nom="arrow_forward"
                      taille="text-[18px] group-hover:translate-x-1 transition-transform"
                      couleur="text-tertiary-fixed-dim"
                    />
                  </a>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-7 py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 rounded-sm text-center"
                  href={L("/tarifs/")}
                >
                  {c.hero_cta1}
                </a>
                <a
                  className="bg-transparent text-tertiary-fixed-dim border border-tertiary-fixed-dim px-7 py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-tertiary-fixed-dim/10 transition-colors duration-300 rounded-sm text-center"
                  href={L("/a-propos/#contact")}
                >
                  {c.hero_cta2}
                </a>
              </div>
            </div>

            {/* ---- Colonne image ---- */}
            <div className="lg:col-span-6">
              <div className="relative rounded-sm overflow-hidden border border-tertiary-fixed-dim/25 aspect-[4/3] lg:aspect-[5/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/img/photos/hero-avenue-louise.jpg"
                  alt="Le bureau Travisum, avenue Louise à Bruxelles"
                  className="absolute inset-0 w-full h-full object-cover"
                  width={1000}
                  height={800}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute left-5 bottom-5 flex items-center gap-2.5 bg-primary/80 backdrop-blur-sm border border-tertiary-fixed-dim/30 rounded-sm px-4 py-2.5">
                  <Icone nom="location_on" taille="text-[18px]" couleur="text-tertiary-fixed-dim" />
                  <span className="font-body-md text-[14px] text-on-primary">
                    367, avenue Louise · 1050 Bruxelles
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chiffres, pleine largeur sous les deux colonnes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 pt-8 border-t border-tertiary-fixed-dim/25">
            {[`${LANGUES.length}`, "9h–17h", "100%", "4,5M"].map((valeur, i) => (
              <div key={c.stats[i]} className="flex flex-col">
                <span className="font-display-lg text-headline-md text-tertiary-fixed-dim mb-1">
                  {valeur}
                </span>
                <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase">
                  {c.stats[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- MARQUEE */}
      <div className="w-full bg-surface-container-highest border-y border-tertiary-fixed-dim/20 relative">
        <div className="flex items-center">
          {/* Étiquette fixe à gauche */}
          <div className="hidden sm:flex shrink-0 items-center gap-2.5 pl-margin-mobile md:pl-margin-desktop pr-6 py-3.5 relative z-10 bg-surface-container-highest border-r border-tertiary-fixed-dim/20">
            <Icone nom="translate" taille="text-[18px]" couleur="text-tertiary-fixed-dim" />
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest whitespace-nowrap">
              Nos langues
            </span>
          </div>
          {/* Piste défilante, avec fondus sur les bords */}
          <div
            className="marquee grow overflow-hidden flex whitespace-nowrap py-3.5"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
            }}
          >
            <div className="marquee-track flex items-center gap-10 pl-10 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
              {[...MARQUEE, ...MARQUEE].map((langue, i) => (
                <span key={i} className="flex items-center gap-10">
                  {langue}
                  <span
                    className="w-1.5 h-1.5 bg-tertiary-fixed-dim rotate-45"
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ TROIS MÉTIERS */}
      <Section fond="surface">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
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
            {c.metiers_intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {c.metiers.map((m, i) => (
            <div
              key={i}
              className="group relative flex flex-col h-full p-7 md:p-8 border border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim transition-colors duration-300"
            >
              {/* filet de laiton qui se trace au survol */}
              <span
                className="absolute inset-x-0 top-0 h-0.5 bg-tertiary-fixed-dim origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                aria-hidden="true"
              />

              <div className="flex items-center justify-between mb-7">
                <div className="w-11 h-11 flex items-center justify-center rounded-sm bg-surface-container border border-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant">
                  <Icone nom={METIERS_META[i].icone} plein taille="text-[22px]" />
                </div>
                <span className="font-display-lg text-[22px] font-bold text-tertiary-fixed-dim/70">
                  {`0${i + 1}`}
                </span>
              </div>

              <h3 className="font-display-lg text-[22px] text-primary mb-3 leading-snug">
                {m.titre.join(" ")}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 grow">
                {m.texte}
              </p>

              <ul className="flex flex-col gap-2.5 mb-7">
                {m.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Icone nom="check_circle" taille="text-[15px] mt-0.5 shrink-0" couleur="text-seal" />
                    <span className="font-body-md text-[15px] text-on-surface">{p}</span>
                  </li>
                ))}
              </ul>

              <a
                className="inline-flex items-center gap-2 mt-auto pt-5 border-t border-tertiary-fixed-dim/20 font-label-sm text-label-sm text-primary uppercase tracking-widest group-hover:text-on-tertiary-fixed-variant transition-colors"
                href={L(METIERS_META[i].href)}
              >
                {m.decouvrir}
                <Icone
                  nom="arrow_forward"
                  taille="text-[16px] group-hover:translate-x-1 transition-transform"
                  couleur=""
                />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- PROCESSUS */}
      <Section fond="encre" guilloche>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-4 mb-4">
            <span className="w-8 h-px bg-tertiary-fixed-dim" aria-hidden="true" />
            <span className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest">
              {c.processus_surtitre}
            </span>
            <span className="w-8 h-px bg-tertiary-fixed-dim" aria-hidden="true" />
          </span>
          <h2 className="font-display-lg text-headline-md md:text-headline-lg text-on-primary">
            {c.processus_titre}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {c.etapes.map(([titre, texte], i) => {
            const dernier = i === c.etapes.length - 1;
            return (
              <div
                key={titre}
                className={`group relative flex flex-col h-full p-7 rounded-sm border transition-colors duration-300 ${
                  dernier
                    ? "border-tertiary-fixed-dim bg-tertiary-fixed-dim/[0.06]"
                    : "border-tertiary-fixed-dim/25 bg-primary-container/30 hover:border-tertiary-fixed-dim/60"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display-lg text-[26px] font-bold text-tertiary-fixed-dim leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`w-11 h-11 flex items-center justify-center rounded-sm border text-tertiary-fixed-dim ${
                      dernier ? "border-tertiary-fixed-dim/60 bg-primary/40" : "border-tertiary-fixed-dim/30"
                    }`}
                  >
                    <Icone nom={ICONES_PROCESSUS[i] ?? "check_circle"} plein taille="text-[20px]" />
                  </span>
                </div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary mb-3">
                  {titre}
                </h3>
                <p className="font-body-md text-body-md text-primary-fixed-dim">{texte}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <ListeDocuments variante="traduction" />
      <GrilleLangues
        lang={lang}
        titre={`${LANGUES.length} ${c.langues_titre}`}
        chapeau={c.langues_chapeau}
      />
      <DestinationsPhares lang={lang} />
      <Faq titre="Les questions que l’on nous pose le plus" questions={FAQ.generale} />

      <BandeauConversion
        lang={lang}
        titre={c.cta_titre}
        chapeau={c.cta_chapeau}
      />

      {/* Plan d'accès, pleine largeur, tout en bas — les coordonnées détaillées
          restent sur la page contact (À propos). */}
      <BandeauCarte lang={lang} />
    </Page>
  );
}
