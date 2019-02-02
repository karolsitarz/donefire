export default (current, lists) => {
  const color = current == null
    ? '#dddddd'
    : `hsl(${351 + (lists[current].c1 * 1 + 1 * lists[current].c2) * 180},81%,64%)`;
  if (document.head.querySelector('meta[name="theme-color"]')) {
    document.head.querySelector('meta[name="theme-color"]').setAttribute('content', color);
  } else {
    document.head.insertAdjacentHTML('beforeend', `<meta name="theme-color" content="${color}`);
  }
};
