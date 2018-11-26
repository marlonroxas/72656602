const session = require('express-session')
const uuid = require('uuid')

exports.redisSession = function(redisConnection) {
  if (typeof redisConnection === 'undefined') {
    return new Error('Redis connection undefined.')
  }

  let RedisStore = require('connect-redis')(session)

  return session({
    store: new RedisStore({
      client: redisConnection,
      host: process.env.REDIST_HOST,
      port: process.env.REDIST_PORT,
      pass: process.env.REDIST_PASSWORD,
      ttl: Number(process.env.SESSION_LIFETIME),
      logErrors: true
    }),
    genid(req) {
      return uuid.v4()
    },
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    unset: 'destroy',
    httpOnly: true,
    secure: true,
    maxAge: Number(process.env.SESSION_LIFETIME),
  })
}
