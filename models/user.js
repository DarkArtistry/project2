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
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Entered invalid email']
  },
  password: {
    type: String,
    required: [true, 'password is required to be filled'],
    match: [/^([a-zA-Z0-9@*#]{8,15})$/, 'Password must consists of at least 8 characters and not more than 15 characters.']
  },
  authcode:{
    type: String,
    required: false,
    // match: 'asdf'
  }
})

var User = mongoose.model('Admin', userSchema)

module.exports = User
