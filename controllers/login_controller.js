// getting admin loginpage

var express = require('express')
var router = express.Router()

// route for loginpage
router.route('/login')
  .get(function (req, res) {
    res.render('login/login')
  }).post(function(req, res){
    res.send('logged in!')
  })

module.exports = router
