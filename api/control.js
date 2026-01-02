const { TuyaContext } = require('@tuya/tuya-connector-nodejs');

export default async function handler(req, res) {
  // Récupération des clés envoyées par votre téléphone (Local Storage)
  const { accessId, accessSecret, deviceId, power } = req.body;

  // Initialisation du contexte Tuya (calcul automatique de la signature)
  const tuya = new TuyaContext({
    baseUrl: 'https://openapi.tuyaeu.com',
    accessKey: accessId,
    secretKey: accessSecret,
  });

  try {
    // Envoi de la commande à l'API Tuya
    const result = await tuya.request({
      path: `/v1.0/devices/${deviceId}/commands`,
      method: 'POST',
      body: {
        "commands": [
          { "code": "switch_1", "value": power }
        ]
      }
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
}
