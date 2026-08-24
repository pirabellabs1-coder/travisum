import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { AProposVue } from "@/components/vues/APropos";

export const metadata: Metadata = {
  title: "Le bureau — Travisum Louise Office",
  description:
    "Travisum Louise Office, bureau de traduction jurée, de légalisation et de visas au " +
    "367 avenue Louise à Bruxelles. Ouvert du lundi au vendredi de 9 h à 17 h sans interruption.",
  alternates: alternates("/a-propos/"),
};

export default function APropos() {
  return <AProposVue />;
}
