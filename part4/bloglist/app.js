const config = require('./utils/config')
const express = require('express')
/* 
With express-async-errors -library we can eliminate the try-catch blocks completely in router.
If an exception occurs in an async route, the execution is automatically passed to the error handling middleware.
*/
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'test') {
  console.log('TESTING MODE')
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use('/api/login', loginRouter)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.userExtractor, blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app