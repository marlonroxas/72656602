import {createReducer} from '../../helpers/redux'
import {
  GET_CLINICS,
  GET_CLINIC,
  POST_CLINIC,
  PUT_CLINIC,
  DELETE_CLINIC
} from '../../constants'

/**
 * @description Reducers
 * @param state action 
 */
export const _getClinic = (state, action) => createReducer(GET_CLINIC, state, action)
export const _getClinics = (state, action) => createReducer(GET_CLINICS, state, action)
export const _postClinic = (state, action) => createReducer(POST_CLINIC, state, action)
export const _putClinic = (state, action) => createReducer(PUT_CLINIC, state, action)
export const _deleteClinic = (state, action) => createReducer(DELETE_CLINIC, state, action)
