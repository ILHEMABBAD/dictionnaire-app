HEAD
# dictionnaire-app



dictionnaire-app


📌 Description

Ce projet est une application web permettant de consulter, ajouter et modifier un dictionnaire au format XML. Il est composé de deux parties :

    Backend en Node.js / Express qui gère les requêtes et le fichier XML.
    Frontend en React qui affiche et permet d interagir avec les entrées du dictionnaire.


🔧 Utilisation
1️⃣ Consulter les mots

📌 utilisez la barre de recherche pour filtrer les mots.
2️⃣ Ajouter un mot

    Remplissez les champs Phonétique, Orthographe et Définition.
    Cliquez sur "Ajouter".

3️⃣ supprimer un mot

    Cliquez sur le bouton "supprimer" à côté d un mot.
    Le mot sera supprimé, vous pourrez alors le réajouter avec les modifications souhaitées.

🌐 Endpoints du Backend

📌 Voici les routes de l API que vous pouvez tester avec Postman ou un autre client HTTP :
Méthode	URL	Description
GET	/bdd	Récupère toutes les entrées
POST	/bddsave	Ajoute une nouvelle entrée
DELETE /bdddelete → Supprime une entrée existante
master
