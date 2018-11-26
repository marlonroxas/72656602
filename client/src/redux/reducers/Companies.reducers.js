import {createReducer} from '../../helpers/redux'
import {
  GET_COMPANIES,
  GET_COMPANY,
  POST_COMPANY,
  PUT_COMPANY,
  DELETE_COMPANY
} from '../../constants'

/**
 * @description Reducers
 * @param state action 
 */
export const _getCompany = (state, action) => createReducer(GET_COMPANY, state, action)
export const _getCompanies = (state, action) => createReducer(GET_COMPANIES, state, action)
export const _postCompany = (state, action) => createReducer(POST_COMPANY, state, action)
export const _putCompany = (state, action) => createReducer(PUT_COMPANY, state, action)
export const _deleteCompany = (state, action) => createReducer(DELETE_COMPANY, state, action)
