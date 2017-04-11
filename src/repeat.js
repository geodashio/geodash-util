/**
 * Repeats a string a given number of times
 *
 * @function repeat
 * @param {string} input - The string to repeat
 * @param {string} count - The number of times to repeat
 * @return {Object} the new string
 *
 * @example
 * repeat("#", 4) == "####";
 */

module.exports = function(input, count)
{
  var output = "";
  for(var i = 0; i < count; i++)
  {
    output += input;
  }
  return output;
};
