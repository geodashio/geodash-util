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
