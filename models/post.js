var mongoose = require('mongoose')

var articleSchema = mongoose.Schema({
  image: String,
  header: {
    type: String,
    required: true
  },
  isheadline: {
    type: Number,
    default: 1,
    required: true
  },
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
  },
  coments: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Coment'
  }]
})

var Article = mongoose.model('Article', articleSchema)

module.exports = Article
