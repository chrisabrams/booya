const { join } = require('path');

function getConfig(context = process.cwd()) {

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

  if (type === 'package') {

  }

  else if (type === 'monorepo') {

    project.packages = config.packages || './packages';

    if (!(project.packages instanceof Array)) {

      project.packages = [project.packages];

    }

    project.packages = project.packages.map((pkg) => join(context, pkg));

  }

  return project;

}

module.exports.getConfig = getConfig;
