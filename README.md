📌 Description

Ce projet est une application web permettant de consulter, ajouter et modifier un dictionnaire au format XML. Il est composé de deux parties :

    Backend en Node.js / Express qui gère les requêtes et le fichier XML.
    Frontend en React qui affiche et permet d’interagir avec les entrées du dictionnaire.

🚀 Installation et Lancement du Projet
1️⃣ Prérequis

Avant de commencer, assurez-vous d'avoir :

    Node.js installé → Télécharger ici
    npm (installé avec Node.js)

2️⃣ Installation du Backend

📌 Ouvrez un terminal et exécutez les commandes suivantes :

cd backend  # Aller dans le dossier Backend
npm install # Installer les dépendances
node server.js # Lancer le serveur backend

3️⃣ Installation du Frontend

📌 Ouvrez un nouveau terminal et exécutez :

cd frontend # Aller dans le dossier Frontend
npm install # Installer les dépendances
npm start # Lancer le serveur frontend

🔧 Utilisation
1️⃣ Consulter les mots

📌 utilisez la barre de recherche pour filtrer les mots.
2️⃣ Ajouter un mot

    Remplissez les champs Phonétique, Orthographe et Définition.
    Cliquez sur "Ajouter".

3️⃣ Modifier un mot

    Cliquez sur le bouton "supprimer" à côté d’un mot.
    Le mot sera supprimé, vous pourrez alors le réajouter avec les modifications souhaitées.

🌐 Endpoints du Backend

📌 Voici les routes de l’API que vous pouvez tester avec Postman ou un autre client HTTP :
Méthode	URL	Description
GET	/bdd	Récupère toutes les entrées
POST	/bddsave	Ajoute une nouvelle entrée
DELETE /bdddelete → Supprime une entrée existante
