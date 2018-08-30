import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { toggleNavSide } from '../actions/actions';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './Main';
import NavbarSide from '../components/NavbarSide';
import Track from './Track';
import manageClients from './ManageClients';
import manageProjects from './ManageProjects';
import manageTasks from './ManageTasks';
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
            <div  className={`${this.props.navside ? 'shrinkmain' : 'expandmain'}`} >
              <Route exact path="/" component={Track} />
              <Route exact path="/track" component={Track} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/navbarSide" component={NavbarSide} />
              <Route exact path="/manageClients" component={manageClients} />
              <Route exact path="/manageProjects" component={manageProjects} />
              <Route exact path="/manageTasks" component={manageTasks} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
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