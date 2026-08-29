import type { Metadata } from "next";
import { ContactVue } from "@/components/vues/Contact";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: "Contact en afspraak",
    description:
      "Contacteer het kantoor van Travisum in Brussel: telefoon, e-mail, adres en " +
      "afsprakenformulier voor uw visa, vertalingen en legalisaties.",
  },
  en: {
    title: "Contact and appointment",
    description:
      "Contact the Travisum office in Brussels: phone, email, address and " +
      "appointment form for your visas, translations and legalisations.",
  },
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  const m = META[lang];
  return {
    ...(m ? { title: m.title, description: m.description } : {}),
    alternates: { ...alternates("/contact/"), canonical: lien(lang, "/contact/") },
  };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return <ContactVue lang={lang} cheminFr="/contact/" />;
}
