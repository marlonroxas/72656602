const express = require('express')

// API
const {callApi} = require('../libraries/Api')
const {CompanyEndpoint} = require('../endpoints/sitelab')

// Libraries
const multer = require('../libraries/Multer')
const util = require('util')

// Library Configurations
const router = express.Router()
const noUploadForm = multer.multerFields()

// Route Middlewares
router.use(noUploadForm)

// Get
router.get('/:id', async(req, res, next) => {
  try {
    // Query Strings
    const qs = {}

    // API Call
    const results = await callApi({
      method: 'GET',
      url: util.format(CompanyEndpoint.Get, req.params.id),
      qs: qs,
      json: true,
      headers: {
        Token: (req.session.token || null)
      }
    })
  
    res.status(results.statusCode).json(results)
  } catch (e) {
    let err = new Error(e)
    err.status = 500
    next(err)
  }
})

// Get All
router.get('/', async(req, res, next) => {
  try {
    // Query Strings
    const qs = {
      ...req.query
    }

    // API Call
    const results = await callApi({
      method: 'GET',
      url: CompanyEndpoint.GetAll,
      qs: qs,
      json: true,
      headers: {
        Token: (req.session.token || null)
      }
    })
  
    res.status(results.statusCode).json(results)
  } catch (e) {
    let err = new Error(e)
    err.status = 500
    next(err)
  }
})


// Post
router.post('/', async(req, res, next) => {
  try {
    // Query Strings
    const body = req.body

    // API Call
    const results = await callApi({
      method: 'POST',
      url: CompanyEndpoint.Post,
      body: body,
      json: true,
      headers: {
        Token: (req.session.token || null)
      }
    })
  
    res.status(results.statusCode).json(results)
  } catch (e) {
    let err = new Error(e)
    err.status = 500
    next(err)
  }
})

// Put
router.put('/:id', async(req, res, next) => {
  try {
    // Query Strings
    const body = req.body

    // API Call
    const results = await callApi({
      method: 'PUT',
      url: util.format(CompanyEndpoint.Put, req.params.id),
      body: body,
      json: true,
      headers: {
        Token: (req.session.token || null)
      }
    })
  
    res.status(results.statusCode).json(results)
  } catch (e) {
    let err = new Error(e)
    err.status = 500
    next(err)
  }
})

// Delete
router.delete('/:id', async(req, res, next) => {
  try {
    // Query Strings
    const qs = {}

    // API Call
    const results = await callApi({
      method: 'DELETE',
      url: util.format(CompanyEndpoint.Get, req.params.id),
      qs: qs,
      json: true,
      headers: {
        Token: (req.session.token || null)
      }
    })
  
    res.status(results.statusCode).json(results)
  } catch (e) {
    let err = new Error(e)
    err.status = 500
    next(err)
  }
})

module.exports = router
