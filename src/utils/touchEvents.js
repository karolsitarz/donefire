Object.defineProperty(Object.prototype, 'setupTouchEvents', {
  value: function (options = {}) {
    const longPressEvent = new window.Event('touchpress');
    const tapEvent = new window.Event('touchtap');
    const scrolling = options.scrolling || false;
    const delay = options.delay || 500;
    const dist = options.dist || 300;
    let longPressTimeout;
    let longPressInit = false;
    let longPress = false;
    let longPressDelta = { x: 0, y: 0 };

    this.addEventListener('touchmove', e => {
      if (!e || !e.touches || !e.touches[0]) return;

      if (longPressInit && longPressDelta != null) {
        // if the distance moved is higher than some value
        if ((Math.pow((longPressDelta.x - e.touches[0].clientX), 2) + Math.pow((longPressDelta.y - e.touches[0].clientY), 2)) > dist) {
          // cancel longpress
          if (longPressTimeout) clearTimeout(longPressTimeout);
          if (longPressInit) longPressInit = !longPressInit;
          if (longPress) longPress = !longPress;
        }
      }
    }, { passive: true });

    this.addEventListener('touchstart', e => {
      // e.preventDefault();
      longPressInit = true;
      longPressDelta = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };

      longPressTimeout = setTimeout(e => {
        longPressInit = false;
        longPress = true;

        this.dispatchEvent(longPressEvent);
      }, delay);
    }, { passive: true });

    this.addEventListener('touchend', e => {
      if (!scrolling) e.preventDefault();
      // tap event
      if (!longPress && longPressInit) {
        this.dispatchEvent(tapEvent);
      }

      if (longPressTimeout) clearTimeout(longPressTimeout);
      if (longPressInit) longPressInit = !longPressInit;
      if (longPress) longPress = !longPress;
    }, { passive: scrolling });
  }
});

Object.defineProperty(Object.prototype, 'deleteTouchEvents', {
  value: function (delay = 500, dist = 200) {
    const longPressEvent = new window.Event('touchpress');
    const tapEvent = new window.Event('touchtap');
    let longPressTimeout;
    let longPressInit = false;
    let longPress = false;
    let longPressDelta = { x: 0, y: 0 };

    this.removeEventListener('touchmove', e => {
      if (!e || !e.touches || !e.touches[0]) return;

      if (longPressInit && longPressDelta != null) {
        // if the distance moved is higher than some value
        if ((Math.pow((longPressDelta.x - e.touches[0].clientX), 2) + Math.pow((longPressDelta.y - e.touches[0].clientY), 2)) > dist) {
          // cancel longpress
          if (longPressTimeout) clearTimeout(longPressTimeout);
          if (longPressInit) longPressInit = !longPressInit;
          if (longPress) longPress = !longPress;
        }
      }
    });

    this.removeEventListener('touchstart', e => {
      // e.preventDefault();
      longPressInit = true;
      longPressDelta = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };

      longPressTimeout = setTimeout(e => {
        longPressInit = false;
        longPress = true;

        this.dispatchEvent(longPressEvent);
      }, delay);
    });

    this.removeEventListener('touchend', e => {
      // e.preventDefault();
      // tap event
      if (!longPress && longPressInit) {
        this.dispatchEvent(tapEvent);
      }

      if (longPressTimeout) clearTimeout(longPressTimeout);
      if (longPressInit) longPressInit = !longPressInit;
      if (longPress) longPress = !longPress;
    });
  }
});
