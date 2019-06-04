import detectTouchEvents from 'detect-touch-events';
const move = !detectTouchEvents.hasSupport ? 'pointermove' : 'touchmove';
const start = !detectTouchEvents.hasSupport ? 'pointerdown' : 'touchstart';
const end = !detectTouchEvents.hasSupport ? 'pointerup' : 'touchend';
const validate = e => (!e || (detectTouchEvents.hasSupport && (!e.touches || !e.touches[0])));
const clientX = e => (detectTouchEvents.hasSupport ? e.touches[0].clientX : e.clientX);
const clientY = e => (detectTouchEvents.hasSupport ? e.touches[0].clientY : e.clientY);
const clientCObj = e => (detectTouchEvents.hasSupport ? e.touches[0] : e);

export default { move, start, end, validate, clientX, clientY, clientCObj };
