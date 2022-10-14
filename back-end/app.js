// On importe express :
const express = require('express')

// On appelle la méthode express, ce qui permet de créer une application express :
const app = express()

// On importe dotenv pour pouvoir utiliser les variables d'environnement :
require('dotenv').config()

// On importe helmet qui aide à sécuriser les applications Express en définissant divers en-têtes HTTP :
const helmet = require('helmet')

// On importe express-rate-limit qui permer de limiter le nombre de requêtes que peut faire un client :
const rateLimit = require('express-rate-limit')

// On va appliquer la limite suivante aux routes "posts" :
const limiter1 = rateLimit({
  windowMs: 10 * 60 * 1000, // Equivalent de 10 minutes
  max: 200, // Le client pourra donc faire 200 requêtes toutes les 10 minutes
  message: 'Too many requests, please try again in 10 minutes.',
})

// On va appliquer la limite suivante aux routes "auth" :
const limiter2 = rateLimit({
  windowMs: 10 * 60 * 1000, // Equivalent de 10 minutes
  max: 200, // le client pourra faire 200 requêtes toutes les 10 minutes
  message: 'Too many requests, please try again in 10 minutes.',
})

// On importe le package mysql, qui est un système de gestion de base de données relationnelle open source:
const mysql = require('mysql')

// On renseigne les identifiants de connexion pour la base de données groupomania:
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'groupomania',
})

// On se connecte à la base de données :
connection.connect((err) => {
  if (err) {
    console.log('Echec de connexion à mySql : ' + err)
    throw err
  } else {
    console.log('Connexion à mySQL réussie !')
  }
})

// On importe nos routes post et user :
const postRoutes = require('./routes/post.routes')
const userRoutes = require('./routes/user.routes')

// On accède au path de notre serveur :
const path = require('path')

// Ce middleware va permettre d'extraire le corps JSON des requêtes POST et PUT venant du front-end :
app.use(express.json())

// On enregistre helmet en désactivant le middleware crossOriginResourcePolicy :
app.use(helmet({ crossOriginResourcePolicy: false }))

// Les headers suivants permettent :
//    - d'accéder à notre API depuis n'importe quelle origine ( '*' )
// (afin d'éviter les erreurs de CORS.
// Dans notre cas, nous avons deux origines : localhost:3000 et localhost:3001,
// et nous souhaitons qu'elles puissent communiquer entre elles) ;
//    - d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
//    - d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.) :
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

// On enregistre les routes post et user.
// Le 1er argument est l'URL demandée par l'application front-end,
// ce qu'on appelle le end-point ou la route sur notre API.
// L'URL est http://localhost:3000/api/posts ou http://localhost:3000/api/auth
// mais il ne nous faut ici que les extensions :
app.use('/api/posts', limiter1, postRoutes)
app.use('/api/auth', limiter2, userRoutes)

// Nous devons indiquer à notre app.js comment traiter les requêtes vers la route /images,
// en rendant notre dossier images statique.
// Cela indique à Express qu'il faut gérer la ressource images de manière statique
// (un sous-répertoire de notre répertoire de base, __dirname)
// à chaque fois qu'elle reçoit une requête vers la route /images :
app.use('/images', express.static(path.join(__dirname, 'images')))

// On exporte l'application express
// pour pouvoir y accéder depuis les autres fichiers de notre projet, notamment le serveur :
module.exports = app
