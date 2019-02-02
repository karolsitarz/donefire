import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import ColorPicker from './ColorPicker';
import getLightness from '../utils/colorUtils';
import { addList, editList, switchToUI, listInputDataChange } from '../actions';

const StyledScroll = styled.section`
  height: 14em;
  flex-shrink: 0;
  transition:
    opacity .3s ease,
    height .3s ease;
  ${props => !props.inputOpen && css`
    height: 0;
    pointer-events: none;
    opacity: 0;
  `}
`;

const StyledInput = styled.input`
  border: 0;
  background: #fff;
  height: 3em;
  border-radius: 2em;
  padding: .5em 2em;
  box-shadow: 0 .5em 1em 0 #0001;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: absolute;
  top: 2em;
`;

const ListTile = styled.div.attrs(({ $color1, $color2 }) => ({
  style: {
    background: `
      linear-gradient(to right bottom,
        hsl(${351 + $color1 * 360},81%,64%) 0%,
        hsl(${351 + $color2 * 360},81%,64%) 100%)`
  }
}))`
  height: 4em;
  width: 6em;
  border-radius: 1em;
  background-color: #eeeeee;
  flex-shrink: 0;
  padding: 1em;
  display: flex;
  align-items: flex-end;
  margin: auto;
  color: ${props => props.$light ? '#fff' : ''};
  > span {
    font-size: .75em;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1em;
  }
`;

class ListInput extends Component {
  constructor (props) {
    super(props);
    this.getLightness = () => getLightness(this.props.listInputData.c1, this.props.listInputData.c2);
    this.submitList = this.submitList.bind(this);
  }
  validateText (e) {
    if (!e || !e.target || e.target.value == null) return;
    const name = e.target.value;

    if (name.length > 20) {
      this.props.listInputDataChange({ name: name.substring(0, 20) });
      return;
    }

    this.props.listInputDataChange({ name });
  }
  submitList (e) {
    e.preventDefault();
    const { name, listID, c1, c2 } = this.props.listInputData;
    if (name.length > 20) return;

    if (listID == null) {
      this.props.addList({ name, c1, c2 });
    } else {
      this.props.editList({ listID, name, c1, c2 });
    }
    this.props.switchToUI('lists');
  }
  render () {
    return (
      <StyledScroll inputOpen={this.props.UI === 'listinput'}>
        <StyledForm onSubmit={e => this.submitList(e)}>
          <StyledInput
            placeholder='your amazing list name'
            value={this.props.listInputData.name}
            onChange={e => this.validateText(e)} />
          <ColorPicker />
          <ListTile
            onClick={e => this.submitList(e)}
            $light={this.getLightness()}
            $color1={this.props.listInputData.c1}
            $color2={this.props.listInputData.c2} >
            <span>
              {this.props.listInputData.name}
            </span>
          </ListTile>
        </StyledForm>
      </StyledScroll>
    );
  }
}

const mapStateToProps = state => ({
  UI: state.UI,
  listInputData: state.listInputData
});

export default connect(mapStateToProps, { addList, editList, switchToUI, listInputDataChange })(ListInput);
