import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StyledList = styled.section`
  flex-grow: 1;
  background: #fff;
  border-radius: 1.5em;
  margin: 2em 0;
  overflow-y: auto;
  box-shadow: 0 .5em 1em 0 #00000011;
`;

const List = props => (
  <StyledList>
    aaaaaaaaaa
  </StyledList>
);

const mapStateToProps = state => ({ todo: state.todo });

export default connect(mapStateToProps)(List);
