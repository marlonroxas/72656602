export const validate = values => {
  const errors = {}
  if (!values['position']) {
    errors['position'] = 'Position is required'
  }

  if (!values['firstname']) {
    errors['firstname'] = 'First Name is required'
  }

  if (!values['lastname']) {
    errors['lastname'] = 'Last Name is required'
  }

  if (!values['email_address']) {
    errors['email_address'] = 'Email Address is required'
  }

  if (!values['mobile_phone']) {
    errors['mobile_phone'] = 'Mobile / Phone is required'
  }

  if (!values['street']) {
    errors['street'] = 'Street is required'
  }

  if (!values['city']) {
    errors['city'] = 'City is required'
  }

  if (!values['state']) {
    errors['state'] = 'State is required'
  }

  if (!values['post_code']) {
    errors['post_code'] = 'Post Code is required'
  }

  if (!values['country']) {
    errors['country'] = 'Country is required'
  }
  
  return errors
}
