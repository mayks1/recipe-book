const bcrypt = require('bcryptjs')
const User = require('../database/models/User')

module.exports = (req, res) => {

    const { email, password } = req.body

    User.findOne({ email: email }, (error, user) => {

        if (user) {

            bcrypt.compare(password, user.password, (error, result) => {

                if (result) {

                    // store user session
                    req.session.userId = user._id

                    res.redirect('/')

                } else {
                    return res.redirect('/auth/login')
                }

            })

        } else {
            return res.redirect('/auth/login')
        }

    })
}