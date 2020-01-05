const exec = require('../../../exec');
const getPackagePaths = require('./package-paths');

async function linkRemote(context, { name, packages, type }) {

  // If remote is a single package
  if (type == 'package') {
    console.log('name', name)
    exec(`yarn link ${name}`, { silent: true });

    return [name];

  }

  // If remote is a monorepo of one or more packages

  const linked = [];
  const paths = await getPackagePaths(context, packages);
  
  paths.forEach((path) => {
  
    const packageName = require(path).name;

    linked.push(packageName);

    exec(`yarn link ${packageName}`, { silent: true });

  });
  
  return linked;

}

module.exports = linkRemote;
