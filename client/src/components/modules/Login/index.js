import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {Form, Icon, Button, message} from 'antd'
import {Row, Col} from 'antd'
import logo from 'AppSrc/assets/images/logo.png'

// Decorators
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

// Redux Actions
import LoginActions from 'ReduxActions/Login.actions'

// Redux From Validations
import {validate} from './validations'

// Fields
import {AInput} from 'AppComponents/common/FormFields'

// Ant Design Form
const FormItem = Form.Item

class Login extends Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    const errors = validate(values)
    if(Object.keys(errors).length !== 0) {
      Object.assign(errors, {_error:  'Invalid username and/or password'})
      throw new SubmissionError(errors)
    } else {
      return this.props.postLogin({
        username: values.username,
        password: values.password
      })
      .then(response => {
        const {data} = response.value
        localStorage.setItem('loggedIn', 1)
        if (data.data.token) {
          window.location.href = '/'
        }
      })
      .catch(() => {
        Object.assign(errors, {_error:  'Invalid username and/or password', username: 'Invalid Username'})
        message.error(errors._error)
        throw new SubmissionError(errors)
      })
    }
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props
    return (
      <Row>
        <Col span={12} offset={6}>
          <div className='login-logo'>
            <img src={logo} className='login-logo-img' />
          </div>
          <Form onSubmit={handleSubmit(this.handleSubmit)} className='login-form'>
            <Field 
              prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />} 
              placeholder='Username'
              name='username'
              component={AInput} 
              hasInlineLabel={false} 
              hasFeedback />         
            <Field 
              prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />} 
              type='password'
              name='password'
              placeholder='Password'
              component={AInput} 
              hasInlineLabel={false} 
              hasFeedback />
            <FormItem>
              <Button type='primary' disabled={pristine || submitting}  htmlType='submit' className='login-form-button'>
                Log in
              </Button>  
            </FormItem>
            <FormItem style={{textAlign: 'center'}}>  
              <Link to='/register'>Register</Link> or <Link to='/confirmation'>Validate Account</Link>
            </FormItem>
          </Form>
        </Col>
      </Row>
    )
  }
}

Login.propTypes = {
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  postLogin: PropTypes.func.isRequired
}

Login.defaultProps = {
  pristine: true
}

Login = reduxForm({
  form: 'login',
  validate
})(withRouter(Login))

export default connect(
  // Map all redux reducers to current class
  state => {
    return {
      _postLogin: state._postLogin
    }
  },
  // Map all redux actions to current class
  dispatch => {
    return bindActionCreators({
      ...LoginActions
    }, dispatch)
  }
)(Login)
