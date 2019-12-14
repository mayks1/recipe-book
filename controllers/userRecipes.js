const Recipe = require('../database/models/Recipe')


module.exports = (req, res) => {

    Recipe.find({author: req.params.id}).
    populate('author').
    exec((error, recipes) => {
            if (error) {    
                console.log(error)
            } else {
                recipes.sort((a, b) => b.createdDate - a.createdDate)
                res.render('recipes-user', {title: 'Вашите рецепти', recipes})
            }
        })
        
}