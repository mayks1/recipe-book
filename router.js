const express = require('express')
const router = express.Router()

// Controllers ----------------------------------------->>
const homePageController      = require('./controllers/homePage')
const contactController       = require('./controllers/contactPage')
const recipeController        = require('./controllers/recipePage')
const createRecipeController  = require('./controllers/createRecipe')
const UserController          = require('./controllers/createUser')
const loginController         = require('./controllers/login')
const loginUserController     = require('./controllers/loginUser')
const logoutUserController    = require('./controllers/logout')
const userRecipesController   = require('./controllers/userRecipes')
const deleteRecipeController  = require('./controllers/deleteRecipe')
const updateRecipeController  = require('./controllers/updateRecipe')

// MiddleWare---------------------------------------------->>
const validateCreateRecipe = require('./middleware/createRecipe')
const auth                  = require('./middleware/auth')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

router.get('/', homePageController)
router.get('/contact', contactController)

router.get('/auth/register', redirectIfAuthenticated, UserController.create)
router.post('/auth/register', redirectIfAuthenticated, UserController.save)
router.get('/auth/login', redirectIfAuthenticated, loginController)
router.post('/auth/login', redirectIfAuthenticated, loginUserController)
router.get('/auth/logout', auth, logoutUserController)

router.get('/blog/recipe/create', auth, createRecipeController.create)
router.post('/blog/recipe/create', auth, createRecipeController.save)
router.get('/blog/recipe/:id', recipeController)

router.post('/blog/recipe/:id/delete', auth, deleteRecipeController)
router.get('/blog/recipe/:id/update', auth, updateRecipeController.display)
router.post('/blog/recipe/:id/update', auth, updateRecipeController.update)


router.get('/user/recipes/:id', userRecipesController)

module.exports = router   