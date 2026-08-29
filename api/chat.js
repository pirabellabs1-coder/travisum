/**
 * Fonction serverless — Assistant Travisum (propulsé par OpenRouter).
 *
 * Le site reste un export statique ; cette fonction vit à part et n'est appelée
 * qu'au clic de l'internaute. La clé API n'est jamais exposée au navigateur.
 *
 * Variables d'environnement (à définir dans Vercel → Settings → Environment) :
 *   OPENROUTER_API_KEY  (obligatoire pour les vraies réponses — clé sk-or-… d'openrouter.ai)
 *   CHAT_MODEL          (optionnel, défaut : anthropic/claude-haiku-4.5 ;
 *                        n'importe quel identifiant de modèle OpenRouter)
 */

const MODELE = process.env.CHAT_MODEL || "anthropic/claude-haiku-4.5";

const CONNAISSANCES = `
BUREAU
- Nom : Travisum (Travisum Louise Office), bureau à Bruxelles.
- Adresse : 367, avenue Louise, 1050 Bruxelles, Belgique.
- Téléphone : 02 642 00 25 — Mobile : 0485 948 935.
- E-mail : info@travisum.com.
- Horaires : du lundi au vendredi, de 9 h 00 à 17 h 00 sans interruption.
- Accès : métro Louise, trams 8 et 93, bus 54.

SERVICES
1) Traductions assermentées (jurées) : actes d'état civil (naissance, mariage, décès),
   diplômes et relevés de notes, jugements et actes notariés, statuts de société,
   casier judiciaire, documents commerciaux, etc. Traducteurs jurés près les
   tribunaux belges. Traductions libres également possibles. Plus de 82 langues.
2) Légalisations : légalisation consulaire et apostille de La Haye. Dépôt et
   récupération auprès des instances belges (SPF Affaires étrangères, Justice…)
   et des représentations diplomatiques.
3) Visas de voyage : facilitation d'obtention de visas (tourisme, affaires,
   e-visa) pour de nombreuses destinations, SAUF les États-Unis. Constitution et
   vérification du dossier, prise de rendez-vous, dépôt et suivi.

TARIFS
- Traductions : ne JAMAIS annoncer de prix (ni « à partir de », ni prix à la page).
  Le tarif dépend du nombre de caractères, de la langue et de la technicité du
  document. Oriente toujours vers un devis gratuit établi sur scan.
- Légalisations et visas : le tarif varie selon le pays, le type et le service ;
  oriente vers un devis gratuit ou vers le bureau.

DÉLAIS (règle importante)
- Ne promets JAMAIS 24 h, 48 h, « un à deux jours » ni un traitement « express ».
  Donne toujours des délais réalistes : en général 2 à 3 semaines pour un visa,
  1 à 2 semaines pour une légalisation ou une apostille, et « selon le volume »
  pour une traduction. En cas de doute, propose de confirmer le délai au bureau.

DÉROULEMENT (4 étapes)
1. Dépôt / envoi du document (scan ou sur place). 2. Devis rapide. 3. Traitement
par des experts. 4. Retrait sur place ou livraison sécurisée.

RÈGLES IMPORTANTES
- Travisum n'est pas une autorité consulaire. Les informations sur les visas sont
  INDICATIVES et peuvent changer ; la décision finale appartient toujours au
  consulat/à l'ambassade. Précise-le pour toute question de visa.
- Travisum ne prend PAS en charge les États-Unis (ni visa, ni ESTA). Ne propose
  jamais les États-Unis comme destination et ne cite jamais l'ESTA. Si un
  internaute demande les USA, indique poliment que cette destination n'est pas
  prise en charge et invite à contacter le bureau.
- N'invente jamais un tarif, un délai ou une exigence que tu ne connais pas :
  oriente alors vers un devis ou vers le bureau (téléphone / e-mail).
- Reste concis, courtois et professionnel. Réponds dans la langue de l'internaute
  (français, néerlandais ou anglais).

PRISE DE RENDEZ-VOUS
- Le bureau reçoit sur rendez-vous. Si l'internaute souhaite un rendez-vous ou
  déposer un document, propose-lui d'utiliser le bouton « Prendre rendez-vous »
  de la fenêtre de discussion (le bureau le recontacte par e-mail pour confirmer),
  ou de téléphoner au 02 642 00 25.
`;

