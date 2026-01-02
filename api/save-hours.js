import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Vérification de la connexion à la base
  if (!process.env.KV_URL && !process.env.KV_REST_API_URL) {
    return res.status(500).json({ error: "La base de données KV n'est pas configurée dans Vercel." });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { hourOn, hourOff } = req.body;

  try {
    // Utilisation de la méthode universelle de Vercel KV
    await kv.set('hour_on', hourOn);
    await kv.set('hour_off', hourOff);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur KV:", error);
    return res.status(500).json({ error: "Erreur d'écriture base: " + error.message });
  }
}
