# -*- coding: utf-8 -*-
"""
Composants de section partages par toutes les pages.

Vocabulaire visuel : celui de la maquette Stitch (theme Official Editorial).
  - fonds        : surface (ivoire) / primary (encre) / surface-container-low
  - filets       : border-tertiary-fixed-dim/20 pour les separations douces,
                   /40 sous les etiquettes, tertiary-fixed-dim plein pour les
                   traits thematiques
  - etiquettes   : font-label-sm text-label-sm uppercase (12 px, 0,18 em)
  - titres       : font-display-lg / font-headline-md (Playfair)
  - angles       : rounded-sm, jamais davantage
  - elevation    : aucune ombre, uniquement des filets de 1 px

Le devis (section 04) interdit les ombres portees et les aplats larges de
laiton : le laiton n'apparait qu'en filets, soulignements et sceaux.
"""

from donnees import CONTACT

MAXW = "max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop"


# ==========================================================================
#  Briques elementaires
# ==========================================================================
def etiquette(texte, sombre=False):
    couleur = "text-tertiary-fixed-dim" if sombre else "text-on-tertiary-fixed-variant"
    return (
        '<span class="font-label-sm text-label-sm {c} uppercase tracking-widest">{t}</span>'
    ).format(c=couleur, t=texte)


def entete_section(surtitre, titre, chapeau=None, sombre=False, centre=False):
    """Etiquette + titre serif + chapeau, avec le filet de laiton d'amorce."""
    c_titre = "text-on-primary" if sombre else "text-primary"
    c_chapeau = "text-primary-fixed-dim" if sombre else "text-on-surface-variant"
    align = "items-center text-center" if centre else "items-start"

    bloc = '<div class="flex flex-col {a} gap-5 mb-14">'.format(a=align)
    bloc += '<div class="flex items-center gap-4">'
    if not centre:
        bloc += '<span class="w-8 h-px bg-tertiary-fixed-dim"></span>'
    bloc += etiquette(surtitre, sombre) + "</div>"
    bloc += (
        '<h2 class="font-display-lg text-headline-md md:text-headline-lg {c} '
        'leading-tight max-w-3xl">{t}</h2>'
    ).format(c=c_titre, t=titre)
    if chapeau:
        bloc += ('<p class="font-body-lg text-body-lg {c} max-w-2xl">{t}</p>').format(
            c=c_chapeau, t=chapeau
        )
    bloc += "</div>"
    return bloc


def section(contenu, fond="surface", id=None, filet_bas=True, guilloche=False):
    """Enveloppe de section : fond, gouttiere, filet de separation."""
    fonds = {
        "surface": "bg-surface",
        "basse": "bg-surface-container-low",
        "encre": "bg-primary text-on-primary",
    }
    cls = fonds.get(fond, "bg-surface")
    if filet_bas:
        cls += " border-b border-tertiary-fixed-dim/20"
    if guilloche:
        cls += " relative overflow-hidden"

    attr_id = ' id="%s"' % id if id else ""
    ouv = '<section class="w-full {c} py-20 md:py-28"{i}>'.format(c=cls, i=attr_id)
    if guilloche:
        ouv += (
            '<div class="guilloche absolute inset-0 opacity-[0.07] pointer-events-none" '
            'aria-hidden="true"></div>'
        )
        return ouv + '<div class="{m} relative z-10">{c}</div></section>'.format(
            m=MAXW, c=contenu
        )
    return ouv + '<div class="{m}">{c}</div></section>'.format(m=MAXW, c=contenu)


def carte(contenu, sombre=False, accent=None, classes=""):
    """Carte bordee. Aucune ombre : la separation vient du filet de 1 px."""
    if sombre:
        base = "bg-primary-container/40 border border-tertiary-fixed-dim/25 text-on-primary"
    else:
        base = "bg-surface-container-lowest border border-tertiary-fixed-dim/30"
    bord = {
        "laiton": " border-l-2 border-l-tertiary-fixed-dim",
        "vert": " border-l-2 border-l-secondary",
        "rouge": " border-l-2 border-l-error",
    }.get(accent, "")
    return (
        '<div class="{b}{a} rounded-sm p-7 md:p-8 transition-colors duration-300 '
        'hover:border-tertiary-fixed-dim/70 {c}">{k}</div>'
    ).format(b=base, a=bord, c=classes, k=contenu)


