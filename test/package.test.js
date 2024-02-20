var expect = require('chai').expect;
var pkg = require('..');
var path = require('path');


describe('kerouac-robotstxt', function() {
  
  it('should create site', function() {
    var site = pkg();
    expect(site).to.be.a('function');
  });
  
});
