# -*- coding: utf-8 -*-
"""
Les 70 fiches pays — un gabarit unique, alimenté par les données relevées
sur le site actuel (`reference/pays/<slug>.json`).

C'est l'écran 05 du devis : « le gabarit le plus important pour le
référencement. Il est conçu une fois et alimenté par une base de données. »

URL CONSERVÉES
Les pages sont écrites dans `visas/<slug>/index.html`, ce qui reproduit
exactement les adresses du site actuel (`/visas/inde/`). Les positions
acquises sur Google sont donc préservées sans plan de redirection — à la
différence des sous-pages, dont les adresses sont incohérentes (trois
schémas coexistent) et qui sont ici fusionnées dans la fiche pays.

Chaque fiche regroupe en une seule page ce que le site actuel éclate en
trois ou quatre : visa tourisme, visa affaires, e-visa le cas échéant, et
informations générales (délai, tarifs, livraison).
"""

import io
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import composants as C
import entete as ENTETE
import rythme
import sections as S
from composants import MAXW, entete_section, etiquette, icone, section
from donnees import ARTICLE, CONTACT, PROCEDURE_VISA
from from_stitch import tete

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOSSIER = os.path.join(RACINE, "reference", "pays")

# Ordre d'affichage des volets, et leur libellé
VOLETS = [
    ("visa-tourisme", "Visa tourisme", "luggage"),
    ("visa-business", "Visa affaires", "work"),
    ("e-visa", "e-Visa", "bolt"),
    ("autre", "Autre procédure", "description"),
]


def reprefixer(html, prefixe):
    """Réécrit les liens relatifs pour une page rangée dans un sous-dossier."""
    html = re.sub(r'(href|src)="(assets/)', r'\1="%s\2' % prefixe, html)
    html = re.sub(r'(href|src)="([\w-]+\.html)"', r'\1="%s\2"' % prefixe, html)
    html = re.sub(r'href="([\w-]+\.html)#', r'href="%s\1#' % prefixe, html)
    html = html.replace('href="site.webmanifest"', 'href="%ssite.webmanifest"' % prefixe)
    html = html.replace('href="visas/', 'href="%svisas/' % prefixe)
    return html


def est_tableau(details):
    """Les tableaux de tarifs ont été aplatis en lignes « a | b | c »."""
    lignes = [d for d in details if " | " in d]
    return len(lignes) >= 2


def rendre_tableau(details):
    lignes = [d.split(" | ") for d in details if " | " in d]
    reste = [d for d in details if " | " not in d]
    largeur = max(len(l) for l in lignes)
    lignes = [l + [""] * (largeur - len(l)) for l in lignes]

    tete_tab, corps = lignes[0], lignes[1:]
    ths = "".join(
        '<th class="text-left font-label-sm text-label-sm text-on-surface-variant '
        'uppercase tracking-widest px-4 py-3 whitespace-nowrap" scope="col">%s</th>' % c
        for c in tete_tab
    )
    trs = "".join(
        '<tr class="border-b border-tertiary-fixed-dim/20 last:border-b-0">'
        + "".join(
            '<td class="px-4 py-3 font-body-md text-[15px] text-on-surface '
            'tabular-nums">%s</td>' % (c or "—")
            for c in l
        )
        + "</tr>"
        for l in corps
    )
    avant = "".join(
        '<p class="font-body-md text-body-md text-on-surface-variant mb-4">%s</p>' % r
        for r in reste
    )
    return (
        avant
        + '<div class="border border-tertiary-fixed-dim/30 rounded-sm overflow-x-auto '
          'bg-surface-container-lowest">'
          '<table class="w-full min-w-[420px]">'
          '<thead class="border-b border-tertiary-fixed-dim bg-surface-container-low">'
          "<tr>" + ths + "</tr></thead><tbody>" + trs + "</tbody></table></div>"
    )


def rendre_details(details):
    if not details:
        return (
            '<p class="font-body-md text-[15px] text-on-surface-variant italic">'
            "Aucune précision fournie par le bureau pour ce document.</p>"
        )
    if est_tableau(details):
        return rendre_tableau(details)
    return (
        '<ul class="flex flex-col gap-2.5">'
        + "".join(
            '<li class="flex items-start gap-3 font-body-md text-body-md '
            'text-on-surface-variant">'
            '<span class="w-3.5 h-px bg-tertiary-fixed-dim mt-3 shrink-0" '
            'aria-hidden="true"></span><span>%s</span></li>' % d
            for d in details
        )
        + "</ul>"
    )


