var chai = require('chai');
var robots = require('../../lib');


describe('middleware/robots', function() {
  
  it('should allow all robots complete access by default', function(done) {
    chai.kerouac.use(robots())
      .finish(function() {
        expect(this.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\n');
        done();
      })
      .generate();
  }); // should allow all robots complete access by default
  
  it('should delay the frequency with which a crawler checks for new content', function(done) {
    chai.kerouac.use(robots({ delay: 5 }))
      .finish(function() {
        expect(this.body).to.equal('User-agent: *\r\nDisallow:\r\nCrawl-delay: 5\r\n\r\n');
        done();
      })
      .generate();
  }); // should delay the frequency with which a crawler checks for new content
  
  it('should delay the frequency with which a crawler checks for new content by a fractional value', function(done) {
    chai.kerouac.use(robots({ delay: 0.5 }))
      .finish(function() {
        expect(this.body).to.equal('User-agent: *\r\nDisallow:\r\nCrawl-delay: 0.5\r\n\r\n');
        done();
      })
      .generate();
  }); // should delay the frequency with which a crawler checks for new content by a fractional value
  
  it('should specify location of sitemap', function(done) {
    chai.kerouac.use(robots())
      .request(function(page) {
        page.locals = {};
        page.locals.sitemaps = [
          { url: '/sitemap.xml', fullURL: 'http://www.example.com/sitemap.xml' }
        ];
      })
      .finish(function() {
        expect(this.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\nSitemap: http://www.example.com/sitemap.xml\r\n');
        done();
      })
      .generate();
  }); // should specify location of sitemap
  
  it('should specify location of multiple sitemaps', function(done) {
    chai.kerouac.use(robots())
      .request(function(page) {
        page.locals = {};
        page.locals.sitemaps = [
          { url: '/sitemap.xml', fullURL: 'http://www.example.com/sitemap.xml' },
          { url: '/blog/sitemap.xml', fullURL: 'http://www.example.com/blog/sitemap.xml' }
        ];
      })
      .finish(function() {
        expect(this.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\nSitemap: http://www.example.com/sitemap.xml\r\nSitemap: http://www.example.com/blog/sitemap.xml\r\n');
        done();
      })
      .generate();
  }); // should specify location of multiple sitemaps
  
  it('should not specify location of sitemap that lacks a full URL', function(done) {
    chai.kerouac.use(robots())
      .request(function(page) {
        page.locals = {};
        page.locals.sitemaps = [
          { url: '/sitemap.xml' }
        ];
      })
      .finish(function() {
        expect(this.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\n');
        done();
      })
      .generate();
  }); // should not specify location of sitemap that lacks a full URL
  
});
