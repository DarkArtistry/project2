// express set-uo
var express = require('express')
var app = express()
var port = process.env.PORT || 4000

// // mongoose set-up
// var mongoose = require('mongoose')
// var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost/test'
// mongoose.connect(dbURI)

// check if our connection is okay
// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function () {
//   console.log('really connected')
// })

//set-up body-bodyparse
var bodyParser = require('body-parser')

//transform form data using req.body
app.use(bodyParser.urlencoded({
  extended:true
}))

//transform json data to req.body
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.render('')
})

// setup the ej template
app.set('view engine', 'ejs')

//setup method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

//require the controller later
var login = require('./controllers/login')
app.use(login)

//set up final error message to response
app.use(function(req, res) {
  res.send('Error Found!')
})

app.listen(port, function() {
  console.log('app is running on port : ' + port);
})
