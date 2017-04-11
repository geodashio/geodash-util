var assert = require('assert');
var coalesce = require("./coalesce");

describe("Testing coalesce(x, options)", function(){

  var y = "a";

  it("with string", function(){
    assert.equal(coalesce("a"), y);
  });

  it("with array", function(){
    assert.equal(coalesce(["a", "b", "c"]), y);
  });

  it("with empty array", function(){
    assert.notEqual(coalesce([]), y);
  });

  it("with array with undefined value", function(){
    assert.equal(coalesce([undefined, "a"]), y);
  });

  it("with array with undefined values", function(){
    assert.equal(coalesce([undefined, "a", undefined]), y);
  });

});
