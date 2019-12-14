const mongoose = require('mongoose')


const RecipeSchema = new mongoose.Schema({

    // username: String,

    title: {
        type: String,
        required: [true, 'Моля въведете Заглавие!']

    },

    category: {
        type: String,
        required: [true, 'Моля изберете категория!']
    },

    ingredients: {
        type: String,
        required: [true, 'Моля въведете продукти']
    },

    content: {
        type: String,
        required: [true, 'Моля въведете начин на приготвяне']
    },

    author: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true
    },

    image: {
        type: String,
        required: [true, 'Моля, изберете снимка']
    },

    createdDate: {
        type: Date,
        default: new Date
    }

})

module.exports = mongoose.model('Recipe', RecipeSchema)