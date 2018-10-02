let abi_student = [{"constant": false,"inputs": [{"name": "registrationId","type": "uint256"},{"name": "name","type": "string"}],"name": "addStudent","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"}],"name": "OwnershipRenounced","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "previousOwner","type": "address"},{"indexed": true,"name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"constant": true,"inputs": [{"name": "studentId","type": "uint256"}],"name": "getStudent","outputs": [{"name": "","type": "string"},{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"}];


function getInstanceStudent() {
    let StudentContract = web3.eth.contract(abi_student);
    let studentInstance = StudentContract.at($("#enderecoContratoEstudante").val());
    return personInstance;
}


/**
 * Add Student
 */
$( "#btnCadastrarEstudante" ).click(function() {
    let studentInstance = getInstanceStudent();
    let matricula = $('#registrationId').val();
    let nome = $('name').val();

    studentInstance.addStudent.sendTransaction(matricula, nome, function(error, result){
        console.info(result);
    });

    startEvent(studentInstance);

});

//event.stopWatching();
function startEvent(studentInstance) {
    let evento = studentInstance.AddNewStudent();
    evento.watch(function(error, result){
        console.info(result);
        $("#name").val("Estudante cadastrado com sucesso: " + result.args.registrationId);
    });
}