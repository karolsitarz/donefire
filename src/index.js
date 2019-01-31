import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';

import GlobalStyles from './style/global-styles';
import reducers from './reducers';

import App from './components/App';

ReactDOM.render((
  <Provider store={createStore(reducers)}>
    <GlobalStyles />
    <App />
  </Provider>),
document.getElementById('container'));
