var assert = require('assert');
var extend = require("./extend");

describe("Testing extend(dst, src...)", function(){

  var y = {'a' : 'x', 'b': 'y', 'c': 'z'};

  it("with one object", function(){
    assert.deepEqual(extend({'a': 'x', 'c': 'z'}, {'b':'y'}), y);
  });

  it("with multiple objects", function(){
    assert.deepEqual(extend({'a': 'x'}, {'b':'y'}, {'c': 'z'}), y);
  });

  it("with multiple objects with empty initial", function(){
    assert.deepEqual(extend({}, {'a': 'x', 'b':'y'}, {'c': 'z'}), y);
  });

});
