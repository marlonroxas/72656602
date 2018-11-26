import axios from 'axios'
import {GET_POSTS} from '../../constants'

/**
@description Get Posts
@param params (optional)
*/
const getPosts = (params = {}) => {
  return {
    type: GET_POSTS,
    payload: axios.get(`https://jsonplaceholder.typicode.com/posts`, {params: params})
  }
}

export default {
  getPosts
}
