import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import PageLegale from "@/components/PageLegale";
import { COOKIES } from "@/lib/textes-legaux";

export const metadata: Metadata = {
  title: "Politique cookies",
  description:
    "Quels cookies ce site dépose, dans quel but, et comment modifier votre choix à tout moment.",
  alternates: alternates("/cookies/"),
};

export default function Cookies() {
  return (
    <PageLegale
      courante="/cookies/"
      titre="Politique cookies"
      chapeau="Aucun traceur publicitaire. Voici ce que le site dépose réellement, et comment revenir sur votre choix."
      articles={COOKIES}
    />
  );
}
