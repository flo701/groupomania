# groupomania
"Créez un réseau social d'entreprise".

Projet 7 de la formation "Développeur Web" d'OpenClassrooms :
https://openclassrooms.com/fr/paths/556/projects/677/assignment

Utilisation de MySQL, Express et React.

## Lancer le projet :
Node et "npm" devront être installés localement sur votre machine.
Créer un dossier vide et cloner ce repository à l'intérieur avec la commande "git clone".

### Back-end :
Dans le dossier back-end, ouvrir le fichier ".env.example", le renommer ".env" 
et assigner des valeurs aux 3 variables suivantes :
RANDOM_TOKEN_SECRET =
DB_USER = 
DB_PASSWORD = 

RANDOM_TOKEN_SECRET = variable de votre choix.
DB_USER = votre nom d'utilisateur pour votre base de données.
DB_PASSWORD = votre mot de passe pour votre base de données.

Ouvrir un terminal, se positionner dans le dossier back-end (avec la commande "cd back-end") et taper :
npm install
puis
node server
Vous devriez voir le message suivant dans votre terminal : 
Listening on port 3000
Connexion à mySQL réussie !

### Front-end :
Ouvrir un autre terminal, se positionner dans le dossier front-end (avec la commande "cd front-end") et taper :
npm install
puis 
npm start
Vous devriez voir le message suivant dans votre terminal : 
"Something is already running on port 3000.
Would you like to run the app on another port instead ?"
Taper "y". 
Dans votre navigateur, vous devriez voir apparaître la page d'accueil de groupomania (généralement sur le port 3001).




