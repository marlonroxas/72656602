require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const redisClient = require('./libraries/RedisClient')
const session = require('./libraries/Session').redisSession
const flash = require('express-flash')
const helmet = require('helmet')
const compress = require('compression')
const port = process.env.PORT

let app = express()

// Redis connection for SESSION Store
let redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
}
if (process.env.REDIS_PASSWORD) {
  Object.assign(redisConfig, {
    password: process.env.REDIS_PASSWORD
  })
}
app.redis = redisClient.connectToServer(redisConfig)

// Session Middleware
app.use(session(app.redis))
app.use(flash())

// Middleware
app.use(helmet())
app.use(compress())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// API calls
app.use('/api/login', require('./routes/Login'))
/**APP-ROUTE*/

// Production Rendering
if (process.env.NODE_ENV !== 'development') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`API is listening on port ${port}`));