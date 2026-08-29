import type { Metadata } from "next";
import PageV3 from "@/components/PageV3";

/** Page 404 — style « v3 ». */

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

const SECOURS: [string, string, string][] = [
  ["Traductions", "Assermentées, jurées et libres.", "/traductions/"],
  ["Légalisations", "Apostille, légalisation, dépôts.", "/legalisations/"],
  ["Visas de voyage", "70 destinations, fiches à jour.", "/visas/"],
];

export default function Introuvable() {
  return (
    <PageV3 lang="fr" cheminFr="/">
      <section className="dark hero-lite">
        <div className="wrap">
          <div className="eb">Erreur 404</div>
          <h1 style={{ maxWidth: 720 }}>
            Cette page n’existe pas, <span className="g">ou plus.</span>
          </h1>
          <p className="sub" style={{ maxWidth: 560 }}>
            L’adresse est peut-être erronée, ou la page a été déplacée lors de la refonte du
            site. Voici par où reprendre.
          </p>
          <div className="cta">
            <a className="btn btn-p" href="/">
              Retour à l’accueil <span className="ar">→</span>
            </a>
            <a className="btn btn-out" href="/visas/">
              Voir les destinations
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="eb">Nos services</div>
          <h2 className="sec-h">Reprendre par un service.</h2>
          <div className="cards3">
            {SECOURS.map(([t, p, href]) => (
              <a key={href} className="card" href={href}>
                <h3 style={{ marginTop: 4 }}>{t}</h3>
                <p>{p}</p>
                <span className="more">
                  Ouvrir <span className="ar">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageV3>
  );
}
