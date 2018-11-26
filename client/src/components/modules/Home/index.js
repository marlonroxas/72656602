import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Decorators
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

// Redux Actions
import SampleActions from 'ReduxActions/Sample.actions'
// import {PENDING, FULFILLED} from 'AppSrc/constants'

class Home extends Component {
  constructor(){
    super()
  }

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const{_getPosts} = this.props
    console.log(_getPosts)
    return (
      <div>
        <h1>Welcome to Admit!</h1>
      </div>
    )
  }
}

// Map all redux reducers to current class
const mapState = state => {
  return {
    _getPosts: state._getPosts
  }
}

// Map all redux actions to current class
const mapDispatch = dispatch => {
  return bindActionCreators({
    getPosts: SampleActions.getPosts
  }, dispatch)
}

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  _getPosts: PropTypes.object.isRequired
}

export default connect(
  mapState,
  mapDispatch
)(withRouter(Home))
