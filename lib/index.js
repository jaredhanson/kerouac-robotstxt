/**
 * Module dependencies.
 */
var uri = require('url');


/**
 * robots.txt middleware.
 *
 * This middleare generates a `/robots.txt` page, giving instructions to web
 * crawlers using the Robots Exclusion Protocol.
 *
 * This protocol is a de-facto standard.  It has never been formally ratified by
 * a standards body.  The community-authored specifications pertaining to this
 * protocol are available at:
 *
 *   - [A Standard for Robot Exclusion](http://www.robotstxt.org/orig.html)
 *   - [A Method for Web Robots Control](http://www.robotstxt.org/norobots-rfc.txt)
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
      , pages = page.pages
      , i, len;
    
    //if (!site.get('base url')) { return next(new Error('robotst.xt requires "base url" setting')); }
    // var uri = url.parse(site.get('base url'));
    
    // By default, be permissive and allow any crawler to crawl all pages.
    // This is done by using the '*' wildcard for the user agent and setting
    // the disallow field to an empty value.
    var txt = '';
    txt += 'User-agent: *\r\n';
    txt += 'Disallow:\r\n';
    txt += '\r\n';
    
    // Add the location of any sitemaps to the robots.txt file, as specified
    // by: http://www.sitemaps.org/protocol.html#submit_robots
    for (i = 0, len = pages.length; i < len; i++) {
      if (pages[i].sitemap) {
        //uri.pathname = pg.path;
        //txt += 'Sitemap: ' + url.format(uri) + '\r\n';
        txt += 'Sitemap: ' + pages[i].url + '\r\n';
      }
    }
    
    page.write(txt);
    page.end();
  }
}
