const exec = require('yargs-vc/exec');
const { getConfig } = require('../../config');
const getPackagePaths = require('../link/lib/package-paths');
const { join } = require('path');
const YargsVC = require('yargs-vc');

class PublishVC extends YargsVC {

  static command = 'publish';
  static description = 'Publish project package(s)';

  async controller() {

    const context = process.cwd();

    try {

      const { packages, type } = getConfig();

      if (type === 'package') {

      }

      else if (type === 'monorepo') {
  
        const paths = await getPackagePaths(context, packages);
  
        paths.forEach((path) => {
        
          const wd = path.split('/package.json')[0];
          const pkgJson = require(path);
          const packageName = pkgJson.name;
          const packageVersion = pkgJson.version;

          exec(`cd ${wd} && npm publish --access public`, { silent: true });
          this.logPublish(packageName, packageVersion);

        });

      }
  
    }
    catch(e) {
  
      console.error('Could not publish project');
      console.error(e);
  
    }
  
  }

  logPublish(packageName, packageVersion) {

    console.log(`Published package ${packageName} @${packageVersion}`);

  }

}

module.exports = PublishVC;
