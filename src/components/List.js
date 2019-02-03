import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import Todo from './Todo';

const StyledList = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #fff;
  border-radius: 1.5em;
  padding: 2em;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 .5em 1em 0 #0001;
  transition:
    opacity .25s ease,
    transform .25s ease;
  ${props => props.UI === 'listinput' && css`
    transform: translateY(-5em);
    opacity: 0;
    pointer-events: none;
  `}
`;

const NoTasks = styled.span`
  margin: auto;
  align-items: center;
  text-align: center;
  font-size: 0.75em;
  opacity: 0.5;

  * ~ & {
    display: none;
  }
`;

const List = props => (
  <StyledList UI={props.UI}>
    {Object.keys(props.todo).map(key =>
      props.currentList !== null && (props.currentList !== props.todo[key].listID) ? null : (
        <Todo
          key={key}
          id={key}
          text={props.todo[key].text}
          value={props.todo[key].value}
          done={props.todo[key].done} />
      ))}
    <NoTasks>
      there are no tasks.
    </NoTasks>
  </StyledList>
);

const mapStateToProps = state => ({
  todo: state.todo,
  currentList: state.currentList,
  UI: state.UI
});

export default connect(mapStateToProps)(List);
