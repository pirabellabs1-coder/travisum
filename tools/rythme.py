# -*- coding: utf-8 -*-
"""
Rythme visuel des pages.

Problème constaté à la relecture : plusieurs pages enchaînaient deux, voire
trois sections de même fond. Sans changement de valeur entre elles, le
lecteur ne perçoit plus de découpage — la page devient un long ruban et les
titres de section flottent au milieu de nulle part.

Ce module repasse sur le HTML produit et impose une alternance :

  - la bannière garde le fond voulu par la maquette (elle ouvre la page) ;
  - les sections encre (`bg-primary`) sont des points d'ancrage : elles
    marquent les respirations fortes — procédure, bandeau de conversion —
    et remettent l'alternance à zéro ;
  - entre deux ancres, les sections claires alternent ivoire / ivoire
    sourd, de sorte que deux voisines ne partagent jamais le même fond.

Le filet de laiton de séparation n'est conservé qu'entre deux sections de
même famille : entre une claire et une sombre, le contraste suffit.
"""

import re

CLAIR = "bg-surface"
SOURD = "bg-surface-container-low"

# Ouverture d'une section de premier niveau, avec sa liste de classes
SECTION = re.compile(r'<section class="([^"]*)"')


def _fond(classes):
    if "bg-primary" in classes:
        return "encre"
    if SOURD in classes:
        return "sourd"
    return "clair"


def rythmer(html, garder_premiere=True):
    """Alterne les fonds clairs des sections de <main>."""
    # La fonction accepte indifferemment une page complete (on ne rythme alors
    # que l'interieur de <main>) ou un simple fragment de sections.
    if "<main" in html:
        debut = html.index("<main")
        fin = html.index("</main>") if "</main>" in html else len(html)
    else:
        debut, fin = 0, len(html)
    tete, corps, queue = html[:debut], html[debut:fin], html[fin:]

    positions = list(SECTION.finditer(corps))
    if not positions:
        return html

    prochain = SOURD  # la première section claire après la bannière passe en sourd
    morceaux, curseur = [], 0

    for index, m in enumerate(positions):
        classes = m.group(1)
        famille = _fond(classes)

        # La bannière et les sections encre ne bougent pas
        if famille == "encre" or (index == 0 and garder_premiere):
            if famille == "encre":
                prochain = SOURD  # après une ancre sombre, on repart sur le sourd
            elif _fond(classes) == "sourd":
                prochain = CLAIR
            else:
                prochain = SOURD
            continue

        nouvelles = classes
        for ancien in (SOURD, CLAIR):
            if ancien in nouvelles:
                nouvelles = nouvelles.replace(ancien, "\x00", 1)
                break
        else:
            nouvelles = "\x00 " + nouvelles
        nouvelles = nouvelles.replace("\x00", prochain)

        if nouvelles != classes:
            morceaux.append(corps[curseur : m.start(1)])
            morceaux.append(nouvelles)
            curseur = m.end(1)

        prochain = CLAIR if prochain == SOURD else SOURD

    morceaux.append(corps[curseur:])
    return tete + "".join(morceaux) + queue


def diagnostic(html):
    """Retourne la suite des fonds, pour contrôle."""
    if "<main" not in html:
        return []
    corps = html[html.index("<main") : html.index("</main>")]
    return [_fond(m.group(1)) for m in SECTION.finditer(corps)]
