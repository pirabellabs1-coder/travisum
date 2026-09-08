# Déploiement du site Travisum sur Plesk (Ubuntu)

Document technique pour l'informaticien. Tout le nécessaire est dans ce dossier
`deploy-plesk/` (récupérable via l'extension Git de Plesk).

Dépôt : **https://github.com/pirabellabs1-coder/travisum** (branche `main`)

---

## 1. Nature du site
Application **Next.js exportée en statique** (`output: "export"`) → un dossier
`out/` contenant des fichiers **HTML/CSS/JS statiques**. **Aucune base de
données.** URLs avec **slash final** (`trailingSlash: true`) : chaque page est
un dossier avec un `index.html`, servi nativement par Apache/nginx.

Deux fonctions **dynamiques et optionnelles** : l'assistant IA (`/api/chat`) et
l'envoi par e-mail des demandes de rendez-vous (`/api/rdv`).

## 2. Récupérer et construire le site
- Cloner le dépôt via **Plesk > Git**.
- Build (Node 18+ requis) :
  ```bash
  npm install
  npm run build      # génère le dossier out/
  ```
- Le **document root** du domaine doit pointer sur le dossier **`out/`**.
- Si le build sur le serveur n'est pas souhaité, nous pouvons fournir le dossier
  `out/` déjà compilé (à téléverser tel quel).

## 3. Redirections 301 (préserver le SEO / le trafic)
**252 redirections** des anciennes URL WordPress vers les nouvelles pages sont
fournies dans deux formats — utiliser celui qui correspond au serveur web :

- **Apache** : [`redirects.htaccess`](./redirects.htaccess) → placer dans le
  document root (ou fusionner avec le `.htaccess` existant).
- **nginx** : [`redirects.nginx.conf`](./redirects.nginx.conf) → Plesk >
  *Apache & nginx Settings* > *Additional nginx directives*.

Ces redirections évitent que les anciennes URL indexées ne tombent en 404 au
moment du basculement.

## 4. Fonctions dynamiques (chat + formulaire RDV) — optionnel
Les deux endpoints sont de simples handlers Node sans dépendance (juste `fetch`
+ variables d'environnement) :

| Endpoint | Rôle | Variables d'environnement |
|---|---|---|
| `/api/chat` | Assistant IA (proxy OpenRouter) | `OPENROUTER_API_KEY` (option. `CHAT_MODEL`) |
| `/api/rdv`  | Envoi e-mail des demandes de RDV (Resend) | `RESEND_API_KEY`, `RDV_FROM`, `RDV_TO` |

Deux possibilités :

- **Avec Node.js (recommandé)** : Plesk supporte Node.js. Un petit fichier
  serveur prêt à l'emploi peut être fourni pour exposer `/api/*` **et** servir le
  statique en une seule application. Il suffit alors de définir les variables
  d'environnement ci-dessus dans Plesk.
- **Sans runtime (site 100 % statique)** : le site fonctionne parfaitement ;
  simplement l'assistant IA est indisponible et le formulaire de RDV bascule
  automatiquement sur un envoi via la messagerie du visiteur (`mailto:`).

## 5. Domaine et HTTPS
Le site actuel reste en place jusqu'au basculement. Le domaine `travisum.com`
continue d'être géré comme aujourd'hui. Activer **HTTPS via Let's Encrypt**
(intégré à Plesk) une fois le nouveau site en place.

---

## Questions pour finaliser la mise en ligne
1. **Serveur web** : Apache (`.htaccess`) ou nginx ? (pour le bon fichier de redirections)
2. **Node.js** disponible sous Plesk pour l'assistant + l'envoi des RDV ? (sinon : statique + `mailto`)
3. **Build sur le serveur** (`npm run build`) possible, ou faut-il fournir le dossier `out/` déjà compilé ?

Dès vos réponses, nous fournissons le fichier serveur Node adapté (si Node) et/ou
le `out/` prébuild, prêts à installer.
