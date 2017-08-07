const
  mongoose = require('mongoose'),

  userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    favoriteWines: [],
    favoriteCheeses: []
  })

  const User = mongoose.model('User', userSchema)

module.exports = User
