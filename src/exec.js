const execSync = require('child_process').execSync;

function exec (cmd, options) {

  const { silent } = options;

  const execOptions = {
    stdio: [0, 1, 2],
  };

  if(silent) {
    execOptions.stdio = ['ignore', 'ignore', 'ignore'];
  }

  execSync(cmd, execOptions);

}

module.exports = exec;
