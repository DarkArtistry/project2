var express = require('express')
var router = express.Router()
//npm install passport -- save
//npm install passport-local --save
var passport = require('../config/ppconfig')
var controller = require('../controllers/auth_controller')
//npm install multer --save
var multer = require('multer');
var upload = multer({ dest: './uploads/' })

//handle request to logout
router.route('/logout')
.get(function (req, res) {
  // console.log(req.session)
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

//handle user own's profile request
router.route('/profile')
.get(controller.getprofile)

router.route('/bookmark.json')
.put(controller.bookmarkJson)

// handle other users profile page
router.route('/profile/:id')
.get(controller.findprofile)

//handle create article request
router.route('/newarticle')
.post(controller.newarticle)

//handle delete request for article
router.route('/:id')
.delete(controller.deletearticle)

//handle comment request
router.route('/addcomment/:id')
.post(controller.addcoment)

//handle edit profile request
router.route('/editprofilepage')
.get(controller.editprofilepage)

//handle update profile request
router.route('/editprofile/:id')
.put(controller.updateprofile)

//handle request update profile picture
router.route('/newprofilepic')
.post(upload.single('profilepic'), controller.newprofilepic)

//handle request update profile banner
router.route('/newprofileban')
.post(upload.single('profileban'), controller.newprofileban)

module.exports = router
