var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

// set the authenticated user data into session
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

/*
 * Passport "deserializes" objects by taking the user's serialization (id)
 * and looking it up in the database
 */
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

// passport local-signup strategy
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
  // passReqToCallback: false,
}, function (givenemail, password, next) {
  User.findOne({
    email: givenemail
  }, function (err, data) {
    console.log(givenemail)
    console.log(data)
    console.log('there is an error')
    if (err) {
      console.error(err)
      return next(err)
    }

    // If no user is found
    if (!data) {
      // console.log(data)
      console.log('cant find data')
      return next(null, false)
    }

    // Check if the password is correct
    if (!data.validPassword(password)) {
      console.log('no valid password')
      return next(null, false)
    }

    return next(null, data)
  })
}))

module.exports = passport
