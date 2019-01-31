import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { toggleUILists, toggleUIToggle } from '../actions';
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

const Animated = styled.div`
  pointer-events: none;
  width: inherit;
  height: inherit;
  fill: inherit;
`;

const AnimatedArrowDown = styled(Animated)``;

const AnimatedPlus = styled(Animated)``;

const MiniButton = styled.div`
  width: 2em;
  height: 2em;
  fill: #666;
  > ${AnimatedArrowDown} {
    transform: ${props => !props.toggle ? 'scaleY(1)' : 'scaleY(-1)'};
    transition: transform .3s cubic-bezier(0.33, 0.37, 0.16, 2.35);
  }
  > ${AnimatedPlus} {
    transform: ${props => !props.toggle ? 'rotate(0deg)' : 'rotate(45deg)'};
    transition: transform .3s ease;
  }
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
    ${props => props.toggle && css`
      opacity: 1;
      transform: scale(1);
    `}
  }
`;

const TopBar = props => (
  <StyledTopBar>
    <MiniButton
      toggle={props.UI === 'lists'}
      onClick={e => props.toggleUILists()}>
      <AnimatedArrowDown>
        <ArrowDownIcon />
      </AnimatedArrowDown>
    </MiniButton>
    <ListName>
      {props.currentList || 'no list'}
    </ListName>
    <MiniButton
      toggle={props.UI === 'taskinput'}
      onClick={e => props.toggleUIToggle()}>
      <AnimatedPlus>
        <PlusIcon />
      </AnimatedPlus>
    </MiniButton>
  </StyledTopBar>
);

const mapStateToProps = state => ({
  currentList: state.currentList,
  UI: state.UI
});

export default connect(mapStateToProps, { toggleUILists, toggleUIToggle })(TopBar);
