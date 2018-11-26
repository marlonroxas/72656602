import React from 'react'
import PropTypes from 'prop-types'
import {Layout, Menu, Icon} from 'antd'
import {NavLink, withRouter} from 'react-router-dom'

const {Sider} = Layout
const {SubMenu} = Menu

const menus = [
  {
    path: '/',
    icon: 'home',
    name: 'Home',
    sub_menu: []
  },
  {
    path: '/sites',
    icon: 'environment',
    name: 'Sites',
    sub_menu: []
  },
  {
    path: '/managers',
    icon: 'team',
    name: 'Managers',
    sub_menu: []
  },
]
const AppMenu = props => (
  <Sider width={200} style={{background: '#fff'}}>
    <Menu
      mode='vertical'
      defaultSelectedKeys={['/user']}
      selectedKeys={[props.location.pathname]}
      style={{height: '100%'}}>
      <For each='row' index='index' of={menus}>
        <If condition={row.path}>
          <Menu.Item key={index}>
            <NavLink to={row.path}>
              <span><Icon type={row.icon} />{row.name}</span>
            </NavLink>
          </Menu.Item>
        </If>
        <If condition={!row.path}>
          <SubMenu key={index} title={<span><Icon type={row.icon} /><span>{row.name}</span></span>}>
            <For each='sub_row' index='sub_index' of={row.sub_menu}>
              <Menu.Item key={sub_index}>
                <NavLink to={sub_row.path}>{sub_row.name}</NavLink>
              </Menu.Item>
            </For>
          </SubMenu>
        </If>
      </For>
    
    </Menu>
  </Sider>
)

AppMenu.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(AppMenu)