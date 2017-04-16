module.exports = function (req, res, next) {
  // console.log(req.user)
  if (!req.user) {
    console.log('you are not logged in')
    // req.flash('error', 'You must be logged in to access that page')
    res.redirect('/login')
  } else {
    console.log('you are logged in')
    console.log(req)
    // res.render('homepage/homepage')
    next()
  }
}
