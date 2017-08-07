const
  app = express(),
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  dotenv = require('dotenv').load({silent: true}),
  logger = require('morgan'),
  mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/wine',
  port = process.env.PORT || 3001,


mongoose.connect(mongoUrl, (err) => {
  console.log(err || "Connected to MongoDB.")
})

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.json({message: "API root."})
})

app.listen(port, (err) => {
  console.log(err || `Server running on ${port}.`)
})
