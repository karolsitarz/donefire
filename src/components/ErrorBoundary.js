import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
`;

const StyledSpan = styled.span`
  text-align: center;
  font-size: ${props => (props.$size || 1) + 'em'};
  margin: .5em auto;
  line-height: 1em;
`;

const StyledPurge = styled.button`
  width: auto;
  height: auto;
  background: #eee;
  font-size: 1em;
  padding: 0.75em 3em;
  border-radius: 3em;
  margin: 1em 0;
  border: 0;
  color: inherit;
  display: inline-block;
  text-transform: uppercase;
  color: #888;
`;

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch () {
    this.setState({ hasError: true });
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container>
          <StyledSpan $size={2}>Something went wrong:(</StyledSpan>
          <StyledSpan $size={1}>This is probably a storage problem. You can fix it by tapping the button below.</StyledSpan>
          <StyledPurge onClick={e => {
            if (window.confirm('are you sure?')) {
              window.localStorage.clear();
              window.location.reload();
            }
          }}>
            purge the data
          </StyledPurge>
          <StyledSpan $size={0.75}>You will lose all your tasks and lists.</StyledSpan>
        </Container>
      );
    }
    return this.props.children;
  }
}
