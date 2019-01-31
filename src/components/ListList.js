import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.section`
  height: 6em;
  flex-shrink: 0;
  transition:
    height .3s ease,
    transform .3s ease;

  ${props => !props.listOpen && css`
    height: 0;
    transform: translateY(-6em);
    pointer-events: none;
  `}
`;

const Scrolling = styled.div`
  display: flex;
  overflow-x: auto;
  position: absolute;
  left: -2em;
  width: 100vw;
  &::after,
  &::before {
    content: "";
    display: block;
    height: 4em;
    width: 2em;
    pointer-events: none;
    flex-shrink: 0;
  }
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
  <Container listOpen={props.lists}>
    <Scrolling>
      <ListTile />
      <ListTile />
      <ListTile />
      <ListTile />
      <ListTile />
      <ListTile />
      <ListTile />
    </Scrolling>
  </Container>
);

const mapStateToProps = state => ({
  lists: state.UI.lists
});

export default connect(mapStateToProps)(ListList);
