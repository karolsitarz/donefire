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
  background-color: #eeeeee;
  margin-right: 1em;
  flex-shrink: 0;
  &:nth-last-child(1) {
    margin-right: 0;
  }
`;

const AddListTile = styled(ListTile)`
  background:
    linear-gradient(#ccc, #ccc) 50% 50% / 1em .25em no-repeat,
    linear-gradient(#ccc, #ccc) 50% 50% / .25em 1em no-repeat,
    linear-gradient(#eee, #eee);
`;

const ListList = props => (
  <Container listOpen={props.lists}>
    <Scrolling>
      {Object.keys(props.list).map(key =>
        <ListTile>
          <span>{props.list[key].name}</span>
        </ListTile>
      )}
      <AddListTile />
    </Scrolling>
  </Container>
);

const mapStateToProps = state => ({
  lists: state.UI.lists,
  list: state.list
});

export default connect(mapStateToProps)(ListList);
