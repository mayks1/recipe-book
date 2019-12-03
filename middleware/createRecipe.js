module.exports = (req, res, next) => {
    if (!req.files || !req.body.username || !req.body.title || !req.body.category || !req.body.ingredients || !req.body.content) {
      return res.redirect('/blog/recipe/create')
    }
  
    next()
  }
