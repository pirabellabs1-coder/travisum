import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import PageLegale from "@/components/PageLegale";
import { CGV } from "@/lib/textes-legaux";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales applicables aux prestations de traduction assermentée, de " +
    "légalisation et d’assistance visa de Travisum Louise Office.",
  alternates: alternates("/cgv/"),
};

export default function Cgv() {
  return (
    <PageLegale
      courante="/cgv/"
      titre="Conditions générales de vente"
      chapeau="Ce qui est dû de part et d’autre : devis, délais, prix, responsabilité et réclamations."
      articles={CGV}
    />
  );
}
