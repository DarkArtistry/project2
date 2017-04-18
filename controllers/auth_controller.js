var express = require('express')
var User = require('../models/user')
var passport = require('../config/ppconfig')
var Article = require('../models/post')
var Coment = require('../models/coment')
var multer = require('multer')
var upload = multer({
  dest: './uploads/'
})
var cloudinary = require('cloudinary')

// render homepage
function homepage (req, res, next) {
  console.log('in homepage function')
  // console.log(req)
  var todate = new Date()

  Article.find({}, function (err, data) {
    if (err) console.error(err)
  })
    .populate({
      path: 'coments',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .populate('user')
    .sort({
      date: 'desc'
    })
    .exec(function (err, allposts) {
      res.render('homepage/homepage', {
        isloggedin: (!(!req.user)),
        isadmin: req.user.isadmin,
        date: todate,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        articles: allposts
      })
    })
}

// route for loginpage
function logged (req, res) {
  if (req.isAuthenticated()) {
    // req.flash('error', 'You have logged in')
    console.log('in logged function im in')
    res.redirect('/')
  }
  console.log('in logged function going back to log in')
  res.render('login/login', {
    isloggedin: (!(!req.user))
  })
}

// function to log in
function loggingin (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res)
}

// function to logout
function loggingout (req, res) {
  req.logout()
  console.log('logged out')
  res.redirect('/')
}

// function to create user
function create (req, res, next) {
  User.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthday: req.body.birthday,
    birthmonth: req.body.birthmonth,
    birthyear: req.body.birthyear,
    sex: req.body.sex,
    isadmin: req.body.isadmin,
    post: req.body.post,
    coments: req.body.coments,
    password: req.body.password
  }, function (err, createdUser) {
    if (err) {
      // FLASH
      console.log('An error occurred: ' + err)
      res.redirect('/login')
    } else {
      // FLASH
      passport.authenticate('local', {
        successRedirect: '/'
      })(req, res)
    }
  })
}

// render user's profile page
function getprofile (req, res) {
  var todate = new Date()
  User.findById(req.user.id).populate('articles').exec(function (err, currentUser) {
    if (err) console.error(posts)

    res.render('profiles/profile', {
      isloggedin: (!(!req.user)),
      isadmin: req.user.isadmin,
      date: todate,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      profilepic: req.user.profilepics,
      articles: currentUser.articles.sort(function (a, b) {
        return b.date - a.date
      })
    })
  })
}

function newarticle (req, res) {
  var date = new Date()
  Article.create({
    image: req.body.image,
    header: req.body.header,
    isheadline: req.body.isheadline,
    content: req.body.content,
    user: req.user.id,
    date: date,
    isadmin: req.user.isadmin
  }, function (err, newpost) {
    if (err) {
      // FLASH
      // console.log('An error occurred: ' + err)
      res.redirect('/')
    } else {
      // FLASH
      req.user.articles.unshift(newpost)
      req.user.save()
      res.redirect('/profile')
      // console.log(newpost)
    }
  })
}

function deletearticle (req, res) {
  Article.findByIdAndRemove(req.params.id, function (err, targetarticle) {
    // if (err) console.error(err)
    res.redirect('/profile')
  })
}

function addcoment (req, res) {
  var date = new Date()
  Coment.create({
    content: req.body.content,
    date: date,
    user: req.user.id,
    post: req.params.id
  }, function (err, newcoment) {
    // if (err) console.error(err)
    req.user.coments.unshift(newcoment)
    req.user.save()

    Article.findById(req.params.id, function (err, targetposts) {
      if (err) console.error(err)
      targetposts.coments.unshift(newcoment)
      targetposts.save()
    })
    res.redirect('/')
  })
}

function findprofile (req, res) {
  var todate = new Date()
  User.findById(req.params.id).populate({
    path: 'articles',
    populate: {
      path: 'user',
      model: 'User'
    },
    populate: {
      path: 'coments',
      model: 'Coment',
      populate: {
        path: 'user',
        model: 'User'
      }
    }
  })
    .sort({
      date: 'desc'
    }).exec(function (err, targetuser) {
      if (err) console.error(err)
      // res.send(targetuser)
      res.render('profiles/reqprofile', {
        isloggedin: (!(!req.user)),
        isadmin: req.user.isadmin,
        date: todate,
        firstname: targetuser.firstname,
        lastname: targetuser.lastname,
        profilepic: targetuser.profilepics,
        articles: targetuser.articles.sort(function (a, b) {
          return b.date - a.date
        })
      })
    })
}

function editprofilepage (req, res) {
  var todate = new Date()
  res.render('profiles/editprofilepage', {
    isloggedin: (!(!req.user)),
    isadmin: req.user.isadmin,
    date: todate,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    password: req.user.password,
    userid: req.user.id
  })
}

function updateprofile (req, res) {
  if (req.body.firstname) {
    User.findByIdAndUpdate(req.user.id, {
      $set: {
        firstname: req.body.firstname
      }
    }, {
      new: true
    }, function (err, data) {
      if (err) console.error(err)
    })
  }

  if (req.body.lastname) {
    User.findByIdAndUpdate(req.user.id, {
      $set: {
        lastname: req.body.lastname
      }
    }, {
      new: true
    }, function (err, data) {
      if (err) console.error(err)
    })
  }

  if (req.body.email) {
    User.findByIdAndUpdate(req.user.id, {
      $set: {
        email: req.body.email
      }
    }, {
      new: true
    }, function (err, data) {
      if (err) console.error(err)
    })
  }

  if (req.body.authcode === 'kennethiscool') {
    User.findByIdAndUpdate(req.user.id, {
      $set: {
        isadmin: true
      }
    }, {
      new: true
    }, function (err, data) {
      if (err) console.error(err)
    })
  }

  if (req.body.passwordedit) {
    User.findById(req.user.id, function (err, targetuser) {
      targetuser.password = req.body.passwordedit
      targetuser.save()
    })
  }
  res.redirect('/editprofilepage')
}

function newprofilepic (req, res) {
  cloudinary.uploader.upload(req.file.path, function (result) {

    User.findByIdAndUpdate(req.user.id, {
      $set: {
        profilepics: result.url
      }
    }, function (err, data) {
      if (err) console.error(err)

      res.redirect('/profile')
    })
  })
}

module.exports = {
  logged: logged,
  loggingin: loggingin,
  homepage: homepage,
  loggingout: loggingout,
  create: create,
  getprofile: getprofile,
  newarticle: newarticle,
  deletearticle: deletearticle,
  addcoment: addcoment,
  findprofile: findprofile,
  editprofilepage: editprofilepage,
  updateprofile: updateprofile,
  newprofilepic: newprofilepic
}
