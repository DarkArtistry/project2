const express = require('express')
const router = express.Router()

// connect to login controller
var signup = require('../controllers/signup_controller')

router.route('/')
  .get(function (req, res) {
    res.render('index')
  })

  router.route('/signup')
  .post(signup.create)

  module.exports = router
