import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { deleteList, currentListChange, switchToUI } from '../actions';

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

const StyledTrashButton = styled(MiniButton)`
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
  will-change: transform;
  transition:
    transform .25s ease,
    opacity .25s ease;
  ${props => props.$tooltip && css`
    opacity: 1;
    transform: translate3d(5em,-100%,0);
  `}
}
`;

class TrashButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tooltip: false
    };
  }
  componentDidMount () {
    const { trashButton } = this;
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
      window.clearTimeout(this.timeout);
      this.timeout = window.setTimeout(e => {
        this.setState({ tooltip: false });
        window.clearTimeout(this.timeout);
      }, 2000);
    });
  }
  render () {
    return (
      <StyledTrashButton
        $tooltip={this.state.tooltip}
        ref={e => (this.trashButton = e)}
        edit={this.props.edit}
        toggle={this.props.UI} >
        {this.props.children}
      </StyledTrashButton>
    );
  }
}

const mapStateToProps = state => ({
  currentList: state.currentList,
  UI: state.UI,
  edit: state.listInputData.listID
});

export default connect(mapStateToProps, { deleteList, currentListChange, switchToUI })(TrashButton);
