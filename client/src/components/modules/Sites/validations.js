export const validate = values => {
  const errors = {}
  if (!values['site_id']) {
    errors['site_id'] = 'Site is required'
  }

  if (!values['check_location_seconds']) {
    errors['check_location_seconds'] = 'Location Seconds is required'
  }

  return errors
}
