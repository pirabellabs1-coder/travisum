/** Config Tailwind — extraite de la maquette Stitch
 *  (projet « Travisum Design System & Platform », thème Official Editorial).
 *
 *  Ne pas modifier ces valeurs sans revalider les maquettes : c'est cette
 *  configuration qui a produit les captures de référence rangées dans
 *  les dossiers *_travisum/screen.png.
 *
 *  Deux écarts assumés par rapport à l'export Stitch :
 *  - l'échelle typographique a été réduite (le h1 passait de 64 à 52 px) et
 *    un palier « headline-lg » ajouté, la maquette donnant la même taille au
 *    titre de page et aux titres de section ;
 *  - borderRadius.full vaut 0.75rem et non 9999px. Ce n'est pas une erreur :
 *    c'est ce qui donne aux pastilles 01-04 leur forme de carré adouci. Le
 *    DESIGN.md indique 9999px, la maquette fait foi.
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed-variant": "#5d4123",
        "surface-container-highest": "#e4e2e4",
        "surface": "#fbf9fb",
        "surface-container-low": "#f5f3f5",
        "tertiary-container": "#2e1901",
        "tertiary-fixed-dim": "#e7bf97",
        "on-error-container": "#93000a",
        "on-tertiary-container": "#a27f5b",
        "on-secondary-fixed-variant": "#2c4966",
        "surface-container-high": "#e9e7e9",
        "on-tertiary": "#ffffff",
        "on-surface-variant": "#44474c",
        "on-primary-fixed": "#081d30",
        "on-secondary": "#ffffff",
        "secondary": "#44617f",
        "on-primary-fixed-variant": "#36485e",
        "background": "#fbf9fb",
        "on-primary": "#ffffff",
        "inverse-surface": "#303032",
        "inverse-primary": "#b5c8e3",
        "on-tertiary-fixed": "#2b1700",
        "error": "#ba1a1a",
        "primary-fixed-dim": "#b5c8e3",
        "outline": "#74777d",
        "surface-container": "#efedef",
        "tertiary-fixed": "#ffdcbb",
        "tertiary": "#090300",
        "on-error": "#ffffff",
        "on-secondary-fixed": "#001d34",
        "surface-container-lowest": "#ffffff",
        "on-primary-container": "#7587a0",
        "seal": "#2e7d5b",
      "primary": "#0b1f33",
        "surface-dim": "#dbd9db",
        "error-container": "#ffdad6",
        "surface-bright": "#fbf9fb",
        "surface-tint": "#4e6077",
        "on-background": "#1b1c1d",
        "on-secondary-container": "#43607d",
        "secondary-fixed": "#d0e4ff",
        "secondary-container": "#bddafd",
        "surface-variant": "#e4e2e4",
        "on-surface": "#1b1c1d",
        "secondary-fixed-dim": "#acc9ec",
        "inverse-on-surface": "#f2f0f2",
        "outline-variant": "#c4c6cd",
        "primary-container": "#17324e",
        "primary-fixed": "#d1e4ff"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-desktop": "64px",
        "unit": "8px",
        "max-width": "1280px",
        "margin-mobile": "20px",
        "gutter": "24px"
      },
      fontFamily: {
        "body-lg": [
          "Inter",
          "system-ui",
          "sans-serif"
        ],
        "body-md": [
          "Inter",
          "system-ui",
          "sans-serif"
        ],
        "label-sm": [
          "Inter",
          "system-ui",
          "sans-serif"
        ],
        "display-lg": ["Poppins", "Inter", "system-ui", "sans-serif"],
        "display-lg-mobile": ["Poppins", "Inter", "system-ui", "sans-serif"],
        "headline-lg": ["Poppins", "Inter", "system-ui", "sans-serif"],
        "headline-md": ["Poppins", "Inter", "system-ui", "sans-serif"]
      },
      fontSize: {
      "body-lg": ["16px", {"lineHeight":"1.7","letterSpacing":"0em","fontWeight":"400"}],
      "display-lg-mobile": ["29px", {"lineHeight":"1.1","letterSpacing":"-0.01em","fontWeight":"700"}],
      "label-sm": ["12px", {"lineHeight":"1","letterSpacing":"0.18em","fontWeight":"600"}],
      "display-lg": ["42px", {"lineHeight":"1.1","letterSpacing":"-0.015em","fontWeight":"700"}],
      "headline-md": ["22px", {"lineHeight":"1.2","letterSpacing":"-0.01em","fontWeight":"600"}],
      "body-md": ["16px", {"lineHeight":"1.6","letterSpacing":"0em","fontWeight":"400"}],
      "headline-lg": ["30px", {"lineHeight":"1.15","letterSpacing":"-0.01em","fontWeight":"600"}],
      },
    },
  },
  plugins: [],
};

export default config;
