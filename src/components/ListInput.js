import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

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

class ListInput extends Component {
  render () {
    return (
      <StyledScroll inputOpen={this.props.UI === 'listinput'}>
        <StyledForm>
          <StyledInput />
        </StyledForm>
      </StyledScroll>
    );
  }
}

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps)(ListInput);