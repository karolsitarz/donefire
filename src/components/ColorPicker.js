import React, { Component } from 'react';
import styled from 'styled-components';

const Track = styled.div`
  height: 1em;
  width: 100%;
  margin-top: 1em;
  border-radius: .25em;
  background:
    linear-gradient(
    90deg,
    hsl(351, 81%, 64%) calc(0 / 6 * 100%),
    hsl(411, 81%, 64%) calc(1 / 6 * 100%),
    hsl(471, 81%, 64%) calc(2 / 6 * 100%),
    hsl(531, 81%, 64%) calc(3 / 6 * 100%),
    hsl(591, 81%, 64%) calc(4 / 6 * 100%),
    hsl(651, 81%, 64%) calc(5 / 6 * 100%),
    hsl(711, 81%, 64%) calc(6 / 6 * 100%));
`;

const Handle = styled.div.attrs(({ $value }) => ({
  style: {
    transform: `translateY(-50%) translateX(calc(${$value} * (100vw - 4em - 100%)))`
  }
}))`
  height: 1em;
  width: 1em;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
`;

const HandleFill = styled.div.attrs(({ $value }) => ({
  style: {
    background: `hsl(${351 + $value * 360},81%,64%)`
    // boxShadow: `0 0 0 2px hsl(${171 + $value * 360},81%,64%)`
  }
}))`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #666;
  transform: ${props => props.$scrolling ? 'scale(2)' : 'scale(1)'};
  transition: transform .2s ease;
`;

export default class ColorPicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 0.5,
      scrolling: false
    };
  }
  componentDidMount () {
    const { handle } = this;
    let { left, width } = this.box.getBoundingClientRect();
    window.addEventListener('resize', e => ({ left, width } = this.box.getBoundingClientRect()));

    handle.addEventListener('touchmove', e => {
      if (!this.state.scrolling) this.setState({ scrolling: true });
      let calculated = ((e.touches[0].clientX - left) / width).toFixed(3);
      calculated = calculated >= 0 && calculated <= 1 ? calculated : calculated > 1 ? 1 : 0;
      this.setState({ value: calculated });
      this.props.handleValue(calculated);
    });
    handle.addEventListener('touchend', e => {
      if (this.state.scrolling) this.setState({ scrolling: false });
    });
  }
  render () {
    return (
      <Track ref={e => (this.box = e)} >
        <Handle
          $value={this.state.value}
          ref={e => (this.handle = e)}>
          <HandleFill
            $scrolling={this.state.scrolling}
            $value={this.state.value} />
        </Handle>
      </Track>
    );
  }
}
