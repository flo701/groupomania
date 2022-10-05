const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'groupomania',
})

const fs = require('fs')

const jwt = require('jsonwebtoken')

// ---------------------------------------------------------------------------------------------------------------
// Récupérer tous les posts de notre base de données :
exports.getAllPosts = (req, res, next) => {
  connection.query(
    'SELECT post.*, lastname, firstname, profileImage FROM post JOIN user ON user.id=post.user_id ORDER BY creationDate DESC',
    function (err, result) {
      if (err) {
        throw err
      } else {
        return res.status(200).json(result)
      }
    }
  )
}

// --------------------------------------------------------------------------------------------------------------
// Récupérer un post :
exports.getOnePost = (req, res, next) => {
  connection.query(
    `SELECT * FROM post WHERE id=${req.params.id}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        return res.status(200).json(result)
      }
    }
  )
}

// --------------------------------------------------------------------------------------------------------------
// Récupérer tous les posts d'un utilisateur :
exports.getUserAllPosts = (req, res, next) => {
  connection.query(
    `SELECT * FROM post WHERE user_id=${req.auth.userId}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        return res.status(200).json(result)
      }
    }
  )
}

// ------------------------------------------------------------------------------------------------------------
// Créer un post (avec ou sans image) :
exports.createPost = (req, res, next) => {
  const postBody = {
    title: req.body.title,
    description: req.body.description,
  }

  if (req.file) {
    const post = {
      ...postBody,
      user_id: req.auth.userId,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      // image: `${req.file.filename}`,
    }
    console.log(post)

    connection.query(' INSERT INTO post SET ?', post, function (err, result) {
      if (err) {
        res.status(400).json({ err })
        throw err
      }
      res.status(201).json('Post créé et enregistré')
    })
  } else if (!req.file) {
    const post = {
      title: req.body.title,
      description: req.body.description,
      user_id: req.auth.userId,
    }

    console.log(post)

    connection.query('INSERT INTO post SET ?', post, function (err, result) {
      if (err) {
        res.status(400).json({ err })
        throw err
      }
      res.status(201).json('Post créé et enregistré')
    })
  }
}

// --------------------------------------------------------------------------------------------------------------
// Modifier un post :
exports.modifyPost = (req, res, next) => {
  console.log('Je suis dans la fonction modifyPost')

  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)

  connection.query(
    `SELECT * FROM post WHERE id=${req.params.id}`,
    function (err, result) {
      console.log(result[0].user_id)
      console.log(decodedToken.status)

      if (err) {
        throw err
      }
      if (
        result[0].user_id != req.auth.userId &&
        decodedToken.status != 'ADMIN'
      ) {
        res.status(403).json({ message: 'Requête non autorisée' })
      } else {
        if (req.file) {
          delete req.auth.userId

          console.log(req.body)
          console.log(req.file)

          let postBody = {
            title: req.body.title,
            description: req.body.description,
          }
          let post = {
            ...postBody,
            image: `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`,
          }
          console.log(post)

          // On supprime l'ancienne image de la base de données.
          // Nous utilisons le fait de savoir que notre URL d'image contient un segment /images/
          // pour séparer le nom de fichier.
          // Nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier,
          // en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé :
          if (result[0].image != null) {
            const filename = result[0].image.split('/images/')[1]
            console.log('Ancienne image :' + filename)
            fs.unlink(`images/${filename}`, () => {
              post = ({ _id: req.params.id }, { ...result, _id: req.params })
            })
          }

          console.log('Post modifié : ', post)

          connection.query(
            `UPDATE post SET title="${post.title}" , description="${post.description}", creationDate=CURRENT_TIMESTAMP, image="${post.image}"  WHERE id= ${req.params.id} `,
            function (err, result) {
              if (err) {
                res.status(400).json({ err })
                throw err
              } else {
                res.status(201).json('Post modifié :' + JSON.stringify(post))
              }
            }
          )
        } else {
          delete req.auth.userId

          let post = req.body
          console.log(post)

          connection.query(
            `UPDATE post SET title="${post.title}", description="${post.description}", creationDate=CURRENT_TIMESTAMP  WHERE id= ${req.params.id} `,
            function (err, result) {
              if (err) {
                res.status(400).json({ err })
                throw err
              }
              res.status(201).json('Post modifié : ' + JSON.stringify(post))
            }
          )
        }
      }
    }
  )
}

