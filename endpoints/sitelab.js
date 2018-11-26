exports.ClinicEndpoint = {
  Get: process.env.API_URL + '/api/clinics/%s',
  GetAll: process.env.API_URL + '/api/clinics',
  Post: process.env.API_URL + '/api/clinics',
  Put: process.env.API_URL + '/api/clinics/%s',
  Delete: process.env.API_URL + '/api/clinics/%s'
}
