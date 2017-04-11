var getHashValue = require("./getHashValue");

module.exports = function(keys)
{
    var value = getHashValue(keys);
    return value != undefined && value != null && value != "";
};
