const data = require('../data').getData();
const linkLocal = require('./link/lib/link-local');
const linkRemote = require('./link/lib/link-remote');
const projectName = require('../lib/project-name');

async function command(name, context) {

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
    console.log('remoteProjectName', remoteProjectName)
    console.log('what?', data.projects[remoteProjectName])
    const linked2 = await linkRemote(project.path, data.projects[remoteProjectName]);
    count += linked2.length;
  }

  // console.log('paths\n', paths);

  console.log(`Bootstrapped ${count} modules!`);

}

module.exports = ['bootstrap', 'Bootstrap project dependencies',
  (yargs) => {

  },
  (argv) => {

    if (argv.verbose) console.info(`Bootstrapping project`)

    try {

      const name = projectName();

      command(name, process.cwd())

    }
    catch(e) {
      console.error('Could not bootstrap project')
      console.error(e)
    }

  }
];
