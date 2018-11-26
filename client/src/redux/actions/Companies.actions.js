import axios from 'axios'
import {
  GET_COMPANIES,
  GET_COMPANY,
  POST_COMPANY,
  PUT_COMPANY,
  DELETE_COMPANY
} from '../../constants'

/**
@description Get a by ID
@param id
*/
const getCompany = id => {
  return {
    type: GET_COMPANY,
    payload: axios.get(`/api/Companies/${id}`)
  }
}

/**
@description Get all
@param params
*/
const getCompanies = params => {
  return {
    type: GET_COMPANIES,
    payload: axios.get(`/api/Companies`, {params: params})
  }
}

/**
@description Create a new
@param data
*/
const postCompany = data => {
  return {
    type: POST_COMPANY,
    payload: axios.post(`/api/Companies`, data)
  }
}

/**
@description Update
@param data
*/
const putCompany = (id, data) => {
  return {
    type: PUT_COMPANY,
    payload: axios.put(`/api/Companies/${id}`, data)
  }
}

/**
@description Delete
@param id
*/
const deleteCompany = id => {
  return {
    type: DELETE_COMPANY,
    payload: axios.delete(`/api/Companies/${id}`)
  }
}

export default {
  getCompany,
  getCompanies,
  postCompany,
  putCompany,
  deleteCompany
}
