import {createReducer} from '../../helpers/redux'
import {
  GET_SITES,
  GET_SITE,
  POST_SITE,
  PUT_SITE,
  DELETE_SITE
} from '../../constants'

/**
 * @description Reducers
 * @param state action 
 */
export const _getSite = (state, action) => createReducer(GET_SITE, state, action)
export const _getSites = (state, action) => createReducer(GET_SITES, state, action)
export const _postSite = (state, action) => createReducer(POST_SITE, state, action)
export const _putSite = (state, action) => createReducer(PUT_SITE, state, action)
export const _deleteSite = (state, action) => createReducer(DELETE_SITE, state, action)
