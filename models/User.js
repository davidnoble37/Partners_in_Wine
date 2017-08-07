const
  mongoose = require('mongoose'),
  bcypt = require('bcrypt-nodejs'),

  userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, select: false},
    // with {select: false} option set, passwords will not be included
    // in find queries by default:
    zipcode:{type: String, require: true},
    favoriteWines: [],
    favoriteCheeses: []
  })

// this will be used whenever users are saved, to encrypt passwords:
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

// compares a provided password (from a form, for example)
// to the encrypted password stored in the database.
// returns a boolean true/false for: did they enter the right password?
userSchema.methods.validPassword = function(password) {
  if(!password) return false
  return bcrypt.compareSync(password, this.password)
}

// before saving a user (during create or update)
// if a new password is being used, encrypt it before saving:
userSchema.pre('save', function(next) {
  if(!this.isModified('password')) return next()
  this.password = this.generateHash(this.password)
  next()
})

module.exports = mongoose.model('User', userSchema)
