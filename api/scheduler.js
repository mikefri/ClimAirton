const { TuyaContext } = require('@tuya/tuya-connector-nodejs');

export default async function handler(req, res) {
  const tuya = new TuyaContext({
    baseUrl: 'https://openapi.tuyaeu.com',
    accessKey: process.env.TUYA_ID,      // Utilisation des variables d'environnement
    secretKey: process.env.TUYA_SECRET,
  });

  const deviceId = process.env.TUYA_DEVICE;
  
  // Obtenir l'heure actuelle en France (Paris)
  const now = new Date();
  const parisTime = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }).format(now);

  const [hour, minute] = parisTime.split(':').map(Number);

  try {
    let actionTaken = "Aucune action à cette heure";

    // SCÉNARIO MATIN : Allumage à 07:00
    if (hour === 7) {
      await tuya.request({
        path: `/v1.0/devices/${deviceId}/commands`,
        method: 'POST',
        body: { "commands": [{ "code": "switch", "value": true }] }
      });
      actionTaken = "Allumage du matin effectué";
    }

    // SCÉNARIO SOIR : Extinction à 23:00
    if (hour === 23) {
      await tuya.request({
        path: `/v1.0/devices/${deviceId}/commands`,
        method: 'POST',
        body: { "commands": [{ "code": "switch", "value": false }] }
      });
      actionTaken = "Extinction du soir effectuée";
    }

    res.status(200).json({ success: true, time: parisTime, action: actionTaken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
