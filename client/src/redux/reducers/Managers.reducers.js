import {createReducer} from '../../helpers/redux'
import {
  GET_MANAGERS,
  GET_MANAGER,
  POST_MANAGER,
  PUT_MANAGER,
  DELETE_MANAGER
} from '../../constants'

/**
 * @description Reducers
 * @param state action 
 */
export const _getManager = (state, action) => createReducer(GET_MANAGER, state, action)
export const _getManagers = (state, action) => createReducer(GET_MANAGERS, state, action)
export const _postManager = (state, action) => createReducer(POST_MANAGER, state, action)
export const _putManager = (state, action) => createReducer(PUT_MANAGER, state, action)
export const _deleteManager = (state, action) => createReducer(DELETE_MANAGER, state, action)
