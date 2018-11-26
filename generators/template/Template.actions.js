import axios from 'axios'
import {
  GET_TEMPLATES,
  GET_TEMPLATE,
  POST_TEMPLATE,
  PUT_TEMPLATE,
  DELETE_TEMPLATE
} from '../../constants'

/**
@description Get a by ID
@param id
*/
const getTemplate = id => {
  return {
    type: GET_TEMPLATE,
    payload: axios.get(`/api/Templates/${id}`)
  }
}

/**
@description Get all
@param params
*/
const getTemplates = params => {
  return {
    type: GET_TEMPLATES,
    payload: axios.get(`/api/Templates`, {params: params})
  }
}

/**
@description Create a new
@param data
*/
const postTemplate = data => {
  return {
    type: POST_TEMPLATE,
    payload: axios.post(`/api/Templates`, data)
  }
}

/**
@description Update
@param data
*/
const putTemplate = (id, data) => {
  return {
    type: PUT_TEMPLATE,
    payload: axios.put(`/api/Templates/${id}`, data)
  }
}

/**
@description Delete
@param id
*/
const deleteTemplate = id => {
  return {
    type: DELETE_TEMPLATE,
    payload: axios.delete(`/api/Templates/${id}`)
  }
}

export default {
  getTemplate,
  getTemplates,
  postTemplate,
  putTemplate,
  deleteTemplate
}
