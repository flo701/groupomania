const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
  let userBody = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  }

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      userBody = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hash,
      }

      let user = {
        ...userBody,
      }

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
    })
}

// ---------------------------------------------------------------------------------------------------------------
// Connexion de nos utilisateurs :
exports.login = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  connection.query(
    'SELECT * FROM user WHERE email = ? AND active=1',
    email,
    (error, results, fields) => {
      if (error) {
        res.json({ error })
      } else {
        if (results == 0) {
          return res
            .status(401)
            .json({ error: 'Email non enregistré dans la base de données' })
        } else {
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
                      status: results[0].status,
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

// -----------------------------------------------------------------------------------------------------------
// Obtenir les infos d'un utilisateur :
exports.getOneUser = (req, res) => {
  connection.query(
    `SELECT * FROM user WHERE id=${req.params.userId}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        res.status(200).json(result)
      }
    }
  )
}

// ------------------------------------------------------------------------------------------------------------
// Désactiver ou réactiver le compte d'un utilisateur :
exports.accountActivation = (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)

  connection.query(
    `SELECT * FROM user WHERE id=${req.params.userId}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        if (decodedToken.status != 'ADMIN') {
          res.status(403).json({ message: 'Requête non autorisée' })
        } else {
          if (result[0].active == '1') {
            connection.query(
              `UPDATE user SET active='0' WHERE id=${req.params.userId}`,
              function (err, result) {
                if (err) {
                  throw err
                } else {
                  res.status(201).json({ message: 'Compte désactivé' })
                }
              }
            )
          } else if (result[0].active == '0') {
            connection.query(
              `UPDATE user SET active='1' WHERE id=${req.params.userId}`,
              function (err, result) {
                if (err) {
                  throw err
                } else {
                  res.status(201).json({ message: 'Compte réactivé' })
                }
              }
            )
          }
        }
      }
    }
  )
}

// ------------------------------------------------------------------------------------------------------------
// Ajouter ou modifier la photo de profil :
exports.updateProfileImage = (req, res) => {
  connection.query(
    `SELECT * FROM user WHERE id=${req.auth.userId}`,
    function (err, result) {
      let userId = req.auth.userId
      let profileImage = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`

      if (err) {
        throw err
      } else {
        if (result[0].id != req.auth.userId) {
          res.status(403).json({ message: 'Requête non autorisée' })
        } else {
          if (result[0].profileImage != null) {
            const filename = result[0].profileImage.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {})
          }
          connection.query(
            `UPDATE user SET profileImage="${profileImage}"  WHERE id= ${userId}`,
            (error, results, fields) => {
              if (error) {
                res.json({ error })
              } else {
                res.status(201).json({
                  message: 'Photo de profil modifiée',
                  profileImage: profileImage,
                })
              }
            }
          )
        }
      }
    }
  )
}

// -----------------------------------------------------------------------------------------------------------
// Modifier les infos du profil :
exports.updateProfileInfos = (req, res) => {
  connection.query(
    `SELECT * FROM user WHERE id=${req.auth.userId}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        let user = {
          password: req.body.password,
        }

        bcrypt.hash(req.body.password, 10).then((hash) => {
          user = {
            password: hash,
          }

          connection.query(
            `UPDATE user SET password="${user.password}"  WHERE id= ${req.auth.userId} `,
            function (error, result) {
              if (error) {
                res.status(400).json({ error })
              } else {
                res.status(201).json({ message: 'Mot de passe enregistré' })
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
