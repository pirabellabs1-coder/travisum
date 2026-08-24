import type { Metadata } from "next";
import PageLegale from "@/components/PageLegale";
import { MENTIONS } from "@/lib/textes-legaux";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return {
    title: "Mentions légales",
    alternates: { ...alternates("/mentions-legales/"), canonical: lien(lang, "/mentions-legales/") },
  };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return (
    <PageLegale
      courante={lien(lang, "/mentions-legales/")}
      lang={lang}
      titre="Mentions légales"
      chapeau="Qui édite ce site, qui l’héberge, et dans quelles limites les informations qui y figurent engagent le bureau."
      articles={MENTIONS}
    />
  );
}
