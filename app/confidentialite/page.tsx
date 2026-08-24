import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import PageLegale from "@/components/PageLegale";
import { CONFIDENTIALITE } from "@/lib/textes-legaux";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Travisum traite les copies de passeports, actes d’état civil et diplômes " +
    "qui lui sont confiés : finalités, destinataires, durées de conservation et vos droits.",
  alternates: alternates("/confidentialite/"),
};

export default function Confidentialite() {
  return (
    <PageLegale
      courante="/confidentialite/"
      titre="Politique de confidentialité"
      chapeau="Le bureau reçoit des copies de passeports, d’actes de naissance et de diplômes. Voici précisément ce qu’elles deviennent."
      articles={CONFIDENTIALITE}
    />
  );
}
