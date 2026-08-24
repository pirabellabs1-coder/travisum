# -*- coding: utf-8 -*-
"""
Restauration des accents dans les modules de composition.

Les gabarits ont d'abord ete ecrits en ASCII. Sur un site francais c'est un
defaut de qualite : « delais », « assermentee », « Federation » n'ont rien a
faire dans du texte publie.

METHODE
Le remplacement ne doit toucher que la prose destinee a l'affichage. Une
simple recherche/remplacement sur le fichier casserait le code : `donnees`
est un nom de module, `telephone` une cle de dictionnaire, `legalisations`
un nom de fichier et une cle d'onglet.

On procede donc en trois temps :
  1. le fichier est decoupe avec `tokenize`, et seuls les jetons STRING sont
     candidats — le code lui-meme n'est jamais touche ;
  2. parmi ces chaines, on ne retient que celles qui ressemblent a de la
     prose : au moins une espace et au moins deux mots alphabetiques. Les
     cles de dictionnaire (`"telephone"`) et les identifiants (`"tarifs"`)
     sont donc exclus d'office ;
  3. a l'interieur de ces chaines, les fragments techniques (attributs HTML,
     URL, noms de fichiers) sont masques avant remplacement.

Usage :  python tools/accents.py [--verifier]
"""

import io
import os
import re
import sys
import tokenize

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# donnees.py est exclu : son contenu a ete releve tel quel sur travisum.com
# et porte deja les bons accents.
FICHIERS = [
    "tools/composants.py",
    "tools/sections.py",
    "tools/tableaux.py",
    "tools/contenu.py",
    "tools/nouvelles_pages.py",
    "tools/entete.py",
    "tools/from_stitch.py",
]

# Fragments techniques a soustraire au remplacement, a l'interieur meme des
# chaines de prose (une chaine peut melanger balisage et texte).
MASQUES = [
    r'href="[^"]*"',
    r'src="[^"]*"',
    r'\bdata-[\w-]+="[^"]*"',
    r'\bid="[^"]*"',
    r'\bfor="[^"]*"',
    r'\bname="[^"]*"',
    r'\bclass="[^"]*"',
    r'\baria-[\w-]+="[^"]*"',
    r"[\w.\-/]+\.html(?:#[\w-]*)?",   # le fragment #ancre doit rester ASCII
    r"https?://\S+",
    r"\b[\w.+-]+@[\w.-]+\b",
]

