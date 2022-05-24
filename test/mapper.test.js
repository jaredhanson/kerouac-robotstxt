var chai = require('chai');
var robotstxt = require('../lib');


describe('Mapper', function() {
  
  it('should request robots.txt', function(done) {
    chai.kerouac.map(robotstxt.createMapper())
      .close(function() {
        expect(this).to.request([ '/robots.txt' ]);
        expect(this.pages['/robots.txt'].locals).to.deep.equal({
          sitemaps: []
        })
        done();
      })
      .generate();
  }); // should request robots.txt
  
});
