import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StyledList = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #fff;
  border-radius: 1.5em;
  margin: 2em 0;
  padding: 2em;
  overflow-y: auto;
  box-shadow: 0 .5em 1em 0 #00000011;
`;

const StyledTodo = styled.div`
  display: flex;
  min-height: 4em;
  box-shadow: inset 0 -1px #00000008;
  align-items: center;
  order: ${props => 180 - props.value}
`;

const Checkbox = styled.div`
  height: 1em;
  width: 1em;
  background-image:
    linear-gradient(to right bottom,
      hsl(calc(171 + ${props => props.value}), 81%, 64%) 0%,
      hsl(calc(-146 + ${props => props.value}), 100%, 72%) 100%);
`;

const Todo = props => (
  <StyledTodo value={props.value} >
    <Checkbox value={props.value} />
    {props.text}
  </StyledTodo>
);

const List = props => (
  <StyledList>
    {Object.keys(props.todo).map(key => (
      <Todo
        key={key}
        id={key}
        text={props.todo[key].text}
        value={props.todo[key].value} />
    ))}
  </StyledList>
);

const mapStateToProps = state => ({ todo: state.todo });

export default connect(mapStateToProps)(List);