MOTS = {
    # a
    "a-propos": "a-propos",
    "academiques": "académiques",
    "acces": "accès",
    "accepte": "accepté",
    "acceptee": "acceptée",
    "agree": "agréé",
    "agrees": "agréés",
    "annonce": "annoncé",
    "annonces": "annoncés",
    "apres": "après",
    "arrete": "arrêté",
    "arretes": "arrêtés",
    "arreter": "arrêter",
    "assermente": "assermenté",
    "assermentee": "assermentée",
    "assermentees": "assermentées",
    "assermentes": "assermentés",
    "aupres": "auprès",
    "authentifiee": "authentifiée",
    "autorite": "autorité",
    "autorites": "autorités",
    # b - c
    "biometrique": "biométrique",
    "celibat": "célibat",
    "certifiee": "certifiée",
    "certifiees": "certifiées",
    "chaine": "chaîne",
    "cloture": "clôture",
    "cloturee": "clôturée",
    "cloturer": "clôturer",
    "communique": "communiqué",
    "communiques": "communiqués",
    "competents": "compétents",
    "complete": "complète",
    "completes": "complètes",
    "completer": "compléter",
    "completude": "complétude",
    "confidentialite": "confidentialité",
    "confies": "confiés",
    "conservees": "conservées",
    "considerablement": "considérablement",
    "constitue": "constitué",
    "controle": "contrôle",
    # d
    "declaration": "déclaration",
    "decision": "décision",
    "deces": "décès",
    "dediee": "dédiée",
    "definitif": "définitif",
    "delai": "délai",
    "delais": "délais",
    "delivre": "délivré",
    "delivree": "délivrée",
    "delivrance": "délivrance",
    "demarche": "démarche",
    "demarches": "démarches",
    "depend": "dépend",
    "depense": "dépense",
    "deplace": "déplace",
    "deplacer": "déplacer",
    "deplacez": "déplacez",
    "deplacons": "déplaçons",
    "deplacement": "déplacement",
    "depose": "déposé",
    "deposer": "déposer",
    "deposes": "déposés",
    "depot": "dépôt",
    "depots": "dépôts",
    "detaille": "détaillé",
    "detaillee": "détaillée",
    "difference": "différence",
    "diplome": "diplôme",
    "diplomes": "diplômes",
    "disponibilite": "disponibilité",
    "donnees": "données",
    # e
    "echeance": "échéance",
    "ecoles": "écoles",
    "egalement": "également",
    "electronique": "électronique",
    "elements": "éléments",
    "enchainer": "enchaîner",
    "envoye": "envoyé",
    "equipe": "équipe",
    "etabli": "établi",
    "etablie": "établie",
    "etablies": "établies",
    "etape": "étape",
    "etapes": "étapes",
    "etat": "état",
    "Etat": "État",
    "Etats-Unis": "États-Unis",
    "etrangeres": "étrangères",
    "etranger": "étranger",
    "etrangers": "étrangers",
    "etre": "être",
    "etude": "étude",
    "etudes": "études",
    "europeenne": "européenne",
    "evite": "évite",
    "eviter": "éviter",
    "exigee": "exigée",
    "exige": "exigé",
    # f - i
    "Federation": "Fédération",
    "federales": "fédérales",
    "feries": "fériés",
    "frequemment": "fréquemment",
    "frequente": "fréquente",
    "frequentes": "fréquentes",
    "generalement": "généralement",
    "hebergement": "hébergement",
    "hebergeur": "hébergeur",
    "immediat": "immédiat",
    "immediate": "immédiate",
    "integralite": "intégralité",
    "interet": "intérêt",
    "intermediaire": "intermédiaire",
    "invente": "inventé",
    # j - n
    "jure": "juré",
    "juree": "jurée",
    "jurees": "jurées",
    "jures": "jurés",
    "legale": "légale",
    "legales": "légales",
    "legaliser": "légaliser",
    "legalisation": "légalisation",
    "legalisations": "légalisations",
    "legalise": "légalisé",
    "legalisee": "légalisée",
    "legaux": "légaux",
    "Liege": "Liège",
    "lisibilite": "lisibilité",
    "marques": "marqués",
    "medical": "médical",
    "medicaux": "médicaux",
    "meme": "même",
    "memes": "mêmes",
    "Ministere": "Ministère",
    "nationalite": "nationalité",
    "necessaire": "nécessaire",
    "necessaires": "nécessaires",
    "notaries": "notariés",
    "numerique": "numérique",
    "numeriques": "numériques",
    "numero": "numéro",
    # o - r
    "operations": "opérations",
    "particuliere": "particulière",
    "precise": "précise",
    "precisons": "précisons",
    "precision": "précision",
    "prealable": "préalable",
    "premiere": "première",
    "presence": "présence",
    "pres": "près",
    "procedure": "procédure",
    "procedures": "procédures",
    "publie": "publié",
    "publiee": "publiée",
    "publies": "publiés",
    "qualite": "qualité",
    "realise": "réalisé",
    "realisee": "réalisée",
    "realisees": "réalisées",
    "reclames": "réclamés",
    "recommande": "recommandé",
    "recuperation": "récupération",
    "recuperer": "récupérer",
    "recuperez": "récupérez",
    "refactures": "refacturés",
    "refuse": "refusé",
    "refusee": "refusée",
    "regler": "régler",
    "reglement": "règlement",
    "releve": "relevé",
    "releves": "relevés",
    "renseignons": "renseignons",
    "reponse": "réponse",
    "reponses": "réponses",
    "requis": "requis",
    "reserve": "réservé",
    "reserves": "réservés",
    "reseau": "réseau",
    "reussite": "réussite",
    "reutilises": "réutilisés",
    "Republique": "République",
    # s - z
    "scolarite": "scolarité",
    "securise": "sécurisé",
    "signalees": "signalées",
    "signe": "signé",
    "societe": "société",
    "societes": "sociétés",
    "supplementaire": "supplémentaire",
    "supplementaires": "supplémentaires",
    "supprimee": "supprimée",
    "supprimees": "supprimées",
    "technicite": "technicité",
    "telechargeables": "téléchargeables",
    "telephone": "téléphone",
    "telephonique": "téléphonique",
    "tracabilite": "traçabilité",
    "traite": "traité",
    "traitee": "traitée",
    "traitees": "traitées",
    "traites": "traités",
    "tres": "très",
    "universite": "université",
    "universites": "universités",
    "verifie": "vérifie",
    "verifier": "vérifier",
    "verifions": "vérifions",
    "verification": "vérification",
    # seconde passe
    "piece": "pièce",
    "pieces": "pièces",
    "generale": "générale",
    "generales": "générales",
    "communiquees": "communiquées",
    "reutilisees": "réutilisées",
    "ecrivant": "écrivant",
    "adaptees": "adaptées",
    "preparer": "préparer",
    "prevoir": "prévoir",
    "destine": "destiné",
    "destinee": "destinée",
    "equivalence": "équivalence",
    "deja": "déjà",
    "separees": "séparées",
    "identite": "identité",
    "securite": "sécurité",
    "validite": "validité",
    "reference": "référence",
    "references": "références",
    "etrangere": "étrangère",
    "succes": "succès",
}

