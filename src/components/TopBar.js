import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { switchToUI, deleteList, currentListChange } from '../actions';
import { ArrowDown as ArrowDownIcon, Plus as PlusIcon, Trash as TrashIcon } from '../style/icons';

const StyledTopBar = styled.div`
  height: 2em;
  flex-shrink: 0;
  margin-top: 2em;
`;

const ListName = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  position: absolute;
  height: 100%;
  width: calc(100% - (4em / 0.75));
  left: calc(2em / 0.75);
`;

const MiniButton = styled.div`
  width: 2em;
  height: 2em;
  fill: #666;
  position: absolute;
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
  left: 0;
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
  right: 0;
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
  ${props => props.toggle === 'listinput' && css`
    pointer-events: none;
    opacity: 0;
  `}
`;
const TrashButton = styled(MiniButton)`
  right: 0;
  ${props => (props.toggle !== 'listinput' || props.edit === null) && css`
    pointer-events: none;
    opacity: 0;
  `}
`;

const TopBar = props => {
  let title = 'all tasks';
  if (props.currentList !== null) title = props.list[props.currentList].name || '';
  if (props.UI === 'listinput') {
    title = !props.edit ? 'a new list' : 'edit list';
  }

  return (
    <StyledTopBar>
      <ArrowButton
        toggle={props.UI}
        onClick={e => props.switchToUI('lists')}>
        <ArrowDownIcon />
      </ArrowButton>
      <ListName>
        {title}
      </ListName>
      <PlusButton
        currentList={props.currentList}
        toggle={props.UI}
        onClick={e => props.switchToUI('taskinput')}>
        <PlusIcon />
      </PlusButton>
      <TrashButton
        edit={props.edit}
        toggle={props.UI}
        onClick={e => {
          if (window.confirm('delete?')) {
            if (props.currentList === props.edit) {
              props.currentListChange(props.currentList);
            }
            props.deleteList(props.edit);
            props.switchToUI('lists');
          }
        }}>
        <TrashIcon />
      </TrashButton>
    </StyledTopBar>
  );
};

const mapStateToProps = state => ({
  currentList: state.currentList,
  UI: state.UI,
  edit: state.listInputData.listID,
  list: state.list
});

export default connect(mapStateToProps, { switchToUI, deleteList, currentListChange })(TopBar);
