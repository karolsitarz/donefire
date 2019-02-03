export default (current, lists) => {
  const color = current == null
    ? '#dddddd'
    : `hsl(${(351 + lists[current].c1 * 360).toFixed(0) % 360},81%,64%)`;
  if (document.head.querySelector('meta[name="theme-color"]')) {
    if (document.head.querySelector('meta[name="theme-color"]').getAttribute('content') !== color) {
      document.head.querySelector('meta[name="theme-color"]').setAttribute('content', color);
    }
  } else {
    document.head.insertAdjacentHTML('beforeend', `<meta name="theme-color" content="${color}`);
  }
};
