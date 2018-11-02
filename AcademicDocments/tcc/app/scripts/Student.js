let abi_student = [{ "constant": false, "inputs": [{ "name": "registrationId", "type": "uint256" }, { "name": "name", "type": "string" }], "name": "addStudent", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "studentId", "type": "uint256" }], "name": "getStudent", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "registrationId", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }], "name": "AddNewStudent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }]
// let contractAddress;

function getInstanceStudent(contractAddress) {
	let StudentContract = web3.eth.contract(abi_student);
	let studentInstance = StudentContract.at(contractAddress);
	return studentInstance;
}

/**
 * Add Student
 */
$("#btnCadastrarEstudante").click(function () {
	addStudent(contractAddress);
});


function addStudent(contractAddress) {
	let studentInstance = getInstanceStudent(contractAddress);
	let matricula = $("#matricula_estudante").val();
	let nome = $("#nome_estudante").val();

	let tx = {
		gas: 470000
	}

	studentInstance.addStudent(matricula, nome, tx, function (error, result) {
		if (!error) {
			console.info(result);
		} else {
			console.error(error);
		}
	});
}

/**
 * Get Student
 */
$("#btnConsultarEstudante").click(function () {
	let studentInstance = getInstanceStudent(contractAddress);
	studentInstance.getStudent(1, function (error, result) {
		if (!error) {
			$("#consulta_nome_estudante").val(result[0]);
			$("#consulta_matricula_estudante").val(result[1].c[0]);
		} else {
			console.error(error);
		}
	})
});