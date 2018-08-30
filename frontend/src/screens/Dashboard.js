import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/dashboard.css';
import { getDashboardItems } from '../actions/actions';
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import PageTop from './PageTop';
import PageBottom from './PageBottom';
import PageTitle from '../components/PageTitle';
import ManageItems from '../components/ManageItems';
import Button from '../components/Button';
import Input from '../components/Input';
import ToastrMsg from '../components/toastr';
import Pagination from "react-js-pagination";


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Dashboard',
      items: [{
        client:
          "first client",
        date:
          "08/29/2018",
        duration:
          "00:00:02",
        id:
          20,
        project:
          "second project",
        task:
          "forth tasks"
      }],
      filters: {
        userId: '',
        clientId: '',
        projectId: '',
        taskId: '1'
      },
      activePage: 15,
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

  clear = () => {
    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        name: '',
        email: '',
        phone: '',
        address: ''
      }
    }));
  }

  componentDidMount() {
    this.props.getDashboardItems(this.state.filters);
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillReceiveProps(nextProps) {
    let state = Object.assign({}, this.state);

    if (nextProps.getItems) {
      state.items.length = 0;
      state.items = nextProps.getItems;
    }
    this.setState(state)
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
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
          <div className="row justify-content-between blue mb-1">
            <div className="col-md-6">
              <h2>{this.state.title}</h2>
            </div>
            <div className="col-md-6 text-md-right">
              <div className="d-md-inline blue">Monday Sep 04 - Tuesday Sep 08</div>
              <button type="button" className="btn btn-secondary blue-background ml-2">
                <i className="fa fa-calendar-o mr-2" aria-hidden="true"></i>9/01/17-9/08/17
                    </button>
            </div>
          </div>
          <hr className="hr-line" />

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
                  <select className="form-control blue"><option value="" className="">All clients</option></select>
                </div>
                <div className="col">
                  <label className="text-dark">PROJECT</label>
                  <select className="form-control blue"><option value="" className="">All projects</option></select>
                </div>
                <div className="col">
                  <label className="text-dark">TASK</label>
                  <select className="form-control blue"><option value="" className="">All tasks</option></select>
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

          {/* <!-- dashboard-table --> */}
          <div className="row mt-3">
            <div className="col-sm-12">
              <table className="dashboard-table table table-responsive">
                <thead>
                  <tr>
                    <th>selected</th>
                    <th>user</th>
                    <th>Date</th>
                    <th>Project</th>
                    <th>Task</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>rate</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">-what-</th>
                    <th>joe</th>
                    <td>09/04/17<div className="d-inline text-medium-dark f-0-8">&nbsp;FRI</div></td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>9:04 am - 12:30 pm</td>
                    <td>01:55</td>
                    <td>40.00<div className="d-inline text-medium-dark f-0-8">&nbsp;USER</div></td>
                    <td>125.00</td>
                    <td><div className="btn-group float-right" role="group" aria-label="Third group">
                      <button type="button" className="btn btn-sm btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit the track log"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                      <button type="button" className="btn btn-sm btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete the track log"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </div></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <th>mike</th>
                    <td>09/04/17<div className="d-inline text-medium-dark f-0-8">&nbsp;SUN</div></td>
                    <td>Otto</td>
                    <td>@fat</td>
                    <td>9:04 am - 12:30 pm</td>
                    <td>00:45</td>
                    <td>400.00<div className="d-inline text-medium-dark f-0-8">&nbsp;TASK</div></td>
                    <td>100.00</td>
                    <td><div className="btn-group float-right" role="group" aria-label="Third group">
                      <button type="button" className="btn btn-sm btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit the track log"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                      <button type="button" className="btn btn-sm btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete the track log"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </div></td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <th>joe</th>
                    <td>09/04/17<div className="d-inline text-medium-dark f-0-8">&nbsp;MON</div></td>
                    <td>Otto</td>
                    <td>@twitter</td>
                    <td>9:04 am - 12:30 pm</td>
                    <td>02:50</td>
                    <td>20.00<div className="d-inline text-medium-dark f-0-8">&nbsp;SPECIAL</div></td>
                    <td>40.00</td>
                    <td><div className="btn-group float-right" role="group" aria-label="Third group">
                      <button type="button" className="btn btn-sm btn-secondary yellow-background f-1-2" data-toggle="tooltip" title="Edit the track log"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                      <button type="button" className="btn btn-sm btn-secondary red-background f-1-2" data-toggle="tooltip" title="Delete the track log"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </div></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>45:40</td>
                    <td>1200.00</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>

              {/* pagination */}
              <div className="row justify-content-center">
              <Pagination
                activePage={this.state.activePage} //Required
                itemsCountPerPage={10}
                totalItemsCount={450} //Required
                pageRangeDisplayed={5}
                onChange={this.handlePageChange} //Required
              />
              </div>
              {/* /end pagination */}
            </div>
          </div>
          {/* <!-- /end dashboard-table --> */}





          {/* </div>
        <!-- /.container  --> */}







          {/*         
          <div className="row">
            <div className="col-md-12">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className={`col-form-label`}>Name</label>
                  <Input type="text" name="name" onBlur={this.blurHandler} value={this.state.inputs.name} onChange={this.changeHandler} required={true} type="textarea" className={`form-control`} placeholder="client name" />
                </div>
                <div className="form-group col-md-6">
                  <label className="col-form-label">Email</label>
                  <Input type="text" name="email" onBlur={this.blurHandler} value={this.state.inputs.email} onChange={this.changeHandler} required={false} type="textarea" className="form-control" placeholder="client email" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="col-form-label">Phone</label>
                  <Input type="text" name="phone" onBlur={this.blurHandler} value={this.state.inputs.phone} onChange={this.changeHandler} required={false} type="textarea" className="form-control" placeholder="phone number" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-form-label">Address</label>
                <Input type="text" name="address" onBlur={this.blurHandler} value={this.state.inputs.address} onChange={this.changeHandler} required={false} type="textarea" className="form-control" placeholder="address" />
              </div>
              <div className="">
                <Button buttonName={'Clear'} onClick={this.clear} className="btn btn-secondary mr-2" type="button" />
                <Button buttonName={'Save Client'} onClick={this.saveItem} className="btn btn-primary blue-background" type="button" />
              </div>
            </div>
          </div>
          <hr className="hr-line mt-1 mt-5" />
          <ManageItems items={this.state.items} action={this.state.action} updatetitle="Update Client" /> */}


        </div>

        <PageBottom key="3" />
      </Fragment>);
  }
}

function mapStateToProps(state, prop) {
  return {
    //will get props from redux to our local props
    dashboardItems: state.manageReducer.getDashboardItems
  }

}

function mapDispatchToProps(dispatch) {
  return {
    //will store whatever is in local state into redux state
    getDashboardItems: (state) => dispatch(getDashboardItems(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);