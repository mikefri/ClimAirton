const { TuyaContext } = require('@tuya/tuya-connector-nodejs');

export default async function handler(req, res) {
  // Vos accès Tuya (à mettre en dur ou via variables d'environnement Vercel)
  const tuya = new TuyaContext({
    baseUrl: 'https://openapi.tuyaeu.com',
    accessKey: 'VOTRE_ACCESS_ID', 
    secretKey: 'VOTRE_ACCESS_SECRET',
  });

  try {
    // Exemple : Éteindre la clim automatiquement
    await tuya.request({
      path: `/v1.0/devices/VOTRE_DEVICE_ID/commands`,
      method: 'POST',
      body: { "commands": [{ "code": "switch", "value": false }] }
    });

    res.status(200).json({ success: true, msg: "Action automatique réussie" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
