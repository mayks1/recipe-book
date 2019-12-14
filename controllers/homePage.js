const Recipe = require('../database/models/Recipe')

/* GET home page. */

module.exports = async (req, res) => {


    const recipes = await Recipe.find({}).populate('author')

    recipes.sort((a, b) => b.createdDate - a.createdDate)

    res.render('index', { 
        title: 'Стилен Блог за Рецепти',
        recipes,
    })

}
