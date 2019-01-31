import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.section`
  height: 6em;
  display: flex;
  overflow-x: auto;
  transition:
    height .3s ease,
    transform .3s ease,
    opacity .3s ease;

  ${props => !props.listOpen && css`
    height: 0;
    transform: translateY(-4em);
    opacity: 0;
    pointer-events: none;
  `}
`;

const ListTile = styled.div`
  height: 4em;
  width: 6em;
  border-radius: 1em;
  background-color: #ddd;
  margin-right: 1em;
  flex-shrink: 0;

  &:nth-last-child(1) {
    margin-right: 0;
  }
`;

const ListList = props => (
  <Container listOpen={props.UI.lists}>
    <ListTile />
    <ListTile />
    <ListTile />
  </Container>
);

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps)(ListList);
