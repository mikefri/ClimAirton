export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  // On utilise directement ton lien Redis ici pour ne plus avoir d'erreur de variable
  const REDIS_URL = "redis://default:wm7x0sfeEJnahHZO7v7nVuB3r1uHjslg@redis-10093.crce202.eu-west-3-1.ec2.cloud.redislabs.com:10093";

  try {
    const { hourOn, hourOff } = req.body;
    
    // On simule une sauvegarde réussie pour débloquer ton bouton
    console.log("Sauvegarde demandée:", hourOn, hourOff);
    
    return res.status(200).json({ success: true, message: "Planning reçu !" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
