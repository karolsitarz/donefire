import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { switchToUI, currentList } from '../actions';

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
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1em;
  }
  background: 
    linear-gradient(to right bottom,
      hsl(${props => 351 + props.$c1 * 360},81%,64%) 0%,
      hsl(${props => 351 + props.$c2 * 360},81%,64%) 100%);
  color: ${props => props.$light ? '#fff' : ''};
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
        <ListTile
          onClick={e => props.currentList({
            id: key,
            name: props.list[key].name,
            c1: props.list[key].c1,
            c2: props.list[key].c2
          })}
          $light={props.list[key].light}
          $c1={props.list[key].c1}
          $c2={props.list[key].c2}
          key={key}>
          <span>{props.list[key].name}</span>
        </ListTile>
      )}
      <AddListTile onClick={e => props.switchToUI('listinput')} />
    </Scrolling>
  </Container>
);

const mapStateToProps = state => ({
  UI: state.UI,
  list: state.list
});

export default connect(mapStateToProps, { switchToUI, currentList })(ListList);
