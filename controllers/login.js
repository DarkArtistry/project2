//getting admin loginpage

var express= require('express')
var router = express.Router()

//setup user

var User = require('../models/user')

//route for loginpage

router.get('/login', function(req, res) {
  res.render('login')
})

module.exports = router
