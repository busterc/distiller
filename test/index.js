'use strict';

const path = require('path');
const test = require('tap').test;
const distill = require('../index').distill;

test('this should FAIL to find a package', t => {
  t.plan(1);
  distill({
    package: 'NEVER-EVER-FIND-THIS-PACKAGE'
  }, error => {
    if (error) {
      return t.pass();
    }
    return t.fail();
  });
});

test('this should FAIL to receive a package name in the options object', t => {
  t.plan(1);
  distill({}, error => {
    if (error) {
      return t.pass();
    }
    return t.fail();
  });
});

test('this should find a package', t => {
  t.plan(1);
  let outputDir = path.join(__dirname, 'output/jquery');
  distill({
    package: 'jquery',
    outputDir: outputDir
  }, error => {
    if (error) {
      return t.fail(error);
    }
    return t.pass();
  });
});

test('this should find a package with a custom package.json', t => {
  t.plan(1);
  let outputDir = path.join(__dirname, 'output/jquery-v2');
  distill({
    package: 'jquery-v2',
    outputDir: outputDir
  }, error => {
    if (error) {
      return t.fail(error);
    }
    return t.pass();
  });
});
