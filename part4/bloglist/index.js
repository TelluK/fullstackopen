const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app') 
const http = require('http')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})