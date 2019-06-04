import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';
import { Check as CheckIcon } from '../style/icons';
import pointer from '../utils/detectPointer';

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
    left: 50%;
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
    const { todo } = this;
    let deleteInit = false;
    let deleteMove = false;

    todo.setupTouchEvents({ delay: 300, scrolling: true });
    todo.addEventListener('touchtap', e => {
      this.props.toggleTodo(this.props.id);
    });
    todo.addEventListener('touchpress', e => {
      deleteInit = true;
      this.setState({ moving: true });
    });

    let start;
    let end;

    this.pointerMoveEvent = e => {
      end = pointer.clientCObj(e);
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
    };

    this.pointerEndEvent = e => {
      document.removeEventListener(pointer.move, this.pointerMoveEvent);
      document.removeEventListener(pointer.end, this.pointerEndEvent);

      this.setState({ x: 0, delete: false, moving: false });

      if (deleteMove && end.clientX - start.clientX > 50) {
        this.props.deleteTodo(this.props.id);
      }

      deleteInit = false;
      deleteMove = false;
    };

    todo.addEventListener(pointer.start, e => {
      document.addEventListener(pointer.move, this.pointerMoveEvent, { passive: true });
      document.addEventListener(pointer.end, this.pointerEndEvent);
    });
  }
  componentWillUnmount () {
    this.todo.deleteTouchEvents();
  }
  render () {
    return (
      <StyledTodo
        ref={e => (this.todo = e)}
        $moving={this.state.moving}
        $delete={this.state.delete}
        done={this.props.done}
        $value={this.props.value} >
        <CheckboxHitbox>
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
