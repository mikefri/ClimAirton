const { TuyaContext } = require('@tuya/tuya-connector-nodejs');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Méthode non autorisée' });
  }

  const { accessId, accessSecret, deviceId, power } = req.body;

  const tuya = new TuyaContext({
    baseUrl: 'https://openapi.tuyaeu.com',
    accessKey: accessId,
    secretKey: accessSecret,
  });

  try {
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
