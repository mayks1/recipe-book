const express = require('express')
const router = express.Router()

// Controllers ----------------------------------------->>
const homePageController    = require('./controllers/homePage')
const contactController     = require('./controllers/contactPage')
const recipeController      = require('./controllers/recipePage')
const createRecipeController = require('./controllers/createRecipe')
const UserController        = require('./controllers/createUser')
const loginController       = require('./controllers/login')
const loginUserController   = require('./controllers/loginUser')
const logoutUserController  = require('./controllers/logout')

// MiddleWare---------------------------------------------->>
const validateCreateRecipe = require('./middleware/createRecipe')
const auth                  = require('./middleware/auth')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

router.get('/', homePageController)
router.get('/auth/register', redirectIfAuthenticated, UserController.create)
router.post('/auth/register', redirectIfAuthenticated, UserController.save)
router.get('/auth/login', redirectIfAuthenticated, loginController)
router.post('/auth/login', redirectIfAuthenticated, loginUserController)
router.get('/auth/logout', auth, logoutUserController)
router.get('/contact', contactController)
router.get('/blog/recipe/create', auth, createRecipeController.create)
router.post('/blog/recipe/create', auth, validateCreateRecipe, createRecipeController.save)
router.get('/blog/recipe/:id', recipeController)

module.exports = router   