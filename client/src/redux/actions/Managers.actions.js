import axios from 'axios'
import {
  GET_MANAGERS,
  GET_MANAGER,
  POST_MANAGER,
  PUT_MANAGER,
  DELETE_MANAGER
} from '../../constants'

/**
@description Get a by ID
@param id
*/
const getManager = id => {
  return {
    type: GET_MANAGER,
    payload: axios.get(`/api/Managers/${id}`)
  }
}

/**
@description Get all
@param params
*/
const getManagers = params => {
  return {
    type: GET_MANAGERS,
    payload: axios.get(`/api/Managers`, {params: params})
  }
}

/**
@description Create a new
@param data
*/
const postManager = data => {
  return {
    type: POST_MANAGER,
    payload: axios.post(`/api/Managers`, data)
  }
}

/**
@description Update
@param data
*/
const putManager = (id, data) => {
  return {
    type: PUT_MANAGER,
    payload: axios.put(`/api/Managers/${id}`, data)
  }
}

/**
@description Delete
@param id
*/
const deleteManager = id => {
  return {
    type: DELETE_MANAGER,
    payload: axios.delete(`/api/Managers/${id}`)
  }
}

export default {
  getManager,
  getManagers,
  postManager,
  putManager,
  deleteManager
}