const SYSTEME = `Tu es l'assistant virtuel du bureau Travisum (Bruxelles), spécialisé en
traductions assermentées, légalisations/apostilles et visas de voyage. Tu aides
les internautes avec des réponses claires, exactes et brèves, en t'appuyant
UNIQUEMENT sur les connaissances ci-dessous. Si une information n'y figure pas,
dis-le honnêtement et oriente vers un devis, le téléphone (02 642 00 25) ou
l'e-mail (info@travisum.com). Pour toute question de visa, rappelle que les
informations sont indicatives et que la décision appartient au consulat.

MISE EN FORME : réponses courtes et lisibles dans une fenêtre étroite. Tu peux
utiliser du gras (**libellé**) pour les intitulés importants et de courtes listes
à puces avec « - ». N'utilise NI tableaux, NI titres Markdown (#), NI blocs de
code. Pas de pavés : phrases brèves.

CONNAISSANCES :
${CONNAISSANCES}`;

function nettoyer(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim(),
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, service: "chat", configured: !!process.env.OPENROUTER_API_KEY });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  let corps = req.body;
  if (typeof corps === "string") {
    try {
      corps = JSON.parse(corps);
    } catch {
      corps = {};
    }
  }
  const messages = nettoyer(corps?.messages);
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "messages_invalides" });
  }

  // Langue de la conversation = langue du site (FR/NL/EN), transmise par le widget.
  const lang = ["fr", "nl", "en"].includes(corps?.lang) ? corps.lang : "fr";
  const nomLangue = { fr: "français", nl: "néerlandais (Nederlands)", en: "anglais (English)" }[lang];
  const systemeLangue =
    SYSTEME +
    `\n\nLANGUE DE RÉPONSE OBLIGATOIRE : ${nomLangue}. Réponds toujours et UNIQUEMENT en ${nomLangue}, quelle que soit la langue du message de l'internaute.`;
  const REPLI = {
    degraded: {
      fr: "L'assistant n'est pas encore activé. Contactez le bureau au 02 642 00 25 ou à info@travisum.com, ou utilisez le bouton « Prendre rendez-vous ».",
      nl: "De assistent is nog niet geactiveerd. Neem contact op met het kantoor op 02 642 00 25 of via info@travisum.com, of gebruik de knop « Afspraak maken ».",
      en: "The assistant isn't active yet. Contact the office at +32 2 642 00 25 or info@travisum.com, or use the « Book an appointment » button.",
    },
    indispo: {
      fr: "Désolé, l'assistant est momentanément indisponible. Vous pouvez appeler le 02 642 00 25 ou écrire à info@travisum.com.",
      nl: "Sorry, de assistent is momenteel niet beschikbaar. Bel 02 642 00 25 of schrijf naar info@travisum.com.",
      en: "Sorry, the assistant is temporarily unavailable. Call +32 2 642 00 25 or email info@travisum.com.",
    },
    erreur: {
      fr: "Une erreur est survenue. Merci de réessayer, ou de contacter le bureau au 02 642 00 25.",
      nl: "Er is een fout opgetreden. Probeer opnieuw of neem contact op met het kantoor op 02 642 00 25.",
      en: "An error occurred. Please try again, or contact the office at +32 2 642 00 25.",
    },
  };

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(200).json({ reply: REPLI.degraded[lang], degraded: true });
  }

  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://travisum.com",
        "X-Title": "Travisum",
      },
      body: JSON.stringify({
        model: MODELE,
        max_tokens: 700,
        messages: [{ role: "system", content: systemeLangue }, ...messages],
      }),
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("OpenRouter error", r.status, detail.slice(0, 500));
      return res.status(502).json({ error: "amont_indisponible", reply: REPLI.indispo[lang] });
    }

    const data = await r.json();
    const reply = (data?.choices?.[0]?.message?.content || "").trim();
    return res.status(200).json({ reply: reply || "…" });
  } catch (e) {
    console.error("chat handler crash", e);
    return res.status(500).json({ error: "erreur_interne", reply: REPLI.erreur[lang] });
  }
}
