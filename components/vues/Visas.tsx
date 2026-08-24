import Page from "@/components/Page";
import { Faq } from "@/components/interactifs";
import {
  BandeauConversion,
  DestinationsPhares,
  ProcedureVisa,
  ToutesDestinations,
} from "@/components/sections";
import { TableauTarifs } from "@/components/interactifs";
import { EnteteSection, LienFleche, MAXW, Section } from "@/components/ui";
import { DESTINATIONS, FAQ, TARIFS } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";


export function VisasVue({ lang = "fr", cheminFr = "/visas/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  return (
    <Page actif="visas" lang={lang} cheminFr={cheminFr}>
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
                Service 03
              </span>
              <span className="h-px bg-tertiary-fixed-dim grow max-w-[120px]" />
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
              Visas, e-visas{" "}
              <span className="text-on-tertiary-fixed-variant italic">&amp; ESTA</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Sécurisez votre voyage d&apos;affaires ou privé avec précision. Notre cabinet
              gère l&apos;intégralité des démarches consulaires pour {DESTINATIONS.length}{" "}
              destinations.
            </p>
          </div>

          <div className="shrink-0 border border-tertiary-fixed-dim/60 rounded-sm px-8 py-6 text-center bg-surface-container-lowest">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
              Taux de
            </p>
            <p className="font-display-lg text-headline-md text-on-tertiary-fixed-variant">
              98%
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-2">
              d’acceptation
            </p>
          </div>
        </div>
      </section>

      <DestinationsPhares lang={lang} />
      <ToutesDestinations lang={lang} />
      <ProcedureVisa />

      <Section fond="basse" id="tarifs">
        <EnteteSection
          surtitre="Délais et tarifs"
          titre="Délais et tarifs par destination"
          chapeau="Honoraires du bureau, hors frais consulaires. Chaque fiche pays publie la grille détaillée du consulat concerné."
        />
        <TableauTarifs bloc={TARIFS.visa} />
        <div className="mt-8">
          <LienFleche href={L("/tarifs/")}>Voir la grille complète</LienFleche>
        </div>
      </Section>

      <Faq titre="Questions sur les visas" questions={FAQ.visa} />

      <BandeauConversion lang={lang}
        titre="Préparez votre dossier de visa."
        chapeau="Indiquez votre destination et le motif du séjour : nous vérifions les conditions applicables et la liste des pièces."
      />
    </Page>
  );
}
