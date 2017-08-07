const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  dotenv = require('dotenv').load({silent: true}),
  logger = require('morgan'),
  mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/wine',
  port = process.env.PORT || 3001,
  User = require('./models/User.js'),
  Comment = require('./models/Comment.js')

mongoose.connect(mongoUrl, (err) => {
  console.log(err || "Connected to MongoDB.")
})

app.use(logger('dev'))
app.use(bodyParser.json())


// root route
app.get('/', (req, res) => {
  res.json({message: "this is the APIs root page"})
})

// ***USER ROUTES***

// index
app.get('/users', (req, res) => {
  User.find({}, function(err, allThemUsers){
    if(err) return console.log(err)
    res.send(allThemUsers)
  })
})

// create
app.post('/users', (req, res) => {
  User.create(req.body, function(err, newUser){
    if(err) return console.log(err)
    res.send(newUser)
  })
})

// show
app.get('/users/:id', (req, res) => {
  User.findById(req.params.id, function(err, user){
    if(err) return console.log(err)
    res.json(user)
  })
})

// update
app.patch('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedUser){
    if(err) return console.log(err)
    res.json({message: "User updated", user: updatedUser})
  })
})

// delete
app.delete('/users/:id', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, deletedUser){
    if(err) return console.log(err)
    res.json({message: "User deleted", deletedUser})
  })
})

// ***COMMENT ROUTES***

// index
app.get('/comments', (req, res) => {
  Comment.find({}, function(err, allComments){
    if(err) return console.log(err)
    res.send(allComments)
  })
})

// create
app.post('/comments', (req, res) => {
  Comment.create(req.body, function(err, newComment){
    if(err) return console.log(err)
    res.send(newComment)
  })
})

// show
app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id, function(err, comment){
    if(err) return console.log(err)
    res.json(comment)
  })
})

// update
app.patch('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedComment){
    if(err) return console.log(err)
    res.json({message: "Comment updated", comment: updatedComment})
  })
})

// delete
app.delete('/comments/:id', function(req, res){
  Comment.findByIdAndRemove(req.params.id, function(err, deletedComment){
    if(err) return console.log(err)
    res.json({message: "Comment deleted", deletedComment})
  })
})





app.listen(port, (err) => {
  console.log(err || `Server running on ${port}.`)
})
