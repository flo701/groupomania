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
router.get('/:id', auth, postCtrl.getOnePost)
router.post('/', auth, multer, postCtrl.createPost)
router.put('/:id', auth, multer, postCtrl.modifyPost)
router.delete('/:id', auth, postCtrl.deletePost)
router.post('/:id/like', auth, postCtrl.likePost)
router.get('/:id/like/count', auth, postCtrl.countLikes)

// ***********Vérifier si les posts sont likés par l'utilisateur connecté pour voir les coeurs rouges*************
// 1ère méthode utilisée depuis LikeCard du front,
// où on récupère un tableau avec user_id et post_id.
// Ca fonctionne, mais les requêtes partent 2 fois pour chaque post,
// et en plus à chaque rafraîchissement de la page :
// router.get('/verifyLikes/:postId', auth, postCtrl.verifyLikes)

// 2ème méthode utilisée depuis LikeCard du front,
// où on récupère les post_id likés par l'utilisateur. Ca fonctionne, mais mêmes soucis qu'au dessus :
// router.get('/verifyPostsLiked/:postId', auth, postCtrl.verifyPostsLiked)

// 3ème méthode utilisée depuis Post/index du front,
// où on récupère les post_id likés par l'utilisateur.
// Ca fonctionne, et ça permet de ne faire qu'une seule requête (mais quand même doublée).
// Dans le front, on passe le tableau avec les post_id à Card et LikeCard :
router.get('/verifyPostsLiked/:userId', auth, postCtrl.verifyPostsLiked)

// ----------------------------------------------------------------------------------------------------------------
// On exporte notre routeur pour pouvoir l'utiliser depuis app.js :
module.exports = router
