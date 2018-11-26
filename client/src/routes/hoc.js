import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

// Temporary
const isLoggedIn = Number(localStorage.getItem('loggedIn')) === 1

// Restricted Route for Authentication
export const PrivateRoute = ({component: Component, ...rest}) => {
  if (isLoggedIn === false) {
    return <Redirect to='/login' />
  }
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <If condition={isLoggedIn}>
            <Component {...props} />
          </If>
        )
      }}
    />
  )
}

// Static Typing using PropTypes
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
}
