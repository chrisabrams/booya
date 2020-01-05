const { join } = require('path');

function projectName () {

  return require(join(process.cwd(), 'booya.json')).name;

}

module.exports = projectName;
