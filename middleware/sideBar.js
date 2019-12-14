const Recipe = require('../database/models/Recipe')
const numberCategoryInList = require('../utils/functions')

module.exports = async (req, res, next) => {

    const categories = []
    const recipesCategory = []

    const recipes = await Recipe.find({}).populate('author')

    recipes.forEach((el) => {

        if ( categories.indexOf(el.category) === -1 ) categories.push(el.category)

        recipesCategory.push(el.category)
    })

    res.locals.categoryList = numberCategoryInList(recipesCategory, categories)

    //------ Find Last tree Recipes-------
    // res.locals.lastTreeRecipes = await Recipe.find({}).sort({createdDate: -1}).limit(3)
    res.locals.lastTreeRecipes = recipes.slice(-3)
    res.locals.lastTreeRecipes.sort((a, b) => b.createdDate - a.createdDate)
    next()
}