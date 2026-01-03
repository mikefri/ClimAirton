# ❄️ MyAirton Connect PWA
> **Pilotez votre confort du bout des doigts avec une interface fluide, rapide et privée.**

---

### ✨ Points Forts de l'Application

* **📱 Installation en 1 clic** : S'installe sur votre écran d'accueil sans passer par l'App Store ou le Play Store.
* **⚡ Ultra-Réactif** : Chargement instantané grâce au Service Worker, même avec une mauvaise connexion.
* **🧼 Auto-Nettoyage (Clean)** : Un bouton dédié pour sécher l'évaporateur et garantir un air sain sans odeurs.
* **📊 Usage en Temps Réel** : Suivi des heures d'utilisation pour mieux gérer votre consommation.
* **⏳ Minuteur Intelligent** : Affiche `--` au repos pour ne pas encombrer l'écran, et le décompte exact dès l'activation.

---

## ⚙️ Guide de Configuration Tuya Cloud

Pour fonctionner, l'application doit se connecter officiellement à votre matériel via le Cloud Tuya.

### 1️⃣ Créer votre compte Développeur
* Allez sur [Tuya IoT Platform](https://iot.tuya.com/) et cliquez sur **"Sign Up"**.
* Une fois connecté, allez dans le menu **Cloud** ➡️ **Development**.

### 2️⃣ Créer le Projet Cloud
* Cliquez sur **Create Cloud Project**.
* **Nom** : "My Clim App".
* **Data Center** : Choisissez **Western Europe Data Center** (impératif pour l'Europe).
* Cliquez sur **Authorize** en laissant les services par défaut.

### 3️⃣ Lier votre Application Mobile
* Dans votre projet, allez dans l'onglet **Devices** ➡️ **Link Tuya App**.
* Cliquez sur **Add App Account** pour afficher le QR Code.
* Ouvrez **Smart Life** sur votre téléphone ➡️ Onglet **Profil** ➡️ Icône **Scan** (en haut à droite) et scannez le code.

### 4️⃣ Vos identifiants secrets
Copiez ces codes dans les réglages de votre application :

| Donnée | Emplacement sur Tuya IoT |
| :--- | :--- |
| **Access ID** | Onglet **Overview** (Client ID) |
| **Access Secret** | Onglet **Overview** (Client Secret) |
| **Device ID** | Onglet **Devices** (ID à côté du nom de votre clim) |

---

## 🚀 Installation sur Smartphone

1. Ouvrez votre URL GitHub Pages sur votre navigateur mobile.
2. **Sur iPhone (Safari)** : Icône **Partager** ➡️ **Sur l'écran d'accueil**.
3. **Sur Android (Chrome)** : Menu **3 points** ➡️ **Installer l'application**.

---

## 🛠️ Structure Technique
* `index.html` : L'interface et toute la logique de contrôle.
* `manifest.json` : Définit le comportement "App" (couleurs, nom, icônes).
* `sw.js` : Le Service Worker qui gère le cache pour la fluidité.
* `icon.png` : L'icône officielle de votre application.

---

## 🛡️ Sécurité & Vie Privée
Aucune donnée ne transite par un serveur externe. Vos clés API sont enregistrées exclusivement dans le **localStorage** de votre propre appareil. Vous gardez le contrôle total sur votre installation.

---
*Optimisé pour un confort intelligent et une maison connectée.*
