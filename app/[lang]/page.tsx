import type { Metadata } from "next";
import AccueilV3 from "@/components/vues/AccueilV3";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

/**
 * Accueil localisé (/nl/, /en/). Le français reste servi à la racine par
 * app/page.tsx ; ce segment ne génère que les deux autres langues.
 */

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return {
    title: "Traduction assermentée, légalisation et visa",
    description:
      "Travisum, bureau de traduction jurée : traductions assermentées, légalisations, " +
      "apostilles et visas de voyage.",
    alternates: { ...alternates("/"), canonical: lien(lang, "/") },
  };
}

export default function AccueilLocalise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return <AccueilV3 initialLang={lang} />;
}
