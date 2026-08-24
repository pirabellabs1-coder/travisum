import type { Metadata } from "next";
import { AProposVue } from "@/components/vues/APropos";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return { alternates: { ...alternates("/a-propos/"), canonical: lien(lang, "/a-propos/") } };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return <AProposVue lang={lang} cheminFr="/a-propos/" />;
}