def accordeon_documents(documents, prefixe_id):
    items = []
    for i, doc in enumerate(documents):
        items.append(
            '<div class="border-b border-tertiary-fixed-dim/25" data-faq-item>'
            '<h4><button class="w-full flex items-start justify-between gap-6 py-5 '
            'text-left group" data-faq-tete aria-expanded="false">'
            '<span class="font-body-md text-body-lg text-primary '
            'group-hover:text-on-tertiary-fixed-variant transition-colors">%s</span>'
            '<span class="material-symbols-outlined text-on-tertiary-fixed-variant '
            'shrink-0 mt-0.5 transition-transform duration-300" aria-hidden="true">add</span>'
            "</button></h4>"
            '<div class="grid grid-rows-[0fr] transition-all duration-300" data-faq-corps>'
            '<div class="overflow-hidden"><div class="pb-6 pl-0 md:pl-4">%s</div></div>'
            "</div></div>" % (doc["nom"], rendre_details(doc.get("details", [])))
        )
    return (
        '<div class="border-t border-tertiary-fixed-dim/25" data-faq>' + "".join(items) + "</div>"
    )


def resume(fiche):
    """Carte de synthèse : ce que le visiteur cherche en premier."""
    infos = next(
        (sp for sp in fiche["sous_pages"] if sp["type"] == "informations-generales"), None
    )
    delai = tarif = livraison = None
    if infos:
        for doc in infos.get("documents", []):
            nom = doc["nom"].lower()
            details = doc.get("details", [])
            if "délai" in nom or "delai" in nom:
                delai = next((d for d in details if d.strip()), None)
            elif "tarif" in nom:
                tarif = "Voir la grille détaillée"
            elif "livraison" in nom:
                livraison = next((d for d in details if d.strip()), None)

    types = [t for t, _, _ in VOLETS if any(sp["type"] == t for sp in fiche["sous_pages"])]
    libelles = {t: lib for t, lib, _ in VOLETS}
    procedures = ", ".join(libelles[t] for t in types) or "Sur demande"

    lignes = [
        ("badge", "Procédures traitées", procedures),
        ("schedule", "Délai d’obtention", delai or "Communiqué au devis"),
        ("payments", "Tarifs", tarif or "Sur devis"),
        ("local_shipping", "Livraison", livraison or "Retrait au bureau ou envoi"),
    ]
    return (
        '<div class="border border-tertiary-fixed-dim/40 rounded-sm '
        'bg-surface-container-lowest p-7 lg:sticky lg:top-28">'
        '<p class="font-label-sm text-label-sm text-on-tertiary-fixed-variant uppercase '
        'tracking-widest pb-4 mb-4 border-b border-tertiary-fixed-dim/30">En résumé</p>'
        + "".join(
            '<div class="py-3.5 border-b border-tertiary-fixed-dim/20 last:border-b-0">'
            '<p class="font-label-sm text-label-sm text-on-surface-variant uppercase '
            'tracking-widest mb-1.5">%s</p>'
            '<p class="font-body-md text-[15px] text-on-surface">%s</p></div>' % (t, v)
            for _, t, v in lignes
        )
        + '<a class="mt-6 flex items-center justify-center gap-2 bg-primary '
          'text-on-primary px-6 py-4 font-label-sm text-label-sm uppercase '
          'tracking-widest rounded-sm hover:bg-primary-container transition-colors" '
          'href="mailto:%s?subject=Demande%%20de%%20visa%%20-%%20%s">'
          "Lancer ma demande</a>" % (CONTACT["email"], fiche["nom"])
        + "</div>"
    )


def fil_ariane(nom):
    return (
        '<nav class="flex items-center gap-2 font-label-sm text-label-sm '
        'text-on-surface-variant uppercase tracking-widest mb-8" aria-label="Fil d’Ariane">'
        '<a class="hover:text-primary transition-colors" href="index.html">Accueil</a>'
        '<span aria-hidden="true">/</span>'
        '<a class="hover:text-primary transition-colors" href="visas.html">Visas</a>'
        '<span aria-hidden="true">/</span>'
        '<span class="text-primary">%s</span></nav>' % nom
    )


