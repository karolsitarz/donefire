import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import List from './List';
import BottomForm from './BottomForm';
import ListList from './ListList';
import TopBar from './TopBar';

const RootStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
  background-color: #ddd;
  height: 100%;
  width: 100%;
  overflow: hidden;
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 300vmax;
    height: 300vmax;
    pointer-events: none;
    background-color: #f7f7f7;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate3d(-50%,0,0);
    transition: transform .3s ease;
    ${props => props.UI === 'lists' && css`
      transform: translate3d(-50%,-1em,0);
    `}
    ${props => props.UI === 'input' && css`
      transform: translate3d(-50%,-2em,0);
    `}
  }
`;

// main App
const App = props => (
  <RootStyle UI={props.UI}>
    <List />
    <TopBar />
    <BottomForm />
    <ListList />
  </RootStyle>
);

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps)(App);
