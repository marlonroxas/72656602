import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Decorators
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

// Redux Actions
import ManagersAction from 'ReduxActions/Managers.actions'
import {FULFILLED, REJECTED} from 'AppSrc/constants'

import {Button, Card, Table, Popconfirm, message} from 'antd'

class ManagerList extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      loading: false,
      pagination: {},
      _deleteManager: props._deleteManager
    }
    this.handleTableChange = this.handleTableChange.bind(this)
    this.confirm = this.confirm.bind(this)
    this.columnActionRender = this.columnActionRender.bind(this)
  }

  componentDidMount() {
    this.fetch()
  }

  handleTableChange(pagination, filters, sorter) {
    const pager = {...this.state.pagination}
    pager.current = pagination.current
    this.setState({
      pagination: pager
    })
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    })
  }

  async fetch(params = {}) {
    this.setState({
      loading: true
    })

    await this.props.getManagers(params)
    .catch(() => {
      this.setState({
        loading: false,
        data: []
      })
    })

    if (this.props._getManagers.status === FULFILLED) {
      const {data} = this.props._getManagers.payload.data
      const pagination = {...this.state.pagination}
      pagination.total = data.count
      this.setState({
        loading: false,
        data: data.results,
        pagination
      })
    }
  }

  async confirm(id) {
    await this.props.deleteManager(id)
    if (this.props._deleteManager.status === REJECTED) {
      message.error('Unable to delete record')
    } else {
      this.fetch()
    }
  }

  columnActionRender(row) {
    return (
      <span>
        <Link to={'/managers/form/' + row.id}><Button>Edit</Button></Link>
        <Popconfirm 
          placement='top' 
          title={'Are you sure?'} 
          onConfirm={() => this.confirm(row.id)}
          okText='Yes' 
          cancelText='No'>
          <Button>Delete</Button>
        </Popconfirm>
      </span>
    )
  }

  render() {
    const columns = [
      {
        title: 'Description',
        dataIndex: 'Description'
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'action',
        render: this.columnActionRender
      }
    ]
    return (
      <Card title='Managers' extra={
        <Link to='/managers/form'>
          <Button type='primary'>Create Manager</Button>
        </Link>
      }>
        <Table
          columns={columns}
          rowKey={record => record.ManagerID}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </Card>
    )
  }
}

ManagerList.propTypes = {
  _getManagers: PropTypes.object.isRequired,
  _deleteManager: PropTypes.object.isRequired,
  getManagers: PropTypes.func.isRequired,
  deleteManager: PropTypes.func.isRequired
  
}

export default connect(
  // Map all redux reducers to current class
  state => {
    return {
      _getManagers: state._getManagers,
      _deleteManager: state._deleteManager
    }
  },
  // Map all redux actions to current class
  dispatch => {
    return bindActionCreators({
      getManagers: ManagersAction.getManagers,
      deleteManager: ManagersAction.deleteManager
    }, dispatch)
  }
)(withRouter(ManagerList))
