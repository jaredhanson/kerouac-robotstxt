# kerouac-robotstxt

[![Version](https://img.shields.io/npm/v/kerouac-robotstxt.svg?label=version)](https://www.npmjs.com/package/kerouac-robotstxt)
[![Build](https://img.shields.io/travis/jaredhanson/kerouac-robotstxt.svg)](https://travis-ci.org/jaredhanson/kerouac-robotstxt)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/kerouac-robotstxt.svg?label=quality)](https://codeclimate.com/github/jaredhanson/kerouac-robotstxt)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/kerouac-robotstxt.svg)](https://coveralls.io/r/jaredhanson/kerouac-robotstxt)
[![Dependencies](https://img.shields.io/david/jaredhanson/kerouac-robotstxt.svg)](https://david-dm.org/jaredhanson/kerouac-robotstxt)


This is a [Kerouac](https://github.com/jaredhanson/kerouac) plugin that gives
instructions to web crawlers using the [Robots Exclusion Protocol](http://www.robotstxt.org/).

## Install

    $ npm install kerouac-robotstxt
    
## Usage

Simply plug `kerouac-robotstxt` into your site.  The generated output will
include a `/robots.txt` resource.

    site.plug(require('kerouac-robotstxt')());

## Tests

    $ npm install
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/kerouac-robotstxt.png)](http://travis-ci.org/jaredhanson/kerouac-robotstxt)  [![David DM](https://david-dm.org/jaredhanson/kerouac-robotstxt.png)](http://david-dm.org/jaredhanson/kerouac-robotstxt)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
