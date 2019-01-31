import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Todo from './Todo';

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

const List = props => (
  <StyledList>
    {Object.keys(props.todo).map(key =>
      props.currentList !== props.todo[key].listID ? null : (
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
  currentList: state.currentList
});

export default connect(mapStateToProps)(List);
