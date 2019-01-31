import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';

const StyledTodo = styled.div`
  display: flex;
  min-height: 4em;
  box-shadow: inset 0 -1px #00000008;
  align-items: center;
  order: ${props => (180 - props.$value).toFixed(0)};
`;

const Checkbox = styled.div`
  height: 1em;
  width: 1em;
  margin-right: 1em;
  border-radius: .25em;
  background-image:
  linear-gradient(to right bottom,
    hsl(calc(171 + ${props => props.$value}), 81%, 64%) 0%,
    hsl(calc(-146 + ${props => props.$value}), 100%, 72%) 100%);

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

const Todo = props => (
  <StyledTodo $value={props.value} >
    <CheckboxHitbox>
      <Checkbox $value={props.value} />
    </CheckboxHitbox>
    <TodoSpan>{props.text}</TodoSpan>
  </StyledTodo>
);

export default connect(null, { toggleTodo })(Todo);
