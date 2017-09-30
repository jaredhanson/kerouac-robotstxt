var chai = require('chai');
var robots = require('../lib');

function MockSite() {
  this.settings = {};
  this.pages = {};
}

MockSite.prototype.get =
MockSite.prototype.set = function(setting, val) {
  if (1 == arguments.length) {
    return this.settings[setting];
  } else {
    this.settings[setting] = val;
    return this;
  }
}

MockSite.prototype.page = function(path, fn) {
  this.pages[path] = new MockPage(path, fn);
}

function MockPage(path, fn) {
  this.path = path;
  this.fn = fn;
  this.data = '';
}

MockPage.prototype.write = function(data) {
  this.data += data;
}


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
  
});
