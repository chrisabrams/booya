const data = require('../data').getData();
const linkLocal = require('./link/lib/link-local');
const linkRemote = require('./link/lib/link-remote');
const projectName = require('../lib/project-name');
const YargsVC = require('yargs-vc');

class BootstrapVC extends YargsVC {

  static command = 'bootstrap';
  static description = 'Bootstrap project dependencies';

  async controller() {

    const context = process.cwd();
    const name = projectName();

    let count = 0;
    const project = data.projects[name];
  
    if (!name) {
  
      throw new Error('Cannot bootstrap without project name!');
  
    }
  
    if (!project) {
  
      throw new Error('Cannot bootstrap project until it is registered!');
  
    }
  
    const linked1 = await linkLocal(context, project);
    count += linked1.length;
  
    for(let i = 0, l = project.projectLinks.length; i < l; i++) {
      const remoteProjectName = project.projectLinks[i];

      
      try {
        const linked2 = await linkRemote(project.path, data.projects[remoteProjectName]);
        count += linked2.length;
      }
      catch(e) {
        console.error(`Could not link remote project ${name}`)
        console.error(e)
      }
      
    }
  
    // console.log('paths\n', paths);
  
    console.log(`Bootstrapped ${count} modules!`);
  
  }

}

module.exports = BootstrapVC;
