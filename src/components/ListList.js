import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { switchToUI, currentListChange } from '../actions';

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
  transition: 
    opacity .3s ease,
    transform .3s ease;
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
  ${props => props.$selected && css`
    transform: scale(0.85);
    opacity: 0.5;
  `}
`;

const AddListTile = styled(ListTile)`
  background:
    linear-gradient(#ccc, #ccc) 50% 50% / 1em .25em no-repeat,
    linear-gradient(#ccc, #ccc) 50% 50% / .25em 1em no-repeat,
    linear-gradient(#eee, #eee);
`;

class ListList extends Component {
  // componentDidMount () {

  // }
  render () {
    return (
      <Container listOpen={this.props.UI === 'lists'}>
        <Scrolling>
          {Object.keys(this.props.list).map(key =>
            <ListTile
              onClick={e => this.props.currentListChange({
                id: key,
                name: this.props.list[key].name,
                c1: this.props.list[key].c1,
                c2: this.props.list[key].c2
              })}
              $selected={('id' in this.props.currentList) && key === this.props.currentList.id}
              $light={this.props.list[key].light}
              $c1={this.props.list[key].c1}
              $c2={this.props.list[key].c2}
              key={key}>
              <span>{this.props.list[key].name}</span>
            </ListTile>
          )}
          <AddListTile onClick={e => this.props.switchToUI('listinput')} />
        </Scrolling>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  UI: state.UI,
  list: state.list,
  currentList: state.currentList
});

export default connect(mapStateToProps, { switchToUI, currentListChange })(ListList);
