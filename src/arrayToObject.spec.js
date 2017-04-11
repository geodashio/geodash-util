var assert = require('assert');
var arrayToObject = require("./arrayToObject");

describe("Testing arrayToObject(x, options)", function(){

  var y = {'x': 'y', 'q': 'r'};

  it("with object", function(){
    assert.deepEqual(arrayToObject([{'name': 'x', 'value': 'y'}, {'name': 'q', 'value': 'r'}]), y);
  });

});
