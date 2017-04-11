(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var extract = require("geodash-extract");

module.exports = function(paths, a, b)
{
  var diff = [];
  if((a !== undefined) && (b !== undefined))
  {
    for(var i = 0; i < paths.length; i++)
    {
      var path = paths[i];
      var text_a = JSON.stringify(extract(path, a, ""));
      var text_b = JSON.stringify(extract(path, b, ""));
      if(text_a != text_b)
      {
        diff.push(path);
      }
    }
  }
  else if((a !== undefined) && (b === undefined))
  {
    diff = paths;
  }
  else if((a === undefined) && (b !== undefined))
  {
    diff = paths;
  }
  else
  {
    diff = [];
  }
  return diff;
};

},{"geodash-extract":3}],2:[function(require,module,exports){
/**
 * A function mostly used with [extract](https://www.npmjs.com/package/geodash-extract).
 * Expand can expand an arbitrary array of period-separated keychains and
 * create a unified array of 1 element per key.
 *
 * @function extract
 * @param {(string|string[]|int[]|Object[])} keyChain - The arbitrary key chain that cna be a string or array of primitives.
 * @return the unified array of keys aka key chain
 *
 * @example <caption>Basic</caption>
 * var a = ["featurelayers"];
 * var b = expand(a.concat([0, "popup.panes", 2]));
 * // b == ["featurelayers", 0, "popup", "panes", 2]
 * var pane = extract(b, dashbaord);
 *
 */

module.exports = function(keyChain)
{
  var newArray = [];
  if(Array.isArray(keyChain))
  {
    for(var i = 0; i < keyChain.length; i++)
    {
      var value = keyChain[i];
      if(typeof value === 'string')
      {
        if(value.indexOf(".") != -1)
        {
          newArray = newArray.concat(value.split("."));
        }
        else
        {
          newArray.push(value);
        }
      }
      else
      {
        newArray.push(value);
      }
    }
  }
  else if(typeof keyChain === 'string')
  {
    newArray = keyChain.split(".");
  }
  return newArray;
};

},{}],3:[function(require,module,exports){
/**
 * A powerful function that provides the basis for much of the
 * GeoDash methodology.  Rather than having many `getter` methods for different
 * objects that require a developer to "memorize" classes.  `extract` can dive
 * into a dashboard configuration and retrieve any value at an arbitrary depth.
 * This provides an immense about of flexibility.
 *
 * @function extract
 * @param {(string|string[]|int[]|Object[])} keyChain - The arbitrary key chain that cna be a string or array of primitives.
 * @param {(Object)} node - The Javascript object to interrogate
 * @param {(Object)} fallback - The value returned if the object specified at the location described by the key chain does not exist.
 * @return the value at the location described by the key chain or the fallback value
 *
 * @example <caption>Basic</caption>
 * var newView = {
 * "baselayer": (extract("view.baselayer", newState) || extract(["dashboard", "baselayers", 0, "id"], options)),
 * "featurelayers": (extract("view.featurelayers", newState) || $.map(extract(["dashboard", "featurelayers"], options, []), function(fl){ return fl.id; })),
 *  "controls": extract("view.controls", newState) || ["legend"]
 * };
 *
 */

var extract = function(keyChain, node, fallback)
{
  if(typeof keyChain == "string")
  {
    keyChain = keyChain.split(".");
  }

  var obj = undefined;

  if(node != undefined && node != null)
  {
    if(keyChain.length==0)
    {
      obj = node;
    }
    else
    {
      var newKeyChain = keyChain.slice(1);
      if(newKeyChain.length == 0)
      {
        if((typeof keyChain[0] == "string") && keyChain[0].toLowerCase() == "length")
        {
          if(Array.isArray(node))
          {
            obj = node.length;
          }
          else if(node != undefined)
          {
            obj = node["length"];
          }
          else
          {
            obj = 0;
          }
        }
      }

      if(obj == undefined && node != undefined)
      {
        if(Array.isArray(node))
        {
          var index = (typeof keyChain[0] == "string") ?
            parseInt(keyChain[0], 10) :
            keyChain[0];
          obj = extract(newKeyChain, node[index], fallback);
        }
        else
        {
          obj = extract(newKeyChain, node[""+keyChain[0]], fallback);
        }
      }
  	}
  }
  else
  {
    obj = fallback;
  }
	return obj;
};

module.exports = extract;

},{}],4:[function(require,module,exports){
/**
 * Flattens an object.
 *
 * @function flatten
 * @param {Object} obj - The original object
 * @param {string|undefined} prefix - A prefix, if any, to add to the new object's keys.
 * @return {Object} the flattened version of the object
 *
 * @example
 * var flatten = require("geodash-flatten")
 * var a = {'x': {'y': 'z' }, 'a': ['b', 'c', 'd']}
 * var b = flatten(a);
 * b == {'x__y': 'z', 'a__0': 'b', 'a__1': 'c', 'a__2': 'd' }
 */

var flatten = function(obj, prefix)
{
  var newObject = {};
  $.each(obj, function(key, value){
    var newKey = prefix !== undefined ? prefix+"__"+key : key;
    if(
      (value === undefined) ||
      (value === null) ||
      (typeof value == "string") ||
      (typeof value == "number") ||
      (typeof value == "boolean")
    )
    {
      newObject[newKey] = value;
    }
    else if(Array.isArray(value))
    {
      $.each(flatten(value, newKey), function(key2, value2){
        newObject[""+key2] = value2;
      });
    }
    else
    {
      $.each(flatten(value, newKey), function(key2, value2){
        newObject[key2] = value2;
      });
    }
  });
  return newObject;
};

module.exports = flatten;

},{}],5:[function(require,module,exports){
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

},{"./isDefined":19,"./isString":22,"geodash-extract":3}],6:[function(require,module,exports){
/**
 * Deletes the property in target at the given location given by keyChain.
 *
 * @function clearValue
 * @param {Object} keyChain - The key chain of the property
 * @param {Object} target - The object
 * @memberof geodash.api
 */

var isString = require("./isString");

module.exports = function(keyChain, target)
{
  if(isString(keyChain))
  {
    keyChain = keyChain.split("__");
  }

  if(keyChain.length == 1)
  {
    delete target[keyChain[0]];
  }
  else
  {
    for(var j = 0; j < keyChain.length -1 ; j++)
    {
      var newKey = keyChain[j];
      if(!(newKey in target))
      {
        var iTest = -1;
        try{iTest = parseInt(keyChain[j+1], 10);}catch(err){iTest = -1;};
        target[newKey] = iTest >= 0 ? [] : {};
      }
      target = target[newKey];
    }
    var finalKey = keyChain[keyChain.length-1];
    delete target[finalKey];
  }
};

},{"./isString":22}],7:[function(require,module,exports){
var isDefined = require("./isDefined");

module.exports = function(x)
{
  if(Array.isArray(x))
  {
    var y = undefined;
    for(var i = 0; i < x.length; i++)
    {
      if(isDefined(x[i]))
      {
        y = x[i];
        break;
      }
    }
    return y;
  }
  else
  {
    return x;
  }
};

},{"./isDefined":19}],8:[function(require,module,exports){
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

},{"./extend":10,"./isDefined":19,"./isNumber":21,"./isString":22}],9:[function(require,module,exports){
module.exports = function(a, b) {
  if(Array.isArray(a) && Array.isArray(b))
  {
    if(a.length == b.length)
    {
      for(var i = 0; i < a.length; i++)
      {
        if(a[i] !== b[i])
        {
          return false;
        }
      }
      return true;
    }
    else
    {
      return false;
    }
  }
  else
  {
    return a == b;
  }
};

},{}],10:[function(require,module,exports){
module.exports = function(dst)
{
  for (var i = 1, ii = arguments.length; i < ii; i++) {
    var obj = arguments[i];
    if (obj) {
      var keys = Object.keys(obj);
      for (var j = 0, jj = keys.length; j < jj; j++) {
        var key = keys[j];
        dst[key] = obj[key];
      }
    }
  }
  return dst;
};

},{}],11:[function(require,module,exports){
module.exports = function(id, arr)
{
  var result = undefined;
  var matches = $.grep(arr, function(x, i){ return x.id == id; });
  if(matches.length == 1)
  {
    result = matches[0];
  }
  return result;
};

},{}],12:[function(require,module,exports){
// From https://www.w3schools.com/js/js_cookies.asp
module.exports = function(cname)
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

},{}],13:[function(require,module,exports){
module.exports = function(keys, type)
{
    var value = undefined;
    if(typeof keys === 'string')
    {
      keys = [keys.toLowerCase()];
    }
    else
    {
      keys = $.map(keys,function(value, i){return value.toLowerCase();});
    }
    var hash_lc = location.hash.toLowerCase();
    for(var i = 0; i < keys.length; i++)
    {
      var key = keys[i];
      var keyAndHash = hash_lc.match(new RegExp(key + '=([^&]*)'));
      if(keyAndHash)
      {
          value = keyAndHash[1];
          if(value != undefined && value != null && value != "")
          {
            break;
          }
      }
    }

    if(type != undefined)
    {
        if(type == "integer")
        {
          //value = (value != undefined && value != null && value != "") ? parseInt(value, 10) : undefined;
          value = geodash.normalize.integer(value, undefined);
        }
        else if(type == "stringarray")
        {
          if(value != undefined)
          {
            var newValue = value.split(",");
            value = newValue;
          }
        }
        else if(type == "integerarray")
        {
          if(value != undefined)
          {
            var sValue = value.split(",");
            var newValue = [];
            for(var i = 0; i < sValue.length; i++)
            {
              var v = sValue[i];
              newValue.push((v != undefined && v != null && v != "") ? parseInt(v, 10) : undefined);
            }
            value = newValue;
          }
        }
        else if(type == "float")
        {
          value = geodash.normalize.float(value, undefined);
          //value = (value != undefined && value != null && value != "") ? parseFloat(value) : undefined;
        }
        else if(type == "floatarray")
        {
          if(value !=undefined)
          {
            var sValue = value.split(",");
            var newValue = [];
            for(var i = 0; i < sValue.length; i++)
            {
              var v = sValue[i];
              newValue.push((v != undefined && v != null && v != "") ? parseFloat(v) : undefined);
            }
            value = newValue;
          }
        }
    }
    return value;
};

},{}],14:[function(require,module,exports){
var isDefined = require("./isDefined");
var isString = require("./isString");

module.exports = function(keys, type)
{
  var value = undefined;

  if(typeof keys === 'string')
  {
    keys = [keys];
  }

  var url = window.location.href;

  /*if(! isDefined(url))
  {
    url = window.location.href;
  }*/

  if(Array.isArray(keys))
  {
    for(var i = 0; i < keys.length; i++)
    {
      var key = keys[i].replace(/[\[\]]/g, "\\$&");
      var pattern = new RegExp("([?&]" + key + ")=(([^&#]*)|&|#|$)", "gi");
      var matches = pattern.exec(url);
      if(Array.isArray(matches) && matches.length == 4)
      {
        value = matches[3];
      }
    }
  }

  if(isDefined(value))
  {
    if(isDefined(type))
    {
      if(type == "integer" || type == "int")
      {
        value = (isString(value) && value.length > 0) ? parseInt(value, 10) : undefined;
      }
      else if(type == "float")
      {
        value = (isString(value) && value.length > 0) ? parseFloat(value) : undefined;
      }
    }
  }
  //url.match(new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "gi"))
  //var results = regex.exec(url);
  //if (!results) return null;
  //if (!results[2]) return '';
  //return decodeURIComponent(results[2].replace(/\+/g, " "));
  return value;
};

},{"./isDefined":19,"./isString":22}],15:[function(require,module,exports){
/**
 * Gets an [AngularJS](https://angularjs.org/) [scope](https://docs.angularjs.org/guide/scope) for a given element
 *
 * @function getScope
 * @param {(string)} id - The id of the element for the Angular Controller
 * @return {(Object|undefined)} If the element is found, will try isolateScope and then scope.  If not found, returns undefined.
 * @memberof geodash.api
 *
 * @see https://docs.angularjs.org/guide/scope
 *
 * @example
 * var $scope = geodash.util.getScope('geodash-main');
 * var $scope = geodash.api.getEndpoint('geodash-modal-welcome');
 */

module.exports = function(id)
{
  return angular.element("#"+id).isolateScope() || angular.element("#"+id).scope();
};

},{}],16:[function(require,module,exports){
var getHashValue = require("./getHashValue");

module.exports = function(keys)
{
    var value = getHashValue(keys);
    return value != undefined && value != null && value != "";
};

},{"./getHashValue":13}],17:[function(require,module,exports){
/*global require, window, console, jQuery, $, angular, Bloodhound, location */

module.exports = {
  arrayToObject: require("./arrayToObject"),
  clearValue: require("./clearValue"),
  coalesce: require("./coalesce"),
  deepCopy: require("./deepCopy"),
  diff: require("geodash-diff"),
  equals: require("./equals"),
  expand: require("geodash-expand"),
  extend: require("./extend"),
  flatten: require("geodash-flatten"),
  getByID: require("./getByID"),
  getCookieValue: require("./getCookieValue"),
  getHashValue: require("./getHashValue"),
  getQueryStringValue: require("./getQueryStringValue"),
  getScope: require("./getScope"),
  hasHashValue: require("./hasHashValue"),
  isDate: require("./isDate"),
  isDefined: require("./isDefined"),
  isFunction: require("./isFunction"),
  isString: require("./isString"),
  isNumber: require("./isNumber"),
  objectToArray: require("./objectToArray"),
  parseTrue: require("./parseTrue"),
  repeat: require("./repeat"),
  setValue: require("./setValue"),
  unpack: require("./unpack"),
  updateValue: require("./updateValue")
};

},{"./arrayToObject":5,"./clearValue":6,"./coalesce":7,"./deepCopy":8,"./equals":9,"./extend":10,"./getByID":11,"./getCookieValue":12,"./getHashValue":13,"./getQueryStringValue":14,"./getScope":15,"./hasHashValue":16,"./isDate":18,"./isDefined":19,"./isFunction":20,"./isNumber":21,"./isString":22,"./objectToArray":23,"./parseTrue":24,"./repeat":25,"./setValue":26,"./unpack":27,"./updateValue":28,"geodash-diff":1,"geodash-expand":2,"geodash-flatten":4}],18:[function(require,module,exports){
module.exports = function(value)
{
  return Object.prototype.toString.call(value) == "[object Date]";
};

},{}],19:[function(require,module,exports){
module.exports = function(value)
{
  return typeof value !== 'undefined';
};

},{}],20:[function(require,module,exports){
module.exports = function(value)
{
  return typeof value === 'function';
};

},{}],21:[function(require,module,exports){
module.exports = function(value)
{
  return typeof value === 'number';
};

},{}],22:[function(require,module,exports){
module.exports = function(value)
{
  return typeof value === 'string';
};

},{}],23:[function(require,module,exports){
/**
 * Takes an object and creates an array of keys and values.
 *
 * @function objectToArray
 * @param {Object[]} x - The object to transform to an array
 * @return {Object} object - returns new array
 * @memberof geodash.api
 *
 * @example
 * var a = {'x': 'y', 'q': 'r'};
 * var b = objectToArray(a);
 * b == [{'name': 'x', 'value': 'y'}, {'name': 'q', 'value': 'r'}]
 */

var isDefined = require("./isDefined");

module.exports = function(x)
{
  var y = [];
  if(isDefined(x))
  {
    var keys = Object.keys(x);
    for(var i = 0; i < keys.length; i++)
    {
      y.push({'name': keys[i], 'value': x[keys[i]]});
    }
  }
  return y;
}

},{"./isDefined":19}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
var isString = require("./isString");

module.exports = function(keyChain, value, target)
{
  // Update dashboard
  if(isString(keyChain))
  {
    keyChain = keyChain.split("__");
  }

  if(keyChain.length == 1)
  {
    target[keyChain[0]] = value;
  }
  else
  {
    for(var j = 0; j < keyChain.length -1 ; j++)
    {
      var newKey = keyChain[j];
      if(!(newKey in target))
      {
        var iTest = -1;
        try{iTest = parseInt(keyChain[j+1], 10);}catch(err){iTest = -1;};
        target[newKey] = iTest >= 0 ? [] : {};
      }
      target = target[newKey];
    }
    var finalKey = keyChain[keyChain.length-1];
    if(Array.isArray(target))
    {
      if(finalKey >= target.length)
      {
        var zeros = finalKey - target.length;
        for(var k = 0; k < zeros; k++ )
        {
          target.push({});
        }
        target.push(value);
      }
      else
      {
        target[finalKey] = value;
      }
    }
    else
    {
      target[finalKey] = value;
    }
  }
};

},{"./isString":22}],27:[function(require,module,exports){
module.exports = function(obj)
{
  var newObject = {};
  $.each(obj, function(key, value){
    if(key.indexOf("__") == -1)
    {
      newObject[key] = value;
    }
    else
    {
      var keyChain = key.split("__");
      var target = obj;
      for(var j = 0; j < keyChain.length; j++)
      {
        var newKey = keyChain[j];
        if(!(newKey in target))
        {
          target[newKey] = {};
        }
        target = target[newKey];
      }
      target[keyChain[keyChain.length-1]] = value;
    }
  });
  return newObject;
};

},{}],28:[function(require,module,exports){
module.exports = function(field_flat, source, target)
{
  if(field_flat.indexOf("__") == -1)
  {
    target[field_flat] = source[field_flat];
  }
  else
  {
    var keyChain = field_flat.split("__");
    for(var j = 0; j < keyChain.length -1 ; j++)
    {
      var newKey = keyChain[j];
      if(!(newKey in target))
      {
        var iTest = -1;
        try{iTest = parseInt(keyChain[j+1], 10);}catch(err){iTest = -1;};
        target[newKey] = iTest >= 0 ? [] : {};
      }
      target = target[newKey];
    }
    var finalKey = keyChain[keyChain.length-1];
    if(Array.isArray(target))
    {
      if(finalKey >= target.length)
      {
        var zeros = finalKey - target.length;
        for(var k = 0; k < zeros; k++ )
        {
          target.push({});
        }
        target.push(source[field_flat]);
      }
      else
      {
        target[finalKey] = source[field_flat];
      }
    }
    else
    {
      target[finalKey] = source[field_flat];
    }
  }
};

},{}]},{},[17]);
