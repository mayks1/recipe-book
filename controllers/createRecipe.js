const path            = require('path')
const Recipe = require('../database/models/Recipe')

/* GET Create page. */

exports.create = (req, res) => {

   if(req.session.userId) {
      return res.render('create', { title: 'Създаване на рецепта'})
   }

   res.redirect('/auth/login')
   
}


/* Post Create page. */

exports.save = (req, res) => {

   const { image } = req.files
   
   image.mv(path.resolve('public/recipes', image.name), (error) => {

      if (error) {
         res.send(error)
      } else {

         Recipe.create({

            ...req.body,

            image: `/recipes/${image.name}`,

            author: req.session.userId

         },
         (error, recipe) => {
            if (error) console.log(error)
            res.redirect('/')
         })

      }
   
   })
}