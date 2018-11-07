const write = require('write');
const path = require('path');

var Document = artifacts.require("./Document.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Document);
  var content = `var contractAddress = '${Document.address}';`;
  write(path.resolve(__dirname, '../../AcademicDocments/tcc/app/scripts/1_contract_address.js'), content);
};
