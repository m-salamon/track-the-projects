import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './main';
import NavbarSide from './components/NavbarSide';
import Track from './screens/track';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Main} />
            <Route exact path="/navbarSide" component={NavbarSide} />
            <Route exact path="/track" component={Track} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
