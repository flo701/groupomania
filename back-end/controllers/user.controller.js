// On importe bcrypt qui permet de hacher les mots de passe :
const bcrypt = require('bcrypt')

// On importe le package jsonwebtoken qui va nous permettre de créer des tokens et de les vérifier :
const jwt = require('jsonwebtoken')

// On importe le package fs (file system) de Node.
const fs = require('fs')

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'groupomania',
})

// --------------------------------------------------------------------------------------------------------------
// Inscription de nos utilisateurs :
exports.signup = (req, res) => {
  console.log('je suis dans le back-end à la fonction signup')

  let userBody = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  }
  let user = {
    ...userBody,
  }

  console.log(
    'Utilisateur avant le cyptage du mot de passe : ' + JSON.stringify(user)
  )

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      let userBody = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hash,
      }

      let user = {
        ...userBody,
      }

      console.log(
        'Utilisateur après le cyptage du mot de passe : ' + JSON.stringify(user)
      )

      // On enregistre cet utilisateur dans la base de données :
      connection.query(
        'INSERT INTO user SET ?',
        user,
        (error, results, fields) => {
          if (error) {
            console.log(
              "Echec de l'enregistrement dans la base de données : " + error
            )
            res.json({ error })
          } else {
            res.status(201).json({ message: 'Utilisateur enregistré' })
          }
        }
      )
    })
    .catch((error) => {
      res.status(500).json({ error })
      console.log('Echec de signup :' + error)
    })
}

// ---------------------------------------------------------------------------------------------------------------
// Connexion de nos utilisateurs :
exports.login = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  connection.query(
    'SELECT * FROM user WHERE email = ?',
    email,
    (error, results, fields) => {
      if (error) {
        console.log('Erreur lors de la recherche du user : ' + error)
        res.json({ error })
      } else {
        console.log(
          'Résultats de la recherche du user : ' + JSON.stringify(results)
        )
        console.log('Email : ' + email)
        console.log('Mot de passe : ' + password)
        if (results == 0) {
          return res
            .status(401)
            .json({ error: 'Email non enregistré dans la base de données' })
        } else {
          console.log('Mot de passe crypté : ' + results[0].password)
          bcrypt
            .compare(password, results[0].password)
            .then((valid) => {
              if (!valid) {
                return res.status(401).json({ error: 'Mot de passe erroné' })
              } else {
                res.status(200).json({
                  token: jwt.sign(
                    {
                      userId: results[0].id,
                      lastname: results[0].lastname,
                      firstname: results[0].firstname,
                      email: results[0].email,
                      password: results[0].password,
                      profileImage: results[0].profileImage,
                      creationDate: results[0].creationDate,
                    },
                    process.env.RANDOM_TOKEN_SECRET,
                    {
                      expiresIn: '24h',
                    }
                  ),
                })
              }
            })
            .catch((error) => {
              res.status(500).json({ error })
            })
        }
      }
    }
  )
}

// ------------------------------------------------------------------------------------------------------------
// Ajouter ou modifier la photo de profil :
exports.updateProfileImage = (req, res) => {
  console.log('Je suis dans la fonction updateProfileImage du back-end')

  console.log(req.file)

  connection.query(
    `SELECT * FROM user WHERE id=${req.auth.userId}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        console.log('Result : ' + JSON.stringify(result))
        console.log('Result id : ' + result[0].id)
        console.log(
          'Result profileImage, donc ancienne image : ' + result[0].profileImage
        )

        if (result[0].id != req.auth.userId) {
          res.status(403).json({ message: 'Requête non autorisée' })
        } else {
          if (result[0].profileImage != null) {
            const userProfileImage = {
              image: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
              }`,
            }

            console.log(userProfileImage)

            let userId = req.auth.userId

            let profileImage = `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`
            console.log('Nouvelle profileImage :' + profileImage)

            const filename = result[0].profileImage.split('/images/')[1]
            // Ancienne photo que l'on veut supprimer :
            console.log("Filename de l'ancienne photo : " + filename)
            fs.unlink(`images/${filename}`, () => {
              profileImage =
                ({ _id: req.params.id }, { ...result, _id: req.params })
            })

            connection.query(
              `UPDATE user SET profileImage="${profileImage}"  WHERE id= ${userId}`,
              (error, results, fields) => {
                if (error) {
                  console.log(
                    "Echec de l'enregistrement de la photo de profil : " + error
                  )
                  res.json({ error })
                } else {
                  res.status(201).json({ message: 'Photo de profil modifiée' })
                }
              }
            )
          } else {
            let userId = req.auth.userId

            let profileImage = `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`
            console.log('Nouvelle profileImage :' + profileImage)
            connection.query(
              `UPDATE user SET profileImage="${profileImage}" WHERE id= ${userId}`,
              (error, results, fields) => {
                if (error) {
                  console.log(
                    "Echec de l'enregistrement de la photo de profil : " + error
                  )
                  res.json({ error })
                } else {
                  res.status(201).json({ message: 'Photo de profil ajoutée' })
                }
              }
            )
          }
        }
      }
    }
  )
}

// -----------------------------------------------------------------------------------------------------------
// Modifier les infos du profil :
exports.updateProfileInfos = (req, res) => {
  console.log(req.auth.userId)
  connection.query(
    `SELECT * FROM user WHERE id=${req.auth.userId}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        let user = {
          email: req.body.email,
          password: req.body.password,
        }

        bcrypt.hash(req.body.password, 10).then((hash) => {
          user = {
            email: req.body.email,
            password: hash,
          }

          connection.query(
            `UPDATE user SET  email="${user.email}", password="${user.password}"  WHERE id= ${req.auth.userId} `,
            function (error, result) {
              if (error) {
                console.log('Echec de la modification du profil : ' + error)
                res.status(400).json({ error })
              } else {
                res.status(201).json({ message: 'Profil modifié' })
              }
            }
          )
        })
      }
    }
  )
}

// ---------------------------------------------------------------------------------------------------------------
// Déconnexion d'un utilisateur :
exports.logout = (req, res) => {
  res.clearCookie('token')
  res.status(200).json('Déconnecté')
}

// ---------------------------------------------------------------------------------------------------------------
// Désinscription d'un utilisateur :
exports.deleteUser = (req, res, next) => {
  console.log(req.auth.userId)
  connection.query(
    `SELECT * FROM user WHERE id=${req.auth.userId}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        console.log(result)
        if (result[0].profileImage) {
          // On supprime l'utilisateur de la base de données, mais aussi sa photo de profil :
          const filename = result[0].profileImage.split('/images/')[1]
          fs.unlink(`images/${filename}`, () => {
            connection.query(
              `DELETE FROM user WHERE id=${req.auth.userId}`,
              function (err, result) {
                if (err) {
                  throw err
                } else {
                  console.log(result)
                  return res.status(200).json('Utilisateur désinscrit')
                }
              }
            )
          })
        } else {
          connection.query(
            `DELETE FROM user WHERE id=${req.auth.userId}`,
            function (err, result) {
              if (err) {
                throw err
              } else {
                console.log(result)
                return res.status(200).json('Utilisateur désinscrit')
              }
            }
          )
        }
      }
    }
  )
}
