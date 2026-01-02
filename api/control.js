import { TuyaContext } from '@tuya/tuya-connector-nodejs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ msg: 'Méthode non autorisée' });

  const { accessId, accessSecret, deviceId, action, code, value } = req.body;

  const tuya = new TuyaContext({
    baseUrl: 'https://openapi.tuyaeu.com',
    accessKey: accessId,
    secretKey: accessSecret,
  });

  try {
    if (action === 'getStatus') {
      const status = await tuya.request({
        path: `/v1.0/devices/${deviceId}/status`,
        method: 'GET'
      });
      return res.status(200).json(status);
    }

    if (action === 'sendCommand') {
      const result = await tuya.request({
        path: `/v1.0/devices/${deviceId}/commands`,
        method: 'POST',
        body: {
          "commands": [{ "code": code, "value": value }]
        }
      });
      return res.status(200).json(result);
    }

    res.status(400).json({ msg: 'Action inconnue' });

  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
}
