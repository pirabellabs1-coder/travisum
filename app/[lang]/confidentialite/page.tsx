import type { Metadata } from "next";
import PageLegale from "@/components/PageLegale";
import { CONFIDENTIALITE } from "@/lib/textes-legaux";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return {
    title: "Politique de confidentialité",
    alternates: { ...alternates("/confidentialite/"), canonical: lien(lang, "/confidentialite/") },
  };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return (
    <PageLegale
      courante={lien(lang, "/confidentialite/")}
      lang={lang}
      titre="Politique de confidentialité"
      chapeau="Le bureau reçoit des copies de passeports, d’actes de naissance et de diplômes. Voici précisément ce qu’elles deviennent."
      articles={CONFIDENTIALITE}
    />
  );
}