def icone(nom, taille="text-2xl", couleur="text-on-tertiary-fixed-variant", plein=False):
    style = " style=\"font-variation-settings: 'FILL' 1;\"" if plein else ""
    return (
        '<span class="material-symbols-outlined {t} {c}"{s} aria-hidden="true">{n}</span>'
    ).format(t=taille, c=couleur, s=style, n=nom)


def cartouche_icone(nom):
    """Le carre ivoire qui porte l'icone, repris des cartes de l'accueil."""
    return (
        '<div class="w-12 h-12 mb-7 bg-surface-container border border-tertiary-fixed-dim/30 '
        'flex items-center justify-center rounded-sm shrink-0">'
        + icone(nom, plein=True)
        + "</div>"
    )

    # ==========================================================================
    #  Sections reutilisables
    # ==========================================================================


def bandeau_conversion(
    titre, chapeau, action="Demander un devis", href="tarifs.html", secondaire=True
):
    """Bandeau encre pleine largeur, filet de laiton, deux actions."""
    sec = ""
    if secondaire:
        sec = (
            '<a class="inline-flex items-center justify-center gap-2 border '
            "border-tertiary-fixed-dim text-tertiary-fixed-dim px-7 py-4 font-label-sm "
            "text-label-sm uppercase tracking-widest rounded-sm "
            'hover:bg-tertiary-fixed-dim/10 transition-colors" '
            'href="tel:{t}">Appeler le {n}</a>'
        ).format(t=CONTACT["telephone_tel"], n=CONTACT["telephone"])

    return (
        '<section class="w-full bg-primary text-on-primary relative overflow-hidden '
        'py-20 md:py-28">'
        '<div class="guilloche absolute inset-0 opacity-[0.09] pointer-events-none" '
        'aria-hidden="true"></div>'
        '<div class="{m} relative z-10 flex flex-col items-center text-center gap-6">'
        + '<div class="flex items-center gap-4">'
        '<span class="w-8 h-px bg-tertiary-fixed-dim"></span>'
        + etiquette("Devis en 2 minutes", sombre=True)
        + '<span class="w-8 h-px bg-tertiary-fixed-dim"></span></div>'
        + '<h2 class="font-display-lg text-headline-md md:text-headline-lg max-w-3xl '
        'leading-tight">{t}</h2>'
        + '<p class="font-body-lg text-body-lg text-primary-fixed-dim max-w-2xl">{c}</p>'
        + '<div class="flex flex-col sm:flex-row gap-4 mt-4">'
        '<a class="inline-flex items-center justify-center gap-2 bg-tertiary-fixed-dim '
        "text-on-tertiary-fixed px-7 py-4 font-label-sm text-label-sm uppercase "
        'tracking-widest rounded-sm hover:bg-white transition-colors" href="{h}">{a}</a>'
        + sec
        + "</div></div></section>"
    ).format(m=MAXW, t=titre, c=chapeau, h=href, a=action)


def faq(titre, questions, surtitre="Questions fréquentes", chapeau=None):
    """Accordeon, balise en données structurees pour l'affichage enrichi."""
    items = []
    for i, (q, r) in enumerate(questions):
        items.append(
            '<div class="border-b border-tertiary-fixed-dim/25" data-faq-item>'
            '<h3><button class="w-full flex items-start justify-between gap-6 py-6 text-left '
            'group" data-faq-tete aria-expanded="false">'
            '<span class="font-display-lg text-[19px] md:text-[21px] leading-snug text-primary '
            'group-hover:text-on-tertiary-fixed-variant transition-colors">{q}</span>'
            '<span class="material-symbols-outlined text-on-tertiary-fixed-variant shrink-0 '
            'mt-1 transition-transform duration-300" aria-hidden="true">add</span>'
            "</button></h3>"
            '<div class="grid grid-rows-[0fr] transition-all duration-300" data-faq-corps>'
            '<div class="overflow-hidden">'
            '<p class="font-body-md text-body-md text-on-surface-variant pb-7 max-w-3xl">{r}</p>'
            "</div></div></div>".format(q=q, r=r)
        )

    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": r},
            }
            for q, r in questions
        ],
    }
    import json

    corps = (
        entete_section(surtitre, titre, chapeau)
        + '<div class="border-t border-tertiary-fixed-dim/25 max-w-4xl" data-faq>'
        + "".join(items)
        + "</div>"
        + '<script type="application/ld+json">%s</script>'
        % json.dumps(schema, ensure_ascii=False)
    )
    return section(corps, fond="surface", id="faq")


