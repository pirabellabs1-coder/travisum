# -*- coding: utf-8 -*-
"""
Tableaux tarifaires et grille à onglets.

Chiffres tabulaires, alignement à droite des montants, filet de laiton sous
l'en-tete : c'est la « grille tarifaire » decrite à la section 04 du devis.
Aucune ombre, uniquement des filets.
"""

from composants import MAXW, entete_section, etiquette, icone, section
from contenu import TARIFS_LEGALISATION, TARIFS_TRADUCTION, TARIFS_VISA


def tableau(bloc, compact=False):
    """Rend un bloc tarifaire {colonnes, lignes, note} en tableau borde."""
    entetes = "".join(
        '<th class="text-left font-label-sm text-label-sm text-on-surface-variant '
        'uppercase tracking-widest px-5 py-4 whitespace-nowrap{a}" scope="col">{c}</th>'.format(
            c=c, a=" text-right" if i > 0 else ""
        )
        for i, c in enumerate(bloc["colonnes"])
    )

    corps = []
    for ligne in bloc["lignes"]:
        cellules = []
        for i, val in enumerate(ligne):
            if i == 0:
                cellules.append(
                    '<th class="text-left font-body-md text-body-md text-on-surface '
                    'font-normal px-5 py-4" scope="row">{v}</th>'.format(v=val)
                )
            else:
                cellules.append(
                    '<td class="text-right font-body-md text-body-md text-on-surface '
                    'px-5 py-4 tabular-nums whitespace-nowrap">{v}</td>'.format(v=val)
                )
        corps.append(
            '<tr class="border-b border-tertiary-fixed-dim/20 last:border-b-0 '
            'hover:bg-surface-container-low transition-colors">' + "".join(cellules) + "</tr>"
        )

    note = ""
    if bloc.get("note") and not compact:
        note = (
            '<p class="flex items-start gap-3 mt-6 font-body-md text-[15px] '
            'text-on-surface-variant max-w-3xl">'
            + icone("info", "text-[18px] mt-0.5 shrink-0")
            + "<span>{n}</span></p>".format(n=bloc["note"])
        )

    return (
        '<div class="border border-tertiary-fixed-dim/30 rounded-sm overflow-hidden '
        'bg-surface-container-lowest">'
        '<div class="overflow-x-auto">'
        '<table class="w-full min-w-[640px]">'
        '<thead class="border-b border-tertiary-fixed-dim bg-surface-container-low">'
        "<tr>" + entetes + "</tr></thead>"
        "<tbody>" + "".join(corps) + "</tbody>"
        "</table></div></div>" + note
    )


def section_tarifs_onglets():
    """La matrice complète des trois services, avec bascule sans rechargement."""
    onglets = [
        ("traduction", "Traduction", TARIFS_TRADUCTION),
        ("legalisation", "Legalisation", TARIFS_LEGALISATION),
        ("visa", "Visa", TARIFS_VISA),
    ]

    boutons = "".join(
        '<button class="px-6 py-3.5 font-label-sm text-label-sm uppercase tracking-widest '
        "border rounded-sm transition-colors data-[actif]:bg-primary "
        "data-[actif]:text-on-primary data-[actif]:border-primary "
        'border-tertiary-fixed-dim/40 text-on-surface-variant hover:border-tertiary-fixed-dim" '
        'data-onglet="{c}"{a} type="button">{l}</button>'.format(
            c=cle, l=lib, a=" data-actif" if i == 0 else ""
        )
        for i, (cle, lib, _) in enumerate(onglets)
    )

    panneaux = "".join(
        # La classe `hidden`, et non l'attribut : c'est elle que bascule le JS.
        '<div class="{h}" data-panneau="{c}">{t}</div>'.format(
            c=cle, h="" if i == 0 else "hidden", t=tableau(bloc)
        )
        for i, (cle, lib, bloc) in enumerate(onglets)
    )

    corps = (
        entete_section(
            "Tarifs et délais",
            "Nos prix, publiés",
            "La première question de tout visiteur est « combien » et « en combien de "
            "temps ». Les voici. Chaque montant distingue clairement les frais officiels "
            "reverses aux administrations des honoraires du bureau.",
        )
        + '<div class="flex flex-wrap gap-3 mb-8" data-onglets-tarifs role="tablist">'
        + boutons
        + "</div>"
        + "<div data-onglets-panneaux>"
        + panneaux
        + "</div>"
        + '<div class="mt-10 p-6 border border-tertiary-fixed-dim/30 border-l-2 '
        "border-l-tertiary-fixed-dim rounded-sm bg-surface-container-lowest "
        'flex items-start gap-4 max-w-3xl">'
        + icone("draft", "text-[20px] mt-0.5 shrink-0")
        + "<div>"
        '<p class="font-label-sm text-label-sm text-on-surface-variant uppercase '
        'tracking-widest mb-2">Montants indicatifs</p>'
        '<p class="font-body-md text-body-md text-on-surface-variant">'
        "Ces tarifs sont des ordres de grandeur hors TVA, donnes pour situer le "
        "budget. Le prix ferme dépend de la langue, du volume, de la technicité du "
        "document et du pays de destination. Envoyez-nous un scan : le devis chiffre "
        "arrive sous 2 heures ouvrables.</p></div></div>"
    )
    return section(corps, fond="surface", id="grille")


def section_tarifs_apercu(
    bloc, titre, surtitre="Délais et tarifs", chapeau=None, fond="basse", ancre="tarifs"
):
    """Un seul tableau, insere dans une page de service."""
    corps = (
        entete_section(surtitre, titre, chapeau) + tableau(bloc) + '<div class="mt-8">'
        '<a class="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase '
        "tracking-widest text-primary border-b border-tertiary-fixed-dim pb-1 "
        'hover:text-on-tertiary-fixed-variant transition-colors" href="tarifs.html">'
        "Voir la grille complète" + icone("arrow_forward", "text-[16px]", "") + "</a></div>"
    )
    return section(corps, fond=fond, id=ancre)
