import type { Metadata } from "next";
import PageLegale from "@/components/PageLegale";
import { CGV } from "@/lib/textes-legaux";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return {
    title: "Conditions générales de vente",
    alternates: { ...alternates("/cgv/"), canonical: lien(lang, "/cgv/") },
  };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return (
    <PageLegale
      courante={lien(lang, "/cgv/")}
      lang={lang}
      titre="Conditions générales de vente"
      chapeau="Ce qui est dû de part et d’autre : devis, délais, prix, responsabilité et réclamations."
      articles={CGV}
    />
  );
}
