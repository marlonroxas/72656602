import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'

/* Reducers */
import * as Login from './Login.reducers'
import * as Sample from './Sample.reducers'
import * as Sites from './Sites.reducers'
import * as Companies from './Companies.reducers'
import * as Managers from './Managers.reducers'
/**COMPONENT-REDUCERS*/

const reducers = combineReducers({
  // 3rd Party Reducers
  form,
  // App Reducers
  ...Login,
  ...Sample,
  ...Sites,
  ...Companies,
  ...Managers,
  /**COMPONENT-COMBINE-REDUCERS*/
})

export default reducers
