import React, {Component} from 'react'
import PropTypes from 'prop-types'
import lang from '../locale'

export const AppContext = React.createContext()

export class AppProvider extends Component {
  constructor() {
    super()
    this.state = {
      lang: lang
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

AppProvider.propTypes = {
  children: PropTypes.any.isRequired
}
