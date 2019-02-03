import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import styled, { css } from 'styled-components';

import Slider from './Slider';

const StyledScroll = styled.section`
  height: 8em;
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

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: absolute;
  top: 2em;
`;

const StyledInput = styled.input`
  border: 0;
  background: #fff;
  height: 3em;
  border-radius: 2em;
  padding: .5em 2em;
  box-shadow: 0 .5em 1em 0 #0001;
`;

class BottomForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      text: ''
    };
    this.slider = 90;
  }
  addTodo (e) {
    e.preventDefault();
    if (this.state.text.trim().length <= 1) return;

    this.props.addTodo({
      text: this.state.text,
      value: this.slider,
      listID: this.props.currentList
    });

    this.setState({
      text: ''
    });
  }
  validateText (e) {
    if (!e || !e.target || e.target.value == null) return;
    const text = e.target.value;

    if (text.length > 200) {
      this.setState({ text: text.substring(0, 200) });
      return;
    }

    this.setState({ text });
  }
  render () {
    return (
      <StyledScroll inputOpen={this.props.UI === 'taskinput'}>
        <StyledForm
          autoComplete='off'
          onSubmit={e => this.addTodo(e)}>
          <StyledInput
            placeholder='your amazing task text'
            name='text'
            value={this.state.text}
            onChange={e => this.validateText(e)} />
          <Slider
            tapHandle={e => this.addTodo(e)}
            sendSlider={v => (this.slider = (v * 180).toFixed(3))} />
        </StyledForm>
      </StyledScroll>
    );
  }
}

const mapStateToProps = state => ({
  currentList: state.currentList,
  UI: state.UI
});

export default connect(mapStateToProps, { addTodo })(BottomForm);
