# Déploiement du site Travisum sur Plesk (Ubuntu)

Guide d'installation. Le code se récupère via l'extension **Git** de Plesk.
Dépôt : **https://github.com/pirabellabs1-coder/travisum** (branche `main`).

## En bref
- Le site est une application **Next.js exportée en statique** → dossier `out/`
  (HTML/CSS/JS). **Aucune base de données.**
- Un **serveur Node unique** ([`server.mjs`](../server.mjs), à la racine du dépôt)
  sert le site **et** gère les 2 fonctions dynamiques **et** applique les
  redirections — une seule application à lancer dans Plesk.
- Environnement confirmé : **nginx** en façade, **Node.js 24.20.0** (déjà installé).

## Installation (Plesk > Node.js)
1. **Git** : cloner le dépôt sur le domaine.
2. **Version de Node** : sélectionner **24.20.0** (LTS ; éviter 25/26 qui sont
   « Current »). 20.x ou 22.x conviennent aussi.
3. **NPM install** : lancer `npm install` (bouton Plesk) — installe Next + Express.
4. **Build** : exécuter le script `build` (`npm run build`) → génère le dossier `out/`.
   *(Si le build sur le serveur pose problème, on peut fournir `out/` déjà compilé.)*
5. **Application Startup File** : `server.mjs`.
   **Application Root** : la racine du dépôt. (Plesk lance `node server.mjs` via Passenger ;
   le port est fourni par Plesk dans `PORT`.)
6. **Variables d'environnement** (Plesk > Node.js > *Custom environment variables*) :

   | Variable | Rôle | Requis |
   |---|---|---|
   | `OPENROUTER_API_KEY` | Assistant IA (clé openrouter.ai `sk-or-…`) | pour activer le chat |
   | `CHAT_MODEL` | Modèle (défaut `anthropic/claude-haiku-4.5`) | non |
   | `RESEND_API_KEY` | Envoi e-mail des demandes de RDV (resend.com) | pour l'envoi réel |
   | `RDV_FROM` | Expéditeur, ex. `Travisum <site@travisum.com>` (domaine vérifié chez Resend) | non |
   | `RDV_TO` | Destinataire (défaut `info@travisum.com`) | non |

   > Sans `OPENROUTER_API_KEY` : le chat affiche un message de repli.
   > Sans `RESEND_API_KEY` : le formulaire de RDV bascule sur un envoi `mailto:`.
   > Le site (pages, SEO, redirections) fonctionne dans tous les cas.
7. **Démarrer / redémarrer** l'application.

## Redirections 301 (SEO — anciennes URL WordPress)
`server.mjs` applique déjà les **252 redirections** (lues depuis `vercel.json`) —
rien d'autre à faire. Si vous préférez les gérer au niveau du serveur web, deux
fichiers prêts sont fournis (à utiliser à la place, pas en plus) :
- **nginx** : [`redirects.nginx.conf`](./redirects.nginx.conf) → Plesk >
  *Apache & nginx Settings* > *Additional nginx directives*.
- **Apache** : [`redirects.htaccess`](./redirects.htaccess).

## Domaine et HTTPS
Le site actuel reste en place jusqu'au basculement. Une fois le nouveau site en
place, activer **HTTPS via Let's Encrypt** (intégré à Plesk).

## Vérifications rapides après démarrage
- `https://<domaine>/` → l'accueil s'affiche.
- `https://<domaine>/visas/inde/` → une fiche pays s'affiche.
- `https://<domaine>/api/chat/` → `{"ok":true,"service":"chat","configured":true}`
  (`configured:true` confirme que la clé est bien prise en compte).
- Une ancienne URL, ex. `…/visas/chine/chine-informations-generales/` → redirige
  vers `/visas/chine/`.
