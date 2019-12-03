const User = require('../database/models/User')

exports.create = (req, res) => {

    let data = req.flash('data')[0]

    if (!data) data = { username: '', email: '', password: '' }

    res.render('register', {
        title: 'Регистриране на потребител',
        errors: req.flash('registrationErrors'),
        data
    })


}

// -------------------------------------------------------------------------

exports.save = (req, res) => {

    User.create(req.body, (error, user) => {

        if (error) {

            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            
            req.flash('registrationErrors', registrationErrors)

            req.flash('data', req.body)

           return res.redirect('/auth/register')
        }

        res.redirect('/')

    })

}

