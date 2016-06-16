/**
 * Interpolate the value within a target range based on a known value
 * within a refernce range.
 *
 * @param {Array} an array of two numbers.
 * @param {Array} an array of two numbers.
 * @param {Number} known value within referenceRange.
 * @return {Number} vlaue within targetRange.
 */

const interpolateFromRange = (referenceRange, targetRange, referenceValue) => {
  if (!Array.isArray(referenceRange) || !Array.isArray(targetRange) || typeof referenceValue !== 'number' || referenceRange.length !== 2 || targetRange.length !== 2) {
    return;
  }

  const rStart = referenceRange[0];
  const rEnd = referenceRange[1];
  const rLower = Math.min(rStart, rEnd);
  const rUpper = Math.max(rStart, rEnd);
  const tStart = targetRange[0];
  const tEnd = targetRange[1];
  const tUpper = Math.max(tStart, tEnd);

  if (referenceValue > rUpper || referenceValue < rLower) {
    console.warn(referenceValue + ' is not between ' + rLower + ' and ' + rUpper);
    return;
  }

  const rDiff = Math.abs(rStart - rEnd);
  const tDiff = Math.abs(tStart - tEnd);

  const mod = (() => {
    if (rStart === rUpper) {
      return tStart === tUpper ? tEnd : 0 - tEnd;
    } else {
      return tStart === tUpper ? 0 - tStart : tStart;
    }
  })();

  return Math.abs((referenceValue - rLower) / rDiff * tDiff + mod);
};

module.exports = interpolateFromRange;
