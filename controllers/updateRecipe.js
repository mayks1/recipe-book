const path            = require('path')
const Recipe = require('../database/models/Recipe')

exports.display = async (req, res) => {

    if(req.session.userId) {
 
      const recipe = await Recipe.findById(req.params.id).populate('author')
 
       return res.render('update', {
          title: 'Редактиране на рецепта',
          errors: req.flash('recipeErrors'),
          recipe
       })
    }
 
    res.redirect('/auth/login')
    
 }


 exports.update = (req, res) => {

   if (!req.files) {

      if(req.session.userId) {

         Recipe.findByIdAndUpdate(req.params.id, req.body, (err) => {
            if (err) {
               console.log(err)
               res.redirect(`/blog/recipe/${req.params.id}/update`)
            }
   
            res.redirect(`/blog/recipe/${req.params.id}`)
   
          })
   
          
      } else {
   
         res.redirect('/auth/login')
   
      }

   } else {
      

      if(req.session.userId) {
         const { image } = req.files

         image.mv(path.resolve('public/recipes', image.name), (error) => {

            if (error) {
               // res.send(error)
               console.log(error)
            } else {

               Recipe.findByIdAndUpdate(req.params.id,
                   {...req.body, 
                   image: `/recipes/${image.name}`,
                   author: req.session.userId
                  },
                  (err) => {
                  if (err) {
                     console.log(err)
                     res.redirect(`/blog/recipe/${req.params.id}/update`)
                  }
         
                  res.redirect(`/blog/recipe/${req.params.id}`)
         
                })

            }

         })

      } else {
   
         res.redirect('/auth/login')
   
      }

   }

   
}