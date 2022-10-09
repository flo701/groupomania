// On importe express :
const express = require('express')

// Nous créons un routeur Express.
// Plutôt que d'enregistrer nos routes directement dans notre application,
// nous allons les enregistrer dans notre routeur Express,
// puis enregistrer celui-ci dans l'application :
const router = express.Router()

// On importe le middleware auth que l'on va appliquer à toutes nos routes "posts" qui doivent être protégées :
const auth = require('../middlewares/auth')

// On importe le middleware multer
// que l'on va appliquer à nos requêtes POST et PUT où le traitement de fichiers est nécessaire :
const multer = require('../middlewares/multer')

// On importe le contrôleur post :
const postCtrl = require('../controllers/post.controller')

// ----------------------------------------------------------------------------------------------------------------
// On enregistre les différentes fonctions "post"
// (nous avons ici le segment final de l'adresse de la route, le reste est déclaré dans app.js) :
router.get('/', auth, postCtrl.getAllPosts)
router.get('/:userId', auth, postCtrl.getUserAllPosts)
router.post('/', auth, multer, postCtrl.createPost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, postCtrl.deletePost)
router.post('/:id/like', auth, postCtrl.likePost)
router.get('/:id/like/count', auth, postCtrl.countLikes)
router.get('/verifyPostsLiked/:userId', auth, postCtrl.verifyPostsLiked)

// ----------------------------------------------------------------------------------------------------------------
// On exporte notre routeur pour pouvoir l'utiliser depuis app.js :
module.exports = router
