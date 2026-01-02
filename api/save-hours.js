import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  // On crée la connexion directement avec ton lien
  const kv = createClient({
    url: process.env.KV_URL || process.env.REDIS_URL,
  });

  try {
    const { hourOn, hourOff } = req.body;
    await kv.set('hour_on', hourOn);
    await kv.set('hour_off', hourOff);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
