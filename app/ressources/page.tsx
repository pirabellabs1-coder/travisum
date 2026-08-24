import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { RessourcesVue } from "@/components/vues/Ressources";

export const metadata: Metadata = {
  title: "Guides, procédures et listes de pièces",
  description:
    "Guides pratiques sur la traduction assermentée, la légalisation, l’apostille de " +
    "La Haye et les demandes de visa depuis la Belgique. Listes de pièces téléchargeables.",
  alternates: alternates("/ressources/"),
};

export default function Ressources() {
  return <RessourcesVue />;
}
