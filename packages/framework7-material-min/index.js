'use strict';

const fse = require('fs-extra');
const path = require('path');
const recursive = require('recursive-readdir');

module.exports = function (options, callback) {
  const distPath = path.join(options.tempDir, './node_modules/framework7/dist');

  recursive(distPath, (error, files) => {
    if (error) {
      return callback(error);
    }

    files.forEach(file => {
      let distFile = file.replace(distPath, '');
      let outputPath = path.dirname(distFile);

      if (distFile.match(/img\/.*material|material.*min|js\/framework7\.min/)) {
        outputPath = path.join(options.outputDir, outputPath);
        fse.mkdirpSync(outputPath);
        let outputFile = path.join(options.outputDir, distFile);
        fse.copySync(file, outputFile);
      }
    });

    callback(null);
  });
};
