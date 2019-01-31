import React from 'react';
import styled from 'styled-components';

import List from './List';
import BottomForm from './BottomForm';
import ListList from './ListList';
import TopBar from './TopBar';

const RootStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
  background-color: #f7f7f7;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

// main App
export default props => (
  <RootStyle>
    <ListList />
    <TopBar />
    <List />
    <BottomForm />
  </RootStyle>
);
