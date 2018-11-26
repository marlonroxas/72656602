import axios from 'axios'
import {
  POST_LOGIN
} from '../../constants'

/**
@description Login Administrator
@param email, password required
*/
const postLogin = data => {
  return {
    type: POST_LOGIN,
    payload: axios.post(`/api/login`, data)
  }
}

export default {
  postLogin
}
