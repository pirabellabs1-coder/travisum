import type { Metadata } from "next";
import PageLegale from "@/components/PageLegale";
import { COOKIES } from "@/lib/textes-legaux";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return {
    title: "Politique cookies",
    alternates: { ...alternates("/cookies/"), canonical: lien(lang, "/cookies/") },
  };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return (
    <PageLegale
      courante={lien(lang, "/cookies/")}
      lang={lang}
      titre="Politique cookies"
      chapeau="Aucun traceur publicitaire. Voici ce que le site dépose réellement, et comment revenir sur votre choix."
      articles={COOKIES}
    />
  );
}
