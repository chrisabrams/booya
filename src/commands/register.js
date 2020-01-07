const { getConfig } = require('../config');
const { join } = require('path');
const linkLocal = require('./link/lib/link-local');
const { patchProject } = require('../data');
const YargsVC = require('yargs-vc');

class RegisterVC extends YargsVC {

  static command = 'register';
  static description = 'Register project';

  async controller() {

    const context = process.cwd();

    try {

      const project = getConfig(context);
  
      patchProject(project.name, project);
      linkLocal(context, project); // Automatically link project after it is registered.

      console.log(`Registered project ${project.name} at ${context}.`);
  
    }
    catch(e) {
  
      console.error('Could not register project');
      console.error(e);
  
    }
  
  }

}

module.exports = RegisterVC;
