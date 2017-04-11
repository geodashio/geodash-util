var assert = require('assert');
var repeat = require("./repeat");

describe("Testing repeat(input, count)", function(){

  it("with -1 count", function(){
    assert.equal(repeat("a", -1), "");
  });

  it("with zero count", function(){
    assert.equal(repeat("a", 0), "");
  });

  it("with 1 count", function(){
    assert.equal(repeat("a", 1), "a");
  });

  it("with 2 counts", function(){
    assert.equal(repeat("a", 2), "aa");
  });

  it("with 3 counts", function(){
    assert.equal(repeat("a", 3), "aaa");
  });

});
