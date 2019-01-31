import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  width: 100%;
  height: 5em;
`;

const Handle = styled.div`
  width: 2.5em;
  height: 2.5em;
  background: green;
  border-radius: 50%;
  top: 50%;
  position: absolute;
  opacity: 0.5;
  transform: translateY(-50%) translateX(calc(${props => props.value} * (100vw - 4em - 100%)));
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
      value: 0.5
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
      calculated = calculated >= 0 && calculated <= 1 ? calculated : calculated > 1 ? 1 : 0;

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
        console.log('xDDDDD');
      }, 500);
    });

    const cancelLongPress = () => {
      if (longPressTimeout) clearTimeout(longPressTimeout);

      if (longPress) longPress = !longPress;
    };

    handle.ontouchend = cancelLongPress;
  }
  render () {
    return (
      <Container>
        <Track ref={e => (this.box = e)} />
        <Handle
          ref={e => (this.handle = e)}
          value={this.state.value} />
      </Container>
    );
  }
}
