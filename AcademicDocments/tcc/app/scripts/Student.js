let abi_student = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "registrationId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "bytes32"
			}
		],
		"name": "AddNewStudent",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "registrationId",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "bytes32"
			}
		],
		"name": "addStudent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "studentId",
				"type": "uint256"
			}
		],
		"name": "getStudent",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

function getInstanceStudent() {
    let StudentContract = web3.eth.contract(abi_student);
    let studentInstance = StudentContract.at($("#enderecoContratoEstudante").val());
    return studentInstance;
}

/**
 * Add Student
 */
$( "#btnCadastrarEstudante" ).click(function() {
    let studentInstance = getInstanceStudent();
    let matricula = $("#matricula_estudante").val();
    let nome = $("#nome_estudante").val();

    studentInstance.addStudent(matricula, web3.toHex(nome), function(error, result){
        if (!error) {
        	console.info(result);
        } else {
            console.error(error);
        }
    });
    // startEvent(studentInstance);
});

$("#btnConsultarEstudante" ).click(function() {
	let studentInstance = getInstanceStudent();
	studentInstance.getStudent(1, function(error, result){
		if (!error) {
			console.log(result);
		} else {
			console.error(error);
		}
	})
});


//event.stopWatching();
function startEvent(studentInstance) {
    let evento = studentInstance.AddNewStudent();
    evento.watch(function(error, result){
        console.info(result);
        $("#name").val("Estudante cadastrado com sucesso: " + result.args.registrationId);
    });
}