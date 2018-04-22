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
greenlight /path/to/project

● audits/dummy found 0 issues
● audits/demo found 10 issues
● audits/eslint found 1 issues

● audits/demo issues: 10

/src/box.js

79:43  major  Unexpected ronald with a shirty mosque         approval
38:3   minor  Unexpected hospital with a heedless report     network
14:64  major  Unexpected drawer with a pimpled appliance     spider
83:10  info   Unexpected kite with a trillion mother-in-law  bladder
29:51  minor  Unexpected digestion with a phocine secretary  hamburger
/src/peripheral.js
99:10  minor  Unexpected force with a waspy atom        dresser
24:24  info   Unexpected daffodil with a tussal step    town
31:40  minor  Unexpected daniel with a trustless cover  metal

/src/plate.js

33:34  critical  Unexpected toy with a silenced cream   rabbit
53:55  info      Unexpected wren with an hourlong sort  tsunami

● audits/eslint issues: 1

/src/box.js

2:7  major  'settings' is assigned a value but never used.  no-unused-vars
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
