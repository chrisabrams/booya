const exec = require('../exec');
const globby = require('globby');
const { join } = require('path');
const { patchProject } = require('../data');

async function command(context) {

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

      project.packages = project.packages.map((package) => join(context, package));

    }

    patchProject(config.name, project);

    console.log(`Registered project ${config.name} at ${context}.`);

  }
  catch(e) {

    console.error('Could not register project');
    console.error(e);

  }

}

module.exports = ['register', 'Register project',
  (yargs) => {

  },
  (argv) => {

    if (argv.verbose) console.info(`Registering project`)

    try {

      command(process.cwd())

    }
    catch(e) {
      console.error('Could not register project')
      console.error(e)
    }

  }
];
