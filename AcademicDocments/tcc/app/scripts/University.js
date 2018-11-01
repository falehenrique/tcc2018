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

	// console.log(global);
	// var universityContract = web3.eth.contract(abi);
	// var university = universityContract.new(
	// 	{
	// 		from: web3.eth.accounts[0],
	// 		data: '0x60806040526001600255336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610552806100586000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806348b4aa841461005c5780638da5cb5b146100cf578063c99086d014610126575b600080fd5b34801561006857600080fd5b506100cd600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001909291905050506101d3565b005b3480156100db57600080fd5b506100e4610364565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561013257600080fd5b5061015160048036038101908080359060200190929190505050610389565b6040518080602001838152602001828103825284818151815260200191508051906020019080838360005b8381101561019757808201518184015260208101905061017c565b50505050905090810190601f1680156101c45780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b6101db61045f565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561023657600080fd5b60025481604001818152505082816000018190525081816020018181525050806001600060025481526020019081526020016000206000820151816000019080519060200190610287929190610481565b5060208201518160010155604082015181600201559050506002600081548092919060010191905055507f6404030ee551495d1f3dd519e1482342e76c61daa2c48788b6473c3dcd56b9f883836002546040518080602001848152602001838152602001828103825285818151815260200191508051906020019080838360005b83811015610323578082015181840152602081019050610308565b50505050905090810190601f1680156103505780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a1505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606000600160008481526020019081526020016000206000016001600085815260200190815260200160002060010154818054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561044f5780601f106104245761010080835404028352916020019161044f565b820191906000526020600020905b81548152906001019060200180831161043257829003601f168201915b5050505050915091509150915091565b6060604051908101604052806060815260200160008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106104c257805160ff19168380011785556104f0565b828001600101855582156104f0579182015b828111156104ef5782518255916020019190600101906104d4565b5b5090506104fd9190610501565b5090565b61052391905b8082111561051f576000816000905550600101610507565b5090565b905600a165627a7a72305820aadf7add73c5953fd001b5b8613f8ebc607a4121f68ca137a15604492d341bc80029',
	// 		gas: '4700000'
	// 	}, function (e, contract) {
	// 		console.log(e, contract);
	// 		if (typeof contract.address !== 'undefined') {
	// 			console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	global = sessionStorage.getItem('contractAddress');
	newUniversity(global);
			// }
		// })
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
	let universityInstance = getInstanceUniversity(global);
	universityInstance.getUniversity(1, function (error, result) {
		if (!error) {
			$("#consulta_nome_universidade").val(result[0]);
			$("#consulta_matricula_universidade").val(result[1].c[0]);
		} else {
			console.error(error);
		}
	})
});