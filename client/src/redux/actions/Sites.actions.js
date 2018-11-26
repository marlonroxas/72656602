import axios from 'axios'
import {
  GET_SITES,
  GET_SITE,
  POST_SITE,
  PUT_SITE,
  DELETE_SITE
} from '../../constants'

/**
@description Get a by ID
@param id
*/
const getSite = id => {
  return {
    type: GET_SITE,
    payload: axios.get(`/api/Sites/${id}`)
  }
}

/**
@description Get all
@param params
*/
const getSites = params => {
  return {
    type: GET_SITES,
    payload: axios.get(`/api/Sites`, {params: params})
  }
}

/**
@description Create a new
@param data
*/
const postSite = data => {
  return {
    type: POST_SITE,
    payload: axios.post(`/api/Sites`, data)
  }
}

/**
@description Update
@param data
*/
const putSite = (id, data) => {
  return {
    type: PUT_SITE,
    payload: axios.put(`/api/Sites/${id}`, data)
  }
}

/**
@description Delete
@param id
*/
const deleteSite = id => {
  return {
    type: DELETE_SITE,
    payload: axios.delete(`/api/Sites/${id}`)
  }
}

export default {
  getSite,
  getSites,
  postSite,
  putSite,
  deleteSite
}
