❄️ Contrôleur de Climatisation Tuya PWA
Cette application Web (Progressive Web App) permet de piloter votre climatiseur compatible Tuya / Smart Life via une interface moderne, légère et installable sur smartphone. Elle remplace l'application standard par une interface simplifiée, rapide et centrée sur vos besoins réels.

✨ Caractéristiques
Mode PWA : S'installe comme une application native sur iOS et Android (sans barre d'adresse) pour un accès plein écran.

Contrôle Essentiel : Allumage/Arrêt, réglage de la température et changement de mode.

Auto-Nettoyage (Clean) : Bouton dédié pour lancer le cycle de séchage de l'unité intérieure afin d'éliminer l'humidité et prévenir les mauvaises odeurs.

Statistiques d'Utilisation : Visualisation de l'usage total de l'appareil en heures.

Minuteur Intelligent : Affiche le décompte précis des minutes avant extinction. Pour plus de clarté, l'affichage montre des traits (--) lorsqu'aucune minuterie n'est active.

Sécurité & Confidentialité : Vos identifiants API (Access ID, Secret, Device ID) sont stockés uniquement dans le localStorage de votre propre navigateur. Aucune donnée ne transite par un serveur tiers.

⚙️ Guide de Configuration Détaillé (Tuya Cloud)
Pour que l'application puisse communiquer avec votre climatiseur, vous devez créer un accès développeur sur la plateforme Tuya.

1. Création du compte Développeur
Rendez-vous sur Tuya IoT Platform et créez un compte gratuit.

Dans la barre latérale gauche, allez dans Cloud puis cliquez sur Development.

2. Création du Projet Cloud
Cliquez sur Create Cloud Project.

Donnez-lui un nom (ex: "Ma Clim App").

Très Important : Dans le champ "Data Center", choisissez celui correspondant à votre zone géographique (ex: Western Europe Data Center pour l'Europe). Un mauvais choix entraînera une erreur de connexion (Error 1104).

Dans l'étape "Service API", les services nécessaires (IoT Core, Authorization, etc.) sont activés par défaut. Validez simplement.

3. Liaison avec votre application mobile (Smart Life/Tuya)
Dans votre projet sur ordinateur, allez sur l'onglet Devices.

Cliquez sur le sous-onglet Link Tuya App.

Cliquez sur Add App Account : un QR Code s'affiche à l'écran.

Ouvrez l'application Smart Life (ou Tuya) sur votre smartphone.

Allez dans votre profil (en bas à droite), puis appuyez sur l'icône de scan (en haut à droite).

Scannez le QR Code affiché sur votre PC et confirmez la liaison sur votre téléphone. Votre climatiseur apparaîtra alors dans la liste sur la plateforme.

4. Récupération des identifiants (Credentials)
Access ID & Secret : Allez dans l'onglet Overview de votre projet. Notez votre Access ID (Client ID) et votre Access Secret.

Device ID : Allez dans l'onglet Devices. Le Device ID est une suite de caractères unique affichée juste à côté du nom de votre climatiseur.

5. Installation et Connexion
Déposez les fichiers du projet (index.html, manifest.json, sw.js, icon.png) sur votre hébergement (ex: GitHub Pages).

Ouvrez l'URL sur votre téléphone et installez l'application via le menu "Sur l'écran d'accueil".

Lancez l'application, entrez vos trois codes (Access ID, Secret, Device ID) dans la page de configuration et validez.

🛠️ Structure technique
index.html : Contient l'interface utilisateur et la logique de communication API.

manifest.json : Définit les paramètres PWA (nom, couleurs, icônes).

sw.js : Service Worker gérant la mise en cache pour une ouverture instantanée.

icon.png : L'image utilisée pour l'icône de l'application sur votre bureau.

💡 Conseils d'utilisation
Affichage du minuteur : Ne soyez pas surpris de voir des traits (--). Ils indiquent que la fonction est prête. Les minutes ne défilent que si vous programmez une extinction automatique.

Auto-Nettoyage : Il est recommandé de lancer un "Clean" après une longue utilisation en mode froid pour sécher l'évaporateur et garder un air sain.
