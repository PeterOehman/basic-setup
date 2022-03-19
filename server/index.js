//path to route where our static files are and our html file
const path = require('path')
const express = require('express')
const app = express()
//this is logging middleware
const morgan = require('morgan')

//serving static assets
app.use(express.static(path.join(__dirname, '../public')))

//logging middleware
app.use(morgan('dev'))

//body parsing middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//api routes
app.use('/api', require('./api'))

//serving html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..public/index.html'))
})

//if anything gets this far something's gone wrong
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
