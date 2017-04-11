var assert = require('assert');
var parseTrue = require("./parseTrue");

describe("Testing parseTrue(value)", function(){

  //['on', 'true', 't', '1', 1, true]

  var y = true;

  it("with string 'on'", function(){
    assert.equal(parseTrue('on'), true);
  });

  it("with string 'true'", function(){
    assert.equal(parseTrue('true'), true);
  });

  it("with string 't'", function(){
    assert.equal(parseTrue('t'), true);
  });

  it("with string '1'", function(){
    assert.equal(parseTrue('1'), true);
  });

  it("with int 1", function(){
    assert.equal(parseTrue(1), true);
  });

  it("with boolean true", function(){
    assert.equal(parseTrue(true), true);
  });

  it("with boolean false", function(){
    assert.equal(parseTrue(false), false);
  });

});
