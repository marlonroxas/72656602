import axios from 'axios'

export const createReducer = (module, state = {
  payload: {},
  status: 'NO_ACTION'
}, action) => {
  switch (action.type) {
    case module + '_PENDING':
      return {
        payload: {},
        status: 'PENDING'
      }
    case module + '_FULFILLED':
      return {
        payload: action.payload.data,
        status: 'FULFILLED'
      }
    case module + '_REJECTED':
      return {
        payload: action.payload.response.data,
        status: 'REJECTED'
      }
    default:
      return state
  }
}

export const createGetAction = (args = {
  type: null,
  url: null,
  config: {}
}) => {
  return {
    type: args.type,
    payload: axios.get(args.url, args.config)
  }
}

export const createPostAction = (args = {
  type: null,
  url: null,
  params: {},
  config: {}
}) => {
  return {
    type: args.type,
    payload: axios.post(args.url, args.params, args.config)
  }
}

export const createPutAction = (args = {
  type: null,
  url: null,
  params: {},
  config: {}
}) => {
  return {
    type: args.type,
    payload: axios.put(args.url, args.params, args.config)
  }
}

export const createDeleteAction = (args = {
  type: null,
  url: null,
  config: {}
}) => {
  return {
    type: args.type,
    payload: axios.delete(args.url, args.config)
  }
}
