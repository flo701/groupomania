// On importe express :
const express = require('express')

// On crée un routeur Express :
const router = express.Router()

// On importe le middleware password :
const password = require('../middlewares/password')

// On importe le middleware email :
const email = require('../middlewares/email')

// On importe le middleware auth que l'on va appliquer à toutes nos routes "posts" qui doivent être protégées :
const auth = require('../middlewares/auth')

// On importe le middleware multer
// que l'on va appliquer à nos requêtes POST et PUT où le traitement de fichiers est nécessaire :
const multer = require('../middlewares/multer')

// On importe le contrôleur user pour associer les fonctions aux différentes routes :
const userCtrl = require('../controllers/user.controller')
const { route } = require('../app')

// Les routes fournies sont celles prévues par l'application front-end.
// Le segment de route indiqué ici est uniquement le segment final,
// car le reste de l'adresse de la route est déclaré dans notre application Express :
router.post('/signup', email, password, userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/getOneUser/:userId', auth, userCtrl.getOneUser)
router.put('/accountActivation/:userId', auth, userCtrl.accountActivation)
router.put('/profile-image', auth, multer, userCtrl.updateProfileImage)
router.put('/profile-infos', auth, userCtrl.updateProfileInfos)
router.get('/logout', userCtrl.logout)
// router.delete('/delete', auth, multer, userCtrl.deleteUser)

module.exports = router
