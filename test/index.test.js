var chai = require('chai');
var mock = require('chai-kerouac-middleware');
var robots = require('../lib');


describe('kerouac-robotstxt', function() {
  
  it('should write robots.txt', function(done) {
    chai.kerouac.use(robots())
      .finish(function() {
        expect(this.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\n');
        done();
      })
      .generate();
  }); // should write robots.txt
  
  it('should write robots.txt with crawl delay', function(done) {
    chai.kerouac.use(robots({ delay: 5 }))
      .finish(function() {
        expect(this.body).to.equal('User-agent: *\r\nDisallow:\r\nCrawl-delay: 5\r\n\r\n');
        done();
      })
      .generate();
  }); // should write robots.txt with crawl delay
  
  it('should write robots.txt with fractional crawl delay', function(done) {
    chai.kerouac.use(robots({ delay: 0.5 }))
      .finish(function() {
        expect(this.body).to.equal('User-agent: *\r\nDisallow:\r\nCrawl-delay: 0.5\r\n\r\n');
        done();
      })
      .generate();
  }); // should write robots.txt with fractional crawl delay
  
  it('should write robots.txt with sitemap', function(done) {
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
  }); // should write robots.txt with sitemap
  
  it('should not write robots.txt with sitemap that lacks a full URL', function(done) {
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
  }); // should not write robots.txt with sitemap that lacks a full URL'
  
  it('should write robots.txt with multiple sitemaps', function(done) {
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
  }); // should write robots.txt with multiple sitemaps
  
});
