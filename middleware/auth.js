const User = require('../database/models/User')

module.exports = (req, res, next) => {

    // Fetch User from DB
    User.findById(req.session.userId, (error, user) => {
        if(error || !user) {
           return res.redirect('/')
        } 



        next()
    })
    //Verify User

    //If User is valid, permit request

    //Else redirect

}