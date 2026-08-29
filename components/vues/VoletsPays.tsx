"use client";

/**
 * Onglets des types de visa d'une fiche pays : l'internaute clique un type
 * (visa tourisme, e-visa, affaires…) et voit seulement ses pièces/procédure.
 * Toutes les données sont déjà traduites côté serveur (bon pour le SEO : tous
 * les panneaux sont dans le HTML, les inactifs sont masqués).
 */

import { useState } from "react";

export type DocVolet = { nom: string; details: string[] };
export type Volet = { type: string; label: string; docs: DocVolet[] };

function RenduDoc({ details, vide }: { details: string[]; vide: string }) {
  const rows = details.filter((x) => x.includes(" | "));
  if (rows.length >= 2) {
    return (
      <table className="doctable">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.split(" | ").map((c, j) => (
                <td key={j}>{c || "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (details.length === 0) return <p>{vide}</p>;
  return (
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
      {details.map((x, i) => (
        <li key={i}>— {x}</li>
      ))}
    </ul>
  );
}

export default function VoletsPays({ volets, vide }: { volets: Volet[]; vide: string }) {
  const [actif, setActif] = useState(0);

  return (
    <div className="volets">
      <div className="volets-tabs" role="tablist" aria-label="Types de visa">
        {volets.map((v, i) => (
          <button
            key={v.type}
            type="button"
            role="tab"
            id={`vt-tab-${i}`}
            aria-selected={i === actif}
            aria-controls={`vt-panel-${i}`}
            className={i === actif ? "on" : ""}
            onClick={() => setActif(i)}
          >
            {v.label}
          </button>
        ))}
      </div>

      {volets.map((v, i) => (
        <div
          key={v.type}
          role="tabpanel"
          id={`vt-panel-${i}`}
          aria-labelledby={`vt-tab-${i}`}
          hidden={i !== actif}
        >
          <div className="v3faq">
            {v.docs.map((doc, j) => (
              <details key={j}>
                <summary>{doc.nom}</summary>
                <div style={{ paddingBottom: 18 }}>
                  <RenduDoc details={doc.details} vide={vide} />
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
