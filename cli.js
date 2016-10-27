#!/usr/bin/env node

'use strict';

const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const meow = require('meow');
const distill = require('./index').distill;

const cli = meow(`

  Usage

    $ distiller [options] <package>

  Options

    -l, --list          lists locally defined custom packages
    -o, --output-dir    destination for output
    -t, --temp-dir      destination for temporary build files
    -h, --help          shows usage help

`, {
  alias: {
    h: 'help',
    l: 'list',
    o: 'outputDir',
    t: 'tempDir'
  }
});

const packagesPath = path.join(__dirname, 'packages');
if (cli.flags.list) {
  fs.readdir(packagesPath, (error, packages) => {
    if (error) {
      return console.log(error);
    }
    return packages.forEach(pkg => {
      console.log(pkg);
    });
  });
} else {
  if (!cli.input.length) {
    console.error('Package name required');
    process.exit(1);
  }

  const options = {};

  let outputDir;
  if (cli.flags.outputDir) {
    outputDir = path.join(process.cwd(), cli.flags.outputDir);
  } else if (process.env.DISTILLER_DIR) {
    outputDir = `${process.env.DISTILLER_DIR}/${cli.input[0]}`;
  } else {
    outputDir = `${os.homedir()}/.distiller/dist/${cli.input[0]}`;
  }
  options.outputDir = outputDir;

  if (cli.flags.tempDir) {
    options.tempDir = cli.flags.tempDir;
  }

  options.package = cli.input[0];
  distill(options, error => {
    if (error) {
      return console.error(error);
    }
    console.log(`Distilled into: ${outputDir}`);
  });
}
