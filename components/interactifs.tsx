"use client";

/**
 * Composants interactifs.
 *
 * Les maquettes Stitch sont statiques : elles montrent l'état au repos. Tout
 * ce qui suit complète ce qu'elles ne pouvaient pas montrer.
 */

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { aplatir, type BlocTarifaire, type Question } from "@/lib/donnees";
import { Carte, EnteteSection, Icone, MAXW, Section } from "./ui";

// --------------------------------------------------------------------------
/** Filet de progression de lecture. Figé à 100 % dans la maquette. */
export function FiletProgression() {
  const filet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let attente = false;
    function peindre() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (filet.current) {
        filet.current.style.width = `${h > 0 ? Math.min(100, (y / h) * 100) : 0}%`;
      }
      attente = false;
    }
    function surDefilement() {
      if (attente) return;
      attente = true;
      requestAnimationFrame(peindre);
    }
    window.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", peindre, { passive: true });
    peindre();
    return () => {
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", peindre);
    };
  }, []);

  return <div className="brass-progress" ref={filet} aria-hidden="true" />;
}

// --------------------------------------------------------------------------
/** Accordéon générique : une seule réponse ouverte à la fois. */
export function Accordeon({
  items,
  niveau = "h3",
}: {
  items: { titre: string; contenu: ReactNode }[];
  niveau?: "h3" | "h4";
}) {
  const [ouvert, setOuvert] = useState<number | null>(null);
  const Titre = niveau;

  return (
    <div className="border-t border-tertiary-fixed-dim/25">
      {items.map((item, i) => (
        <div key={i} className="border-b border-tertiary-fixed-dim/25">
          <Titre>
            <button
              className="w-full flex items-start justify-between gap-6 py-5 text-left group"
              onClick={() => setOuvert((v) => (v === i ? null : i))}
              aria-expanded={ouvert === i}
            >
              <span
                className={`${
                  niveau === "h3"
                    ? "font-display-lg text-[19px] md:text-[21px]"
                    : "font-body-md text-body-lg"
                } leading-snug text-primary group-hover:text-on-tertiary-fixed-variant transition-colors`}
              >
                {item.titre}
              </span>
              <span
                className="material-symbols-outlined text-on-tertiary-fixed-variant shrink-0 mt-1 transition-transform duration-300"
                aria-hidden="true"
              >
                {ouvert === i ? "remove" : "add"}
              </span>
            </button>
          </Titre>
          <div
            className="grid transition-all duration-300"
            style={{ gridTemplateRows: ouvert === i ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="pb-6 pl-0 md:pl-4">{item.contenu}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --------------------------------------------------------------------------
export function Faq({
  titre,
  questions,
  surtitre = "Questions fréquentes",
  chapeau,
  id = "faq",
}: {
  titre: string;
  questions: Question[];
  surtitre?: string;
  chapeau?: string;
  id?: string;
}) {
  const items = questions.map(([q, r]) => ({
    titre: q,
    contenu: (
      <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">{r}</p>
    ),
  }));

  return (
    <Section fond="surface" id={id}>
      <EnteteSection surtitre={surtitre} titre={titre} chapeau={chapeau} />
      <div className="max-w-4xl">
        <Accordeon items={items} />
      </div>
      {/* Balisage FAQPage : c'est lui qui produit les résultats enrichis. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: questions.map(([q, r]) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: r },
            })),
          }),
        }}
      />
    </Section>
  );
}

// --------------------------------------------------------------------------
/**
 * Recherche instantanée, tolérante aux accents :
 * « guinee » trouve les quatre Guinées, « thailande » trouve Thaïlande.
 */
export function GrilleFiltrable({
  entrees,
  libelleChamp,
  placeholder,
  uniteCompteur,
  rendu,
  classesGrille,
  repli,
}: {
  entrees: { cle: string; terme: string; noeud: ReactNode }[];
  libelleChamp: string;
  placeholder: string;
  uniteCompteur: string;
  rendu?: "pastilles" | "grille";
  classesGrille?: string;
  repli: { titre: string; texte: string; action: string; href: string };
}) {
  const [requete, setRequete] = useState("");
  const filtrees = useMemo(() => {
    const q = aplatir(requete);
    return q ? entrees.filter((e) => e.terme.includes(q)) : entrees;
  }, [requete, entrees]);

  const classes =
    classesGrille ??
    (rendu === "pastilles"
      ? "flex flex-wrap gap-2.5"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3");

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end gap-6 mb-10">
        <div className="grow max-w-md">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2 block"
            htmlFor="champ-filtre"
          >
            {libelleChamp}
          </label>
          <div className="relative">
            <span
              className="material-symbols-outlined absolute left-0 bottom-2 text-on-surface-variant/50 text-[18px]"
              aria-hidden="true"
            >
              search
            </span>
            <input
              className="w-full bg-transparent border-b border-tertiary-fixed-dim/40 py-2 pl-7 font-body-md text-primary outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/40"
              id="champ-filtre"
              type="search"
              value={requete}
              onChange={(e) => setRequete(e.target.value)}
              placeholder={placeholder}
              autoComplete="off"
            />
          </div>
        </div>
        <p className="flex items-baseline gap-3 shrink-0" aria-live="polite">
          <span className="font-display-lg text-headline-md text-primary">
            {filtrees.length}
          </span>
          <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant uppercase tracking-widest">
            {uniteCompteur}
          </span>
        </p>
      </div>

      {filtrees.length > 0 && (
        <div className={classes}>
          {filtrees.map((e) => (
            <span key={e.cle} className="contents">
              {e.noeud}
            </span>
          ))}
        </div>
      )}

      {filtrees.length === 0 && (
        <div className="mt-10">
          <Carte accent="laiton">
            <h3 className="font-display-lg text-[21px] text-primary mb-3">{repli.titre}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-xl">
              {repli.texte}
            </p>
            <a
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors"
              href={repli.href}
            >
              {repli.action}
            </a>
          </Carte>
        </div>
      )}
    </>
  );
}

// --------------------------------------------------------------------------
export function TableauTarifs({ bloc, note = true }: { bloc: BlocTarifaire; note?: boolean }) {
  return (
    <>
      <div className="border border-tertiary-fixed-dim/30 rounded-sm overflow-hidden bg-surface-container-lowest">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="border-b border-tertiary-fixed-dim bg-surface-container-low">
              <tr>
                {bloc.colonnes.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest px-5 py-4 whitespace-nowrap ${
                      i > 0 ? "text-right" : "text-left"
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloc.lignes.map((ligne) => (
                <tr
                  key={ligne[0]}
                  className="border-b border-tertiary-fixed-dim/20 last:border-b-0 hover:bg-surface-container-low transition-colors"
                >
                  {ligne.map((cellule, i) =>
                    i === 0 ? (
                      <th
                        key={i}
                        scope="row"
                        className="text-left font-body-md text-body-md text-on-surface font-normal px-5 py-4"
                      >
                        {cellule}
                      </th>
                    ) : (
                      <td
                        key={i}
                        className="text-right font-body-md text-body-md text-on-surface px-5 py-4 tabular-nums whitespace-nowrap"
                      >
                        {cellule}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {note && bloc.note && (
        <p className="flex items-start gap-3 mt-6 font-body-md text-[15px] text-on-surface-variant max-w-3xl">
          <Icone nom="info" taille="text-[18px] mt-0.5 shrink-0" />
          <span>{bloc.note}</span>
        </p>
      )}
    </>
  );
}

export function OngletsTarifs({
  onglets,
}: {
  onglets: { cle: string; libelle: string; bloc: BlocTarifaire }[];
}) {
  const [actif, setActif] = useState(onglets[0].cle);
  const courant = onglets.find((o) => o.cle === actif)!;

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-8" role="tablist">
        {onglets.map((o) => (
          <button
            key={o.cle}
            role="tab"
            type="button"
            aria-selected={o.cle === actif}
            onClick={() => setActif(o.cle)}
            className={`px-6 py-3.5 font-label-sm text-label-sm uppercase tracking-widest border rounded-sm transition-colors ${
              o.cle === actif
                ? "bg-primary text-on-primary border-primary"
                : "border-tertiary-fixed-dim/40 text-on-surface-variant hover:border-tertiary-fixed-dim"
            }`}
          >
            {o.libelle}
          </button>
        ))}
      </div>
      <TableauTarifs bloc={courant.bloc} />
    </>
  );
}

// --------------------------------------------------------------------------
/**
 * Plan d'accès, chargé seulement après clic.
 *
 * L'iframe Google Maps dépose ses cookies dès l'affichage. La politique
 * cookies du site promet qu'aucun traceur n'est déposé avant consentement :
 * la carte n'est donc chargée que sur action explicite.
 */
export function PlanAcces({ bandeau = false }: { bandeau?: boolean }) {
  const [charge, setCharge] = useState(false);
  const src =
    "https://www.google.com/maps?q=Travisum+Louise+Office,+Avenue+Louise+367,+1050+Bruxelles&output=embed";

  return (
    <div
      className={
        bandeau
          ? "overflow-hidden bg-surface-container-lowest"
          : "border border-tertiary-fixed-dim/30 rounded-sm overflow-hidden bg-surface-container-lowest"
      }
    >
      <div
        className={
          bandeau
            ? "relative h-[360px] md:h-[460px] bg-primary"
            : "relative aspect-[4/3] bg-primary"
        }
      >
        {charge ? (
          <iframe
            src={src}
            title="Plan d’accès au bureau, 367 avenue Louise à Bruxelles"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center px-8">
            <div
              className="guilloche absolute inset-0 opacity-[0.10] pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <Icone nom="map" taille="text-[32px]" couleur="text-tertiary-fixed-dim" />
              <p className="font-display-lg text-[21px] text-on-primary">
                367, avenue Louise
              </p>
              <p className="font-body-md text-[15px] text-primary-fixed-dim max-w-xs">
                Le plan est fourni par Google Maps, qui dépose ses propres cookies. Il ne
                se charge qu’à votre demande.
              </p>
              <button
                type="button"
                onClick={() => setCharge(true)}
                className="mt-2 bg-tertiary-fixed-dim text-on-tertiary-fixed px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
              >
                Afficher le plan
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-tertiary-fixed-dim/25">
        <div
          className={
            (bandeau ? MAXW + " " : "px-6 ") +
            "flex flex-wrap items-center justify-between gap-4 py-4"
          }
        >
          <p className="font-body-md text-[15px] text-on-surface-variant">
            Métro Louise, trams 8 et 93, bus 54.
          </p>
          <a
            className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-primary hover:text-on-tertiary-fixed-variant transition-colors"
            href="https://maps.app.goo.gl/avsW7i5xRo2qmt2s5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Itinéraire
            <Icone nom="open_in_new" taille="text-[16px]" couleur="" />
          </a>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
/** Estimateur de traduction — formule de la maquette : 45 € + 30 €/page. */
export function EstimateurTraduction() {
  const [pages, setPages] = useState(1);
  const prix = 45 + (pages - 1) * 30;

  return (
    <div className="bg-surface rounded-sm shadow-xl p-8 border border-tertiary-fixed-dim/30">
      <h2 className="font-headline-md text-headline-md text-primary mb-6">
        Estimer ma traduction
      </h2>
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <Champ libelle="Type de document">
          <select className="w-full bg-surface-container-low border-b border-primary py-3 px-4 outline-none font-body-md text-on-surface appearance-none focus:border-tertiary-fixed-dim transition-colors rounded-none">
            <option>Acte de naissance</option>
            <option>Diplôme / Relevé de notes</option>
            <option>Contrat commercial</option>
            <option>Extrait de casier judiciaire</option>
            <option>Autre document</option>
          </select>
        </Champ>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Champ libelle="Langue source">
            <select className="w-full bg-surface-container-low border-b border-primary py-3 px-4 outline-none font-body-md text-on-surface appearance-none focus:border-tertiary-fixed-dim transition-colors rounded-none">
              <option>Français</option>
              <option>Anglais</option>
              <option>Néerlandais</option>
            </select>
          </Champ>
          <Champ libelle="Langue cible">
            <select className="w-full bg-surface-container-low border-b border-primary py-3 px-4 outline-none font-body-md text-on-surface appearance-none focus:border-tertiary-fixed-dim transition-colors rounded-none">
              <option>Anglais</option>
              <option>Français</option>
              <option>Espagnol</option>
            </select>
          </Champ>
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant uppercase flex justify-between"
            htmlFor="pages"
          >
            <span>Nombre de pages</span>
            <span>{pages}</span>
          </label>
          <input
            className="w-full h-1 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary"
            id="pages"
            max={50}
            min={1}
            type="range"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
          />
        </div>

        <div className="mt-4 pt-6 border-t border-tertiary-fixed-dim/20 flex justify-between items-end gap-4">
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">
              Estimation (HTVA)
            </p>
            <p className="font-headline-md text-headline-md text-primary tabular-nums">
              À partir de {prix} €
            </p>
          </div>
          <a
            className="bg-primary text-on-primary px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary-container transition-all rounded-sm shrink-0"
            href="mailto:info@travisum.com?subject=Demande%20de%20devis%20-%20traduction"
          >
            Devis exact
          </a>
        </div>
      </form>
    </div>
  );
}

function Champ({ libelle, children }: { libelle: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
        {libelle}
      </label>
      <div className="relative">
        {children}
        <span
          className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
          aria-hidden="true"
        >
          expand_more
        </span>
      </div>
    </div>
  );
}
