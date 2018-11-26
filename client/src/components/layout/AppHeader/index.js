import React from 'react'
import {Layout, Menu, Icon} from 'antd'
import logo from 'AppSrc/assets/images/logo.png'

const {Header} = Layout
const logout = () => {
  localStorage.setItem('loggedIn', 0)
  window.location.href = '/login'
}
export default () => (
  <Header className='header'>
    <img src={logo} className='app-header-logo' />
    <Menu
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['2']}
      style={{lineHeight: '64px', float: 'right'}}>
      <Menu.Item key='1'>
        <a style={{cursor: 'pointer'}} onClick={logout}>{<span><Icon type='logout' />Logout</span>}</a>
      </Menu.Item>
    </Menu>
  </Header>
)
