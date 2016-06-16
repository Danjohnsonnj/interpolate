const interpolateFromRange = require('./interpolateFromRange');
const interpolate = require('./interpolate');

try {
  module.exports = {
    interpolateFromRange,
    interpolate
  };
} catch (err) {
  console.error(err);
}
