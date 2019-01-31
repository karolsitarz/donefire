import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Menu as MenuIcon, ArrowDown as ArrowDownIcon } from '../style/icons';
import List from '../components/List';
import BottomForm from '../components/BottomForm';
import ListList from '../components/ListList';
import { toggleUILists } from '../actions';

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
    <ListList />
    <TopBar>
      <MiniButton>
        <MenuIcon />
      </MiniButton>
      <ListName>
        siemano
      </ListName>
      <MiniButton onClick={e => props.toggleUILists()}>
        <ArrowDownIcon />
      </MiniButton>
    </TopBar>
    <List />
    <BottomForm />
  </RootStyle>
);

export default connect(null, { toggleUILists })(App);
