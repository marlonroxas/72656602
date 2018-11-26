exports.TemplateEndpoint = {
  Get: process.env.API_URL + '/api/templates/%s',
  GetAll: process.env.API_URL + '/api/templates',
  Post: process.env.API_URL + '/api/templates',
  Put: process.env.API_URL + '/api/templates/%s',
  Delete: process.env.API_URL + '/api/templates/%s'
}
