var express = require('express')
var router = express.Router()
var passport = require('../config/ppconfig')
var controller = require('../controllers/auth_controller')

//handle request to logout
router.route('/logout')
.get(function (req, res) {
  console.log(req.session)
  req.logout()
  console.log('logged out')
  res.redirect('/login')
})

//handle request to login
router.route('/login')
.get(controller.logged)
.post(controller.loggingin)

//handle account creation request
router.route('/signup')
.post(controller.create)

// require the authorization middleware at the top of the page
var isLoggedIn = require('../middleware/isloggedin')

router.use(isLoggedIn)
// anything below here requires the user to be logged in

// handle request to sign in to home page
router.route('/')
.get(controller.homepage)
.post(controller.homepage)

//handle profile request
router.route('/profile')
.get(controller.getprofile)

router.route('/newarticle')
.post(controller.newarticle)

router.route('/:id')
.delete(controller.deletearticle)

module.exports = router
