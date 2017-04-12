var mongoose = require('mongoose')

var postSchema = mongoose.Schema({
  image: String,
  title: {
    type: String,
    required: true,
  },
  isheadline: {
    type: Boolean,
    default: false,
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
    required: true,
  }
})

var Post = mongoose.model('Post', postSchema)

module.exports = Post
