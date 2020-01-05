const actions = {
  local: require('./lib/link-local'),
  remote: require('./lib/link-remote'),
};
const data = require('../../data').getData();
const { join } = require('path');
const projectName = require('../../lib/project-name');

async function command(name, context) {

  try {

    if (name) {

      const linked = await actions.remote(context, data.projects[name]);

      console.log(`Linked ${linked.length} modules from project ${name}.`);

    }
    else {

      name = projectName();

      const linked = await actions.local(context, data.projects[name]);

      console.log(`Linked ${linked.length} modules for project ${name}.`);

    }

  }
  catch(e) {
    console.error('Could not run package action');
    console.error(e);
  }

}

module.exports = ['link [name]', 'Bootstrap project dependencies',
  (yargs) => {
    yargs
      .positional('name', {
        describe: 'What project to link',
        default: null,
      })
  },
  (argv) => {

    try {

      command(argv.name, process.cwd())

    }
    catch(e) {
      console.error('Could not bootstrap project')
      console.error(e)
    }

  }
];
