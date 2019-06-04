import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { switchToUI, deleteList, currentListChange, listInputDataChange } from '../actions';
import { ArrowDown as ArrowDownIcon, Plus as PlusIcon, Trash as TrashIcon } from '../style/icons';
import TrashButton from './TrashButton';
import pointer from '../utils/detectPointer';

const StyledTopBar = styled.div`
  height: 2em;
  flex-shrink: 0;
  margin-top: 2em;
  max-width: 600px;
  width: 100%;
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
  transition: opacity .25s ease;
  > svg {
    pointer-events: none;
  }
  &::before {
    content: "";
    position: absolute;
    display: block;
    pointer-events: none;
    height: 100%;
    width: 100%;
    transition:
      opacity .25s ease,
      transform .25s ease;
    will-change: transform;
    border-radius: 50%;
    background: #0001;
    opacity: 0;
    transform: scale(0.25) translateZ(0);
  }
`;

const ArrowButton = styled(MiniButton)`
  left: 0;
  > svg {
    transform: ${props => props.toggle === 'lists' ? 'rotate(-180deg) translateZ(0)' : ''};
    transform: ${props => props.toggle === 'listinput' ? 'rotate(-90deg) translateZ(0)' : ''};
    /* transition: transform .25s cubic-bezier(0.33, 0.37, 0.16, 2.35); */
    transition: transform .25s ease;
    will-change: transform;
  }
  &::before {
    ${props => (props.toggle === 'lists' || props.toggle === 'listinput') && css`
      opacity: 1;
      transform: scale(1) translateZ(0);
    `}
  }
`;

const PlusButton = styled(MiniButton)`
  right: 0;
  > svg {
    transform: ${props => props.toggle === 'taskinput' ? 'rotate(45deg) translateZ(0);' : 'translateZ(0);'};
    transition: transform .25s ease;
  }
  &::before {
    ${props => props.toggle === 'taskinput' && css`
      opacity: 1;
      transform: scale(1) translateZ(0);
    `}
  }
  ${props => props.toggle === 'listinput' && css`
    pointer-events: none;
    opacity: 0;
  `}
`;
class TopBar extends Component {
  componentDidMount () {
    const { touchbar } = this;

    const changeToList = (skip = 1) => {
      const { currentListChange, currentList } = this.props;
      const lists = Object.keys(this.props.list);
      const index = lists.findIndex(c => c === currentList);

      // if none
      if (lists.length === 0) return;
      // if out of bounds
      if (index === -1 && skip === 1) {
        currentListChange(lists[0]);
        // if currently none and go down
      } else if (index === -1 && skip === -1) {
        currentListChange(lists[lists.length - 1]);
      } else if (index + skip < 0 ||
          index + skip > lists.length - 1) {
        currentListChange(currentList);
        // if currently none and go up
      } else {
        currentListChange(lists[index + skip]);
      }
    };
    let touchStart = { x: 0, y: 0 };
    let touchEnd = { x: 0, y: 0 };

    touchbar.addEventListener(pointer.start, e => {
      touchStart = {
        x: pointer.clientX(e),
        y: pointer.clientY(e)
      };
      touchEnd = {
        x: pointer.clientX(e),
        y: pointer.clientY(e)
      };

      document.addEventListener(pointer.move, this.pointerMoveEvent, { passive: true });
      document.addEventListener(pointer.end, this.pointerEndEvent);
    }, { passive: true });

    this.pointerMoveEvent = e => {
      touchEnd = {
        x: pointer.clientX(e),
        y: pointer.clientY(e)
      };
    };

    this.pointerEndEvent = e => {
      document.removeEventListener(pointer.move, this.pointerMoveEvent);
      document.removeEventListener(pointer.end, this.pointerEndEvent);

      // distance
      if ((touchEnd.x - touchStart.x) ** 2 + (touchEnd.y - touchStart.y) ** 2 > 6000) {
        const angle = Math.atan2((touchEnd.y - touchStart.y), (touchEnd.x - touchStart.x));

        // RIGHT
        if (angle < 0.5 && angle > -0.5) {
          if (this.props.UI !== 'listinput') {
            changeToList(1);
          }
        // UP
        } else if (angle < Math.PI / -2 + 0.5 && angle > Math.PI / -2 - 0.5) {
          if (this.props.UI === '') {
            this.props.switchToUI('lists');
          } else if (this.props.UI === 'lists') {
            this.props.listInputDataChange({
              name: '',
              c1: 0.5,
              c2: 0.75,
              listID: null
            });
            this.props.switchToUI('listinput');
          }
        // DOWN
        } else if (angle < Math.PI / 2 + 0.5 && angle > Math.PI / 2 - 0.5) {
          if (this.props.UI === 'lists') {
            this.props.switchToUI('lists');
          } else if (this.props.UI === 'listinput') {
            this.props.switchToUI('lists');
          } else if (this.props.UI === 'taskinput') {
            this.props.switchToUI('taskinput');
          }
        // LEFT
        } else if ((angle < -Math.PI + 0.5 && angle < Math.PI - 0.5) || (angle > -Math.PI + 0.5 && angle > Math.PI - 0.5)) {
          if (this.props.UI !== 'listinput') {
            changeToList(-1);
          }
        }
      }
    };
  }
  render () {
    let title = 'all tasks';
    if (this.props.currentList !== null) title = this.props.list[this.props.currentList].name || '';
    if (this.props.UI === 'listinput') {
      title = !this.props.edit ? 'a new list' : 'edit list';
    }

    return (
      <StyledTopBar
        ref={e => (this.touchbar = e)} >
        <ArrowButton
          toggle={this.props.UI}
          onClick={e => this.props.switchToUI('lists')}>
          <ArrowDownIcon />
        </ArrowButton>
        <ListName>
          {title}
        </ListName>
        <PlusButton
          currentList={this.props.currentList}
          toggle={this.props.UI}
          onClick={e => this.props.switchToUI('taskinput')}>
          <PlusIcon />
        </PlusButton>
        <TrashButton>
          <TrashIcon />
        </TrashButton>
      </StyledTopBar>
    );
  }
}

const mapStateToProps = state => ({
  currentList: state.currentList,
  UI: state.UI,
  edit: state.listInputData.listID,
  list: state.list
});

export default connect(mapStateToProps, { switchToUI, deleteList, currentListChange, listInputDataChange })(TopBar);
