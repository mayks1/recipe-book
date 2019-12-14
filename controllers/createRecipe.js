const path            = require('path')
const Recipe = require('../database/models/Recipe')

/* GET Create page. */

exports.create = (req, res) => {

   if(req.session.userId) {

      let recipeData = req.flash('recipeData')[0]

      if (!recipeData) recipeData = {}

      return res.render('create', {
         title: 'Създаване на рецепта',
         errors: req.flash('recipeErrors'),
         recipeData
      })
   }

   res.redirect('/auth/login')
   
}

// ========================================================================================

/* Recipe Create page. */

exports.save = (req, res) => {
   
   if (!req.files) { // Check if user pass a picture

      Recipe.create({
         ...req.body,
         image: '/recipes/recipe-default.jpg',
         author: req.session.userId
      }, (error) => {

         if (error) {
            const recipeErrors = Object.keys(error.errors).map(key => error.errors[key].message) 
            req.flash('recipeErrors', recipeErrors)
            req.flash('recipeData', req.body)
            return res.redirect('/blog/recipe/create')
         }

         res.redirect(`/user/recipes/${req.session.userId}`)
      })

   } else {

      const { image } = req.files
   
      image.mv(path.resolve('public/recipes', image.name), (error) => {
   
         if (error) {
            // res.send(error)
            console.log(error)
         } else {
   
            Recipe.create({
               ...req.body,
               image: `/recipes/${image.name}`,
               author: req.session.userId
            },
            (error) => {
               if (error) {
                  const recipeErrors = Object.keys(error.errors).map(key => error.errors[key].message) 
                  req.flash('recipeErrors', recipeErrors)
                  req.flash('recipeData', req.body)
                  return res.redirect('/blog/recipe/create')
            }
            res.redirect(`/user/recipes/${req.session.userId}`)
            })
         }
      
      })

   }
   
}