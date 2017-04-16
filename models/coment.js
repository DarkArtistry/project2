var mongoose = require('mongoose')

var comentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: [250, 'can\'t exceed 250 characters for comments']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Article',
    required: true
  }
})

var Coment = mongoose.model('Coment', comentSchema)

module.exports = Coment
