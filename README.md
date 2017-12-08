# distiller [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Extracts only the dist files from packages

## Installation

```sh
$ npm install distiller --global
```

## CLI Usage

```sh
$ distiller -h

  Usage

    $ distiller [options] <package>

  Options

    -l, --list          lists locally defined custom packages
    -o, --output-dir    destination for output
    -t, --temp-dir      destination for temporary build files
    -k, --keep-temp     do not remove the temporary directory
    -h, --help          shows usage help

```

## CLI Environment Variables

-  Use `DISTILLER_DIST` to override the default output location `$HOME/.distiller/dist`
-  Use `DISTILLER_TEMP` to override the default temporary build location `$HOME/.distiller/temp`
    - the temp directory is removed after every execution 

## CLI Example

```sh
$ distiller react
Distilled into: ~/.distiller/dist/react

$ tree ~/.distiller/dist/react
~/.distiller/dist/react/
├── react.js
├── react-with-addons.js
├── react-with-addons.min.js
└── react.min.js

```

## Module Usage

```js
var distill = require('distiller').distill;

distill({
  package: 'react', // can be any NPM discoverable package
  outputDir: '/Users/hotdog/Desktop/react-dist/', // defaults to $HOME/.distiller/dist/${package}
  tempDir: '/Users/hotdog/.temp-folder-for-distiller' // defaults to $HOME/.distiller/temp
}, error => {
  if (error) {
    return console.log('error', error);
  }
  console.log('carry on');
});

```

## API

### distiller.distill(options, callback)

- #### options
  
  *Required*
  Type `object`

- #### package
  
  *Required*
  Type `string`

  The official NPM package name.

- #### outputDir
  
  Type: `string`
  
  Default: `$HOME/.distiller/dist/${package}`

  The absolute path to place output files.

- #### tempDir
  
  Type: `string`
  
  Default: `$HOME/.distiller/temp/distilled-${package}`

  The absolute path to use for building the package.

- #### keepTemp
  
  Type: `boolean`
  
  Default: `false`

  Can prevent the `tempDir` from being removed after execution.

## TODO

- [x] Document API
- [ ] Document custom package creation
- [ ] More test coverage
- [ ] Allow multiple packages on CLI
- [ ] Consider other sources, e.g. bower

## License

ISC © [Buster Collings](https://about.me/buster)


[npm-image]: https://badge.fury.io/js/distiller.svg
[npm-url]: https://npmjs.org/package/distiller
[travis-image]: https://travis-ci.org/busterc/distiller.svg?branch=master
[travis-url]: https://travis-ci.org/busterc/distiller
[daviddm-image]: https://david-dm.org/busterc/distiller.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/distiller
