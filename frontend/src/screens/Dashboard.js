/**
 * Main Dashbaord
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/dashboard.css';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import PageTop from './PageTop';
import PageBottom from './PageBottom';
import PageTitle from '../components/PageTitle';
import ManageItems from '../components/ManageItems';
import Button from '../components/Button';
import Input from '../components/Input';
import ToastrMsg from '../components/toastr';
import Pagination from "react-js-pagination";
import DropdownSelector from '../components/DropdownSelector';
import { getDashboardItems, getProjects, getTasks, getClients } from '../actions/actions';
import moment from 'moment';
import DatePickerRange from '../components/DatePickerRange';
import _ from 'lodash'


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Dashboard',
      filters: {
        userId: '',
        clientId: '',
        client: '',
        projectId: '',
        project: '',
        taskId: '',
        task: '',
        startDate: moment().startOf('month').format('MM/DD/YYYY'),
        endDate: moment().endOf('month').format('MM/DD/YYYY')
      },
      projectItems: [],
      taskItems: [],
      clientItems: [],
      datepickerStartDate: moment().startOf('month'),
      datepickerEndDate: moment().endOf('month'),
      activePage: 15, //pagination
      toastrMsg: false,
      action: 'dashboard',
      hasError: false
    }
  }

  changeHandler = (e) => {
    let inputs = Object.assign({}, this.state.inputs);
    inputs[e.target.name] = e.target.value;
    this.setState({ inputs: inputs });
  }

  handleKeyPress = (event) => {
    if (event.key == 'Enter') this.saveItem()
  }

  saveItem = async () => {
    if (this.validateInput()) {
      return this.setState({ hasError: true })
    }
    this.setState({ hasError: false })

    const { name, email, phone, address } = this.state.inputs
    var item = {
      action: this.state.action,
      items: { name, email, phone, address }
    }
    await this.props.addItem(item)
    await this.clear()
    await this.props.getItem(item)
    await this.toggleToastrMsg()
  }


  validateInput = () => {
    if (this.state.inputs.name == '') {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return true
    } else {
      return false
    }
  }

  toggleToastrMsg = () => {
    this.setState({ toastrMsg: true }, () => {
      this.setState({ toastrMsg: false })
    });
  }

  componentDidMount() {
    this.syncDashboardItems(this.state.filters)
    this.props.getProjects();
    this.props.getTasks();
    this.props.getClients();
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  //pagination
  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  syncDashboardItems = (filters) => {
    //  for (var k in filters)
    // if (_.isEmpty(filters[k])){
    //   delete filters[k]
    // } 
    this.props.getDashboardItems(filters);
  }

  // invoked every time component recieves new props.
  componentWillReceiveProps(nextProps) {
    let state = Object.assign({}, this.state);
    if (nextProps.projectItems) {
      state.projectItems.length = 0;
      nextProps.projectItems.map(item => {
        state.projectItems.push({ name: 'project', label: item.name, value: item.name, id: item.id })
      })
    }
    if (nextProps.taskItems) {
      state.taskItems.length = 0;
      nextProps.taskItems.map(item => {
        state.taskItems.push({ name: 'task', label: item.name, value: item.name, id: item.id })
      })
    }
    if (nextProps.clientItems) {
      state.clientItems.length = 0;
      nextProps.clientItems.map(item => {
        state.clientItems.push({ name: 'client', label: item.name, value: item.name, id: item.id })
      })
    }

    this.setState({ projectItems: state.projectItems, taskItems: state.taskItems, clientItems: state.clientItems });
  }

  changeHandlerDropdown = async (e) => {
    let filters = Object.assign({}, this.state.filters);
    if (e) {
      filters[e.name] = e.value;
      if (e.name == 'task') {
        filters.taskId = e.id;
      } else if (e.name == 'project') {
        filters.projectId = e.id;
      } else if (e.name == 'client') {
        filters.clientId = e.id;
      }
      this.setState({ filters })
      this.syncDashboardItems(filters)
    }
  }

  startDateHandler = (date) => {
    this.setState({ datepickerStartDate: moment(date) })

    this.state.filters.startDate = moment(date._d).format('MM/DD/YYYY')
    this.syncDashboardItems(this.state.filters)
  }
  endDateHandler = (date) => {
    this.setState({ datepickerEndDate: moment(date) })

    this.state.filters.endDate = moment(date._d).format('MM/DD/YYYY')
    this.syncDashboardItems(this.state.filters)
  }

  render() {
    return (
      <Fragment>
        {this.state.toastrMsg ? <ToastrMsg type="success" msg="Client succesfuly saved" title="" /> : null}

        <PageTop key="1" />
        <div key="2" className="container">

          {/* page title */}
          {/* <PageTitle title={this.state.title} /> */}

          {/* <!-- page title  --> */}
          <div className="row blue mb-3">
            <div className="col-sm-12">
              <h2 className="d-inline-flex">{this.state.title}</h2>

              <div className="d-inline-flex float-right blue">{moment(this.state.datepickerStartDate._d).format('dddd MMM Do')} - {moment(this.state.datepickerEndDate._d).format('dddd MMM Do')} </div>
              {/* <button type="button" className="btn btn-secondary blue-background ml-2">
                <i className="fa fa-calendar-o mr-2" aria-hidden="true"></i>9/01/17-9/08/17
                    </button> */}
            </div>
            <div className="col-sm-12">
              <DatePickerRange
                startDate={this.state.datepickerStartDate}
                endDate={this.state.datepickerEndDate}
                startDateHandler={this.startDateHandler}
                endDateHandler={this.endDateHandler}
              />
            </div>

          </div>
          <hr className="hr-line" />
          {/* <!-- /end page title  --> */}

          {/* <!-- filters --> */}
          <div className="row mt-2">
            <div className="col-md-12">
              <div className="row">
                <div className="col">
                  <label className="text-dark">USER</label>
                  <select className="form-control blue"><option value="" className="">All users</option></select>
                </div>
                <div className="col">
                  <label className="text-dark">CLIENT</label>
                  <DropdownSelector name="client" options={this.state.clientItems} placeholder="All clients" className={"dashboard-page btn-block"} value={this.state.filters.client} onChange={this.changeHandlerDropdown} />
                </div>
                <div className="col">
                  <label className="text-dark">PROJECT</label>
                  <DropdownSelector name="project" options={this.state.projectItems} placeholder="All projects" className="dashboard-page btn-block" value={this.state.filters.project} onChange={this.changeHandlerDropdown} />
                </div>
                <div className="col">
                  <label className="text-dark">TASK</label>
                  <DropdownSelector name="project" options={this.state.taskItems} placeholder="All tasks" className="dashboard-page btn-block blue" value={this.state.filters.task} onChange={this.changeHandlerDropdown} />
                </div>
                <div className="col align-self-end">
                  <button type="button" className="btn btn-secondary float-md-right">clear</button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /end filters --> */}

          {/* <!-- views --> */}
          <div className="row mt-5">
            <div className="col-sm-12">
              <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-secondary">All</button>
                  <button type="button" className="btn btn-secondary">Projects</button>
                  <button type="button" className="btn btn-secondary">Tasks</button>
                  <button type="button" className="btn btn-secondary">Clients</button>
                  <button type="button" className="btn btn-secondary">Users</button>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-secondary">Email</button>
                  <button type="button" className="btn btn-secondary">Print</button>
                  <button type="button" className="btn btn-secondary">Excel</button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /end views --> */}

          {/* <ManageItems items={this.state.items} action={this.state.action} updatetitle="Update Client" /> */}

          {/* <!-- dashboard-items --> */}
          <ManageItems action={this.state.action} syncDashboardItems={this.syncDashboardItems} updatetitle="Update Track Log" />
          {/* <!-- /end dashboard-items --> */}

          {/* </div>
        <!-- /.container  --> */}
        </div>

        <PageBottom key="3" />
      </Fragment>);
  }
}

function mapStateToProps(state, prop) {
  return {
    //will get props from redux to our local props
    dashboardItems: state.getDashboardItems,
    projectItems: state.getProjectReducer,
    taskItems: state.getTaskReducer,
    clientItems: state.getClientReducer,
  }

}

function mapDispatchToProps(dispatch) {
  return {
    //will store whatever is in local state into redux state
    getDashboardItems: (state) => dispatch(getDashboardItems(state)),
    getProjects: (state) => dispatch(getProjects(state)),
    getTasks: (state) => dispatch(getTasks(state)),
    getClients: (state) => dispatch(getClients(state))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);