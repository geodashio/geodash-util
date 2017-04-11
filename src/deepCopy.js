/**
 * Returns a deep copy of an object or primitive using jQuery extend when needed.
 *
 * @function deepCopy
 * @param {Object[]|string|yObject} x - object or primitive to copy
 * @return {Object} - a deepy copy version of the original object.
 * @memberof geodash.api
 */

var isDefined = require("./isDefined");
var isString = require("./isString");
var isNumber = require("./isNumber");
var extend = require("./extend");

module.exports = function(x)
{
  if(Array.isArray(x))
  {
    return $.extend(true, [], x);
  }
  else if(isString(x) || isNumber(x))
  {
    return x;
  }
  else if(isDefined(x))
  {
    return $.extend(true, {}, x);
  }
};
