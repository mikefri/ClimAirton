// Ce code s'exécute sur le serveur, pas dans le navigateur
export default async function handler(req, res) {
  const { accessId, accessSecret, deviceId, power } = req.body;
  
  // Ici on appelle l'API Tuya avec vos identifiants
  // Note: Pour simplifier, on utilise une requête fetch standard
  const response = await fetch(`https://openapi.tuyaeu.com/v1.0/devices/${deviceId}/commands`, {
    method: 'POST',
    headers: {
      'client_id': accessId,
      'sign_method': 'HMAC-SHA256',
      'Content-Type': 'application/json',
      // Tuya demande une signature complexe, il faudra utiliser une librairie 
      // comme 'tuya-connector-nodejs' pour la production
    },
    body: JSON.stringify({
      "commands": [{"code": "switch_1", "value": power}]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
