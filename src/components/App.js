import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import List from './List';
import BottomForm from './BottomForm';
import ListList from './ListList';
import ListInput from './ListInput';
import TopBar from './TopBar';
import themeColor from '../utils/themeColor';

const RootStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  background-color: #ddd;
  height: 100%;
  width: 100%;
  overflow: hidden;
  --w: ${props => props.$width};
  ${props => props.UI === 'listinput' && css`
    background: #ddd;
  `}
  ${props => (props.$c1 != null && props.$c2 != null) && css`
  background-image: linear-gradient(to right bottom,
      hsl(${props => 351 + props.$c1 * 360},81%,64%) 0%,
      hsl(${props => 351 + props.$c2 * 360},81%,64%) 100%);
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
    transition: transform .25s ease;
    will-change: transform;
    ${props => props.UI === 'lists' && css`
      transform: translate3d(-50%,-4em,0);
    `}
    ${props => props.UI === 'taskinput' && css`
      transform: translate3d(-50%,-5em,0);
    `}
    ${props => props.UI === 'listinput' && css`
      transform: translate3d(-50%,-8em,0);
    `}
  }
`;

// main App
class App extends Component {
  constructor (props) {
    super(props);
    this.state = { width: '600px' };
    this.limit = 680;
  }
  getWidth () {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > this.limit ? '600px' : '100vw - 4em';
  }
  componentDidMount () {
    themeColor(this.props.currentList, this.props.list);
    window.addEventListener('resize', e => this.setState({ width: this.getWidth() }));
    this.setState({ width: this.getWidth() });
  }
  componentDidUpdate () {
    themeColor(this.props.currentList, this.props.list);
  }
  render () {
    return (
      <RootStyle
        $width={this.state.width}
        $c1={this.props.currentList !== null ? this.props.list[this.props.currentList].c1 : null}
        $c2={this.props.currentList !== null ? this.props.list[this.props.currentList].c2 : null}
        UI={this.props.UI}>
        <List UI={this.props.UI} />
        <TopBar />
        <ListList />
        <BottomForm />
        <ListInput />
      </RootStyle>
    );
  }
}

const mapStateToProps = state => ({
  UI: state.UI,
  currentList: state.currentList,
  list: state.list
});

export default connect(mapStateToProps)(App);
