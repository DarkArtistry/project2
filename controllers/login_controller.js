// getting admin loginpage

var express = require('express')
var router = express.Router()

// route for loginpage
function show (req, res) {
  res.render('login/login')
}

function logging (req, res) {
  res.render('index')
}

module.exports = {
  show: show,
  logging: logging
}
