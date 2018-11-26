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
import TemplatesAction from 'ReduxActions/Templates.actions'
import {AInput, TailFormField} from 'AppComponents/common/FormFields'
import {FULFILLED} from 'AppSrc/constants'

class TemplateForm extends Component {
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
      await this.props.getTemplate(this.props.match.params.id)
      if (this.props._getTemplate.status === FULFILLED) {
        const {data} = this.props._getTemplate.payload.data
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
        return this.props.putTemplate(this.props.match.params.id, values)        
        .then(() => {
          this.setState({
            redirectToList: true
          })
        })
        .catch(() => {
          const {payload} = this.props._postTemplate
          Object.assign(errors, {_error: payload.statusMessage})
          message.error(payload.statusMessage)
          throw new SubmissionError(errors)
        })
      } else {
      // Insert
        return this.props.postTemplate(values)
        .then(() => {
          this.setState({
            redirectToList: true
          })
        })
        .catch(() => {
          const {payload} = this.props._postTemplate
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
      return <Redirect to='/template' />
    }

    return (
      <Card title='Create Template' extra={<Link to='/template'>Back to list</Link>}>
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

TemplateForm.propTypes = {
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  initialize: PropTypes.func.isRequired,
  postTemplate: PropTypes.func.isRequired,
  putTemplate: PropTypes.func.isRequired,
  getTemplate: PropTypes.func.isRequired,
  _postTemplate: PropTypes.object.isRequired,
  _getTemplate: PropTypes.object.isRequired
}

TemplateForm.defaultProps = {
  pristine: true
}

TemplateForm = reduxForm({
  form: 'TemplateForm',
  validate
})(withRouter(TemplateForm))

export default connect(
  // Map all redux reducers to current class
  state => {
    return {
      _postTemplate: state._postTemplate,
      _getTemplate: state._getTemplate
    }
  },
  // Map all redux actions to current class
  dispatch => {
    return bindActionCreators({
      ...TemplatesAction
    }, dispatch)
  }
)(withRouter(TemplateForm))
