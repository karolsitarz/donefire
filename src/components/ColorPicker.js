import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { listInputDataChange } from '../actions';

const Track = styled.div`
  height: 1em;
  width: 100%;
  margin: 2.5em 0;
  border-radius: .5em;
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
    transform: `translateX(calc(${$value} * (100vw - 4em - 100%)))`
  }
}))`
  height: 1.5em;
  width: 1.5em;
  position: absolute;
  transform: translateY(-50%);
  ${props => props.$type === 1 && css`
    bottom: 50%;
  `}
  ${props => props.$type === 2 && css`
    top: 50%;
  `}
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
  box-shadow: 0 0 0 0.25em #f7f7f7, 0 0 1em #00000088;
  transition: transform .2s ease;
  ${props => props.$type === 1 && css`
    border-radius: 0 2em 2em 2em;
    transform: ${props => props.$scrolling ? 'rotate(-135deg) translateY(25%) translateX(25%)' : 'scale(0.9)'};
  `}
  ${props => props.$type === 2 && css`
    border-radius: 2em 2em 0 2em;
    transform: ${props => props.$scrolling ? 'rotate(-135deg) translateY(-25%) translateX(-25%)' : 'scale(0.9)'};
  `}
`;

class ColorPicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      scrolling1: false,
      scrolling2: false
    };
  }
  componentDidMount () {
    const { handle1, handle2 } = this;
    let { left, width } = this.box.getBoundingClientRect();
    window.addEventListener('resize', e => ({ left, width } = this.box.getBoundingClientRect()));

    handle1.addEventListener('touchmove', e => {
      if (!this.state.scrolling1) this.setState({ scrolling1: true });
      let calculated = ((e.touches[0].clientX - left) / width).toFixed(3);
      const low = this.props.data.c2 - 0.1;
      const high = this.props.data.c2 * 1 + 0.1;

      if (low < 0 && calculated <= 0) calculated = high;
      if (high > 1 && calculated >= 1) calculated = low;
      if (calculated > low && calculated < this.props.data.c2) calculated = low;
      if (calculated < high && calculated >= this.props.data.c2) calculated = high;
      if (calculated < 0) calculated = 0;
      if (calculated > 1) calculated = 1;

      this.props.listInputDataChange({ c1: calculated });
    }, { passive: true });
    handle1.addEventListener('touchend', e => {
      if (this.state.scrolling1) this.setState({ scrolling1: false });
    }, { passive: true });

    handle2.addEventListener('touchmove', e => {
      if (!this.state.scrolling2) this.setState({ scrolling2: true });
      let calculated = ((e.touches[0].clientX - left) / width).toFixed(3);
      const low = this.props.data.c1 - 0.1;
      const high = this.props.data.c1 * 1 + 0.1;

      if (low < 0 && calculated <= 0) calculated = high;
      if (high > 1 && calculated >= 1) calculated = low;
      if (calculated > low && calculated < this.props.data.c1) calculated = low;
      if (calculated < high && calculated >= this.props.data.c1) calculated = high;
      if (calculated < 0) calculated = 0;
      if (calculated > 1) calculated = 1;

      this.props.listInputDataChange({ c2: calculated });
    }, { passive: true });
    handle2.addEventListener('touchend', e => {
      if (this.state.scrolling2) this.setState({ scrolling2: false });
    }, { passive: true });
  }
  render () {
    return (
      <Track ref={e => (this.box = e)} >
        <Handle
          $type={1}
          $value={this.props.data.c1}
          ref={e => (this.handle1 = e)}>
          <HandleFill
            $type={1}
            $scrolling={this.state.scrolling1}
            $value={this.props.data.c1} />
        </Handle>
        <Handle
          $type={2}
          $value={this.props.data.c2}
          ref={e => (this.handle2 = e)}>
          <HandleFill
            $type={2}
            $scrolling={this.state.scrolling2}
            $value={this.props.data.c2} />
        </Handle>
      </Track>
    );
  }
}

const mapStateToProps = state => ({
  data: state.listInputData
});

export default connect(mapStateToProps, { listInputDataChange })(ColorPicker);
