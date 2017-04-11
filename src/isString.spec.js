var assert = require('assert');
var isString = require("./isString");

describe("Testing isString(x)", function(){

  it("with string", function(){
    assert.equal(isString('a'), true);
  });

  it("with integer", function(){
    assert.equal(isString(1), false);
  });

  it("with array", function(){
    assert.equal(isString(['a']), false);
  });

});
