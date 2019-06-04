import React, { Component } from 'react';
import styled from 'styled-components';
import { Check as CheckIcon } from '../style/icons';
import pointer from '../utils/detectPointer';

const Container = styled.section`
  width: 100%;
  height: 4em;
`;

const Handle = styled.div.attrs(({ $value }) => ({
  style: {
    transform: `translateY(-50%) translateX(calc(${$value} * (100vw - 4em - 100%)))`
  }
}))`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  top: 50%;
  position: absolute;
  transform: translateY(-50%) translateZ(0);
  will-change: transform;
  transition: ${props => props.precise ? 'none' : 'transform .25s ease'};
`;

const HandleFill = styled.div.attrs(({ $value }) => ({
  style: {
    background: `
      linear-gradient(to right bottom,
        hsl(calc(171 + ${$value * 180}), 81%, 64%) 0%,
        hsl(calc(-146 + ${$value * 180}), 100%, 72%) 100%)`
  }
}))`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: ${props => props.precise ? 'scale(1.2) translateZ(0)' : 'scale(1) translateZ(0)'};
  transition: ${props => props.precise ? 'transform .25s cubic-bezier(0.33, 0.37, 0.16, 2.35)' : 'transform .2s ease'};
  will-change: transform;
  > svg {
    width: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    fill: #fff;
    pointer-events: none;
  }
`;

const Track = styled.div`
  width: calc(100% - 2.5em);
  height: .15em;
  background: #0002;
  border-radius: 1em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default class Slider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 0.5,
      precise: false
    };
  }
  componentDidMount () {
    const { handle } = this;
    let { left, width } = this.box.getBoundingClientRect();
    window.addEventListener('resize', e => ({ left, width } = this.box.getBoundingClientRect()));

    //
    handle.setupTouchEvents();

    this.pointerMoveEvent = e => {
      if (pointer.validate(e)) return;

      let calculated = ((pointer.clientX(e) - left) / width).toFixed(3);
      if (this.state.precise) {
        calculated = calculated >= 0 && calculated <= 1 ? calculated : calculated > 1 ? 1 : 0;
      } else {
        if (calculated < 0.125) calculated = 0;
        else if (calculated < 0.375) calculated = 0.25;
        else if (calculated < 0.625) calculated = 0.5;
        else if (calculated < 0.875) calculated = 0.75;
        else calculated = 1;
      }

      this.setState({ value: calculated });
      this.props.sendSlider(calculated);
    };

    handle.addEventListener(pointer.start, e => {
      document.addEventListener(pointer.move, this.pointerMoveEvent, { passive: true });
    });
    document.addEventListener(pointer.end, e => {
      document.removeEventListener(pointer.move, this.pointerMoveEvent);
      if (this.state.precise) this.setState({ precise: false });
    });

    handle.addEventListener('touchpress', e => {
      this.setState({ precise: true });
    });
    handle.addEventListener('touchtap', e => {
      this.props.tapHandle(e);
    });
  }
  render () {
    return (
      <Container>
        <Track ref={e => (this.box = e)} />
        <Handle
          precise={this.state.precise}
          ref={e => (this.handle = e)}
          $value={this.state.value}>
          <HandleFill
            precise={this.state.precise}
            $value={this.state.value}>
            <CheckIcon />
          </HandleFill>
        </Handle>
      </Container>
    );
  }
}
