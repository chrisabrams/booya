const exec = require('../../../exec');
const getPackagePaths = require('./package-paths');

async function linkLocal(context, { name, packages, type }) {

  // If single package
  if (type === 'package') {

    const wd = process.cwd();

    exec(`cd ${wd} && yarn && yarn link`, { silent: true });

    return [name];

  }

  // If monorepo of one or more packages

  const linked = [];
  const paths = await getPackagePaths(context, packages);
  
  paths.forEach((path) => {
  
    const wd = path.split('/package.json')[0];
    const packageName = require(path).name;

    linked.push(packageName);

    exec(`cd ${wd} && yarn && yarn link`, { silent: true });

  });
  
  return linked;

}

module.exports = linkLocal;
