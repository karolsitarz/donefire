import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import List from './List';
import BottomForm from './BottomForm';
import ListList from './ListList';
import ListInput from './ListInput';
import TopBar from './TopBar';

const RootStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
  background-color: #ddd;
  /* background-image: linear-gradient(to right bottom, hsla(351, 70%, 90%, 1) 0%, hsla(216, 70%, 90%, 1) 100%); */
  background-image: linear-gradient(to right bottom,
      hsl(${props => 351 + props.$c1 * 360},81%,64%) 0%,
      hsl(${props => 351 + props.$c2 * 360},81%,64%) 100%);
  height: 100%;
  width: 100%;
  overflow: hidden;
  ${props => props.UI === 'listinput' && css`
    background: #ddd;
  `}
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
    ${props => props.UI === 'taskinput' && css`
      transform: translate3d(-50%,-2em,0);
    `}
    ${props => props.UI === 'listinput' && css`
      transform: translate3d(-50%,-5em,0);
    `}
  }
`;

// main App
const App = props => (
  <RootStyle
    $c1={props.currentList !== null ? props.list[props.currentList].c1 : '#ddd'}
    $c2={props.currentList !== null ? props.list[props.currentList].c2 : '#ddd'}
    UI={props.UI}>
    <List UI={props.UI} />
    <TopBar />
    <BottomForm />
    <ListInput />
    <ListList />
  </RootStyle>
);

const mapStateToProps = state => ({
  UI: state.UI,
  currentList: state.currentList,
  list: state.list
});

export default connect(mapStateToProps)(App);
