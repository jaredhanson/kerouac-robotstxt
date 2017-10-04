/**
 * Module dependencies.
 */
var uri = require('url');


/**
 * robots.txt middleware.
 *
 * This middleware generates a `/robots.txt` page, giving instructions to web
 * crawlers using the Robots Exclusion Protocol.
 *
 * This protocol is a de-facto standard.  It has never been formally ratified by
 * a standards body.  The community-authored specifications pertaining to this
 * protocol are available at:
 *
 *   - [A Standard for Robot Exclusion](http://www.robotstxt.org/orig.html)
 *   - [A Method for Web Robots Control](http://www.robotstxt.org/norobots-rfc.txt)
 *
 * Search engines may interpret directives within robots.txt differently,
 * particularly with respect to extensions that have been added over time.  It
 * is advised to consult the documentation provided by each of the major search
 * engines regarding how they implement this protocol.
 *
 * Google has published a series of blog posts detailing their implementation of
 * REP:
 *
 *   - https://googleblog.blogspot.com/2007/01/controlling-how-search-engines-access.html
 *   - https://googleblog.blogspot.com/2007/02/robots-exclusion-protocol.html
 *   - https://googleblog.blogspot.com/2007/07/robots-exclusion-protocol-now-with-even.html
 *   - https://webmasters.googleblog.com/2008/06/improving-on-robots-exclusion-protocol.html
 *
 * Examples:
 *
 *     site.page('/robots.txt', require('kerouac-robotstxt')());
 *
 * References:
 *  - [About /robots.txt](http://www.robotstxt.org/robotstxt.html)
 *  - [Specifying the Sitemap location in your robots.txt file](http://www.sitemaps.org/protocol.html#submit_robots)
 *
 * @return {Function}
 * @api public
 */
exports = module.exports = function() {
  
  return function robots(page, next) {
    var site = page.site
      , pages = page.pages || []
      , sitemaps, i, len;
    
    //if (!site.get('base url')) { return next(new Error('robotst.xt requires "base url" setting')); }
    // var uri = url.parse(site.get('base url'));
    
    // By default, be permissive and allow any crawler to crawl all pages.
    // This is done by using the '*' wildcard for the user agent and setting
    // the disallow field to an empty value.
    var txt = '';
    txt += 'User-agent: *\r\n';
    txt += 'Disallow:\r\n';
    txt += '\r\n';
    
    
    sitemaps = pages.filter(function(p) {
      return p.sitemapIndex == true;
    });
    
    if (sitemaps.length == 0) {
      sitemaps = pages.filter(function(p) {
        return p.sitemap == true;
      });
    }
    
    
    
    // Add the location of any sitemaps to the robots.txt file, as specified
    // by: http://www.sitemaps.org/protocol.html#submit_robots
    for (i = 0, len = sitemaps.length; i < len; i++) {
      //uri.pathname = pg.path;
      //txt += 'Sitemap: ' + url.format(uri) + '\r\n';
      txt += 'Sitemap: ' + sitemaps[i].url + '\r\n';
    }
    
    page.write(txt);
    page.end();
  }
}
