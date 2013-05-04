var robots = require('index');

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


describe('robots plugin', function() {
  
  it('should export function', function() {
    expect(robots).to.be.a('function');
  });
  
  describe('when invoked', function() {
    var site = new MockSite();
    site.set('base url', 'http://www.example.com/')
    
    robots()(site, site.pages);
    
    it('should add robots.txt page', function() {
      expect(site.pages).to.include.keys('/robots.txt');
    });
    
    describe('and then rendering robots.txt', function() {
      var p = site.pages['/robots.txt'];

      it('should write robots.txt', function(done) {
        var expected = [
          "User-agent: *",
          "Disallow:",
          "",
          ""
        ].join("\r\n");
        
        p.end = function() {
          expect(p.data).to.equal(expected);
          done();
        };
        
        p.fn(p, function(err) {
          return done(new Error('should not call next'));
        });
      });
    });
  });
  
  describe('when invoked on a site with a sitemap', function() {
    var site = new MockSite();
    site.set('base url', 'http://www.example.com/')
    
    site.page('/sitemap.xml', function(){});
    site.pages['/sitemap.xml'].sitemap = true;
    
    robots()(site, site.pages);
    
    it('should add robots.txt page', function() {
      expect(site.pages).to.include.keys('/robots.txt');
    });
    
    describe('and then rendering robots.txt', function() {
      var p = site.pages['/robots.txt'];

      it('should write robots.txt', function(done) {
        var expected = [
          "User-agent: *",
          "Disallow:",
          "",
          "Sitemap: http://www.example.com/sitemap.xml",
          ""
        ].join("\r\n");
        
        p.end = function() {
          expect(p.data).to.equal(expected);
          done();
        };
        
        p.fn(p, function(err) {
          return done(new Error('should not call next'));
        });
      });
    });
  });
  
  describe('when invoked on a site without base url setting', function() {
    var site = new MockSite();
    
    it('should throw an error', function() {
      expect(function() {
        robots()(site, site.pages);
      }).to.throw(/requires \"base url\" setting/);
    });
  });
  
});
