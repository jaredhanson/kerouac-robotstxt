# kerouac-robotstxt

[Kerouac](https://github.com/jaredhanson/kerouac) middleware that gives
instructions to web crawlers using the [Robots Exclusion Protocol](http://www.robotstxt.org/).

## Install

```sh
$ npm install kerouac-robotstxt
```

## Usage

Declare a `robots.txt` route, using this middleware.

```js
var robots = require('kerouac-robotstxt');

site.page('/robots.txt', robots());
```

And map a `robots.txt` file when generating the site.

```js
site.generate([
  robots.createMapper()
]);
```

The generated output will include a `/robots.txt` file.  If your site contains
any sitemaps, which can be generated using [kerouac-sitemap](https://github.com/jaredhanson/kerouac-sitemap),
the locations of those sitemaps will be included so that search engines can
automatically discover all pages of your site.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2022 Jared Hanson <[https://www.jaredhanson.me/](https://www.jaredhanson.me/)>
