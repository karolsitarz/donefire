import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { switchToUI } from '../actions';
import { ArrowDown as ArrowDownIcon, Plus as PlusIcon } from '../style/icons';

const StyledTopBar = styled.div`
  height: 2em;
  flex-shrink: 0;
  display: flex;
  margin-top: 2em;
`;

const ListName = styled.span`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
`;

const MiniButton = styled.div`
  width: 2em;
  height: 2em;
  fill: #666;
  transition: opacity .3s ease;
  &::before {
    content: "";
    position: absolute;
    display: block;
    pointer-events: none;
    height: 100%;
    width: 100%;
    transition:
      opacity .3s ease,
      transform .3s ease;
    border-radius: 50%;
    background: #0001;
    opacity: 0;
    transform: scale(0.25);
  }
`;

const ArrowButton = styled(MiniButton)`
  > svg {
    transform: ${props => props.toggle === 'lists' ? 'rotate(-180deg)' : ''};
    transform: ${props => props.toggle === 'listinput' ? 'rotate(-90deg)' : ''};
    /* transition: transform .3s cubic-bezier(0.33, 0.37, 0.16, 2.35); */
    transition: transform .3s ease;
  }
  &::before {
    ${props => (props.toggle === 'lists' || props.toggle === 'listinput') && css`
      opacity: 1;
      transform: scale(1);
    `}
  }
`;

const PlusButton = styled(MiniButton)`
  > svg {
    transform: ${props => props.toggle === 'taskinput' ? 'rotate(45deg)' : ''};
    transition: transform .3s ease;
  }
  &::before {
    ${props => props.toggle === 'taskinput' && css`
      opacity: 1;
      transform: scale(1);
    `}
  }
  ${props => (props.toggle === 'listinput' || props.currentList == null) && css`
    pointer-events: none;
    opacity: 0;
  `}
`;

const TopBar = props => (
  <StyledTopBar>
    <ArrowButton
      toggle={props.UI}
      onClick={e => props.switchToUI('lists')}>
      <ArrowDownIcon />
    </ArrowButton>
    <ListName>
      {props.currentList || 'no list available'}
    </ListName>
    <PlusButton
      currentList={props.currentList}
      toggle={props.UI}
      onClick={e => props.switchToUI('taskinput')}>
      <PlusIcon />
    </PlusButton>
  </StyledTopBar>
);

const mapStateToProps = state => ({
  currentList: state.currentList,
  UI: state.UI
});

export default connect(mapStateToProps, { switchToUI })(TopBar);
