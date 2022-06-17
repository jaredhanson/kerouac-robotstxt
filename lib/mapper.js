var events = require('events')
  , util = require('util');


function Mapper() {
  events.EventEmitter.call(this);
}

util.inherits(Mapper, events.EventEmitter);

Mapper.prototype.map = function(server) {
  var self = this
    , sitemaps = [];
  
  server.on('request', function(page) {
    // TOOD: Make sure this works if page properties are set up async
    if (page.isSitemap) {
      sitemaps.push(page);
    }
  });
  
  
  this.wait = true;
  
  server.once('finish', function() {
    self.request('/robots.txt', function(page) {
      sitemaps = sitemaps.filter(function(p) { return !p.isInSitemap; });
      page.locals = page.locals || Object.create(null);
      page.locals.sitemaps = sitemaps;
    });
    
    self.end();
  });
};

module.exports = Mapper;
