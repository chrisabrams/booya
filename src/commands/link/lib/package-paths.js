const globby = require('globby');

/**
 * 
 * @param {Array<string>} packages An array of paths that a project's packages can be found.
 */
async function packagePaths (context, packages) {

  const packagesGlob = packages.map((packagesPath) => `${packagesPath}/*/package.json`);

  const paths = await globby(packagesGlob, {
    cwd: context,
    deep: 2,
  });

  return paths;

}

module.exports = packagePaths;
