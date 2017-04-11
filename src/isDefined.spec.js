var assert = require('assert');
var isDefined = require("./isDefined");

describe("Testing isDefined(x)", function(){

  it("with string", function(){
    assert.equal(isDefined('a'), true);
  });

  it("with integer", function(){
    assert.equal(isDefined(1), true);
  });

  it("with array", function(){
    assert.equal(isDefined(['a']), true);
  });

  it("with empty array", function(){
    assert.equal(isDefined([]), true);
  });

  it("with null", function(){
    assert.equal(isDefined(null), true);
  });

  it("with undefined", function(){
    assert.equal(isDefined(undefined), false);
  });

});
