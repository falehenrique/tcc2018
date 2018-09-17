var PersonIdentity = artifacts.require("PersonIdentity");

module.exports = async function(deployer, accounts) {
	var advisor = accounts[0];
	await deployer.deploy(PersonIdentity, "genesis", {from: advisor});
}