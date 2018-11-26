const {callApi} = require('../libraries/Api')
const {HTTP_401, HTTP_200} = require('./HttpCode')

// OAuth2 - Client Credentials Grant
exports.clientGrant = async (options = {}) => {
  // Set Core Oauth2
  // @TODO: Find a way to move setting of Oauth Credentials in the Oauth instantitation
  Object.assign(options, {
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    grant_type: 'client_credentials'
  })

  // API Call
  const oauth = await callApi({
    method: 'POST',
    url: process.env.API_URL + '/oauth/token',
    body: options,
    json: true
  })

  return oauth
}
exports.authorize = async (req, res, next) => {
    if (!('oauthClient' in req.session)) {
      let oauth = await module.exports.clientGrant({})
      console.log(oauth.data)
      if (oauth.statusCode === HTTP_200) {
        req.session.oauthClient = oauth.data
      }
      res.status(oauth.statusCode)
    }
  next()
}

exports.restrictAuth = async (req, res, next) => {
  if (!('me' in req.session && Object.keys(req.session.me).length > 0)) {
    res.status(HTTP_401).json({
      status: HTTP_401,
      message: 'Unauthorized'
    })
  }
  next()
}