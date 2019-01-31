import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';

import GlobalStyles from './style/global-styles';
import reducers from './reducers';

import { Menu as MenuIcon, ArrowDown as ArrowDownIcon } from './style/icons';
import List from './components/List';
import BottomForm from './components/BottomForm';

const RootStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
  background-color: #f7f7f7;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const TopBar = styled.div`
  height: 2em;
  flex-shrink: 0;
  display: flex;
`;

const MiniButton = styled.div`
  width: 2em;
  height: 2em;
  fill: #666;
`;
const ListName = styled.span`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  font-weight: bold;
`;

// main App
const App = props => (
  <RootStyle>
    <GlobalStyles />
    <TopBar>
      <MiniButton>
        <MenuIcon />
      </MiniButton>
      <ListName>
        siemano
      </ListName>
      <MiniButton>
        <ArrowDownIcon />
      </MiniButton>
    </TopBar>
    <List />
    <BottomForm />
  </RootStyle>
);

ReactDOM.render((
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>),
document.getElementById('container'));
