/**
 * Post-traitement de build : fige l'attribut <html lang> par locale.
 *
 * Le layout racine de Next rend <html lang="fr"> pour toutes les pages.
 * Ce script réécrit lang="nl" dans out/nl/** et lang="en" dans out/en/**,
 * pour que le HTML statique — celui que lisent les robots — porte la bonne
 * langue sans dépendre du JavaScript.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";

async function fichiersHtml(dossier) {
  const entrees = await readdir(dossier, { withFileTypes: true });
  const out = [];
  for (const e of entrees) {
    const chemin = join(dossier, e.name);
    if (e.isDirectory()) out.push(...(await fichiersHtml(chemin)));
    else if (e.name.endsWith(".html")) out.push(chemin);
  }
  return out;
}

async function localiser(prefixe, lang) {
  let n = 0;
  const racine = join(OUT, prefixe);
  let fichiers;
  try {
    fichiers = await fichiersHtml(racine);
  } catch {
    return 0; // dossier absent
  }
  for (const f of fichiers) {
    const src = await readFile(f, "utf8");
    const maj = src.replace('<html lang="fr"', `<html lang="${lang}"`);
    if (maj !== src) {
      await writeFile(f, maj, "utf8");
      n++;
    }
  }
  return n;
}

const nl = await localiser("nl", "nl");
const en = await localiser("en", "en");
console.log(`localiser-html : ${nl} pages nl, ${en} pages en corrigees.`);
