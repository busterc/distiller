'use strict';

const fse = require('fs-extra');
const path = require('path');
const recursive = require('recursive-readdir');

module.exports = function (options, callback) {
  let packageName = options.package;
  if (packageName.indexOf('@') > -1) {
    packageName = packageName.substring(0, packageName.indexOf('@'));
  }
  const distPath = path.join(options.tempDir, `./node_modules/${packageName}/dist`);

  recursive(distPath, (error, files) => {
    if (error) {
      return callback(error);
    }

    files.forEach(file => {
      let distFile = file.replace(distPath, '');
      let outputPath = path.dirname(distFile);
      outputPath = path.join(options.outputDir, outputPath);
      fse.mkdirpSync(outputPath);
      let outputFile = path.join(options.outputDir, distFile);
      fse.copySync(file, outputFile);
    });

    callback(null);
  });
};
