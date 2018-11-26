import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Decorators
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

// Redux Actions
import CompaniesAction from 'ReduxActions/Companies.actions'
import {FULFILLED, REJECTED} from 'AppSrc/constants'

import {Button, Card, Table, Popconfirm, message} from 'antd'

class CompanyList extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      loading: false,
      pagination: {},
      _deleteCompany: props._deleteCompany
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

    await this.props.getCompanies(params)
    .catch(() => {
      this.setState({
        loading: false,
        data: []
      })
    })

    if (this.props._getCompanies.status === FULFILLED) {
      const {data} = this.props._getCompanies.payload.data
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
    await this.props.deleteCompany(id)
    if (this.props._deleteCompany.status === REJECTED) {
      message.error('Unable to delete record')
    } else {
      this.fetch()
    }
  }

  columnActionRender(row) {
    return (
      <span>
        <Link to={'/companies/form/' + row.id}><Button>Edit</Button></Link>
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
      <Card title='Companies' extra={
        <Link to='/companies/form'>
          <Button type='primary'>Create Company</Button>
        </Link>
      }>
        <Table
          columns={columns}
          rowKey={record => record.CompanyID}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </Card>
    )
  }
}

CompanyList.propTypes = {
  _getCompanies: PropTypes.object.isRequired,
  _deleteCompany: PropTypes.object.isRequired,
  getCompanies: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func.isRequired
  
}

export default connect(
  // Map all redux reducers to current class
  state => {
    return {
      _getCompanies: state._getCompanies,
      _deleteCompany: state._deleteCompany
    }
  },
  // Map all redux actions to current class
  dispatch => {
    return bindActionCreators({
      getCompanies: CompaniesAction.getCompanies,
      deleteCompany: CompaniesAction.deleteCompany
    }, dispatch)
  }
)(withRouter(CompanyList))
