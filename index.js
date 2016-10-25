'use strict';

const os = require('os');
const fse = require('fs-extra');
const path = require('path');
const spawn = require('child_process').spawn;

const packagesRoot = 'packages';

module.exports = exports = {};

exports.distill = function (options, callback) {
  if (!{}.hasOwnProperty.call(options, 'package')) {
    return callback('No Package Provided');
  }

  let packagePath = path.join(__dirname, packagesRoot, options.package);
  let packageJson = false;
  if (fse.existsSync(packagePath)) {
    packageJson = path.join(packagePath, 'package.json');
    console.log('Using Local Package Definition');
  } else {
    packagePath = path.join(__dirname, 'catchall.js');
  }

  let packageName = options.package;
  if (packageJson && fse.existsSync(packageJson)) {
    const json = require(packageJson);
    packageName = json.name || packageName;
    if (json.version) {
      packageName += `@${json.version}`;
    }
  }

  let tempDir = options.tempDir || process.env.DISTILLER_TEMP || `${os.homedir()}/.distiller/temp`;
  fse.mkdirpSync(tempDir);
  options.tempDir = tempDir;
  const tempPackageJson = path.join(tempDir, 'package.json');
  fse.writeFileSync(tempPackageJson, '{"name":"distiller-temp","description":"na","respository":"na","license":"none","private":true}');
  const npmInstall = spawn('npm', ['install', packageName], {
    stdio: 'inherit',
    cwd: tempDir
  });

  npmInstall.on('close', () => {
    const pkg = require(packagePath);
    return pkg(options, error => {
      if (error) {
        return callback(error);
      }
      // prevent deleting current working directory
      if (process.cwd() !== path.resolve(tempDir)) {
        fse.removeSync(tempDir);
      }
      callback();
    });
  });
};
