let abi = [{ "constant": false, "inputs": [{ "name": "registrationId", "type": "uint256" }, { "name": "name", "type": "string" }], "name": "addStudent", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "studentId", "type": "uint256" }], "name": "getStudent", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "registrationId", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }], "name": "AddNewStudent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }]
let contractAddress;

function getInstanceStudent(contractAddress) {
	let StudentContract = web3.eth.contract(abi);
	let studentInstance = StudentContract.at(contractAddress);
	return studentInstance;
}

/**
 * Add Student
 */
$("#btnCadastrarEstudante").click(function () {
	var studentContract = web3.eth.contract(abi);
	var student = studentContract.new(
		{
			from: web3.eth.accounts[0],
			data: '0x6080604052600160025560008054600160a060020a031916331790556104698061002a6000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342ecc52a811461005b578063642f9163146100bb5780638da5cb5b14610152575b600080fd5b34801561006757600080fd5b5060408051602060046024803582810135601f81018590048502860185019096528585526100b99583359536956044949193909101919081908401838280828437509497506101909650505050505050565b005b3480156100c757600080fd5b506100d36004356102b4565b6040518080602001838152602001828103825284818151815260200191508051906020019080838360005b838110156101165781810151838201526020016100fe565b50505050905090810190601f1680156101435780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34801561015e57600080fd5b50610167610364565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b610198610380565b60005473ffffffffffffffffffffffffffffffffffffffff1633146101bc57600080fd5b60025460408083018290528483526020808401858152600093845260018083529290932084518155925180518594936101fa939085019201906103a2565b50604091820151600291820155805460010190558051848152602080820183815285519383019390935284517fb3b7629c7ca1a24c2fbe52e7dcb037ae5b1532c5541187f7c57235252bc0174393879387939092606084019185019080838360005b8381101561027457818101518382015260200161025c565b50505050905090810190601f1680156102a15780820380516001836020036101000a031916815260200191505b50935050505060405180910390a1505050565b6000818152600160208181526040808420805490840180548351600296821615610100026000190190911695909504601f8101859004850286018501909352828552606095949093919290918491908301828280156103545780601f1061032957610100808354040283529160200191610354565b820191906000526020600020905b81548152906001019060200180831161033757829003601f168201915b5050505050915091509150915091565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b6060604051908101604052806000815260200160608152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106103e357805160ff1916838001178555610410565b82800160010185558215610410579182015b828111156104105782518255916020019190600101906103f5565b5061041c929150610420565b5090565b61043a91905b8082111561041c5760008155600101610426565b905600a165627a7a72305820858dc0254a77cee3ac00a9009504d136bda8f9f6b2251da205fa89cd24594fad0029',
			gas: '4700000'
		}, function (e, contract) {
			console.log(e, contract);
			if (typeof contract.address !== 'undefined') {
				console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
				contractAddress = contract.address
				addStudent(contractAddress)
			}
		})
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