import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { switchToUI, currentListChange, listInputDataChange } from '../actions';

const StyledListTile = styled.div`
  height: 4em;
  width: 6em;
  border-radius: 1em;
  background-color: #eeeeee;
  margin-right: 1em;
  flex-shrink: 0;
  padding: 1em;
  display: flex;
  align-items: flex-end;
  transition: 
    opacity .3s ease,
    transform .3s ease;
  > span {
    font-size: .75em;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1em;
  }
  background: 
    linear-gradient(to right bottom,
      hsl(${props => 351 + props.$c1 * 360},81%,64%) 0%,
      hsl(${props => 351 + props.$c2 * 360},81%,64%) 100%);
  color: ${props => props.$light ? '#fff' : ''};
  ${props => props.$selected && css`
    transform: scale(0.9);
    opacity: 0.5;
  `}
`;

class ListTile extends Component {
  componentDidMount () {
    const { tileRef } = this;

    tileRef.setupTouchEvents();

    tileRef.addEventListener('touchpress', e => {
      this.props.listInputDataChange({
        name: this.props.data.name,
        c1: this.props.data.c1,
        c2: this.props.data.c2,
        listID: this.props.data.id
      });
      this.props.switchToUI('listinput');
    });
    tileRef.addEventListener('touchtap', e => {
      this.props.currentListChange(this.props.data.id);
    });
  }
  componentWillUnmount () {
    this.tileRef.deleteTouchEvents();
  }
  render () {
    const { id, name, c1, c2, light } = this.props.data;
    const { currentList } = this.props;

    return (
      <StyledListTile
        ref={e => (this.tileRef = e)}
        $c1={c1}
        $c2={c2}
        $light={light}
        $selected={id === currentList}>
        <span>{name}</span>
      </StyledListTile>
    );
  }
}

const mapStateToProps = state => ({
  currentList: state.currentList
});

export default connect(mapStateToProps, { switchToUI, currentListChange, listInputDataChange })(ListTile);
