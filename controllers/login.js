//getting admin loginpage

var express= require('express')
var router = express.Router()

//setup user

var User = require('../models/user')

//route for loginpage

router.get('/', function(req, res) {
  res.send('homepage')
})

module.exports = router
