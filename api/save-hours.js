import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { hourOn, hourOff } = req.body;

  try {
    // On enregistre les deux valeurs dans la base de données
    await kv.set('hour_on', hourOn);
    await kv.set('hour_off', hourOff);

    return res.status(200).json({ success: true, msg: 'Planning enregistré !' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
