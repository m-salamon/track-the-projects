import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './main';
import NavbarSide from '../components/NavbarSide';
import Track from './Track';
import manageClients from './ManageClients';
import manageProjects from './ManageProjects';
import manageTasks from './ManageTasks';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavbarSide />
            <div className="" style={{marginLeft: '250px', marginRight: '20px'}}>
            <Route exact path="/" component={Track} />
            <Route exact path="/track" component={Track} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/navbarSide" component={NavbarSide} />
            <Route exact path="/manageClients" component={manageClients} />
            <Route exact path="/manageProjects" component={manageProjects} />
            <Route exact path="/manageTasks" component={manageTasks} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
