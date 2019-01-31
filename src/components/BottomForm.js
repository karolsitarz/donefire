import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import styled from 'styled-components';

import Slider from './Slider';

const StyledButton = styled.div`
  background: #fff;
  height: 2em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 4em;
  border-radius: 2em;
  box-shadow: 0 .5em 1em 0 #00000011;

  > span {
    text-transform: uppercase;
    font-size: 0.75em;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
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
      listID: this.props.listID
    });

    this.setState({
      text: ''
    });
  }
  validateText (e) {
    if (!e || !e.target || !e.target.value) return;
    const text = e.target.value;

    if (text.length > 50) {
      this.setState({ text: text.substring(0, 50) });
      return;
    }

    this.setState({ text });
  }
  render () {
    return (
      <StyledForm
        autoComplete='off'
        onSubmit={e => this.addTodo(e)}>
        <input
          name='text'
          value={this.state.text}
          onChange={e => this.validateText(e)} />
        <Slider sendSlider={v => (this.slider = (v * 180).toFixed(3))} />
        <StyledButton
          onClick={e => this.addTodo(e)}>
          <span>
            new task
          </span>
        </StyledButton>
      </StyledForm>
    );
  }
}

const mapStateToProps = state => ({
  listID: state.currentList
});

export default connect(mapStateToProps, { addTodo })(BottomForm);
