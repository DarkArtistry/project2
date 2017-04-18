// express set-uo
var express = require('express')
var app = express()

//run npm install dotenv --save
require('dotenv').config({
  silent: true
})
var port = process.env.PORT || 4000

// mongoose set-up
var mongoose = require('mongoose')
// REMEMBER to go heroku server settings to add keys and values
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost/project2'
mongoose.connect(dbURI)
mongoose.Promise = global.Promise

// check if our connection is okay
var db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // console.log('really connected')
})

// set-up body-bodyparse
var bodyParser = require('body-parser')

// transform form data using req.body
app.use(bodyParser.urlencoded({
  extended: true
}))

// transform json data to req.body
app.use(bodyParser.json())
//

// setting the layout structure
var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)

// setup the ej template
app.set('view engine', 'ejs')

// setup the session
// store the session into mongodb
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.PROD_MONGODB,
    mongooseConnection: mongoose.connection
  })
}))

// initialize our passport
var passport = require('./config/ppconfig')

// initialize the passport configuration and session as middleware
app.use(passport.initialize())
app.use(passport.session())

// this sets a static directory for the views
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  // res.locals.alerts = req.flash();
  res.locals.currentUser = req.user
  next()
})

// setup method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

//set up path to router
var authRouter = require('./routes/auth')
app.use('/', authRouter)

// set up final error message to response
app.use(function (req, res) {
  res.send('Error Found!')
})

// listen to port
app.listen(port, function () {
  console.log('app is running on port : ' + port)
})