# Formes capitalisees derivees automatiquement
for _b in list(MOTS):
    _cap = _b[:1].upper() + _b[1:]
    if _cap != _b and _cap not in MOTS:
        _a = MOTS[_b]
        MOTS[_cap] = _a[:1].upper() + _a[1:]

MOTIF_MOT = re.compile(
    r"(?<![\wÀ-ɏ-])("
    + "|".join(sorted(map(re.escape, MOTS), key=len, reverse=True))
    + r")(?![\wÀ-ɏ-])"
)


# Expressions traitées après le remplacement mot à mot.
# Le « a » préposition doit devenir « à », mais le verbe « avoir » doit rester
# intact : « le pays a signé la Convention ». On masque donc d'abord les
# tournures verbales avant la conversion.
VERBE_AVOIR = (
    r"\b(?:il|elle|on|qui|y|ne|n’|n'|pays|bureau|document|dossier|"
    r"client|visiteur|consulat|traducteur|site|devis)\s+a\s"
)

EXPRESSIONS = [
    (r"(?<=[\s(«’'])a(?=\s)", "à"),
    (r"\bdes le\b", "dès le"),
    (r"\bdes la\b", "dès la"),
    (r"\bdes que\b", "dès que"),
    (r"\bOu nous\b", "Où nous"),
    (r"\bpartout ou\b", "partout où"),
]


def appliquer_expressions(texte):
    coffre = []

    def ranger(m):
        coffre.append(m.group(0))
        return "\x01%d\x01" % (len(coffre) - 1)

    protege = re.sub(VERBE_AVOIR, ranger, texte, flags=re.I)
    for motif, remplacement in EXPRESSIONS:
        protege = re.sub(motif, remplacement, protege)
    return re.sub(r"\x01(\d+)\x01", lambda m: coffre[int(m.group(1))], protege)


def est_prose(valeur):
    """Une chaine est de la prose si elle contient au moins deux mots."""
    sans_balise = re.sub(r"<[^>]*>", " ", valeur)
    mots = re.findall(r"[A-Za-zÀ-ɏ]{2,}", sans_balise)
    return len(mots) >= 2


def restaurer_chaine(valeur):
    coffre = []

    def ranger(m):
        coffre.append(m.group(0))
        return "\x00%d\x00" % (len(coffre) - 1)

    protege = valeur
    for motif in MASQUES:
        protege = re.sub(motif, ranger, protege)

    protege = MOTIF_MOT.sub(lambda m: MOTS[m.group(1)], protege)
    protege = appliquer_expressions(protege)
    return re.sub(r"\x00(\d+)\x00", lambda m: coffre[int(m.group(1))], protege)


def traiter(source):
    """Reecrit uniquement le contenu des jetons STRING de prose."""
    sortie = []
    modifs = 0
    for tok in tokenize.generate_tokens(io.StringIO(source).readline):
        if tok.type == tokenize.STRING:
            brut = tok.string
            # separe le prefixe/les guillemets du contenu
            m = re.match(r"^([rbufRBUF]*)('''|\"\"\"|'|\")(.*)(\2)$", brut, re.S)
            if m and est_prose(m.group(3)):
                nouveau_contenu = restaurer_chaine(m.group(3))
                if nouveau_contenu != m.group(3):
                    modifs += 1
                    brut = m.group(1) + m.group(2) + nouveau_contenu + m.group(4)
            sortie.append((tok.type, brut))
        else:
            sortie.append((tok.type, tok.string))
    return tokenize.untokenize(sortie), modifs


def main():
    total = 0
    for rel in FICHIERS:
        chemin = os.path.join(RACINE, rel)
        avant = io.open(chemin, encoding="utf-8").read()
        apres, n = traiter(avant)
        if n:
            with io.open(chemin, "w", encoding="utf-8", newline="\n") as f:
                f.write(apres)
        print("%-32s %3d chaine(s) accentuee(s)" % (rel, n))
        total += n
    print("\nTotal : %d chaines corrigees" % total)
    return 0


if __name__ == "__main__":
    sys.exit(main())
