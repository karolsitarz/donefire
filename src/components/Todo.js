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
  transition: opacity .3s ease;
  opacity: ${props => !props.done ? 1 : 0.5};
  padding: 1em 0;
  flex-shrink: 0;
`;

const Checkbox = styled.div.attrs(({ $x, $y }) => ({
  style: {
    transform: `translate(${$x}px, ${$y}px)`
  }
}))`
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
    transition: transform .3s ease;
    transform: ${props => !props.done ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)'};
  }

  > svg {
    fill: #fff;
    height: 70%;
    width: 70%;
    position: absolute;
    left: 50%
    top: 50%;
    pointer-events: none;
    transform: ${props => !props.done ? 'translate(-50%, -50%) scale(0)' : 'translate(-50%, -50%) scale(1)'};
    transition: transform .3s ease;
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
      x: 0,
      y: 0,
      isMoving: false
    };
  }
  componentDidMount () {
    const { checkbox } = this;
    let deleteInit = false;
    let deleteMove = false;

    checkbox.setupTouchEvents();
    checkbox.addEventListener('touchtap', e => {
      this.props.toggleTodo(this.props.id);
    });
    checkbox.addEventListener('touchpress', e => {
      // if (window.confirm('delete?')) {
      //   this.props.deleteTodo(this.props.id);
      // }
      deleteInit = true;
    });

    let start;
    let end;
    const dist = () => (end.clientX - start.clientX) ** 2 + (end.clientY - start.clientY) ** 2;

    checkbox.addEventListener('touchmove', e => {
      end = e.touches[0];
      if (deleteInit) {
        deleteInit = false;
        deleteMove = true;
        start = end;
      }
      if (deleteMove) {
        const x = end.clientX - start.clientX;
        const y = end.clientY - start.clientY;
        this.setState({ x, y });
      }
    });
    checkbox.addEventListener('touchend', e => {
      deleteInit = false;
      deleteMove = false;
      this.setState({ x: 0, y: 0 });

      if (dist() > 200 ** 2) {
        this.props.deleteTodo(this.props.id);
      }
    });
  }
  componentWillUnmount () {
    this.checkbox.deleteTouchEvents();
  }
  render () {
    return (
      <StyledTodo
        done={this.props.done}
        $value={this.props.value} >
        <CheckboxHitbox
          ref={e => (this.checkbox = e)} >
          <Checkbox
            $x={this.state.x}
            $y={this.state.y}
            $isMoving={this.state.isMoving}
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
