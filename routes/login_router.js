var express = require('express')
var router = express()
// connect to login controller
var login = require('../controllers/login_controller')

router.route('/')
  .get(function (req, res) {
    res.render('index')
  })

router.route('/login')
  .get(login.show)
  .post(login.logging)

module.exports = router
