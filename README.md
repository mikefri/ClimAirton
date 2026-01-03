❄️ MyAirton PWA : Votre Contrôleur de Clim Intelligent
Cette application Web (PWA) permet de piloter votre climatiseur compatible Tuya / Smart Life via une interface moderne, légère et installable sur smartphone.

✨ Pourquoi utiliser cette application ?
📱 Expérience Native : S'installe sur votre écran d'accueil et s'ouvre en plein écran, sans la barre d'adresse du navigateur.

⚡️ Rapidité : Utilise un Service Worker pour un chargement instantané, même avec une connexion faible.

🛡️ Confidentialité : Vos identifiants de sécurité sont stockés localement sur votre appareil. Aucune donnée ne transite par un serveur tiers.

🧼 Hygiène Intégrée : Un bouton dédié à l'Auto-Nettoyage (Clean) permet de sécher l'unité intérieure pour éviter les moisissures et les odeurs.

⏳ Minuteur Intelligent : Affiche des traits (--) quand il est au repos et un décompte précis dès qu'il est activé.

⚙️ Configuration Tuya Cloud (Pas à pas)
La connexion se fait via la plateforme officielle des développeurs Tuya pour garantir une compatibilité totale avec votre matériel.

1. Créer votre accès
Inscrivez-vous sur Tuya IoT Platform.

Allez dans Cloud > Development et créez un Cloud Project.

Important : Sélectionnez le centre de données "Western Europe" pour assurer la liaison avec votre compte français.

2. Lier votre Climatiseur
Dans votre projet, allez dans l'onglet Devices.

Cliquez sur Link Tuya App > Add App Account.

Scannez le QR Code avec votre application Smart Life ou Tuya (Menu Profil > Scan en haut à droite).

3. Récupérer les identifiants
Access ID : Disponible dans l'onglet Overview (Client ID).

Access Secret : Disponible dans l'onglet Overview (Client Secret).

Device ID : Disponible dans l'onglet Devices (ID de votre appareil).

🚀 Installation
Ouvrez l'URL de votre dépôt GitHub sur votre téléphone.

Sur iOS (Safari) : Bouton Partager > Sur l'écran d'accueil.

Sur Android (Chrome) : Menu 3 points > Installer l'application.

Lancez l'app et entrez vos codes dans la page de configuration.

🛠️ Structure du Projet
index.html : L'interface et la logique de l'application.

manifest.json : Configuration pour l'installation PWA.

sw.js : Gestionnaire de cache pour la fluidité.

icon.png : L'image de l'icône de l'application.

💡 Le saviez-vous ? La fonction "Usage Tot." affiche le temps cumulé de fonctionnement en heures pour vous aider à suivre votre utilisation.
