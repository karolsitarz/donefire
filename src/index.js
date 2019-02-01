import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import { save, load } from 'redux-localstorage-simple';
import './utils/touchEvents';

import GlobalStyles from './style/global-styles';
import reducers from './reducers';
import App from './components/App';

const store = applyMiddleware(save({
  states: ['todo', 'list', 'currentList'],
  namespace: 'donefire',
  debounce: 500
}))(createStore)(reducers, load({
  states: ['todo', 'list', 'currentList'],
  namespace: 'donefire',
  disableWarnings: true
}));

ReactDOM.render((
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>),
document.getElementById('container'));
