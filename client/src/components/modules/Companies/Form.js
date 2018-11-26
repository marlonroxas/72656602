import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {Form, Button, Card, message} from 'antd'
import {Link} from 'react-router-dom'

// Decorators
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router-dom'

// Redux From Validations
import {validate} from './validations'

// Redux Actions
import CompaniesAction from 'ReduxActions/Companies.actions'
import {AInput, TailFormField} from 'AppComponents/common/FormFields'
import {FULFILLED} from 'AppSrc/constants'

class CompanyForm extends Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      redirectToList: false,
      editMode: false
    }
  }

  async componentDidMount() {
    if (typeof this.props.match.params.id !== 'undefined') {
      await this.props.getCompany(this.props.match.params.id)
      if (this.props._getCompany.status === FULFILLED) {
        const {data} = this.props._getCompany.payload.data
        this.props.initialize(data)
      }
    }
  }

  async handleSubmit(values) {
    const errors = validate(values)
    if(Object.keys(errors).length !== 0) {
      throw new SubmissionError(errors)
    } else {
      // Update
      if (typeof this.props.match.params.id !== 'undefined') {
        return this.props.putCompany(this.props.match.params.id, values)        
        .then(() => {
          this.setState({
            redirectToList: true
          })
        })
        .catch(() => {
          const {payload} = this.props._postCompany
          Object.assign(errors, {_error: payload.statusMessage})
          message.error(payload.statusMessage)
          throw new SubmissionError(errors)
        })
      } else {
      // Insert
        return this.props.postCompany(values)
        .then(() => {
          this.setState({
            redirectToList: true
          })
        })
        .catch(() => {
          const {payload} = this.props._postCompany
          Object.assign(errors, {_error: payload.statusMessage})
          message.error(payload.statusMessage)
          throw new SubmissionError(errors)
        })
      }
    }
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props
    const {redirectToList} = this.state
    if (redirectToList) {
      return <Redirect to='/companies' />
    }

    return (
      <Card title='Create Company' extra={<Link to='/companies'>Back to list</Link>}>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>         
          <Field 
            label='Name'
            placeholder='Name'
            name='name'
            component={AInput} 
            hasRequiredIndicator
            hasInlineLabel
            hasFeedback /> 
          <TailFormField>
            <Button type='primary' disabled={pristine || submitting}  htmlType='submit'>
              Save
            </Button>         
          </TailFormField>
        </Form>
      </Card>
    )
  }
}

CompanyForm.propTypes = {
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  initialize: PropTypes.func.isRequired,
  postCompany: PropTypes.func.isRequired,
  putCompany: PropTypes.func.isRequired,
  getCompany: PropTypes.func.isRequired,
  _postCompany: PropTypes.object.isRequired,
  _getCompany: PropTypes.object.isRequired
}

CompanyForm.defaultProps = {
  pristine: true
}

CompanyForm = reduxForm({
  form: 'CompanyForm',
  validate
})(withRouter(CompanyForm))

export default connect(
  // Map all redux reducers to current class
  state => {
    return {
      _postCompany: state._postCompany,
      _getCompany: state._getCompany
    }
  },
  // Map all redux actions to current class
  dispatch => {
    return bindActionCreators({
      ...CompaniesAction
    }, dispatch)
  }
)(withRouter(CompanyForm))
