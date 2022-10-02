# groupomania
"Créez un réseau social d'entreprise".

Projet 7 de la formation "Développeur Web" d'OpenClassrooms :

https://course.oc-static.com/projects/DWJ_FR_P7/DW+P7+28-09-2022+Sce%CC%81nario.pdf

Utilisation de MySQL, Express et React.

## Lancer le projet :
Node et "npm" devront être installés localement sur votre machine.

Créer un dossier vide et cloner ce repository à l'intérieur en tapant : 

"git clone https://github.com/flo701/groupomania.git".

### Créer la base de données groupomania :
Ouvrir le dossier db-config/index.sql situé dans le back-end. 

Et suivre les indications pour créer votre propre base de données Groupomania.

### Démarrer le back-end :
Dans le dossier back-end, ouvrir le fichier ".env" 

(à l'origine fichier ".env.example" que vous avez renommé en ".env" lors de l'étape précédente),

et assigner une variable de votre choix à :

RANDOM_TOKEN_SECRET = " "

Ouvrir un terminal, se positionner dans le dossier back-end (avec la commande "cd groupomania/back-end") et taper :

npm install, puis

npm start

Vous devriez voir le message suivant dans votre terminal : 

"Listening on port 3000

Connexion à mySQL réussie !"

### Démarrer le front-end :
Ouvrir un autre terminal, se positionner dans le dossier front-end (avec la commande "cd groupomania/front-end") et taper :

npm install, puis

npm start

Vous devriez voir le message suivant dans votre terminal : 

"Something is already running on port 3000.

Would you like to run the app on another port instead ?"

Taper "y". 

Dans votre navigateur, vous devriez voir apparaître la page d'accueil de groupomania (généralement sur le port 3001).




