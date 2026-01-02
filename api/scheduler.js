import { kv } from '@vercel/kv';
const { TuyaContext } = require('@tuya/tuya-connector-nodejs');

export default async function handler(req, res) {
  const tuya = new TuyaContext({
    baseUrl: 'https://openapi.tuyaeu.com',
    accessKey: process.env.TUYA_ID,
    secretKey: process.env.TUYA_SECRET,
  });

  // On récupère les heures sauvées (ou 7h et 22h par défaut)
  const hOn = await kv.get('hour_on') || 7;
  const hOff = await kv.get('hour_off') || 22;

  const now = new Date();
  const currentHour = parseInt(new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris', hour: 'numeric', hour12: false
  }).format(now));

  try {
    if (currentHour === parseInt(hOn)) {
      await tuya.request({
        path: `/v1.0/devices/${process.env.TUYA_DEVICE}/commands`,
        method: 'POST',
        body: { "commands": [{ "code": "switch", "value": true }] }
      });
    } else if (currentHour === parseInt(hOff)) {
      await tuya.request({
        path: `/v1.0/devices/${process.env.TUYA_DEVICE}/commands`,
        method: 'POST',
        body: { "commands": [{ "code": "switch", "value": false }] }
      });
    }
    res.status(200).json({ status: "OK", hour: currentHour, on: hOn, off: hOff });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
