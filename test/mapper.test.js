var chai = require('chai');
var robotstxt = require('../lib');


describe('Mapper', function() {
  
  it('should request robots.txt', function(done) {
    chai.kerouac.map(robotstxt.createMapper())
      .finish(function() {
        expect(this).to.request([ '/robots.txt' ]);
        done();
      })
      .generate();
  }); // should request robots.txt
  
});
