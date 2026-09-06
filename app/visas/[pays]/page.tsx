import type { Metadata } from "next";
import { PagePaysVue } from "@/components/vues/PagePays";
import { PAYS, articleDe, fichePays } from "@/lib/donnees";
import { alternates } from "@/lib/i18n";

export function generateStaticParams() {
  return PAYS.map((p) => ({ pays: p.slug }));
}
export function generateMetadata({ params }: { params: { pays: string } }): Metadata {
  const fiche = fichePays(params.pays);
  if (!fiche) return {};
  return {
    title: `Visa ${fiche.nom} depuis la Belgique — procédure, documents et délai`,
    description:
      `Demande de visa ${articleDe(fiche.nom)} depuis la Belgique : liste des documents ` +
      `à fournir, procédure et délai d’obtention. Dossier constitué et déposé par Travisum.`,
    alternates: alternates(`/visas/${fiche.slug}/`),
  };
}

export default function PagePays({ params }: { params: { pays: string } }) {
  return (
    <PagePaysVue slug={params.pays} lang="fr" cheminFr={`/visas/${params.pays}/`} />
  );
}
