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
