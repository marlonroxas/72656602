const express = require('express')

// API
const {callApi} = require('../libraries/Api')
const {HTTP_200} = require('../libraries/HttpCode')
const {AuthenticationEndpoint} = require('../endpoints/apis')

// Libraries
const multer = require('../libraries/Multer')

// Library Configurations
const router = express.Router()
const noUploadForm = multer.multerFields()

// Route Middlewares
router.use(noUploadForm)

router.post('/', async(req, res, next) => {
  try {
    const body = {
      username: req.body.username,
      password: req.body.password,
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      grant_type: 'password'
    }

    const results = await callApi({
      method: 'POST',
      url: AuthenticationEndpoint.Login.Post,
      body: body,
      json: true
    })
  
    if (results.statusCode === HTTP_200) {
      req.session.token = results.data.token
    }

    res.status(results.statusCode).json(results)
  } catch (e) {
    let err = new Error(e)
    err.status = 500
    next(err)
  }
})

module.exports = router