def grille_langues(titre="Les langues que nous traduisons", surtitre="Langues", chapeau=None):
    """Grille de pastilles, recherche instantanee et compteur en direct."""
    from donnees import LANGUES, LANGUES_PHARES
    import unicodedata

    def aplatir(s):
        return "".join(
            c
            for c in unicodedata.normalize("NFD", s.lower())
            if unicodedata.category(c) != "Mn"
        )

    phares = {aplatir(x) for x in LANGUES_PHARES}
    pastilles = []
    for nom in LANGUES:
        est_phare = aplatir(nom) in phares
        marque = (
            '<span class="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" aria-hidden="true"></span>'
            if est_phare
            else ""
        )
        titre_attr = ' title="Traducteur juré disponible"' if est_phare else ""
        pastilles.append(
            '<a class="inline-flex items-center gap-2 px-4 py-2 border '
            "border-tertiary-fixed-dim/30 rounded-sm font-body-md text-[15px] "
            "text-on-surface-variant bg-surface-container-lowest hover:border-tertiary-fixed-dim "
            'hover:text-primary transition-colors" href="traductions.html" '
            'data-terme="{t}"{ti}>{m}{n}</a>'.format(
                t=aplatir(nom), ti=titre_attr, m=marque, n=nom
            )
        )

    corps = (
        entete_section(surtitre, titre, chapeau)
        + '<div class="flex flex-col md:flex-row md:items-end gap-6 mb-10">'
        + '<div class="grow max-w-md">'
        '<label class="font-label-sm text-label-sm text-on-surface-variant uppercase '
        'tracking-widest mb-2 block" for="rech-langue">Rechercher une langue</label>'
        '<div class="relative">'
        '<span class="material-symbols-outlined absolute left-0 bottom-2 '
        'text-on-surface-variant/50 text-[18px]" aria-hidden="true">search</span>'
        '<input class="w-full bg-transparent border-b border-tertiary-fixed-dim/40 py-2 '
        "pl-7 font-body-md text-primary outline-none focus:border-primary transition-colors "
        'placeholder:text-on-surface-variant/40" id="rech-langue" type="search" '
        'placeholder="Ex : neerlandais, arabe, mandarin…" autocomplete="off" '
        'data-filtre="#grille-langues" data-compteur-cible="#compte-langues">'
        "</div></div>" + '<p class="flex items-baseline gap-3 shrink-0">'
        '<span class="font-display-lg text-headline-md text-primary" '
        'id="compte-langues">%d</span>' % len(LANGUES)
        + etiquette("langues affichees")
        + "</p>"
        + "</div>"
        + '<div class="flex flex-wrap gap-2.5" id="grille-langues">'
        + "".join(pastilles)
        + "</div>"
        + '<div class="hidden mt-10" data-aucun-resultat>'
        + carte(
            '<h3 class="font-display-lg text-[21px] text-primary mb-3">'
            "Votre langue n’est pas dans la liste ?</h3>"
            '<p class="font-body-md text-body-md text-on-surface-variant mb-6 max-w-xl">'
            "Le réseau du bureau depasse cette liste. Decrivez votre besoin : vous aurez "
            "une réponse claire et rapide d’un membre de notre équipe.</p>"
            '<a class="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 '
            "font-label-sm text-label-sm uppercase tracking-widest rounded-sm "
            'hover:bg-primary-container transition-colors" href="mailto:%s">'
            "Poser la question</a>" % CONTACT["email"],
            accent="laiton",
        )
        + "</div>"
        + '<p class="flex items-center gap-2 mt-8 font-body-md text-[15px] '
        'text-on-surface-variant">'
        '<span class="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true"></span>'
        "Traducteur juré disponible — les autres langues sont proposees en "
        "traduction libre.</p>"
    )
    return section(corps, fond="surface", id="langues")
