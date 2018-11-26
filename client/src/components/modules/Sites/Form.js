import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import {Form, Button, Card, Col, Row, Divider, Checkbox, Progress, Upload, Icon, message} from 'antd'
import {Link} from 'react-router-dom'

// Decorators
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router-dom'

// Redux From Validations
import {validate} from './validations'

// Redux Actions
import SitesAction from 'ReduxActions/Sites.actions'
import {AInput, TailFormField} from 'AppComponents/common/FormFields'
import {FULFILLED} from 'AppSrc/constants'

import { withGoogleMap, GoogleMap } from 'react-google-maps'

const ButtonGroup = Button.Group

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

class SiteForm extends Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.increaseTolerance = this.increaseTolerance.bind(this)
    this.declineTolerance = this.declineTolerance.bind(this)
    this.increaseLocation = this.increaseLocation.bind(this)
    this.declineLocation = this.declineLocation.bind(this)
    this.increaseDistance = this.increaseDistance.bind(this)
    this.declineDistance = this.declineDistance.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      redirectToList: false,
      editMode: false,
      percent: 0,
      tolerance: 0,
      location: 0,
      distance: 0,
      loading: false
    }
  }

  async componentDidMount() {
    if (typeof this.props.match.params.id !== 'undefined') {
      await this.props.getSite(this.props.match.params.id)
      if (this.props._getSite.status === FULFILLED) {
        const {data} = this.props._getSite.payload.data
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
        return this.props.putSite(this.props.match.params.id, values)        
        .then(() => {
          this.setState({
            redirectToList: true
          })
        })
        .catch(() => {
          const {payload} = this.props._postSite
          Object.assign(errors, {_error: payload.statusMessage})
          message.error(payload.statusMessage)
          throw new SubmissionError(errors)
        })
      } else {
      // Insert
        return this.props.postSite(values)
        .then(() => {
          this.setState({
            redirectToList: true
          })
        })
        .catch(() => {
          const {payload} = this.props._postSite
          Object.assign(errors, {_error: payload.statusMessage})
          message.error(payload.statusMessage)
          throw new SubmissionError(errors)
        })
      }
    }
  }

  increaseTolerance() {
    let tolerance = this.state.tolerance + 10
    if (tolerance > 100) {
      tolerance = 100
    }
    this.setState({tolerance})
  }

  declineTolerance() {
    let tolerance = this.state.tolerance - 10
    if (tolerance < 0) {
      tolerance = 0
    }
    this.setState({tolerance})
  }

  increaseLocation() {
    let location = this.state.location + 10
    if (location > 100) {
      location = 100
    }
    this.setState({location})
  }

  declineLocation() {
    let location = this.state.location - 10
    if (location < 0) {
      location = 0
    }
    this.setState({location})
  }

  increaseDistance() {
    let distance = this.state.distance + 10
    if (distance > 100) {
      distance = 100
    }
    this.setState({distance})
  }

  declineDistance() {
    let distance = this.state.distance - 10
    if (distance < 0) {
      distance = 0
    }
    this.setState({distance})
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
      return <Redirect to='/sites' />
    }

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl

    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{lat: 40.756795, lng: -73.954298}}
        defaultZoom={13}
      />
   ))
    return (
      <Card style={{ background: '#ECECEC'}} title='Create Site' extra={<Link to='/sites'>Back to list</Link>}>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>

          <Row gutter={16}>
            <Col span={8}>
              <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                action='//jsonplaceholder.typicode.com/posts/'
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt='avatar' /> : uploadButton}
              </Upload>
              <Card bordered={false}>
                <Field 
                  label='Site ID'
                  placeholder='Site ID'
                  name='site_id'
                  component={AInput} 
                  hasRequiredIndicator
                  hasInlineLabel={false}
                  hasFeedback />
              </Card><br />

              <Card bordered={false}>
                <GoogleMapExample
                  containerElement={<div style={{ height: `300px`, width: '250px' }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Card>
            </Col>

            <Col span={16}>
              <Card bordered={false}>
                <Col span={12} style={{ marginBottom: '10' }}>
                  <b>SUMMARY</b>
                </Col>
                <br />
                <Row gutter={16}>
                  <Col span={12}>
                    <Field 
                      label='Street'
                      placeholder='Street'
                      name='street'
                      component={AInput} 
                      hasInlineLabel={false}
                      hasFeedback />
                  </Col>
                  <Col span={12}>
                    <Field 
                      label='Address'
                      placeholder='Address'
                      name='address'
                      component={AInput} 
                      hasInlineLabel={false}
                      hasFeedback />
                  </Col>
                  <Col span={12}>
                    <Field 
                      label='State'
                      placeholder='State'
                      name='state'
                      component={AInput} 
                      hasInlineLabel={false}
                      hasFeedback />
                  </Col>
                  <Col span={8}>
                    <Field 
                      label='Country'
                      placeholder='Country'
                      name='country'
                      component={AInput} 
                      hasInlineLabel={false}
                      hasFeedback />
                  </Col>

                  <Col span={4}>
                    <Field 
                      label='Post Code'
                      placeholder='Post Code'
                      name='post_code'
                      component={AInput} 
                      hasInlineLabel={false}
                      hasFeedback />
                  </Col>

                  <Divider />
                  <Col span={12} style={{ marginBottom: '10' }}>
                    <b>TOLERANCE</b>
                  </Col>
                  <br /><br />
                  <Col span={12}>
                    <Checkbox value='A' style={{ color: '#626262' }}>Customize Shift Tolerance</Checkbox>
                  </Col>

                  <Col span={12}>
                    <Checkbox value='A' style={{ color: '#626262' }}>Customize Geotrack Notification and Tolerance</Checkbox>
                  </Col>

                  <Row gutter={16}>
                    <Col span={12} style={{ color: '#9E9E9E' }}>
                      Shift Percentage of Tolerance (percent) <br />
                      <Progress percent={this.state.tolerance} format={percent => `${percent}`} /> <br />
                      <ButtonGroup>
                        <Button onClick={this.declineTolerance} icon='minus' />
                        <Button onClick={this.increaseTolerance} icon='plus' />
                      </ButtonGroup>
                    </Col>

                    <Col span={12} style={{ color: '#9E9E9E' }}>
                      Check Location every (minutes) <br />
                      <Progress percent={this.state.location} format={percent => `${percent}`} /><br />
                      <ButtonGroup>
                        <Button onClick={this.declineLocation} icon='minus' />
                        <Button onClick={this.increaseLocation} icon='plus' />
                      </ButtonGroup>
                    </Col>
                  </Row><br />

                  <Row gutter={16}>
                    <Col span={12} style={{ color: '#9E9E9E' }}>
                      Notify when cleaners distance is outside (meters) <br />
                      <Progress percent={this.state.distance} format={percent => `${percent}`} /><br />
                      <ButtonGroup>
                        <Button onClick={this.declineDistance} icon='minus' />
                        <Button onClick={this.increaseDistance} icon='plus' />
                      </ButtonGroup>
                    </Col>
                  </Row>

                </Row>
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

SiteForm.propTypes = {
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  initialize: PropTypes.func.isRequired,
  postSite: PropTypes.func.isRequired,
  putSite: PropTypes.func.isRequired,
  getSite: PropTypes.func.isRequired,
  _postSite: PropTypes.object.isRequired,
  _getSite: PropTypes.object.isRequired
}

SiteForm.defaultProps = {
  pristine: true,
}

SiteForm = reduxForm({
  form: 'SiteForm',
  validate
})(withRouter(SiteForm))

export default connect(
  // Map all redux reducers to current class
  state => {
    return {
      _postSite: state._postSite,
      _getSite: state._getSite
    }
  },
  // Map all redux actions to current class
  dispatch => {
    return bindActionCreators({
      ...SitesAction
    }, dispatch)
  }
)(withRouter(SiteForm))
