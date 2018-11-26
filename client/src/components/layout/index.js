import React from 'react'
import PropTypes from 'prop-types'
import {Layout} from 'antd'
import AppHeader from './AppHeader/index'
import AppBreadcrumbs from './AppBreadcrumbs/index'
import AppMenu from './AppMenu/index'
import AppFooter from './AppFooter/index'

const {Content} = Layout

export const lhoc = WrappedComponent => {
    return class LHOC extends React.Component {  
      render() {
        return (
          <Layout>
            <AppHeader />
            <Content style={{padding: '0 50px'}}>
              <AppBreadcrumbs />
              <Layout style={{padding: '24px 0', background: '#fff'}}>
                <AppMenu />
                <Content style={{padding: '0 24px', minHeight: 280}}>
                  <WrappedComponent {...this.props} />
                </Content>
              </Layout>
            </Content>
            <AppFooter />
          </Layout>
        )
      }
    }
}


// Static Typing using PropTypes
lhoc.propTypes = {
  WrappedComponent: PropTypes.any
}
