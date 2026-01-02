import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });
  
  const { hourOn, hourOff } = req.body;
  
  try {
    // On enregistre les heures dans ta base Redis de Paris
    await kv.set('hour_on', hourOn);
    await kv.set('hour_off', hourOff);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
