const interpolateFromRange = require('./interpolate');

const getPointOnCurve = (start = {x: 0, y: 0}, middle = {x: 0.5, y: 0.5}, end = {x: 1, y: 1}, percent = 0.5, scaleFactor = 0.5) => {
  // This function is slightly modified from Chart.js (https://github.com/nnnick/Chart.js/blob/master/src/Chart.Core.js#L343).
  // Used uner the MIT license.

  //====================================\\
  // 13thParallel.org Beziér Curve Code \\
  //   by Dan Pupius (www.pupius.net)   \\
  //====================================\\
  const coord = (x = 0, y = 0) => {
    return {
      x: x,
      y: y
    };
  }

  const B1 = t => {
    return t * t * t;
  }

  const B2 = t => {
    return 3 * t * t * (1 - t);
  }

  const B3 = t => {
    return 3 * t * (1 - t) * (1 - t);
  }

  const B4 = t => {
    return (1 - t) * (1 - t) * (1 - t);
  }

  const getBezier = (percent, C1, C2, C3, C4) => {  // start, inner, outer, end
    const pos = coord();
    pos.x = C1.x * B1(percent) + C2.x * B2(percent) + C3.x * B3(percent) + C4.x * B4(percent);
    pos.y = C1.y * B1(percent) + C2.y * B2(percent) + C3.y * B3(percent) + C4.y * B4(percent);
    return pos;
  }
  //====================================\\


  const getPoint = () => {
    const controls = splineCurve(start, middle, end, scaleFactor);
    const controlOne = controls.inner;
    const controlTwo = controls.outer;

    return getBezier(percent, start, controlOne, controlTwo, end);
  }

  return getPoint();
}

const splineCurve = (FirstPoint = {x: 0, y: 0}, MiddlePoint = {x: 0.5, y: 0.5}, EndPoint = {x: 1, y: 1}, t) => {
  //Props to Rob Spencer at scaled innovation for his post on splining between points
  //http://scaledinnovation.com/analytics/splines/aboutSplines.html

  const d01 = Math.sqrt(Math.pow(MiddlePoint.x - FirstPoint.x, 2) + Math.pow(MiddlePoint.y - FirstPoint.y, 2));
  const d12 = Math.sqrt(Math.pow(EndPoint.x - MiddlePoint.x, 2) + Math.pow(EndPoint.y - MiddlePoint.y, 2));
  const fa = t * d01 / (d01 + d12); // scaling factor for triangle Ta
  const fb = t * d12 / (d01 + d12);

  return {
    inner: {
      x: MiddlePoint.x - fa * (EndPoint.x - FirstPoint.x),
      y: MiddlePoint.y - fa * (EndPoint.y - FirstPoint.y)
    },
    outer: {
      x: MiddlePoint.x + fb * (EndPoint.x - FirstPoint.x),
      y: MiddlePoint.y + fb * (EndPoint.y - FirstPoint.y)
    }
  };
}

const interpolateY = (start = {x: 0, y: 0}, end = {x: 1, y: 1}, x = 0.5, bezierMidpoint = {x: 0.5, y: 0.5}) => {
  if (bezierMidpoint) {
    return getPointOnCurve(start, bezierMidpoint, end, (x - start.x) / (end.x - start.x)).y;
  }
  else {
    return interpolateFromRange([start.x, end.x], [start.y, end.y], x);
  }
}


try {
  module.exports = interpolateY;
} catch (err) {
  console.error(err);
}
