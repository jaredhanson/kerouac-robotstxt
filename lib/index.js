// http://www.robotstxt.org/robotstxt.html

exports = module.exports = function(host) {
  // strip trailing slash
  if ('/' == host[host.length - 1]) {
    host = host.slice(0, -1);
  }
  
  return function robots(site, pages) {
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
          txt += 'Sitemap: ' + host + pg.path + '\r\n';
        }
      }
      
      page.write(txt);
    });
  }
}