def page_pays(fiche, voisins):
    nom, slug = fiche["nom"], fiche["slug"]

    volets = []
    for cle, libelle, ic in VOLETS:
        for sp in fiche["sous_pages"]:
            if sp["type"] != cle:
                continue
            intro = "".join(
                '<p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl '
                'mb-3">%s</p>' % x
                for x in sp.get("intro", [])
            )
            libre = "".join(
                '<p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl '
                'mb-3">%s</p>' % x
                for x in sp.get("texte_libre", [])
            )
            docs = sp.get("documents", [])
            corps_docs = accordeon_documents(docs, cle) if docs else ""
            compte = (
                '<span class="font-label-sm text-label-sm text-on-tertiary-fixed-variant '
                'uppercase tracking-widest">%d documents</span>' % len(docs)
                if docs else ""
            )
            volets.append(
                section(
                    '<div class="flex flex-wrap items-center gap-4 mb-6">'
                    + C.cartouche_icone(ic).replace("mb-7", "mb-0")
                    + '<h2 class="font-display-lg text-headline-lg text-primary">%s</h2>'
                      % libelle
                    + compte
                    + "</div>"
                    + intro + libre + corps_docs,
                    fond="surface",
                    id=cle,
                )
            )

    infos = next(
        (sp for sp in fiche["sous_pages"] if sp["type"] == "informations-generales"), None
    )
    if infos and infos.get("documents"):
        volets.append(
            section(
                entete_section(
                    "Informations générales",
                    "Délais, tarifs et livraison",
                    "Les frais consulaires sont fixés par la représentation "
                    "diplomatique ; ils sont distincts des honoraires du bureau.",
                )
                + accordeon_documents(infos["documents"], "infos"),
                fond="surface",
                id="infos",
            )
        )

    if not volets:
        volets.append(
            section(
                entete_section(
                    "Cette destination",
                    "Fiche en cours de rédaction",
                    "Le bureau traite cette destination, mais le détail des pièces n’est "
                    "pas encore publié. Contactez-nous : la réponse arrive le jour même.",
                )
                + C.carte(
                    '<p class="font-body-md text-body-md text-on-surface-variant mb-5">'
                    "Indiquez votre destination, le motif du séjour et votre nationalité : "
                    "nous vous transmettons la procédure applicable et la liste des "
                    "pièces.</p>"
                    '<a class="inline-flex items-center gap-2 bg-primary text-on-primary '
                    'px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest '
                    'rounded-sm hover:bg-primary-container transition-colors" '
                    'href="mailto:%s">Nous écrire</a>' % CONTACT["email"],
                    accent="laiton",
                ),
                fond="surface",
            )
        )

    # Procédure du bureau, texte du site actuel
    etapes = "".join(
        '<div class="flex flex-col gap-4">'
        '<div class="w-14 h-14 rounded-full bg-primary-container border '
        'border-tertiary-fixed-dim/50 flex items-center justify-center '
        'font-display-lg text-[20px] text-tertiary-fixed-dim">%02d</div>'
        '<p class="font-body-md text-body-md text-primary-fixed-dim">%s</p></div>'
        % (i, t)
        for i, t in enumerate(PROCEDURE_VISA, 1)
    )

    proches = "".join(
        '<a class="group flex items-center justify-between gap-3 px-5 py-4 border '
        'border-tertiary-fixed-dim/25 rounded-sm bg-surface-container-lowest '
        'hover:border-tertiary-fixed-dim transition-colors" href="../%s/">'
        '<span class="font-body-md text-body-md text-on-surface '
        'group-hover:text-primary transition-colors">%s</span>'
        % (v["slug"], v["nom"])
        + icone("arrow_forward", "text-[16px]") + "</a>"
        for v in voisins
    )

    corps = (
        # Bannière
        '<section class="w-full bg-surface relative overflow-hidden -mt-20 pt-36 pb-16 '
        'border-b border-tertiary-fixed-dim/20">'
        '<div class="guilloche absolute inset-0 opacity-[0.09] pointer-events-none" '
        'aria-hidden="true"></div>'
        '<div class="' + MAXW + ' relative z-10 grid grid-cols-1 lg:grid-cols-12 '
        'gap-gutter items-start">'
        '<div class="lg:col-span-7">'
        + fil_ariane(nom)
        + '<div class="flex items-center gap-4 mb-5">'
        + etiquette("Destination")
        + '<span class="h-px bg-tertiary-fixed-dim grow max-w-[100px]"></span></div>'
        + '<h1 class="font-display-lg text-display-lg-mobile md:text-display-lg '
          'text-primary leading-tight mb-6">Visa %s</h1>'
          % ARTICLE.get(nom, "pour " + nom)
        + '<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">'
          "Procédure, pièces à fournir, délai et tarifs pour une demande déposée "
          "depuis la Belgique. Le bureau constitue le dossier, prend le rendez-vous "
          "consulaire, dépose et récupère votre passeport.</p>"
          "</div>"
        + '<div class="lg:col-span-5">' + resume(fiche) + "</div>"
        + "</div></section>"
        + "".join(volets)
        # Procédure
        + '<section class="w-full bg-primary text-on-primary py-20 md:py-24 relative '
          'overflow-hidden">'
          '<div class="guilloche absolute inset-0 opacity-[0.08] pointer-events-none" '
          'aria-hidden="true"></div>'
          '<div class="' + MAXW + ' relative z-10">'
        + entete_section("Notre service", "Comment nous prenons le dossier en charge",
                         sombre=True)
        + '<div class="grid grid-cols-1 md:grid-cols-3 gap-10">' + etapes + "</div>"
        + '<p class="mt-12 pt-8 border-t border-tertiary-fixed-dim/25 font-body-md '
          'text-body-md text-primary-fixed-dim max-w-3xl">'
          "<strong class=\"text-on-primary\">La décision appartient au consulat.</strong> "
          "Notre prestation porte sur la conformité et la complétude du dossier. "
          "Les délais annoncés courent à partir du dépôt d’un dossier complet.</p>"
          "</div></section>"
        # Destinations proches
        + section(
            entete_section("Autres destinations", "Voir aussi")
            + '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">'
            + proches + "</div>"
            + '<div class="mt-8">'
              '<a class="inline-flex items-center gap-2 font-label-sm text-label-sm '
              'uppercase tracking-widest text-primary border-b border-tertiary-fixed-dim '
              'pb-1 hover:text-on-tertiary-fixed-variant transition-colors" '
              'href="visas.html#toutes">Les 70 destinations'
            + icone("arrow_forward", "text-[16px]", "") + "</a></div>",
            fond="surface",
        )
        + C.bandeau_conversion(
            "Préparez votre dossier %s." % ARTICLE.get(nom, "pour " + nom),
            "Envoyez-nous votre passeport en scan et le motif du séjour : nous "
            "vérifions les conditions applicables et la liste des pièces.",
            action="Demander un devis",
            href="mailto:" + CONTACT["email"],
        )
    )

    meta = {
        "titre": "Visa %s depuis la Belgique — procédure, documents et délai | Travisum"
                 % nom,
        "description": (
            "Demande de visa pour %s depuis Bruxelles : liste des documents à fournir, "
            "procédure, délai d’obtention et tarifs. Dossier constitué et déposé par "
            "Travisum, 367 avenue Louise." % nom
        ),
        "canonique": "https://www.travisum.com/visas/%s/" % slug,
    }

    html = (
        tete(meta)
        + '<body class="bg-surface font-body-md text-on-surface">'
        + '<div class="brass-progress"></div>'
        + ENTETE.entete("visas")
        + ENTETE.menu_mobile("visas")
        + '<main class="w-full pt-20 bg-surface">' + rythme.rythmer(corps) + "</main>"
        + S.pied_de_page()
        + '<script src="assets/js/site.js"></script></body>\n</html>\n'
    )
    # Les fiches vivent dans visas/<slug>/ : deux niveaux à remonter.
    html = reprefixer(html, "../../")
    # sauf les liens entre fiches voisines, déjà relatifs au dossier
    html = html.replace('href="../../../', 'href="../')
    return html


def main():
    fiches = []
    for nom_fichier in sorted(os.listdir(DOSSIER)):
        if nom_fichier.startswith("_") or not nom_fichier.endswith(".json"):
            continue
        fiches.append(json.load(io.open(os.path.join(DOSSIER, nom_fichier), encoding="utf-8")))
    fiches.sort(key=lambda f: f["nom"])

    for i, fiche in enumerate(fiches):
        voisins = [fiches[(i + k) % len(fiches)] for k in (1, 2, 3, 4)]
        dossier = os.path.join(RACINE, "visas", fiche["slug"])
        os.makedirs(dossier, exist_ok=True)
        with io.open(os.path.join(dossier, "index.html"), "w",
                     encoding="utf-8", newline="\n") as f:
            f.write(page_pays(fiche, voisins))

    print("%d fiches pays ecrites dans visas/<slug>/index.html" % len(fiches))
    total = sum(len(sp.get("documents", [])) for fi in fiches for sp in fi["sous_pages"])
    print("  %d sous-pages fusionnees, %d documents"
          % (sum(len(f["sous_pages"]) for f in fiches), total))
    return 0


if __name__ == "__main__":
    sys.exit(main())
