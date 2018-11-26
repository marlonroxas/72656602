import {createReducer} from '../../helpers/redux'
import {
  GET_TEMPLATES,
  GET_TEMPLATE,
  POST_TEMPLATE,
  PUT_TEMPLATE,
  DELETE_TEMPLATE
} from '../../constants'

/**
 * @description Reducers
 * @param state action 
 */
export const _getTemplate = (state, action) => createReducer(GET_TEMPLATE, state, action)
export const _getTemplates = (state, action) => createReducer(GET_TEMPLATES, state, action)
export const _postTemplate = (state, action) => createReducer(POST_TEMPLATE, state, action)
export const _putTemplate = (state, action) => createReducer(PUT_TEMPLATE, state, action)
export const _deleteTemplate = (state, action) => createReducer(DELETE_TEMPLATE, state, action)
