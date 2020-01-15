import React, { Component } from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router } from 'react-router-dom';

import RouteLayer from './components/RouteLayer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import authreducer from './reducers/authreducer';
import userpostreducer from './reducers/userpostreducer';
import flashmessagereducer from './reducers/flashmessagereducer';

const store = createStore(combineReducers({
  authreducer,
  userpostreducer,
  flashmessagereducer
}));
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <Provider store={store}>
          <Router>
            <RouteLayer/>
          </Router>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
