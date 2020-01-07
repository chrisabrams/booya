const exec = require('yargs-vc/exec');
const getPackagePaths = require('./package-paths');

async function linkRemote(context, { name, packages, type }) {

  // If remote is a single package
  if (type == 'package') {

    exec(`cd ${context} && yarn link ${name}`, { silent: true });

    return [name];

  }

  // If remote is a monorepo of one or more packages

  const linked = [];
  const paths = await getPackagePaths(context, packages);
  
  paths.forEach((path) => {
  
    const wd = path.split('/package.json')[0];
    const packageName = require(path).name;

    linked.push(packageName);

    exec(`cd ${wd} && yarn && yarn link`, { silent: true }); // Don't assume the remote package has been installed & linked
    exec(`cd ${context} && yarn link ${packageName}`, { silent: true });

  });
  
  return linked;

}

module.exports = linkRemote;
