const bcrypt = require('bcryptjs')
const User = require('../database/models/User')

module.exports = (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {

        req.flash('loginErrors', 'Моля, въведете имейл и парола')

        return res.redirect('/auth/login')
    }

    User.findOne({ email: email }, (error, user) => {

        if (user) {

            bcrypt.compare(password, user.password, (error, result) => {

                if (result) {

                    // store user session
                    req.session.userId = user._id
                    req.session.username = user.username

                    res.redirect(`/user/recipes/${user._id}`)

                } else {
                    req.flash('loginErrors', 'Грешен имейл или парола!')
                    return res.redirect('/auth/login')
                }

            })

        } else {
            req.flash('loginErrors', 'Грешен имейл или парола!')
            return res.redirect('/auth/login')
        }

    })
}