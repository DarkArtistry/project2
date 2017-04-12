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
  posts: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: false
  },
  coments: {
    type: mongoose.Schema.ObjectId,
    ref: 'Coment',
    required: false
  }
})

var User = mongoose.model('User', userSchema)

module.exports = User
