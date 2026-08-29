/**
 * Gabarit des pages légales — style « v3 ».
 * Hero sombre + sommaire ancré (sticky) + contenu en prose.
 */

import type { ReactNode } from "react";
import PageV3 from "./PageV3";
import { pagesLegales } from "@/lib/navigation";
import type { Locale } from "@/lib/i18n";

export type Article = {
  ancre: string;
  titre: string;
  contenu: ReactNode;
};

export function Liste({ items }: { items: ReactNode[] }) {
  return (
    <ul>
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function Encart({
  titre,
  children,
  ton = "laiton",
}: {
  titre: string;
  children: ReactNode;
  ton?: "laiton" | "rouge";
}) {
  return (
    <div className="encart" style={ton === "rouge" ? { borderLeftColor: "#b3261e" } : undefined}>
      <p>
        <strong>{titre}</strong>
      </p>
      <div>{children}</div>
    </div>
  );
}

export function Lien({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href}>{children}</a>;
}

export default function PageLegale({
  courante,
  lang = "fr",
  surtitre = "Informations légales",
  titre,
  chapeau,
  maj = "24 août 2026",
  articles,
}: {
  courante: string;
  lang?: Locale;
  surtitre?: string;
  titre: string;
  chapeau: string;
  maj?: string;
  articles: Article[];
}) {
  return (
    <PageV3 lang={lang} cheminFr={courante}>
      {/* HERO */}
      <section className="dark hero-lite">
        <div className="wrap">
          <div className="eb">{surtitre}</div>
          <h1 style={{ maxWidth: 760 }}>{titre}</h1>
          <p className="sub" style={{ maxWidth: 640 }}>
            {chapeau}
          </p>
          <p
            style={{
              marginTop: 20,
              paddingTop: 18,
              borderTop: "1px solid rgba(255,255,255,.12)",
              color: "var(--muted-d)",
              fontSize: 12,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Dernière mise à jour : {maj}
          </p>
        </div>
      </section>

      {/* CORPS */}
      <section>
        <div className="wrap">
          <div className="legalgrid">
            <nav className="toc" aria-label="Sommaire">
              <p>Sommaire</p>
              {articles.map((a, i) => (
                <a key={a.ancre} href={`#${a.ancre}`}>
                  {String(i + 1).padStart(2, "0")} · {a.titre}
                </a>
              ))}
            </nav>

            <div className="prose">
              {articles.map((a, i) => (
                <article key={a.ancre} id={a.ancre} style={{ paddingBottom: 8, marginBottom: 24 }}>
                  <h2 style={{ marginTop: i === 0 ? 0 : 40 }}>
                    {String(i + 1).padStart(2, "0")}. {a.titre}
                  </h2>
                  {a.contenu}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AUTRES TEXTES */}
      <section className="tint">
        <div className="wrap">
          <div className="eb">Les autres textes</div>
          <h2 className="sec-h">Documents légaux.</h2>
          <div className="cards3">
            {pagesLegales(lang)
              .filter(([, href]) => href !== courante)
              .map(([libelle, href]) => (
                <a key={href} className="card" href={href}>
                  <div className="num">Légal</div>
                  <h3 style={{ fontSize: 19 }}>{libelle}</h3>
                  <span className="more" style={{ marginTop: 8 }}>
                    Consulter <span className="ar">→</span>
                  </span>
                </a>
              ))}
          </div>
        </div>
      </section>
    </PageV3>
  );
}
