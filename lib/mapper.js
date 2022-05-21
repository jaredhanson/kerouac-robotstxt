var events = require('events')
  , util = require('util');


function Mapper() {
  events.EventEmitter.call(this);
}

util.inherits(Mapper, events.EventEmitter);

Mapper.prototype.map = function(server) {
  var sitemaps = [];
  
  server.on('request', function(page) {
    // TOOD: Make sure this works if page properties are set up async
    if ((page.sitemap || page.sitemapIndex)) {
      sitemaps.push(page);
    }
  })
  
  var req = this.request('/robots.txt', function(page) {
    sitemaps = sitemaps.filter(function(p) { return !p._inSitemap; });
    page.locals = page.locals || Object.create(null);
    page.locals.sitemaps = sitemaps;
  });
  
  this.emit('finish');
};

module.exports = Mapper;
