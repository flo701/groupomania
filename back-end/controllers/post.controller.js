const jwt = require('jsonwebtoken')
// Le package fs (file system) nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers,
// y compris aux fonctions permettant de supprimer les fichiers :
const fs = require('fs')

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'groupomania',
})

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
  let post

  if (req.file) {
    post = {
      ...postBody,
      user_id: req.auth.userId,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }
  } else {
    post = {
      ...postBody,
      user_id: req.auth.userId,
    }
  }

  connection.query('INSERT INTO post SET ?', post, function (err, result) {
    if (err) {
      res.status(400).json({ err })
      throw err
    }
    const newPost = { post, result }
    res.status(201).json(newPost)
  })
}

// --------------------------------------------------------------------------------------------------------------
// Modifier un post :
exports.modifyPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)

  connection.query(
    `SELECT * FROM post WHERE id=${req.params.id}`,
    function (err, result) {
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

          // On supprime l'ancienne image de la base de données.
          // Nous utilisons le fait de savoir que notre URL d'image contient un segment /images/
          // pour séparer le nom de fichier.
          // Nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier,
          // en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé :
          if (result[0].image != null) {
            const filename = result[0].image.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {})
          }

          connection.query(
            `UPDATE post SET title="${post.title}" , description="${post.description}", image="${post.image}"  WHERE id= ${req.params.id} `,
            function (err, result) {
              if (err) {
                res.status(400).json({ err })
                throw err
              } else {
                res.status(201).json(post)
              }
            }
          )
        } else {
          delete req.auth.userId
          let post = req.body

          connection.query(
            `UPDATE post SET title="${post.title}", description="${post.description}"  WHERE id= ${req.params.id} `,
            function (err, result) {
              if (err) {
                res.status(400).json({ err })
                throw err
              }
              res.status(201).json(post)
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
        if (
          result[0].user_id != req.auth.userId &&
          decodedToken.status != 'ADMIN'
        ) {
          res.status(403).json({ message: 'Requête non autorisée' })
        } else {
          if (result[0].image) {
            // S'il y a une image, on la supprime du dossier images :
            const filename = result[0].image.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {})
          }
          connection.query(
            `DELETE FROM post WHERE id=${req.params.id}`,
            function (err, result) {
              if (err) {
                throw err
              } else {
                return res.status(200).json('Post supprimé')
              }
            }
          )
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

  connection.query(
    `SELECT * FROM likes WHERE likes.user_id = ${userId} AND likes.post_id = ${postId}`,
    function (err, result) {
      if (err) {
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

// ----------------------------------------------------------------------------------------------------------
// Compter les likes d'un post, et mettre le résultat dans la table post :
exports.countLikes = (req, res) => {
  let postId = req.params.id

  connection.query(
    `SELECT COUNT(*) AS total FROM likes WHERE post_id=${postId}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ err })
        throw err
      } else {
        const postLikes = result[0].total

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

// -------------------------------------------------------------------------------------------------------------
// Vérifier les posts likés par l'utilisateur :
exports.verifyPostsLiked = (req, res, next) => {
  connection.query(
    `SELECT post_id FROM likes WHERE user_id = ${req.auth.userId}`,
    function (err, result) {
      if (err) {
        throw err
      } else {
        return res.status(200).json(result)
      }
    }
  )
}
