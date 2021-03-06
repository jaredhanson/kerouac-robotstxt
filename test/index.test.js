var chai = require('chai');
var mock = require('chai-kerouac-middleware');
var robots = require('../lib');


describe('kerouac-robotstxt', function() {
  
  it('should export function', function() {
    expect(robots).to.be.a('function');
  });
  
  describe('default exclusion', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots())
        .page(function(page) {
          page.site = new mock.Site();
        })
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
  
  describe('default exclusion with crawl delay', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots({ delay: 5 }))
        .page(function(page) {
          page.site = new mock.Site();
        })
        .end(function(p) {
          page = p;
          done();
        })
        .dispatch();
    });
  
    it('should write robots.txt', function() {
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\nCrawl-delay: 5\r\n\r\n');
    });
  }); // default exclusion with crawl delay
  
  describe('default exclusion with fractional crawl delay', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots({ delay: 0.5 }))
        .page(function(page) {
          page.site = new mock.Site();
        })
        .end(function(p) {
          page = p;
          done();
        })
        .dispatch();
    });
  
    it('should write robots.txt', function() {
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\nCrawl-delay: 0.5\r\n\r\n');
    });
  }); // default exclusion with fractional crawl delay
  
  describe('default exclusion with sitemap', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots())
        .page(function(page) {
          page.site = new mock.Site();
          page.site.pages = [
            { url: '/sitemap.xml', fullURL: 'http://www.example.com/sitemap.xml', sitemap: true }
          ];
        })
        .end(function(p) {
          page = p;
          done();
        })
        .dispatch();
    });
  
    it('should write robots.txt', function() {
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\nSitemap: http://www.example.com/sitemap.xml\r\n');
    });
  }); // default exclusion with sitemap
  
  describe('default exclusion with sitemap in parent site, with mounted option', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots({ mounted: true }))
        .page(function(page) {
          page.site = new mock.Site();
          page.site.parent = new mock.Site();
          page.site.parent.pages = [
            { url: '/sitemap.xml', fullURL: 'http://www.example.com/sitemap.xml', sitemap: true }
          ];
        })
        .end(function(p) {
          page = p;
          done();
        })
        .dispatch();
    });
  
    it('should write robots.txt', function() {
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\nSitemap: http://www.example.com/sitemap.xml\r\n');
    });
  }); // default exclusion with sitemap in parent site, with mounted option
  
  describe('default exclusion with sitemap that lacks a full URL', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots())
        .page(function(page) {
          page.site = new mock.Site();
          page.site.pages = [
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
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\n');
    });
  }); // default exclusion with sitemap that lacks a full URL
  
  describe('default exclusion with multiple sitemaps', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots())
        .page(function(page) {
          page.site = new mock.Site();
          page.site.pages = [
            { url: '/sitemap.xml', fullURL: 'http://www.example.com/sitemap.xml', sitemap: true },
            { url: '/blog/sitemap.xml', fullURL: 'http://www.example.com/blog/sitemap.xml', sitemap: true }
          ];
        })
        .end(function(p) {
          page = p;
          done();
        })
        .dispatch();
    });
  
    it('should write robots.txt', function() {
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\nSitemap: http://www.example.com/sitemap.xml\r\nSitemap: http://www.example.com/blog/sitemap.xml\r\n');
    });
  }); // default exclusion with multiple sitemaps
  
  describe('default exclusion with multiple sitemaps and a sitemap index', function() {
    var page, err;

    before(function(done) {
      chai.kerouac.use(robots())
        .page(function(page) {
          page.site = new mock.Site();
          page.site.pages = [
            { url: '/sitemap_index.xml', fullURL: 'http://www.example.com/sitemap_index.xml', sitemapIndex: true },
            { url: '/sitemap.xml', fullURL: 'http://www.example.com/sitemap.xml', sitemap: true },
            { url: '/blog/sitemap.xml', fullURL: 'http://www.example.com/blog/sitemap.xml', sitemap: true }
          ];
        })
        .end(function(p) {
          page = p;
          done();
        })
        .dispatch();
    });
  
    it('should write robots.txt', function() {
      expect(page.body).to.equal('User-agent: *\r\nDisallow:\r\n\r\nSitemap: http://www.example.com/sitemap_index.xml\r\n');
    });
  }); // default exclusion with multiple sitemaps and a sitemap index
  
});
