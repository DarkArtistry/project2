var express = require('express')
var router = express.Router()
// setup user
var User = require('../models/user')

var mongoose = require('mongoose')

router.route('/signup')
  .post(function (req, res) {
    console.log(req.body)
    User.create(req.body, function (err, data) {
      if (err) console.error(err)
      console.log(data)
    })
    res.send('signed up')
  })

module.exports = router
