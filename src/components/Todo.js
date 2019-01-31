import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';

const StyledTodo = styled.div`
  display: flex;
  min-height: 4em;
  box-shadow: inset 0 -1px #00000008;
  align-items: center;
  order: ${props => 180 - props.value};
`;

const Checkbox = styled.div`
  height: 1em;
  width: 1em;
  background-image:
  linear-gradient(to right bottom,
    hsl(calc(171 + ${props => props.value}), 81%, 64%) 0%,
    hsl(calc(-146 + ${props => props.value}), 100%, 72%) 100%);
`;

const TodoSpan = styled.span`
  display: inline-flex;
  flex-grow: 1;
  font-size: .75em;
`;

const Todo = props => (
  <StyledTodo value={props.value} >
    <Checkbox value={props.value} />
    <TodoSpan>{props.text}</TodoSpan>
  </StyledTodo>
);

export default connect(null, { toggleTodo })(Todo);
