import type { Metadata } from "next";
import { AProposVue } from "@/components/vues/APropos";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: "Het kantoor — Travisum Louise Office",
    description:
      "Travisum Louise Office, kantoor voor beëdigde vertalingen, legalisatie en visa aan de " +
      "Louizalaan 367 in Brussel. Open van maandag tot vrijdag van 9 tot 17 uur doorlopend.",
  },
  en: {
    title: "The office — Travisum Louise Office",
    description:
      "Travisum Louise Office: sworn translation, legalisation and visa services at 367 avenue " +
      "Louise in Brussels. Open Monday to Friday, 9am–5pm continuously.",
  },
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  const m = META[lang];
  return {
    ...(m ? { title: m.title, description: m.description } : {}),
    alternates: { ...alternates("/a-propos/"), canonical: lien(lang, "/a-propos/") },
  };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return <AProposVue lang={lang} cheminFr="/a-propos/" />;
}
