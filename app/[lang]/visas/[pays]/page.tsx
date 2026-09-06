import type { Metadata } from "next";
import { PagePaysVue } from "@/components/vues/PagePays";
import { PAYS, articleDe, fichePays } from "@/lib/donnees";
import { nomPaysLoc } from "@/lib/pays-noms-i18n";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  const langs = LOCALES.filter((l) => l !== "fr");
  return langs.flatMap((lang) => PAYS.map((p) => ({ lang, pays: p.slug })));
}

function metaLocalisee(lang: "nl" | "en", nom: string): { title: string; description: string } {
  if (lang === "nl") {
    return {
      title: `Visum ${nom} vanuit België — procedure, documenten en termijn`,
      description:
        `Visumaanvraag voor ${nom} vanuit België: vereiste documenten, procedure en ` +
        `doorlooptijd. Dossier samengesteld en ingediend door Travisum.`,
    };
  }
  return {
    title: `${nom} visa from Belgium — procedure, documents and timeline`,
    description:
      `${nom} visa application from Belgium: required documents, procedure and processing ` +
      `time. File prepared and submitted by Travisum.`,
  };
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
  const m =
    lang === "fr"
      ? {
          title: `Visa ${fiche.nom} depuis la Belgique — procédure, documents et délai`,
          description:
            `Demande de visa ${articleDe(fiche.nom)} depuis la Belgique : liste des documents ` +
            `à fournir, procédure et délai d’obtention. Dossier constitué et déposé par Travisum.`,
        }
      : metaLocalisee(lang, nomPaysLoc(fiche.slug, fiche.nom, lang));
  return {
    title: m.title,
    description: m.description,
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
