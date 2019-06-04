import pointer from './detectPointer';

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

    this.moveFunction = e => {
      if (pointer.validate(e)) return;

      if (longPressInit && longPressDelta != null) {
        // if the distance moved is higher than some value
        if ((Math.pow((longPressDelta.x - pointer.clientX(e)), 2) + Math.pow((longPressDelta.y - pointer.clientY(e)), 2)) > dist) {
          // cancel longpress
          if (longPressTimeout) clearTimeout(longPressTimeout);
          if (longPressInit) longPressInit = !longPressInit;
          if (longPress) longPress = !longPress;
        }
      }
    };

    this.addEventListener(pointer.move, this.moveFunction, { passive: scrolling });

    this.startFunction = e => {
      // e.preventDefault();
      longPressInit = true;
      longPressDelta = {
        x: pointer.clientX(e),
        y: pointer.clientY(e)
      };

      longPressTimeout = setTimeout(e => {
        longPressInit = false;
        longPress = true;

        this.dispatchEvent(longPressEvent);
      }, delay);
    };

    this.addEventListener(pointer.start, this.startFunction, { passive: scrolling });

    this.endFunction = e => {
      if (!scrolling) e.preventDefault();
      // tap event
      if (!longPress && longPressInit) {
        this.dispatchEvent(tapEvent);
      }

      if (longPressTimeout) clearTimeout(longPressTimeout);
      if (longPressInit) longPressInit = !longPressInit;
      if (longPress) longPress = !longPress;
    };

    this.addEventListener(pointer.end, this.endFunction, { passive: scrolling });
  }
});

Object.defineProperty(Object.prototype, 'deleteTouchEvents', {
  value: function () {
    if (this.moveFunction != null) {
      this.removeEventListener(pointer.move, this.moveFunction);
    }

    if (this.startFunction != null) {
      this.removeEventListener(pointer.start, this.startFunction);
    }

    if (this.endFunction != null) {
      this.removeEventListener(pointer.end, this.endFunction);
    }
  }
});