// -------------------------------------------------------------------------------------------------------------
// Supprimer un post :
exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)

  connection.query(
    `SELECT * FROM post WHERE id=${req.params.id}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        console.log(result[0].user_id)
        if (
          result[0].user_id != req.auth.userId &&
          decodedToken.status != 'ADMIN'
        ) {
          res.status(403).json({ message: 'Requête non autorisée' })
        } else {
          if (result[0].image) {
            // Sinon, on supprime l'objet de la base de données, mais aussi l'image :
            const filename = result[0].image.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
              connection.query(
                `DELETE FROM post WHERE id=${req.params.id}`,
                function (err, result) {
                  if (err) {
                    throw err
                  } else {
                    console.log(result)
                    return res.status(200).json('Post supprimé')
                  }
                }
              )
            })
          } else {
            connection.query(
              `DELETE FROM post WHERE id=${req.params.id}`,
              function (err, result) {
                if (err) {
                  throw err
                } else {
                  console.log(result)
                  return res.status(200).json('Post supprimé')
                }
              }
            )
          }
        }
      }
    }
  )
}

// --------------------------------------------------------------------------------------------------------------
// Liker un post :
exports.likePost = (req, res, next) => {
  let userId = req.auth.userId
  let postId = req.params.id
  console.log("Id de l'utilisateur : " + req.auth.userId)
  console.log('Id du post liké ou déliké : ' + req.params.id)

  connection.query(
    `SELECT * FROM likes WHERE likes.user_id = ${userId} AND likes.post_id = ${postId}`,
    function (err, result) {
      if (err) {
        console.log(err)
        res.status(404).json({ err })
        throw err
      } else {
        if (result.length === 0) {
          connection.query(
            `INSERT INTO likes (user_id, post_id) VALUES (${userId}, ${postId})`,
            function (err, result) {
              if (err) {
                res.status(400).json({ err })
                throw err
              }
              res.status(201).json('Post liké')
            }
          )
        } else {
          connection.query(
            `DELETE FROM likes WHERE likes.user_id = ${userId} AND likes.post_id = ${postId}`,
            function (err, result) {
              if (err) {
                res.status(400).json({ err })
                throw err
              }
              res.status(201).json('Like retiré')
            }
          )
        }
      }
    }
  )
}

// -------------------------------------------------------------------------------------------------------------
// Vérifier les posts likés par l'utilisateur :
exports.verifyLikes = (req, res, next) => {
  connection.query(
    `SELECT user_id, post_id FROM likes WHERE user_id = ${req.auth.userId} AND post_id=${req.params.postId}`,
    // `SELECT post_id FROM likes WHERE user_id = ${req.auth.userId}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        return res.status(200).json(result)
      }
    }
  )
}

// ----------------------------------------------------------------------------------------------------------
// Compter les likes d'un post, et mettre le résultat dans la table post :
exports.countLikes = (req, res) => {
  let postId = req.params.id
  console.log('Id du post en paramètre : ' + postId)

  connection.query(
    `SELECT COUNT(*) AS total FROM likes WHERE post_id=${postId}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ err })
        throw err
      } else {
        const postLikes = result[0].total
        console.log('Nombre de likes pour ce post : ' + postLikes)

        connection.query(
          `UPDATE post SET postLikes=(${postLikes}) WHERE id=${postId}`,
          (err, result) => {
            if (err) {
              res.status(400).json({ err })
              throw err
            }
            res.status(200).json(postLikes)
          }
        )
      }
    }
  )
}
