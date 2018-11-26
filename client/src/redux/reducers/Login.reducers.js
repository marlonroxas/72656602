import {createReducer} from '../../helpers/redux'
import {POST_LOGIN} from '../../constants'

export const _postLogin = (state, action) => createReducer(POST_LOGIN, state, action)
