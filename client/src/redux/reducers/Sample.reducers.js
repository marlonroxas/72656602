import {createReducer} from '../../helpers/redux'
import {GET_POSTS} from '../../constants'

export const _getPosts = (state, action) => createReducer(GET_POSTS, state, action)
