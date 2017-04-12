var mongoose = require('mongoose')

var comentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

var Coment = mongoose.model('Coment', comentSchema)

module.exports = Coment
