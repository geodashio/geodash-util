/**
 * Checks if a value "means" true.
 *
 * @function parseTrue
 * @param {(boolean|int|string)} value - The original value
 * @return {boolean} whether the value means true
 * @memberof geodash.api
 *
 * @example
 * true == parseTrue('on');
 * true == parseTrue('true');
 * true == parseTrue('t');
 * true == parseTrue('1');
 * true == parseTrue(1);
 * true == parseTrue(true);
 */

module.exports = function(value)
{
  return ['on', 'true', 't', '1', 1, true].indexOf(value) != -1;
};
