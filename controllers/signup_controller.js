var express = require('express')
var router = express.Router()
// setup user
var User = require('../models/user')
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

function create (req, res) {
  var newuser = new User(req.body)
  console.log(newuser.password)
  bcrypt.hash(newuser.password, 10, function (err, hash) {
    if (err) console.error(err)
    console.log(hash)
    newuser.password = hash
    newuser.save(function (err, data) {
      if (err) console.error(err)
    })
    console.log(newuser.password)
  })
  res.render('index')
}

module.exports = {
  create: create
}
