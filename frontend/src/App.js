import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './main';
import NavbarSide from './components/NavbarSide';
import Track from './screens/Track';
import manageClients from './screens/ManageClients';
import manageProjects from './screens/ManageProjects';
import manageTasks from './screens/ManageTasks';
import Login from './screens/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Main} />
            <Route exact path="/navbarSide" component={NavbarSide} />
            <Route exact path="/track" component={Track} />
            <Route exact path="/manageClients" component={manageClients} />
            <Route exact path="/manageProjects" component={manageProjects} />
            <Route exact path="/manageTasks" component={manageTasks} />

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
