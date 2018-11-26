import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducers from './reducers'

const customMiddleware = () => next => action => {
  next(action)
}

export default data => {
  const middleware = [thunk, promise(), customMiddleware]
  const store = createStore(reducers, data, compose(
    applyMiddleware(...middleware)
  ))
  return store
}
