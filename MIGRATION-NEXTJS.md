# Migration Next.js

Le site est passé du HTML statique généré en Python à **Next.js 14 en export
statique** (`output: "export"`). La version HTML précédente est conservée dans
`_html-v1/` à titre de référence.

## Pourquoi Next.js, et pourquoi l'export statique

La prémisse « React = meilleur SEO » est fausse : ce qui compte pour le
référencement, c'est que le robot reçoive du HTML déjà rendu. React en rendu
client dégraderait le SEO. Next.js en **export statique** produit exactement du
HTML pré-rendu — vérifié : le `h1`, le `title`, la meta description, le contenu
des fiches pays et les données structurées sont tous présents dans le HTML
servi, sans exécution de JavaScript.

Les vraies raisons du choix :

- le devis le prévoit (section 11 : « Next.js avec rendu statique et React ») ;
- 86 pages dont 70 fiches pays, générées depuis une source unique typée ;
- routage i18n FR/NL/EN natif, pour les versions à venir ;
- base saine pour l'interface d'administration promise au devis.

## Démarrer

```bash
npm install
npm run dev        # développement, http://localhost:3000
npm run build      # export statique dans out/
npm run start      # sert l'export : npx serve out
```

`npm run donnees` régénère les JSON de `lib/donnees/` depuis `reference/`
(script `tools/exporter_json.py`).

## Structure

```
app/                     routes (une par dossier, App Router)
  layout.tsx             <head>, polices, schema établissement
  page.tsx               accueil
  traductions|legalisations|visas|tarifs|ressources|a-propos/
  visas/[pays]/          gabarit unique -> 70 fiches (generateStaticParams)
  mentions-legales|confidentialite|cgv|cookies/
  sitemap.ts, robots.ts  générés au build
components/
  Entete.tsx             en-tête + méga-menu + menu mobile (client)
  PiedDePage.tsx         pied encre
  Page.tsx               enveloppe + rythme des fonds
  ui.tsx                 primitives (Section, Carte, boutons…)
  sections.tsx           sections partagées
  interactifs.tsx        FAQ, recherche, onglets, plan Maps, estimateur (client)
  PageLegale.tsx         gabarit des pages légales
lib/
  donnees.ts             couche typée
  donnees/*.json         données exportées depuis Python
  navigation.ts          structure du menu et du méga-menu
  textes-legaux.tsx      contenu des 4 pages légales
tailwind.config.ts       charte, extraite de la maquette Stitch
```

## Ce qui a été porté à l'identique

Charte, composants, contenu et données sont transposés sans perte. Un bug
latent a même été corrigé au passage : la config Tailwind rangeait par erreur
le palier `headline-lg` dans `fontFamily` au lieu de `fontSize` — invisible en
JS, attrapé par le typage TypeScript.

## Vérifié

- `next build` : 86 pages, 0 erreur de type, 0 erreur de lint ;
- HTML pré-rendu (h1, title, meta, JSON-LD présents sans JS) ;
- hydratation : recherche instantanée, onglets tarifs, méga-menu, FAQ,
  plan Maps différé — tous fonctionnels ;
- 0 lien interne mort sur les 83 pages HTML exportées ;
- premier chargement JS : 97 kB.

## Ajouts de mise en production

- **Plan de redirection (206 URL).** Les anciennes adresses WordPress — sous-pages
  pays aux trois schémas incohérents, pages `/traduction/` et `/legalisation/`,
  et les deux liens cassés du diagnostic — sont redirigées en 301 vers leur
  équivalent. Généré pour les quatre hébergeurs courants :
  `public/_redirects` (Netlify) et `public/.htaccess` (Apache) sont copiés dans
  `out/` au build ; `vercel.json` et `reference/deploy/nginx-redirects.conf`
  couvrent les deux autres. La table source est dans `reference/redirections.json`.
- **Page 404** (écran 13 du devis) : tampon « document introuvable », liens de
  secours vers les trois services, retour accueil. Exportée en `out/404.html`.
- **Bandeau de consentement cookies** : honore la politique cookies (refus aussi
  accessible que l'acceptation, aucun traceur avant consentement). En l'état le
  site ne pose aucun traceur ; le bandeau enregistre le choix et sert de point
  d'accroche à une future mesure d'audience. Vérifié : « Refuser » en premier,
  choix mémorisé, disparaît après clic.

## Ossature i18n (FR / NL / EN)

Le français reste servi à la racine (`/visas/inde/`) ; le néerlandais et
l'anglais sont préfixés (`/nl/visas/inde/`, `/en/visas/inde/`). Ce choix
préserve les URL du site actuel, donc les positions Google.

**Architecture.** Chaque page a son contenu dans un composant `…Vue({ lang })`
sous `components/vues/`. Le fichier `app/<route>/page.tsx` le rend en français ;
son miroir `app/[lang]/<route>/page.tsx` le rend en NL et EN via
`generateStaticParams`. Les 70 fiches pays suivent le même schéma
(`app/[lang]/visas/[pays]/` génère langue × pays).

**Ce qui est traduit.** Toute l'interface : navigation, pied de page, boutons,
bandeau cookies, sélecteur de langue — via `lib/i18n.ts`. Les libellés sont de
vrais termes NL/EN (Vertalingen, Legalisaties, Offerte in 2 minuten…).

**Ce qui reste en français.** Le contenu rédactionnel (corps de texte, FAQ,
fiches pays) : sa traduction est fournie par le bureau, comme le prévoit le
devis. Les pages NL/EN affichent donc pour l'instant ce texte en français dans
une coquille entièrement localisée. Pour traduire : remplir les dictionnaires
et, page par page, les chaînes de contenu — la structure ne bouge pas.

**SEO.** Chaque page déclare son `<link rel="canonical">` et ses quatre
`hreflang` (fr, nl, en, x-default). L'attribut `<html lang>` est corrigé dans
le HTML statique par `tools/localiser-html.mjs`, enchaîné au build. Le
`sitemap.xml` décline chaque URL dans les trois langues avec leurs alternates.

**Sélecteur de langue.** Il conserve la page courante en changeant de langue
(depuis `/nl/visas/inde/`, « Français » mène à `/visas/inde/`).

Vérifié : build de **248 routes**, `<html lang>` correct en statique, nav et
pied localisés, liens internes préfixés, hreflang et canonical en place,
bascule de langue conservant la page.
