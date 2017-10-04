var chai = require('chai');
var robots = require('../lib');


describe('kerouac-robotstxt', function() {
  
  it('should export function', function() {
    expect(robots).to.be.a('function');
  });
  
  // site.set('base url', 'http://www.example.com/')
  
  describe('default exclusion', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots())
        .end(function(p) {
          page = p;
          done();
        })
        .dispatch();
    });
  
    it('should write robots.txt', function() {
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\n');
    });
  }); // default exclusion
  
  describe('default exclusion with sitemap', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots())
        .page(function(page) {
          page.pages = [
            { url: '/sitemap.xml', sitemap: true }
          ];
        })
        .end(function(p) {
          page = p;
          done();
        })
        .dispatch();
    });
  
    it('should write robots.txt', function() {
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\nSitemap: /sitemap.xml\r\n');
    });
  }); // default exclusion with sitemap
  
  describe('default exclusion with multiple sitemaps', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots())
        .page(function(page) {
          page.pages = [
            { url: '/sitemap.xml', sitemap: true },
            { url: '/blog/sitemap.xml', sitemap: true }
          ];
        })
        .end(function(p) {
          page = p;
          done();
        })
        .dispatch();
    });
  
    it('should write robots.txt', function() {
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\nSitemap: /sitemap.xml\r\nSitemap: /blog/sitemap.xml\r\n');
    });
  }); // default exclusion with multiple sitemaps
  
  describe('default exclusion with multiple sitemaps and a sitemap index', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots())
        .page(function(page) {
          page.pages = [
            { url: '/sitemapindex.xml', sitemapIndex: true },
            { url: '/sitemap.xml', sitemap: true },
            { url: '/blog/sitemap.xml', sitemap: true }
          ];
        })
        .end(function(p) {
          page = p;
          done();
        })
        .dispatch();
    });
  
    it('should write robots.txt', function() {
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\nSitemap: /sitemapindex.xml\r\n');
    });
  }); // default exclusion with multiple sitemaps and a sitemap index
  
});
