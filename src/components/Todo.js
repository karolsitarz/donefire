import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';
import { Check as CheckIcon } from '../style/icons';

const StyledTodo = styled.div`
  display: flex;
  min-height: 4em;
  box-shadow: inset 0 -1px #00000008;
  align-items: center;
  order: ${props => (180 - props.$value).toFixed(0)};
  transition:
    filter .25s ease,
    transform .25s ease,
    opacity .25s ease;
  will-change: transform;
  transform-origin: .5em 50%;
  opacity: ${props => !props.done ? 1 : 0.5};
  padding: 1em 0;
  flex-shrink: 0;
  opacity: ${props => props.$delete ? 0.2 : ''};
  filter: ${props => props.$moving ? 'grayscale(1)' : ''};
  transform: ${({ $moving, $delete }) => $moving && $delete
    ? 'scale(0.9) translateZ(0) translateX(50px)'
    : $moving
      ? 'scale(0.9) translateZ(0)'
      : $delete ? 'translateX(50px) translateZ(0)' : 'translateZ(0)'};
`;

const Checkbox = styled.div`
  height: 1em;
  width: 1em;
  margin-right: 1em;
  border-radius: .25em;
  background-image:
    linear-gradient(to right bottom,
      hsl(${props => 171 + 1 * props.$value}, 81%, 64%) 0%,
      hsl(${props => -146 + 1 * props.$value}, 100%, 72%) 100%);
  &::before {
    content: "";
    height: .75em;
    width: .75em;
    background: #fff;
    display: block;
    border-radius: .15em;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: transform .25s ease;
    will-change: transform;
    transform: ${props => !props.done ? 'translate3d(-50%, -50%,0) scale(1)' : 'translate3d(-50%, -50%,0) scale(0)'};
  }

  > svg {
    fill: #fff;
    height: 70%;
    width: 70%;
    position: absolute;
    left: 50%
    top: 50%;
    pointer-events: none;
    transform: ${props => !props.done ? 'translate3d(-50%, -50%,0) scale(0)' : 'translate3d(-50%, -50%,0) scale(1)'};
    transition: transform .25s ease;
  }
`;

const CheckboxHitbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const TodoSpan = styled.span`
  width: 100%;
  flex-grow: 1;
  font-size: .75em;
  text-overflow: ellipsis;
  overflow: hidden;
`;

class Todo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      delete: false,
      moving: false
    };
  }
  componentDidMount () {
    const { checkbox } = this;
    let deleteInit = false;
    let deleteMove = false;

    checkbox.setupTouchEvents({ delay: 300, scrolling: true });
    checkbox.addEventListener('touchtap', e => {
      this.props.toggleTodo(this.props.id);
    });
    checkbox.addEventListener('touchpress', e => {
      // if (window.confirm('delete?')) {
      //   this.props.deleteTodo(this.props.id);
      // }
      deleteInit = true;
      this.setState({ moving: true });
    });

    let start;
    let end;

    checkbox.addEventListener('touchmove', e => {
      end = e.touches[0];
      if (deleteInit) {
        deleteInit = false;
        deleteMove = true;
        start = end;
      }
      if (deleteMove) {
        this.setState({ x: end.clientX - start.clientX });
        if (end.clientX - start.clientX > 50) {
          this.setState({ delete: true });
        } else {
          this.setState({ delete: false });
        }
      }
    }, { passive: true });
    checkbox.addEventListener('touchend', e => {
      this.setState({ x: 0, delete: false, moving: false });

      if (deleteMove && end.clientX - start.clientX > 50) {
        this.props.deleteTodo(this.props.id);
      }

      deleteInit = false;
      deleteMove = false;
    });
  }
  componentWillUnmount () {
    this.checkbox.deleteTouchEvents();
  }
  render () {
    return (
      <StyledTodo
        $moving={this.state.moving}
        $delete={this.state.delete}
        done={this.props.done}
        $value={this.props.value} >
        <CheckboxHitbox
          ref={e => (this.checkbox = e)} >
          <Checkbox
            done={this.props.done}
            $value={this.props.value}>
            <CheckIcon />
          </Checkbox>
        </CheckboxHitbox>
        <TodoSpan>{this.props.text}</TodoSpan>
      </StyledTodo>
    );
  }
}

export default connect(null, { toggleTodo, deleteTodo })(Todo);
