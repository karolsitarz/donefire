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
  box-shadow: 0 .5em 1em 0 #0001;
  transition:
    opacity .3s ease,
    transform .3s ease;
  ${props => props.UI === 'listinput' && css`
    /* transform: translateY(-3em); */
    opacity: 0;
    pointer-events: none;
  `}
`;

const List = props => (
  <StyledList UI={props.UI}>
    {Object.keys(props.todo).map(key =>
      ('id' in props.currentList && props.currentList.id) !== props.todo[key].listID ? null : (
        <Todo
          key={key}
          id={key}
          text={props.todo[key].text}
          value={props.todo[key].value} />
      ))}
  </StyledList>
);

const mapStateToProps = state => ({
  todo: state.todo,
  currentList: state.currentList,
  UI: state.UI
});

export default connect(mapStateToProps)(List);
