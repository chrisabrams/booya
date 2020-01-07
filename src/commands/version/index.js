const exec = require('yargs-vc/exec');
const { getConfig } = require('../../config');
const getPackagePaths = require('../link/lib/package-paths');
const { join } = require('path');
const { writeFileSync } = require('fs');
const YargsVC = require('yargs-vc');

class VersionVC extends YargsVC {

  static command = 'version';
  static description = 'Version project package(s)';

  async controller() {

    const context = process.cwd();

    try {

      const { packages, type } = getConfig(context);

      if (type === 'package') {

      }

      else if (type === 'monorepo') {
  
        const paths = await getPackagePaths(context, packages);
        const { version } = require(join(context, 'package.json'));
  
        paths.forEach((path) => {
        
          const wd = path.split('/package.json')[0];
          const pkgJson = require(path);
          const packageName = pkgJson.name;

          pkgJson.version = version; // Set the new version

          const newPkgJson = JSON.stringify(pkgJson, null, 2);
          writeFileSync(path, newPkgJson, 'utf8');
          // exec(`git add . && git commit -m "${version} && git tag ${version}"`, { silent: true });
          this.logVersion(packageName, version);

        });

      }
  
    }
    catch(e) {
  
      console.error('Could not version project package(s)');
      console.error(e);
  
    }
  
  }

  logVersion(packageName, packageVersion) {

    console.log(`Versioned package ${packageName} @${packageVersion}`);

  }

}

module.exports = VersionVC;
