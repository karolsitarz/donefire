import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.section`
  height: 6em;
  flex-shrink: 0;
  transition:
    opacity .3s ease,
    height .3s ease;

  ${props => !props.listOpen && css`
    height: 0;
    pointer-events: none;
    opacity: 0;
  `}
`;

const Scrolling = styled.div`
  display: flex;
  overflow-x: auto;
  left: -2em;
  width: 100vw;
  top: 2em;
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
  padding: 1em;
  display: flex;
  align-items: flex-end;
  &:nth-last-child(1) {
    margin-right: 0;
  }
  > span {
    font-size: .75em;
  }
`;

const AddListTile = styled(ListTile)`
  background:
    linear-gradient(#ccc, #ccc) 50% 50% / 1em .25em no-repeat,
    linear-gradient(#ccc, #ccc) 50% 50% / .25em 1em no-repeat,
    linear-gradient(#eee, #eee);
`;

const ListList = props => (
  <Container listOpen={props.UI === 'lists'}>
    <Scrolling>
      {Object.keys(props.list).map(key =>
        <ListTile key={key}>
          <span>{props.list[key].name}</span>
        </ListTile>
      )}
      <AddListTile />
    </Scrolling>
  </Container>
);

const mapStateToProps = state => ({
  UI: state.UI,
  list: state.list
});

export default connect(mapStateToProps)(ListList);
