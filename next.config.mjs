/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique : Next produit du HTML pré-rendu, servable par n'importe
  // quel hébergeur. C'est ce qui garantit que les robots reçoivent la page
  // complète — le rendu côté client, lui, pénaliserait le référencement.
  output: "export",

  // Chaque page devient un dossier avec son index.html, ce qui reproduit les
  // URL du site actuel (/visas/inde/) et préserve les positions acquises.
  trailingSlash: true,

  // L'optimiseur d'images de Next suppose un serveur : inutilisable en export.
  images: { unoptimized: true },

  reactStrictMode: true,
};

export default nextConfig;
