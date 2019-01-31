import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { toggleUILists } from '../actions';
import { Menu as MenuIcon, ArrowDown as ArrowDownIcon } from '../style/icons';

const StyledTopBar = styled.div`
  height: 2em;
  flex-shrink: 0;
  display: flex;
`;

const MiniButton = styled.div`
  width: 2em;
  height: 2em;
  fill: #666;
  transition: transform .3s cubic-bezier(0.33, 0.37, 0.16, 2.35);
  transform: ${props => !props.listsOpen ? 'scaleY(1)' : 'scaleY(-1)'};
`;
const ListName = styled.span`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
`;

const TopBar = props => (
  <StyledTopBar>
    <MiniButton>
      <MenuIcon />
    </MiniButton>
    <ListName>
      {props.currentList || 'no list'}
    </ListName>
    <MiniButton
      listsOpen={props.listsOpen}
      onClick={e => props.toggleUILists()}>
      <ArrowDownIcon />
    </MiniButton>
  </StyledTopBar>
);

const mapStateToProps = state => ({
  currentList: state.currentList,
  listsOpen: state.UI.lists
});

export default connect(mapStateToProps, { toggleUILists })(TopBar);
