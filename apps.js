// express set-uo
var express = require('express')
var app = express()
var port = process.env.PORT || 4000

// mongoose set-up
var mongoose = require('mongoose')
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost/project2'
mongoose.connect(dbURI)

// check if our connection is okay
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('really connected')
})

//set-up body-bodyparse
var bodyParser = require('body-parser')

//transform form data using req.body
app.use(bodyParser.urlencoded({
  extended:true
}))

//transform json data to req.body
app.use(bodyParser.json())
//

// setup the ej template
app.set('view engine', 'ejs')

// setting the layout structure
var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)

// app.get('/', function (req, res) {
//   res.render('')
// })

// this sets a static directory for the views
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

//setup method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

//connect to login controller
var login = require('./controllers/login_controller')
app.use(login)

//connect to login controller
var signup = require('./controllers/signup_controller')
app.use(signup)

//set up final error message to response
app.use(function(req, res) {
  res.send('Error Found!')
})

app.listen(port, function() {
  console.log('app is running on port : ' + port);
})
