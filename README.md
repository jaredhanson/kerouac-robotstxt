# kerouac-robotstxt

[Kerouac](https://github.com/jaredhanson/kerouac) middleware that gives
instructions to web crawlers using the [Robots Exclusion Protocol](http://www.robotstxt.org/).

Status:
[![Version](https://img.shields.io/npm/v/kerouac-robotstxt.svg?label=version)](https://www.npmjs.com/package/kerouac-robotstxt)
[![Build](https://img.shields.io/travis/jaredhanson/kerouac-robotstxt.svg)](https://travis-ci.org/jaredhanson/kerouac-robotstxt)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/kerouac-robotstxt.svg?label=quality)](https://codeclimate.com/github/jaredhanson/kerouac-robotstxt)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/kerouac-robotstxt.svg)](https://coveralls.io/r/jaredhanson/kerouac-robotstxt)
[![Dependencies](https://img.shields.io/david/jaredhanson/kerouac-robotstxt.svg)](https://david-dm.org/jaredhanson/kerouac-robotstxt)

## Sponsorship

Kerouac is open source software.  Ongoing development is made possible by
generous contributions from individuals and corporations.  To learn more about
how you can help keep this project financially sustainable, please visit Jared
Hanson's page on [Patreon](https://www.patreon.com/jaredhanson).

## Install

    $ npm install kerouac-robotstxt
    
## Usage

Simply declare a `robots.txt` page, using this middleware.

```js
site.page('/robots.txt', require('kerouac-robotstxt')());
```

The generated output will include a `/robots.txt` resource.  If your site
contains any sitemaps, which can be generated using [kerouac-sitemap](https://github.com/jaredhanson/kerouac-sitemap),
the sitemap locations will be included so that search engines will automatically
discover all pages of your site.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2018 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
