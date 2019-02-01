import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import ColorPicker from './ColorPicker';
import getLightness from '../utils/colorUtils';

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
    this.state = {
      color1: 0.5,
      color2: 0.75,
      text: ''
    };
  }
  validateText (e) {
    if (!e || !e.target || e.target.value == null) return;
    const text = e.target.value;

    if (text.length > 20) {
      this.setState({ text: text.substring(0, 20) });
      return;
    }

    this.setState({ text });
  }
  render () {
    return (
      <StyledScroll inputOpen={this.props.UI === 'listinput'}>
        <StyledForm>
          <StyledInput
            value={this.state.text}
            onChange={e => this.validateText(e)} />
          <ColorPicker
            handleValue1={e => this.setState({ color1: e })}
            handleValue2={e => this.setState({ color2: e })} />
          <ListTile
            $light={getLightness(this.state.color1, this.state.color2) < 185}
            $color1={this.state.color1}
            $color2={this.state.color2} >
            <span>
              {this.state.text}
            </span>
          </ListTile>
        </StyledForm>
      </StyledScroll>
    );
  }
}

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps)(ListInput);
