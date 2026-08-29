import type { MetadataRoute } from "next";
import { PAYS, URL_SITE } from "@/lib/donnees";
import { LOCALES, lien } from "@/lib/i18n";

/**
 * Plan de site — les 81 URL, avec priorités par famille de page.
 * Next l'écrit dans /sitemap.xml au build.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const maj = new Date("2026-08-24");

  const fixes: [string, number, "weekly" | "monthly" | "yearly"][] = [
    ["/", 1.0, "weekly"],
    ["/traductions/", 0.9, "monthly"],
    ["/legalisations/", 0.9, "monthly"],
    ["/visas/", 0.9, "monthly"],
    ["/ressources/", 0.6, "monthly"],
    ["/a-propos/", 0.6, "monthly"],
    ["/contact/", 0.7, "monthly"],
    ["/mentions-legales/", 0.3, "yearly"],
    ["/confidentialite/", 0.3, "yearly"],
    ["/cgv/", 0.3, "yearly"],
    ["/cookies/", 0.3, "yearly"],
  ];

  const chemins: [string, number, "weekly" | "monthly" | "yearly"][] = [
    ...fixes,
    ...PAYS.map((p) => [`/visas/${p.slug}/`, 0.8, "monthly"] as [string, number, "monthly"]),
  ];

  // Chaque URL est declinee dans les trois langues, avec les alternates hreflang.
  return chemins.flatMap(([chemin, priority, changeFrequency]) =>
    LOCALES.map((l) => ({
      url: `${URL_SITE}${lien(l, chemin)}`,
      lastModified: maj,
      changeFrequency,
      priority: l === "fr" ? priority : priority * 0.9,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((x) => [x, `${URL_SITE}${lien(x, chemin)}`])
        ),
      },
    }))
  );
}
