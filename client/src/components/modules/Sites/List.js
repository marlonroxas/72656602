import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Decorators
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

// Redux Actions
import SitesAction from 'ReduxActions/Sites.actions'
import {FULFILLED, REJECTED} from 'AppSrc/constants'

import {Button, Card, Table, Popconfirm, message} from 'antd'

class SiteList extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      loading: false,
      pagination: {},
      _deleteSite: props._deleteSite,
      percent: 0
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

    await this.props.getSites(params)
    .catch(() => {
      this.setState({
        loading: false,
        data: []
      })
    })

    if (this.props._getSites.status === FULFILLED) {
      const {data} = this.props._getSites.payload.data
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
    await this.props.deleteSite(id)
    if (this.props._deleteSite.status === REJECTED) {
      message.error('Unable to delete record')
    } else {
      this.fetch()
    }
  }

  columnActionRender(row) {
    return (
      <span>
        <Link to={'/sites/form/' + row.id}><Button>Edit</Button></Link>
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
        title: 'Site',
        dataIndex: 'site_id'
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'action',
        render: this.columnActionRender
      }
    ]
    return (
      <Card title='Sites' extra={
        <Link to='/sites/form'>
          <Button type='primary'>Create Site</Button>
        </Link>
      }>
        <Table
          columns={columns}
          rowKey={record => record.SiteID}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </Card>
    )
  }
}

SiteList.propTypes = {
  _getSites: PropTypes.object.isRequired,
  _deleteSite: PropTypes.object.isRequired,
  getSites: PropTypes.func.isRequired,
  deleteSite: PropTypes.func.isRequired
  
}

export default connect(
  // Map all redux reducers to current class
  state => {
    return {
      _getSites: state._getSites,
      _deleteSite: state._deleteSite
    }
  },
  // Map all redux actions to current class
  dispatch => {
    return bindActionCreators({
      getSites: SitesAction.getSites,
      deleteSite: SitesAction.deleteSite
    }, dispatch)
  }
)(withRouter(SiteList))
