import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {Form, Button, Card, Row, Col, Select, Checkbox, Upload, Icon, message} from 'antd'
import {Link} from 'react-router-dom'

// Decorators
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router-dom'

// Redux From Validations
import {validate} from './validations'

// Redux Actions
import ManagersAction from 'ReduxActions/Managers.actions'
import {AInput, ASelect, TailFormField} from 'AppComponents/common/FormFields'
import {FULFILLED} from 'AppSrc/constants'

const Option = Select.Option

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

class ManagerForm extends Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      redirectToList: false,
      editMode: false,
      loading: false
    }
  }

  async componentDidMount() {
    if (typeof this.props.match.params.id !== 'undefined') {
      await this.props.getManager(this.props.match.params.id)
      if (this.props._getManager.status === FULFILLED) {
        const {data} = this.props._getManager.payload.data
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
        return this.props.putManager(this.props.match.params.id, values)        
        .then(() => {
          this.setState({
            redirectToList: true
          })
        })
        .catch(() => {
          const {payload} = this.props._postManager
          Object.assign(errors, {_error: payload.statusMessage})
          message.error(payload.statusMessage)
          throw new SubmissionError(errors)
        })
      } else {
      // Insert
        return this.props.postManager(values)
        .then(() => {
          this.setState({
            redirectToList: true
          })
        })
        .catch(() => {
          const {payload} = this.props._postManager
          Object.assign(errors, {_error: payload.statusMessage})
          message.error(payload.statusMessage)
          throw new SubmissionError(errors)
        })
      }
    }
  }

  handleChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }))
    }
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props
    const {redirectToList} = this.state
    if (redirectToList) {
      return <Redirect to='/managers' />
    }

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl

    return (
      <Card title='Create Manager' extra={<Link to='/managers'>Back to list</Link>}>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>         
          
            <Row gutter={16}>
              <Col span={8}>

                <Card bordered={false}>
                  <Row gutter={16}>
                   <div className='clearfix'>
 
                      <Col span={24}>
                        <Upload
                          name='avatar'
                          listType='picture-card'
                          className='avatar-uploader'
                          showUploadList={false}
                          action='//jsonplaceholder.typicode.com/posts/'
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >
                          {imageUrl ? <img src={imageUrl} style={{ width: '100%' }} alt='avatar' /> : uploadButton}
                        </Upload>
                      </Col>
                    </div>
                    <Col span={24} style={{ marginTop: '30px' }}>
                      <h2><b>Details</b></h2>
                    </Col>
                    <Col span={24} style={{ marginTop: '10px' }}>
                      <b>PERSONAL INFORMATION</b>
                    </Col>

                    <Col span={24}>
                      <Field 
                        label='Position'
                        placeholder='Position'
                        name='position'
                        component={ASelect} 
                        hasRequiredIndicator
                        hasInlineLabel={false}
                        hasFeedback >
                          <Option value='site_manager'>Site Manager</Option>
                          <Option value='admin'>Personnel</Option>
                          <Option value='admin'>Admin</Option>
                      </Field>
                    </Col>

                    <Col span={24}>
                      <Field 
                        label='First Name'
                        placeholder='First Name'
                        name='firstname'
                        component={AInput} 
                        hasRequiredIndicator
                        hasInlineLabel={false}
                        hasFeedback />
                    </Col>

                    <Col span={24}>
                      <Field 
                        label='Last Name'
                        placeholder='Last Name'
                        name='lastname'
                        component={AInput} 
                        hasRequiredIndicator
                        hasInlineLabel={false}
                        hasFeedback />
                    </Col>

                    <Col span={24}>
                      <Field 
                        label='Email Address'
                        placeholder='Email Address'
                        name='email_address'
                        component={AInput} 
                        hasRequiredIndicator
                        hasInlineLabel={false}
                        hasFeedback />
                    </Col>

                    <Col span={24}>
                      <Field 
                        label='Mobile / Phone'
                        placeholder='Mobile / Phone'
                        name='mobile_phone'
                        component={AInput} 
                        hasRequiredIndicator
                        hasInlineLabel={false}
                        hasFeedback />
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col span={8}>
                <Card bordered={false}>
                  <Row gutter={16}>
                    <Col span={24} style={{ marginTop: '190px' }}>
                      <b>Addresses</b>
                    </Col>

                    <Col span={24}>
                      <Field 
                        label='Street'
                        placeholder='Street'
                        name='street'
                        component={AInput} 
                        hasRequiredIndicator
                        hasInlineLabel={false}
                        hasFeedback />
                    </Col>

                    <Col span={24}>
                      <Field 
                        label='City'
                        placeholder='City'
                        name='city'
                        component={AInput} 
                        hasRequiredIndicator
                        hasInlineLabel={false}
                        hasFeedback />
                    </Col>


                    <Col span={12}>
                      <Field 
                        label='State'
                        placeholder='State'
                        name='state'
                        component={AInput} 
                        hasRequiredIndicator
                        hasInlineLabel={false}
                        hasFeedback />
                    </Col>

                    <Col span={12}>
                      <Field 
                        label='Post Code'
                        placeholder='Post Code'
                        name='post_code'
                        component={AInput} 
                        hasRequiredIndicator
                        hasInlineLabel={false}
                        hasFeedback />
                    </Col>

                    <Col span={24}>
                      <Field 
                        label='Country'
                        placeholder='Country'
                        name='country'
                        component={AInput} 
                        hasRequiredIndicator
                        hasInlineLabel={false}
                        hasFeedback />
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col span={8}>
                <Card bordered={false}>
                  <Col span={24} style={{ marginTop: '150px' }}>
                    <h2><b>Permissions</b></h2>
                  </Col>
                  <Col span={24}>
                    <Checkbox value='A'>Activate/Deactivate Managers</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value='A'>Activate/Deactivate Personnels</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value='A'>Activate/Deactivate Shifts</Checkbox>
                  </Col>
                </Card>
              </Col>
            </Row>
          

          <br />
          <Col span={24} style={{ textAlign: 'right' }}>  
            <Button type='primary' size='large' disabled={pristine || submitting}  htmlType='submit'>
              Save
            </Button>
          </Col>
        </Form>
      </Card>
    )
  }
}

ManagerForm.propTypes = {
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  initialize: PropTypes.func.isRequired,
  postManager: PropTypes.func.isRequired,
  putManager: PropTypes.func.isRequired,
  getManager: PropTypes.func.isRequired,
  _postManager: PropTypes.object.isRequired,
  _getManager: PropTypes.object.isRequired
}

ManagerForm.defaultProps = {
  pristine: true
}

ManagerForm = reduxForm({
  form: 'ManagerForm',
  validate
})(withRouter(ManagerForm))

export default connect(
  // Map all redux reducers to current class
  state => {
    return {
      _postManager: state._postManager,
      _getManager: state._getManager
    }
  },
  // Map all redux actions to current class
  dispatch => {
    return bindActionCreators({
      ...ManagersAction
    }, dispatch)
  }
)(withRouter(ManagerForm))
