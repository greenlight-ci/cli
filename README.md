![Greenlight Logo](https://gitcdn.link/repo/greenlight/brand/master/logo/banner.svg)

# Greenlight CLI [![version][npm-version]][npm-url] [![License][license-image]][license-url] [![Build Status][travis-image]][travis-url]

> [Greenlight][] Command Line Interface

## Install

```bash
npm install --production --save @greenlight/cli
```

## Usage

```plain
greenlight <command>

Commands:
  greenlight filesystem [source]  run plugin analysis for "filesystem"
  greenlight git [source]         run plugin analysis for "git"

Options:
  --version    Show version number                                     [boolean]
  --config     path to greenlight config file
  --reporter   Use the specified output reporter                        [string]
                                     [choices: "text", "json", "html", "silent"]
                                                               [default: "text"]
  --soft-exit  do not exit(1) if issues are found                      [boolean]
  --help       Show help                                               [boolean]
```

```bash
$ greenlight /path/to/project

✔ [greenlight/plugin-a]: completed successfully
⚠ [greenlight/plugin-b]: driver mismatch, skipping
✖ [greenlight/plugin-c]: found 1 issues

# greenlight/plugin-a
> no issues found

# greenlight/plugin-b
> skipped: no matching context

# greenlight/plugin-c
> 1 issues found:

- path/to/file.js:2:2
  [123456] critical Extra semicolon semi
```

---

> License: [ISC][license-url] • 
> Copyright: [greenlight.ci](https://greenlight.ci) • 
> Github: [@greenlight](https://github.com/greenlight) • 
> Twitter: [@greenlightCI](https://twitter.com/greenlightCI)

[greenlight]: https://greenlight.ci

[license-image]: https://img.shields.io/github/license/greenlight/cli.svg?style=flat-square

[license-url]: http://choosealicense.com/licenses/isc/

[npm-url]: https://www.npmjs.com/package/@greenlight/cli

[npm-version]: https://img.shields.io/npm/v/@greenlight/cli.svg?style=flat-square

[travis-image]: https://img.shields.io/travis/greenlight/cli.svg?style=flat-square

[travis-url]: https://travis-ci.org/greenlight/cli
