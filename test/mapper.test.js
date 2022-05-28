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
  
  it('should set sitemap for robots.txt', function(done) {
    chai.kerouac.map(robotstxt.createMapper(), [
      { path: '/index.html' },
      { fullURL: 'http://www.example.com/sitemap.xml', isSitemap: true }
    ])
      .close(function() {
        expect(this).to.request([ '/robots.txt' ]);
        expect(this.pages['/robots.txt'].locals).to.deep.equal({
          sitemaps: [
            { fullURL: 'http://www.example.com/sitemap.xml', isSitemap: true }
          ]
        })
        done();
      })
      .generate();
  }); // should set sitemap for robots.txt
  
  it('should set multiple sitemaps for robots.txt', function(done) {
    chai.kerouac.map(robotstxt.createMapper(), [
      { path: '/index.html' },
      { fullURL: 'http://www.example.com/sitemap.xml', isSitemap: true },
      { fullURL: 'http://www.example.com/blog/sitemap.xml', isSitemap: true }
    ])
      .close(function() {
        expect(this).to.request([ '/robots.txt' ]);
        expect(this.pages['/robots.txt'].locals).to.deep.equal({
          sitemaps: [
            { fullURL: 'http://www.example.com/sitemap.xml', isSitemap: true },
            { fullURL: 'http://www.example.com/blog/sitemap.xml', isSitemap: true }
          ]
        })
        done();
      })
      .generate();
  }); // should set multiple sitemaps for robots.txt
  
  it('should filter out sitemaps in a sitemap index for robots.txt', function(done) {
    chai.kerouac.map(robotstxt.createMapper(), [
      { path: '/index.html' },
      { fullURL: 'http://www.example.com/sitemap.xml', isSitemap: true, isInSitemap: true },
      { fullURL: 'http://www.example.com/blog/sitemap.xml', isSitemap: true, isInSitemap: true },
      { fullURL: 'http://www.example.com/sitemap_index.xml', isSitemap: true }
    ])
      .close(function() {
        expect(this).to.request([ '/robots.txt' ]);
        expect(this.pages['/robots.txt'].locals).to.deep.equal({
          sitemaps: [
            { fullURL: 'http://www.example.com/sitemap_index.xml', isSitemap: true }
          ]
        })
        done();
      })
      .generate();
  }); // should filter out sitemaps in a sitemap index for robots.txt
  
});
