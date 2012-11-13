var url = require('url');

// http://www.robotstxt.org/robotstxt.html

exports = module.exports = function() {
  
  return function robots(site, pages) {
    if (!site.get('base url')) throw new Error('robotstxt requires "base url" setting');
    
    var uri = url.parse(site.get('base url'));
    
    site.page('/robots.txt', function(page, next) {
      var txt = '';
      txt += 'User-agent: *\r\n';
      txt += 'Disallow:\r\n';
      txt += '\r\n';
      
      var paths = Object.keys(pages).sort()
        , pg;
      for (var i = 0, len = paths.length; i < len; i++) {
        pg = pages[paths[i]];
        if (pg.sitemap) {
          uri.pathname = pg.path;
          txt += 'Sitemap: ' + url.format(uri) + '\r\n';
        }
      }
      
      page.write(txt);
    });
  }
}
