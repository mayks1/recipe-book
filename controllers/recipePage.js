const Recipe = require('../database/models/Recipe')

/* GET Recipe Single page. */

module.exports = async (req, res) => {

    const recipe = await Recipe.findById(req.params.id).populate('author')
   
    res.render('recipe', { title: recipe.title, recipe })
 

}