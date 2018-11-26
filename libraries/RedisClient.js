const redis = require('redis')
const Utilities = require('./Utilities')

const retryLifetime = 1000 * 60 * 60
const reconnectAfterTime = 100

class RedisClient {
  constructor() {
    this.connectToServer = this.connectToServer.bind(this)
  }

  connectToServer(options) {
    let redisOptions = Utilities.makeMutableCopyOf(options)

    // Set default values for Connection Settings
    // if (!('return_buffers' in redisOptions)) {
    //   redisOptions['return_buffers'] = true
    // }

    if (!('socket_keepalive' in redisOptions)) {
      redisOptions['socket_keepalive'] = true
    }

    if (!('enable_offline_queue' in redisOptions)) {
      redisOptions['enable_offline_queue'] = true
    }

    if (!('retry_unfulfilled_commands' in redisOptions)) {
      redisOptions['retry_unfulfilled_commands'] = true
    }

    if (!('retry_strategy' in redisOptions)) {
      redisOptions['retry_strategy'] = function(redisOptions) {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        if (redisOptions.error && redisOptions.error.code === 'ECONNREFUSED') {
          return new Error('The server refused the connection')
        }

        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        if (redisOptions.total_retry_time > retryLifetime) {
          return new Error('Retry time exhausted')
        }

        // End reconnecting with built in error
        if (redisOptions.attempt > 10) {
          return undefined
        }

        // reconnect after
        return reconnectAfterTime
      }
    }
    // if (typeof environment !== 'undefined') {
    //   if (environment === 'development') {
    //     console.log('REDIS CONNECTION PARAMETERS:', redisOptions)
    //   }
    // }

    var client = redis.createClient(redisOptions)

    client.on('error', error => {
      let errorMsg = `Redis Connection Error : ${error}`
      console.log(errorMsg)
      return new Error(errorMsg)
    })

    client.on('ready', () => {
      console.log('Redis Connection Success !!!')
    })

    return client
  }
}

module.exports = new RedisClient()
