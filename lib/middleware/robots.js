/**
 * Module dependencies.
 */


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
 * Microsoft has published a series of blob posts detailing their implemention
 * of REP, including support for a Crawl-delay directive:
 *
 *   - http://web.archive.org/web/20080501131342/http://blogs.msdn.com:80/webmaster/archive/2008/02/12/announcing-crawling-improvements-for-live-search.aspx
 *   - http://web.archive.org/web/20080530005654/http://blogs.msdn.com:80/webmaster/archive/2008/04/18/ramping-up-msnbot.aspx
 *
 * Both Yahoo! and Microsoft joined Google in announcing support for more
 * consistent behavior when implementing REP.  Their blog posts are no longer available at
 * the original locations, but can be found at Internet Archive:
 *
 *   - http://web.archive.org/web/20080604103120/http://www.ysearchblog.com/archives/000587.html
 *   - http://web.archive.org/web/20080605085601/http://blogs.msdn.com/webmaster/archive/2008/06/03/robots-exclusion-protocol-joining-together-to-provide-better-documentation.aspx
 *
 * For readers interested in further information about the Robots Exclusion
 * Protocol and robots.txt, the following articles are recommended reading:
 *
 *   - https://intoli.com/blog/analyzing-one-million-robots-txt-files/
 *
 * Examples:
 *
 *     site.page('/robots.txt', require('kerouac-robotstxt')());
 *
 * References:
 *   - [Robots.txt Specifications](https://developers.google.com/search/reference/robots_txt)
 *   - [Robots exclusion standard](https://en.wikipedia.org/wiki/Robots_exclusion_standard)
 *
 * @return {Function}
 * @api public
 */
exports = module.exports = function(options) {
  options = options || {};
  
  
  return function robotstxt(page, next) {
    // By default, be permissive and allow any crawler to crawl all pages.
    // This is done by using the '*' wildcard for the user agent and setting
    // the disallow field to an empty value.
    var txt = '';
    txt += 'User-agent: *\r\n';
    txt += 'Disallow:\r\n';
    
    // Add a crawl delay as supported by Yahoo! and Microsoft:
    //   - http://web.archive.org/web/20080515103400/http://help.yahoo.com/l/us/yahoo/search/webcrawler/slurp-03.html
    //   - http://web.archive.org/web/20080605085601/http://blogs.msdn.com/webmaster/archive/2008/06/03/robots-exclusion-protocol-joining-together-to-provide-better-documentation.aspx
    //
    // The value of this directive may be interpreted differently based on the
    // crawler reading it.
    if (options.delay) {
      txt += 'Crawl-delay: ' + options.delay + '\r\n';
    }
    
    txt += '\r\n';
    
    
    // Add the location of any sitemaps to the robots.txt file, as specified
    // by: http://www.sitemaps.org/protocol.html#submit_robots
    //
    // Note that the protocol requires this location to be a full URL, so if
    // the 'base url' setting is not available, the Sitemaps directive will
    // not be included in robots.txt.
    var sitemaps = (page.locals && page.locals.sitemaps) || []
      , i, len;
    for (i = 0, len = sitemaps.length; i < len; i++) {
      if (sitemaps[i].fullURL) { txt += 'Sitemap: ' + sitemaps[i].fullURL + '\r\n'; }
    }
    
    page.write(txt);
    page.end();
  }
}
