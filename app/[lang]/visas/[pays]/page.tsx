import type { Metadata } from "next";
import { PagePaysVue } from "@/components/vues/PagePays";
import { PAYS, articleDe, fichePays } from "@/lib/donnees";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  const langs = LOCALES.filter((l) => l !== "fr");
  return langs.flatMap((lang) => PAYS.map((p) => ({ lang, pays: p.slug })));
}

export function generateMetadata({
  params,
}: {
  params: { lang: string; pays: string };
}): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  const fiche = fichePays(params.pays);
  if (!fiche) return {};
  const chemin = `/visas/${fiche.slug}/`;
  return {
    title: `Visa ${fiche.nom} depuis la Belgique — procédure, documents et délai`,
    description:
      `Demande de visa ${articleDe(fiche.nom)} depuis Bruxelles : liste des documents ` +
      `à fournir, procédure, délai d’obtention et tarifs.`,
    alternates: { ...alternates(chemin), canonical: lien(lang, chemin) },
  };
}

export default function PagePaysLocalise({
  params,
}: {
  params: { lang: string; pays: string };
}) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return (
    <PagePaysVue slug={params.pays} lang={lang} cheminFr={`/visas/${params.pays}/`} />
  );
}
