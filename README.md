![This is an image](https://github.com/flo701/groupomania/blob/57ceac919cec4960c870de65bf1bbfeb720042cb/front-end/src/assets/logo/icon-left-font-2.png)

"Créez un réseau social d'entreprise".

[Projet 7](https://course.oc-static.com/projects/DWJ_FR_P7/DW+P7+28-09-2022+Sce%CC%81nario.pdf) de la formation "Développeur Web" d'OpenClassrooms.

Utilisation de MySQL, Express et React.

## Lancer le projet :
Node et "npm" devront être installés localement sur votre machine.

Créez un dossier vide et clonez ce repository à l'intérieur en tapant : 

"git clone https://github.com/flo701/groupomania.git".

### Créer la base de données groupomania :
Ouvrez le dossier db-config situé dans le dossier back-end, et suivez les indications pour créer votre base de données Groupomania.

### Démarrer le back-end :
Connectez votre serveur à votre base de données. 

Pour cela, renommez le fichier .env.example en .env. Et renseignez-y vos identifiants DB_USER et DB_PASSWORD :

DB_USER = "votre nom d'utilisateur pour votre base de données" 

DB_PASSWORD = "votre mot de passe pour votre base de données"

Assignez une variable de votre choix à :

RANDOM_TOKEN_SECRET = " "

Ouvrez un terminal, positionnez-vous dans le dossier back-end (avec la commande "cd groupomania/back-end") et tapez :

npm install, puis

npm start

Vous devriez voir le message suivant dans votre terminal : 

"Listening on port 3000

Connexion à mySQL réussie !"

### Démarrer le front-end :
Ouvrez un autre terminal, positionnez-vous dans le dossier front-end (avec la commande "cd groupomania/front-end") et tapez :

npm install, puis

npm start

Dans votre navigateur, vous devriez voir apparaître la page de connexion à groupomania (généralement sur le port 3001).




