const { writeFileSync } = require('fs');
const { join } = require('path');

const dataPath = join(__dirname, '..', '..', 'data.json');

function getData() {

  try {
    return readData();
  }
  // Datafile does not exist
  catch(e) {

    return initData();

  }

}

function initData() {

  return {
    projects: {}
  };

}

function patchData(data) {

  const _data = {
    ...getData(),
    ...data,
  };

  writeData(_data);

}

function patchProject(name, project) {

  const data = getData();

  if (!data.projects[name]) {
    data.projects[name] = {};
  }

  data.projects[name] = {
    ...data.projects[name],
    ...project,
  }

  writeData(data);

}

function readData() {

  return require(dataPath);

}

function writeData(data) {

  writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

}

module.exports.getData = getData;
module.exports.patchData = patchData;
module.exports.patchProject = patchProject;
module.exports.readData = readData;
module.exports.writeData = writeData;
