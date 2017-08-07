const
  mongoose = require('mongoose'),

  commentSchema = new mongoose.Schema({
    userId: {type: String, require: true},
    cheeseId: {type: String, require: true},
    body: {type: String, require: true},
    wine: {type: String, require: true},
    price: {type: String, require: true}
  })

  const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
