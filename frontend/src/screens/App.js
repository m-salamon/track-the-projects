import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { toggleNavSide } from '../actions/actions';
import { BrowserRouter, Route } from 'react-router-dom';
import NavbarSide from '../components/NavbarSide';
import Track from './Track';
import ManageClients from './ManageClients';
import ManageProjects from './ManageProjects';
import ManageTasks from './ManageTasks';
import Login from './Login';
import '../css/App.css'
import Dashboard from "./Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavbarSide />
            <div className={`${this.props.navside ? 'shrinkmain' : 'expandmain'}`} >
              <Route exact path="/" component={Track} />
              <Route exact path="/track" component={Track} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/navbarSide" component={NavbarSide} />
              <Route exact path="/manageClients" component={ManageClients} />
              <Route exact path="/manageProjects" component={ManageProjects} />
              <Route exact path="/manageTasks" component={ManageTasks} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

function mapStateToProps(state, prop) {
  return {
    navside: state.toggleNavSide,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //toggleNavSide: (state) => dispatch(toggleNavSide(state)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);