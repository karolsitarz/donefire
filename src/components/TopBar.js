import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { switchToUI, deleteList, currentListChange, listInputDataChange } from '../actions';
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
    /* transition: transform .25s cubic-bezier(0.33, 0.37, 0.16, 2.35); */
    transition: transform .25s ease;
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
    transition: transform .25s ease;
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
  &::after {
    content: "long press to delete";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(10em,-100%);
    font-size: 0.6em;
    text-align: center;
    white-space: nowrap;
    background: #e7e7e7;
    padding: 1em 3em;
    border-radius: 3em;
    opacity: 0;
    pointer-events: none;
    transition:
      transform .25s ease,
      opacity .25s ease;
    ${props => props.$tooltip && css`
      opacity: 1;
      transform: translate(5em,-100%);
    `}
  }
`;

class TopBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tooltip: false
    };
  }
  componentDidMount () {
    const { trashButton, touchbar } = this;
    trashButton.setupTouchEvents();
    trashButton.addEventListener('touchpress', e => {
      // if deleting current list, toggle to "no list" view
      if (this.props.currentList === this.props.edit) {
        this.props.currentListChange(this.props.currentList);
      }
      this.props.deleteList(this.props.edit);
      this.props.switchToUI('lists');
    });
    trashButton.addEventListener('touchtap', e => {
      this.setState({ tooltip: true });
    });

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
    touchbar.addEventListener('touchstart', e => {
      touchStart = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      touchEnd = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }, { passive: true });

    touchbar.addEventListener('touchmove', e => {
      touchEnd = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }, { passive: true });

    touchbar.addEventListener('touchend', e => {
      // distance
      if ((touchEnd.x - touchStart.x) ** 2 + (touchEnd.y - touchStart.y) ** 2 > 6000) {
        const angle = Math.atan2((touchEnd.y - touchStart.y), (touchEnd.x - touchStart.x));
        console.log(angle);

        // RIGHT
        if (angle < 0.5 && angle > -0.5) {
          // console.log('right');
          changeToList(1);
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
        } else if (angle < Math.PI / 2 - 0.5 && angle > Math.PI / 2 + 0.5) {
          if (this.props.UI === 'lists') {
            console.log('down');
            this.props.switchToUI('');
          }
        // LEFT
        } else if ((angle < -Math.PI + 0.5 && angle < Math.PI - 0.5) || (angle > -Math.PI + 0.5 && angle > Math.PI - 0.5)) {
          // console.log('left');
          changeToList(-1);
        }
      }
    });
  }
  componentWillUnmount () {
    this.trashButton.deleteTouchEvents();
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
          onClick={e => {
            this.props.switchToUI('lists');
            this.setState({ tooltip: false });
          }}>
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
        <TrashButton
          $tooltip={this.state.tooltip}
          ref={e => (this.trashButton = e)}
          edit={this.props.edit}
          toggle={this.props.UI} >
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
