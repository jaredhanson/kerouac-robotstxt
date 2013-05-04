/**
 * Module dependencies.
 */
var url = require('url');


/**
 * robots.txt plugin.
 *
 * This plugin adds a `/robots.txt` page to a site, giving instructions to web
 * crawlers using the Robots Exclusion Protocol.
 *
 * Examples:
 *
 *     site.plug(require('kerouac-robotstxt')());
 *
 * References:
 *  - [About /robots.txt](http://www.robotstxt.org/robotstxt.html)
 *  - [A Standard for Robot Exclusion](http://www.robotstxt.org/orig.html)
 *  - [A Method for Web Robots Control](http://www.robotstxt.org/norobots-rfc.txt)
 *  - [Specifying the Sitemap location in your robots.txt file](http://www.sitemaps.org/protocol.html#submit_robots)
 *
 * @return {Function}
 * @api public
 */
exports = module.exports = function() {
  
  return function robots(site, pages) {
    if (!site.get('base url')) throw new Error('robotstxt requires "base url" setting');
    
    var uri = url.parse(site.get('base url'));
    
    site.page('/robots.txt', function(page, next) {
      // By default, be permissive and allow any crawler to crawl all pages.
      // This is done by using the '*' wildcard for the user agent and setting
      // the disallow field to an empty value.
      var txt = '';
      txt += 'User-agent: *\r\n';
      txt += 'Disallow:\r\n';
      txt += '\r\n';
      
      // Add the location of any sitemaps to the robots.txt file, as specified
      // by: http://www.sitemaps.org/protocol.html#submit_robots
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
      page.end();
    });
  }
}
