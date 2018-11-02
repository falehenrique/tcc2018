let abi_university = [{ "constant": false, "inputs": [{ "name": "name", "type": "string" }, { "name": "registrationId", "type": "uint256" }], "name": "addUniversity", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getUniversity", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "registrationId", "type": "uint256" }, { "indexed": false, "name": "_universityId", "type": "uint256" }], "name": "AddNewUniversity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }]

function getInstanceUniversity(contractAddress) {
	let UniversityContract = web3.eth.contract(abi_university);
	let universityInstance = UniversityContract.at(contractAddress);
	return universityInstance;
}

/**
 * Add University
 */
$("#btnCadastrarUniversidade").click(function () {
	newUniversity(contractAddress);
});

function newUniversity(contractAddress) {
	let universityInstance = getInstanceUniversity(contractAddress);
	let matricula = $("#matricula_universidade").val();
	let nome = $("#nome_universidade").val();

	let tx = {
		gas: 470000
	}

	universityInstance.addUniversity(nome, matricula, tx, function (error, result) {
		if (!error) {
			console.info(result);
		} else {
			console.error(error);
		}
	});
}

/**
 * Get University
 */
$("#btnConsultarUniversidade").click(function () {
	let universityInstance = getInstanceUniversity(contractAddress);
	universityInstance.getUniversity(1, function (error, result) {
		if (!error) {
			$("#consulta_nome_universidade").val(result[0]);
			$("#consulta_matricula_universidade").val(result[1].c[0]);
		} else {
			console.error(error);
		}
	})
});