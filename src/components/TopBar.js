import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { toggleUILists, toggleUIToggle } from '../actions';
import { ArrowDown as ArrowDownIcon, Plus as PlusIcon } from '../style/icons';

const StyledTopBar = styled.div`
  height: 2em;
  flex-shrink: 0;
  display: flex;
  margin-top: 2em;
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
`;

const AnimatedArrowDown = styled(MiniButton)`
  transform: ${props => !props.toggle ? 'scaleY(1)' : 'scaleY(-1)'};
  transition: transform .3s cubic-bezier(0.33, 0.37, 0.16, 2.35);
  pointer-events: none;
`;

const AnimatedPlus = styled(MiniButton)`
  transform: ${props => !props.toggle ? 'rotate(0deg)' : 'rotate(45deg)'};
  transition: transform .3s ease;
  pointer-events: none;
`;

const TopBar = props => (
  <StyledTopBar>
    <MiniButton onClick={e => props.toggleUILists()}>
      <AnimatedArrowDown toggle={props.UI === 'lists'}>
        <ArrowDownIcon />
      </AnimatedArrowDown>
    </MiniButton>
    <ListName>
      {props.currentList || 'no list'}
    </ListName>
    <MiniButton onClick={e => props.toggleUIToggle()}>
      <AnimatedPlus toggle={props.UI === 'input'}>
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
