import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {PrivateRoute} from './hoc'
import {lhoc} from '../components/layout/index'
import NotFound from '../components/common/NotFound'
import Login from '../components/modules/Login'
import Home from '../components/modules/Home'
import SitesForm from '../components/modules/Sites/Form'
import SitesList from '../components/modules/Sites/List'
import CompaniesList from '../components/modules/Companies/List'
import CompaniesForm from '../components/modules/Companies/Form'
import ManagersList from '../components/modules/Managers/List'
import ManagersForm from '../components/modules/Managers/Form'
/**COMPONENT-IMPORT*/

// Render Routes
export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={lhoc(Home)} />
        <PrivateRoute exact path='/sites' component={lhoc(SitesList)} />
        <PrivateRoute exact path='/sites/form' component={lhoc(SitesForm)} />
        <PrivateRoute exact path='/sites/form/:id' component={lhoc(SitesForm)} />
        <PrivateRoute exact path='/companies' component={lhoc(CompaniesList)} />
        <PrivateRoute exact path='/companies/form' component={lhoc(CompaniesForm)} />
        <PrivateRoute exact path='/companies/form/:id' component={lhoc(CompaniesForm)} />
        <PrivateRoute exact path='/managers' component={lhoc(ManagersList)} />
        <PrivateRoute exact path='/managers/form' component={lhoc(ManagersForm)} />
        <PrivateRoute exact path='/managers/form/:id' component={lhoc(ManagersForm)} />
        {/**COMPONENT-ROUTE*/}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
