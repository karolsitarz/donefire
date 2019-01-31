import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  width: 100%;
  height: 5em;
`;

const Handle = styled.div.attrs(({ $value }) => ({
  style: {
    transform: `translateY(-50%) translateX(calc(${$value} * (100vw - 4em - 100%)))`,
    background: `
      linear-gradient(to right bottom,
        hsl(calc(171 + ${$value * 180}), 81%, 64%) 0%,
        hsl(calc(-146 + ${$value * 180}), 100%, 72%) 100%)`
  }
}))`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  transition: ${props => props.precise ? 'none' : 'transform .3s ease'};
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

    let longPressTimeout;
    let longPressInit = false;
    let longPress = false;
    let longPressDelta = { x: 0, y: 0 };
    //

    handle.addEventListener('touchmove', e => {
      if (!e || !e.touches || !e.touches[0]) return;

      if (longPressInit && longPressDelta != null) {
        // if the distance is higher than some value
        if ((Math.pow((longPressDelta.x - e.touches[0].clientX), 2) + Math.pow((longPressDelta.y - e.touches[0].clientY), 2)) > 200) cancelLongPress();
      }

      let calculated = ((e.touches[0].clientX - left) / width).toFixed(3);
      if (longPress) {
        calculated = calculated >= 0 && calculated <= 1 ? calculated : calculated > 1 ? 1 : 0;
      } else {
        if (calculated < 0.125) calculated = 0;
        else if (calculated < 0.375) calculated = 0.25;
        else if (calculated < 0.625) calculated = 0.5;
        else if (calculated < 0.755) calculated = 0.75;
        else calculated = 1;
      }

      this.setState({ value: calculated });
    });

    handle.addEventListener('touchstart', e => {
      e.preventDefault();
      longPressInit = true;
      longPressDelta = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };

      longPressTimeout = setTimeout(e => {
        longPressInit = false;
        longPress = true;
        this.setState({ precise: true });
        // console.log('xDDDDD');
      }, 500);
    });

    const cancelLongPress = () => {
      if (longPressTimeout) clearTimeout(longPressTimeout);

      if (longPress) longPress = !longPress;
      this.setState({ precise: false });
    };

    handle.ontouchend = cancelLongPress;
  }
  render () {
    return (
      <Container>
        <Track ref={e => (this.box = e)} />
        <Handle
          precise={this.state.precise}
          ref={e => (this.handle = e)}
          $value={this.state.value} />
      </Container>
    );
  }
}
