/**
 * Takes an array of objects with values name and value and creates and object.
 *
 * @function arrayToObject
 * @param {Object[]} x - The array to map to an object.
 * @param {string} x[].name - The name of the property.
 * @param {string} x[].value - The value of the property.
 * @return {Object} object - returns new object
 * @memberof geodash.api
 *
 * @example
 * var a = [{'name': 'x', 'value': 'y'}, {'name': 'q', 'value': 'r'}];
 * var b = arrayToObject(a);
 * b == {'x': 'y', 'q': 'r'}
 */

var extract = require("geodash-extract");
var isDefined = require("./isDefined");
var isString = require("./isString");

module.exports = function(x, options)
{
  var y = {};
  if(Array.isArray(x))
  {
    var $interpolate = extract("$interpolate", options) || extract("interpolate", options);
    var ctx = extract("context", options) || extract("ctx", options) || {};
    if(isDefined($interpolate))
    {
      for(var i = 0; i < x.length; i++)
      {
        if("value" in x[i])
        {
          var v = x[i].value;
          if(isString(v))
          {
            y[x[i].id || x[i].name] = $interpolate(v)(ctx);
          }
          else
          {
            y[x[i].id || x[i].name] = v;
          }
        }
        else
        {
          var v = x[i];
          y[x[i].id || x[i].name] = v;
        }
      }
    }
    else
    {
      for(var i = 0; i < x.length; i++)
      {
        if("value" in x[i])
        {
          y[x[i].id || x[i].name] = x[i].value;
        }
        else
        {
          y[x[i].id || x[i].name] = x[i];
        }
      }
    }
  }
  return y;
};
