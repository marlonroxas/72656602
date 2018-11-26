exports.AuthenticationEndpoint = {
  Login: {
    Post: process.env.API_URL + '/auth/token/'
  },
  ForgotPassword: {
    Post: process.env.API_URL + '/api/forgot-password'
  },
  ChangePassword: {
    Post: process.env.API_URL + '/api/change-password'
  }
}
