const Recipe = require('../database/models/Recipe')

module.exports = (req, res) => {

    Recipe.findOneAndDelete(req.params.id, (error) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect(`/user/recipes/${req.session.userId}`)
        }
    })
}