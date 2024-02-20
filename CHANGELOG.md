# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2024-02-20

### Changed

- Module now exports a function which constructs a `kerouac.Router` instance
which generates a file at the required `/robots.txt` location.  This eliminates
boilerplate necessitated by the previously exported middleware.

## [0.5.0] - 2023-12-13

### Added

- Exported `createMapper()` function, which returns a new instance of `Mapper`.
This is used with changes to `generate()` introduced in `kerouac@0.2.0`.

### Changed

- Sitemap locations are determined by `isSitemap` and `isInSitemap` properties
set on pages, rather than `sitemap` and `sitemapIndex`, in accordance with
changes introduced in `kerouac-sitemap@0.5.0`.

## [0.4.2] - 2018-09-12

## [0.4.1] - 2018-09-12

## [0.4.0] - 2017-10-07

## [0.3.0] - 2017-10-07

## [0.2.0] - 2017-10-04

## [0.1.0] - 2013-05-01

- Initial release.

[Unreleased]: https://github.com/jaredhanson/kerouac-robotstxt/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/jaredhanson/kerouac-robotstxt/compare/v0.4.2...v0.5.0
[0.4.2]: https://github.com/jaredhanson/kerouac-robotstxt/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/jaredhanson/kerouac-robotstxt/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/jaredhanson/kerouac-robotstxt/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/jaredhanson/kerouac-robotstxt/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/jaredhanson/kerouac-robotstxt/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jaredhanson/kerouac-robotstxt/releases/tag/v0.1.0
