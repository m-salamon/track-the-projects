import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from '../src/screens/App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store';
import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>,
  
    document.getElementById('root')
);
registerServiceWorker();
