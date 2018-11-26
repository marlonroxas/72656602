import axios from 'axios'
import {
  GET_CLINICS,
  GET_CLINIC,
  POST_CLINIC,
  PUT_CLINIC,
  DELETE_CLINIC
} from '../../constants'

/**
@description Get a by ID
@param id
*/
const getClinic = id => {
  return {
    type: GET_CLINIC,
    payload: axios.get(`/api/Clinics/${id}`)
  }
}

/**
@description Get all
@param params
*/
const getClinics = params => {
  return {
    type: GET_CLINICS,
    payload: axios.get(`/api/Clinics`, {params: params})
  }
}

/**
@description Create a new
@param data
*/
const postClinic = data => {
  return {
    type: POST_CLINIC,
    payload: axios.post(`/api/Clinics`, data)
  }
}

/**
@description Update
@param data
*/
const putClinic = (id, data) => {
  return {
    type: PUT_CLINIC,
    payload: axios.put(`/api/Clinics/${id}`, data)
  }
}

/**
@description Delete
@param id
*/
const deleteClinic = id => {
  return {
    type: DELETE_CLINIC,
    payload: axios.delete(`/api/Clinics/${id}`)
  }
}

export default {
  getClinic,
  getClinics,
  postClinic,
  putClinic,
  deleteClinic
}
