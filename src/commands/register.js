const exec = require('../exec');
const globby = require('globby');
const { join } = require('path');
const { patchProject } = require('../data');
const YargsVC = require('yargs-vc');

class RegisterVC extends YargsVC {

  static command = 'register';
  static description = 'Register project';

  async controller() {

    const context = process.cwd();

    try {
  
      const config = require(`${context}/booya.json`);
  
      if (!config.name) {
  
        throw new Error('Config missing name!');
  
      }
  
      const type = config.type || 'package';
  
      const project = {
        dataVersion: 1,
        name: config.name,
        packageJson: config.packageJson || join(context, 'package.json'),
        projectLinks: config.projectLinks || [],
        path: context,
        type,
      }
  
      if (type === 'monorepo') {
  
        project.packages = config.packages || './packages';
  
        if (!(project.packages instanceof Array)) {
  
          project.packages = [project.packages];
  
        }
  
        project.packages = project.packages.map((pkg) => join(context, pkg));
  
      }
  
      patchProject(config.name, project);
  
      console.log(`Registered project ${config.name} at ${context}.`);
  
    }
    catch(e) {
  
      console.error('Could not register project');
      console.error(e);
  
    }
  
  }

}

module.exports = RegisterVC;
