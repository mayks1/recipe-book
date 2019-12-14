module.exports = (req, res) => {
    res.render('login', {
        title: 'Вход',
        errors: req.flash('loginErrors')
    })
}