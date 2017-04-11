var assert = require('assert');
var equals = require("./equals");

describe("Testing equals(a, b)", function(){

  it("with strings", function(){
    assert.equal(equals("a", "a"), true);
  });

  it("with empty array", function(){
    assert.equal(equals([], []), true);
  });

  it("with arrays", function(){
    assert.equal(equals(["a", "b", "c"], ["a", "b", "c"]), true);
  });

  it("with arrays with different lengths", function(){
    assert.equal(equals(["a", "b", "c"], ["a", "b"]), false);
  });

  it("with arrays with different values", function(){
    assert.equal(equals(["a", "b", "c"], ["x", "y", "z"]), false);
  });


});
