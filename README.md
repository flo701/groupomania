![Logo Groupomania](./front-end/src/assets/logo/icon-left-font-2.png)

- Projet 7 du parcours "Développeur Web" d'OpenClassrooms :
- "Créez un réseau social d'entreprise".
- Le projet consistait à construire un réseau social interne pour les employés de Groupomania, un groupe
spécialisé dans la grande distribution. Le but étant de faciliter les interactions entre collègues et leur permettre de se connaître dans un cadre plus informel. 
- Technologies utilisées : Back : Node.js, Express.js, MySQL. Front : React, Sass.

## Résumé de la mission 
- Nous devions produire une toute première version du projet, respecter l'identité graphique fournie dans le brief et produire quelque chose de responsive qui s'adapte aux desktop, tablette et mobile.
- Pour ce nouveau projet, nous partions vraiment de zéro, nous devions donc mettre en place le backend, le frontend et la base de données.
- Le projet devait être codé en JavaScript et respecter les standards WCAG.
- Il était obligatoire d’utiliser un framework front-end JavaScript. (React était conseillé, mais nous avions la possibilité de choisir un autre framwork).
- Pour la base de données, nous pouvions utiliser les outils de notre choix. Soit une base de données non relationnelle, comme MongoDB par exemple, soit une base de données relationnelle.
- Nous devions fournir un README avec le code, expliquant comment installer le site sur un nouveau poste.

## Cahier des charges 
### Spécifications fonctionnelles : 
- Page de connexion : Une page de connexion permettant à l’utilisateur de se connecter, ou bien
de créer un compte s’il n’en possède pas. Ici il faut demander le minimum d’informations, la connexion doit se faire à partir de deux éléments : le mail de l’employé, et un mot de passe. Rien de plus à prévoir pour le moment.
- Détails de la fonctionnalité de connexion : Un utilisateur doit avoir la possibilité de se déconnecter.
La session de l’utilisateur persiste pendant qu’il est connecté. Les données de connexion doivent être sécurisées.
- Page d’accueil : La page d’accueil doit lister les posts créés par les différents utilisateurs.
On voudra que les posts soient listés de façon antéchronologique (du plus récent au plus ancien).
- Création d’un post : Un utilisateur doit pouvoir créer un post. Un post doit pouvoir contenir du texte et une image. Un utilisateur doit aussi pouvoir modifier et supprimer ses posts.
- Système de like : Un utilisateur doit pouvoir liker un post, une seule fois pour chaque post.
- Rôle administrateur : Dans le but de pouvoir faire de la modération si nécessaire, il faudra créer
un utilisateur “administrateur” ; celui-ci aura les droits de modification/suppression sur tous les posts du réseau social. Il faudra donc nous communiquer les identifiants de cet administrateur.

### Identité graphique :
- Police d’écriture : tous les textes du site doivent utiliser la police Lato.
- Couleurs : vous êtes libre sur les couleurs, mais voici notre palette actuelle dont vous pouvez vous inspirer :
- Primaire : #FD2D01
● Secondaire : #FFD7D7
● Tertiaire : #4E5166


## Lancer le projet 
- Node.js et npm devront être installés localement sur votre machine.
- Créez un dossier vide et clonez ce repository à l'intérieur en tapant : 
- `git clone https://github.com/flo701/groupomania.git`.

### Créer la base de données groupomania :
- Ouvrez le fichier `db-config.sql` situé dans le back-end, et suivez les indications pour créer votre base de données Groupomania.

### Démarrer le back-end : 
- Renommez le fichier `.env.example` en `.env`. Et renseignez `DB_USER` avec votre nom d'utilisateur pour votre base de données et `DB_PASSWORD` avec votre mot de passe pour votre base de données.
- Assignez une variable de votre choix à `RANDOM_TOKEN_SECRET`.
- Ouvrez un terminal, positionnez-vous dans le dossier back-end (avec la commande `cd groupomania/back-end`) et tapez `npm install` puis `npm start`.
- Vous devriez voir le message suivant dans votre terminal : `Listening on port 3000` `Connexion à mySQL réussie !`.

### Démarrer le front-end :
- Renommez le fichier `.env.example` du front-end en `.env.local`. 
Et assignez la même variable que vous avez choisie pour `RANDOM_TOKEN_SECRET` du back-end à `REACT_APP_RANDOM_TOKEN_SECRET`.
- Ouvrez un autre terminal, positionnez-vous dans le dossier front-end (avec la commande `cd groupomania/front-end`) et tapez `npm install` puis `npm start`.
- Dans votre navigateur, vous devriez voir la page de connexion de groupomania sur le port 3001.
- Si le port 3001 est occupé, le terminal vous proposera de lancer l'application sur un autre port, validez en tapant "y".






