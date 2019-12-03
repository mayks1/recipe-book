const Recipe = require('../database/models/Recipe')

/* GET home page. */

module.exports = async (req, res) => {

    const recipes = await Recipe.find({}).populate('author')

    res.render('index', { title: 'Стилен Блог за Рецепти', recipes })

}

 