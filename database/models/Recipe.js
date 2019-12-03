const mongoose = require('mongoose')


const RecipeSchema = new mongoose.Schema({

    username: String,

    title: String,

    category: String,

    ingredients: String,

    content: String,

    author: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true
    },

    image: String,

    createdDate: {
        type: Date,
        default: new Date
    }

})

module.exports = mongoose.model('Recipe', RecipeSchema)