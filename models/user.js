var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'first name is required to be filled'],
    minlength: [2, 'first name must be at least 2 characters']
  },
  lastname: {
    type: String,
    required: [true, 'last name is required to be filled'],
    minlength: [2, 'last name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'email is required to be filled'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Entered invalid email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required to be filled'],
    minlength: [8, 'password must be at least 8 characters']
  },
  birthday: {
    type: Number,
    required: true
  },
  birthmonth: {
    type: Number,
    required: true
  },
  birthyear: {
    type: Number,
    required: true
  },
  sex: {
    type: Number,
    required: true
  },
  isadmin: {
    type: Boolean,
    default: false,
    required: true
  },
  articles: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Article'
  }],
  coments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Coment',
  }]
})

// hash middleware when creating user
var bcrypt = require('bcrypt')
userSchema.pre('save', function(next) {
  var user = this
  var hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
  next()
})

//give the model a instance method to check password when logging in
userSchema.methods.validPassword = function(givenPassword) {
  var hashedpassword = this.password
  return bcrypt.compareSync(givenPassword, hashedpassword)
}

userSchema.statics.findByEmail = function(givenEmail, next) {
  this.findOne({
    email: givenEmail
  }, function(err, foundUser) {
    if (err) return next(err)

    next(null, foundUser)
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User
