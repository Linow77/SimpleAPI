// const http = require("http");
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: './config/.env' })

// Connect to database
connectDB()

//Routes
const tipsRoutes = require('./api/routes/tips')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.use('/tips', tipsRoutes)

//No route found
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server and exit process
  server.close(() => process.exit(1))
})
