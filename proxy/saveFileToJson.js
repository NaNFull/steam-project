const fs = require('fs');
const CircularJSON = require('circular-json');

module.exports.saveFile = (data, path) => {
  data.__version = '5';
  const jsonData = CircularJSON.stringify(data, null, 2);

  fs.writeFileSync(path, jsonData, 'utf-8');
}
