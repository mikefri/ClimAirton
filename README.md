===========================================================
DOCUMENTATION TECHNIQUE : CLIMATISEUR AIRTON (API TUYA DP)
===========================================================

ID DE L'APPAREIL : ?
MODE D'INSTRUCTION : DP Instruction (Raw Mode)
TYPE : Climatiseur Réversible (Froid/Chaud)

-----------------------------------------------------------
1. COMMANDES DE CONTRÔLE (INSTRUCTIONS - ENVOI)
-----------------------------------------------------------
Ces codes servent à piloter l'appareil via l'API.

[SYSTÈME]
- Power (Boolean)        : Allumage (true) / Extinction (false)
- temp_set (Integer)     : Température cible. Plage 160-880. Échelle 1. Step 10.
                           (Ex: 200 = 20°C / 255 = 25.5°C)
- unit (Enum)            : Unité de mesure [c, f]
- light (Boolean)        : Affichage LED de la clim (true/false)

[MODES ET VENTILATION]
- mode (Enum)            : [auto, cold, wet, heat, fan]
- windspeed (Enum)       : [auto, low, low_mid, mid, mid_high, high, mute, turbo]
- heat8 (Boolean)        : Mode Hors-gel 8°C (true/false)

[FLUX D'AIR ET OSCILLATION]
- windshake (Enum)       : Oscillation auto [un_down, left_right, all, off]
- vertical (Enum)        : Position volet vertical [off, 15, 1, 2, 3, 4, 5]
- horizontal (Enum)      : Position volet horizontal [off, same, opposite]
- swing3d (Boolean)      : Oscillation combinée 3D (true/false)

[OPTIONS DE CONFORT]
- mode_ECO (Boolean)     : Mode Économie (true/false)
- sleep (Boolean)        : Mode Nuit (true/false)
- health (Boolean)       : Ioniseur / Santé (true/false)
- clean (Boolean)        : Auto-nettoyage (true/false)

-----------------------------------------------------------
2. CAPTEURS ET ÉTATS (STATUS - RÉCEPTION)
-----------------------------------------------------------
Informations renvoyées par l'appareil pour mise à jour de l'UI.

- temp_current (Integer) : Température ambiante actuelle (Échelle 0.1, ex: 230 = 23°C)
- electricity (Integer)  : Consommation instantanée en Watts (Échelle 0.1)
- countdown_left (Int)   : Temps restant minuterie en minutes (0-1440)
- total_time (Integer)   : Cumul d'utilisation en heures
- current_mode (Enum)    : Mode actif réel [cold, wet, heat, fan]

-----------------------------------------------------------
3. DIAGNOSTICS ET ERREURS (BITMAPS)
-----------------------------------------------------------
Codes d'état importants remontés dans FaultBitmap et fault2Bitmap.

[MAINTENANCE]
- SC : Self-Clean (Nettoyage automatique en cours)
- CL : Rappel de nettoyage des filtres
- PF : Power Failure (Instabilité électrique détectée)

[ERREURS TECHNIQUES]
- E1, E2, E4, E5 : Défauts de sondes de température
- H6, H9 : Problèmes moteur ventilateur ou compresseur
- L0 - L9 : Erreurs de tension ou de communication
- U0 - UC : Erreurs de communication entre unités intérieure/extérieure

-----------------------------------------------------------
NOTES IMPORTANTES :
1. Le passage en "DP Instruction" rend le code "switch" obsolète, 
   il doit être remplacé par "Power".
2. Pour les températures, toujours diviser la valeur reçue par 10 
   pour obtenir les Celsius réels.
===========================================================
