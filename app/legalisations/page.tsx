import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { LegalisationsVue } from "@/components/vues/Legalisations";

export const metadata: Metadata = {
  title: "Légalisations, apostilles et dépôts officiels",
  description:
    "Légalisation complète et apostille de La Haye : SPF Justice, Affaires étrangères, " +
    "tribunaux de première instance, ambassades et consulats. Dépôt et récupération auprès des autorités compétentes.",
  alternates: alternates("/legalisations/"),
};

export default function Legalisations() {
  return <LegalisationsVue />;
}
