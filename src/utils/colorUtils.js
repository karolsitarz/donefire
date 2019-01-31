export const HSLtoRGB = (h, s = 81, l = 64) => {
  let r, g, b;
  h = (h % 360) / 360;
  l = (l % 100) / 100;
  s = (s % 100) / 100;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

export const average = (h1, h2) => ({
  r: Math.round((h1.r + h2.r) / 2),
  g: Math.round((h1.g + h2.g) / 2),
  b: Math.round((h1.b + h2.b) / 2)
});

export const lightness = c => (c.r * 299 + c.g * 587 + c.b * 114) / 1000;

export default (h1, h2) => lightness(average(HSLtoRGB(351 + h1 * 360), HSLtoRGB(351 + h2 * 360)));
