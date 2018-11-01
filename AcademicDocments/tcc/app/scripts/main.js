//geth --rpc --rpcaddr "localhost" --rpcport "8545" --rpcapi "web3,eth,net,personal" --rpccorsdomain "*" --datadir "./private"

// web3 
// projeto https://github.com/ethereum/web3.js
//documentação https://github.com/ethereum/wiki/wiki/JavaScript-API

//load
window.addEventListener('load', function() {
    // var urlNode = 'http://127.0.0.1:7545';
    var urlNode = 'http://localhost:8545';
    window.web3 = new Web3(new Web3.providers.HttpProvider(urlNode));
    // conect with metamask
    // window.web3 = new Web3(web3.currentProvider)
    checkWeb3()
    carregarToken();
});

//Check the web3 connection
function checkWeb3(){
    // Set the connect status on the app
    if (web3 && web3.isConnected()) {
        console.info('Connected');
        $('#no_status').text("Conectado");
        // Set version
        setWeb3Version();
        checkNodeStatus();
    } else {
        console.info('Not Connected');
        $('#no_status').text("Desconectado");
    }
}

//Get web3 version
function setWeb3Version() {
    var versionJson = {};
    // Asynchronous version
    web3.version.getNode(function(error, result){
        if(error){
            console.info(error);
        } else {
            $('#versionGeth').text(result);
            console.info(result);
        }
    });
}

//check if the client is listening and peer count
function checkNodeStatus()  {
    // it is Asynch
    web3.net.getListening(function(error, result){
        if(error) {
            console.info('get_peer_count ' + error);
        } else {
            // get the peer count
            web3.net.getPeerCount(  function(  error,  result ) {
                if(error){
                    console.info('get_peer_count ' + error);
                } else {
                    $('#nodes').text(result);
                    console.info('Peer Count: ' + result);
                }
            });
        listAccounts();
        }
    });
}

function listAccounts() {
    //Asynch
    web3.eth.getAccounts(function (error, result) {
        if (error) {
            console.info('accounts ' + error);
        } else {
            var accounts = result;
            $('#sizeAccounts').text(result.length);
            console.info('accounts length =' + result.length);

            var accounts_ul = $('#accounts_ul');
            // clear the accounts_ul
            accounts_ul.empty;
            // Add the accounts as list items
            for (var i = 0; i < result.length; i++) {
                accounts_ul.append('<li>'+result[i]+'</li>');
            }
            
            var coinbase = web3.eth.coinbase;
            if(coinbase){

            }
            coinbase = coinbase.substring(0,25)+'...'
            console.info('==coinbase==='+ coinbase);
            var defaultAccount = web3.eth.defaultAccount;
            console.info('==defaultAccount==='+ defaultAccount);
        }
    });
}

$( "#btnBalance" ).click(function() {
    var account = $('#account').val();
    console.info(account);
    web3.eth.getBalance(account, web3.eth.defaultBlock, function(error, result){
        console.info(result);
        var balance = web3.fromWei(result, 'ether').toFixed(2);
        $('#accountBalance').val(balance);
    });
});

$( "#btnUnlock" ).click(function() {
    var accountUnlock = $("#accountUnlock").val();
    var password = $("#password").val();
    console.info(accountUnlock);
    web3.personal.unlockAccount(accountUnlock, password, function(error, result)  {
        if(error){
            alert(error);
        } else {
            if(result){
                alert('Account unlock');
            } else {
                alert("It wasn't possible to unlock the account.");
            }   
        }
    });
});

$( "#btnSendEther" ).click(function() {
    var sender = $("#from").val();
    var receiver = $("#to").val();
    var amount = $("#valueToSend").val();

    web3.eth.sendTransaction({
        "from": sender,
        "to": receiver,
        "value": web3.toWei(amount, 'ether'),
        "gas": 300000},
        function(error, result)  {
        if(error){
            alert(error);
        } else {
            if(result){
                $('#labelResultSendEther').text(result);
            } else {
                alert("It wasn't possible to send transaction.");
            }   
        }
    });
});

$( "#btnTransaction" ).click(function() {
    var transaction = $("#transaction").val();

    web3.eth.getTransaction(transaction, function(error, result)  {
        if(error){
            alert(error);
        } else {
            if(result){
                console.info(result);
                $('#resultTransaction').val(JSON.stringify(result, null, '\t'));
            } else {
                alert("It wasn't possible to view the transaction.");
            }   
        }
    });
});

let abi = [{ "constant": true, "inputs": [{ "name": "documentId", "type": "uint256" }], "name": "getDocument", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "registrationId", "type": "uint256" }, { "name": "name", "type": "string" }], "name": "addStudent", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "name", "type": "string" }, { "name": "registrationId", "type": "uint256" }], "name": "addUniversity", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "documentType", "type": "string" }, { "name": "hash", "type": "string" }, { "name": "university", "type": "uint256" }, { "name": "student", "type": "uint256" }], "name": "addDocument", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "studentId", "type": "uint256" }], "name": "getStudent", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getUniversity", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "registrationId", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }], "name": "AddNewStudent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "registrationId", "type": "uint256" }, { "indexed": false, "name": "_universityId", "type": "uint256" }], "name": "AddNewUniversity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }]
function carregarToken() {

    var documentContract = web3.eth.contract(abi);
	var document = documentContract.new(
		{
			from: web3.eth.accounts[0],
			data: '0x608060405260016002819055600481905560065560008054600160a060020a03191633179055610c99806100346000396000f3006080604052600436106100825763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633f9b250a811461008757806342ecc52a1461024957806348b4aa84146102a95780634c64b1ee14610304578063642f9163146103a45780638da5cb5b1461043b578063c99086d014610479575b600080fd5b34801561009357600080fd5b5061009f600435610491565b6040518080602001806020018060200180602001858103855289818151815260200191508051906020019080838360005b838110156100e85781810151838201526020016100d0565b50505050905090810190601f1680156101155780820380516001836020036101000a031916815260200191505b5085810384528851815288516020918201918a019080838360005b83811015610148578181015183820152602001610130565b50505050905090810190601f1680156101755780820380516001836020036101000a031916815260200191505b50858103835287518152875160209182019189019080838360005b838110156101a8578181015183820152602001610190565b50505050905090810190601f1680156101d55780820380516001836020036101000a031916815260200191505b50858103825286518152865160209182019188019080838360005b838110156102085781810151838201526020016101f0565b50505050905090810190601f1680156102355780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390f35b34801561025557600080fd5b5060408051602060046024803582810135601f81018590048502860185019096528585526102a79583359536956044949193909101919081908401838280828437509497506107189650505050505050565b005b3480156102b557600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526102a7943694929360249392840191908190840183828082843750949750509335945061083e9350505050565b34801561031057600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526102a794369492936024939284019190819084018382808284375050604080516020601f89358b018035918201839004830284018301909452808352979a99988101979196509182019450925082915084018382808284375094975050843595505050602090920135915061096f9050565b3480156103b057600080fd5b506103bc600435610a21565b6040518080602001838152602001828103825284818151815260200191508051906020019080838360005b838110156103ff5781810151838201526020016103e7565b50505050905090810190601f16801561042c5780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34801561044757600080fd5b50610450610ad1565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561048557600080fd5b506103bc600435610aed565b6000818152600560209081526040808320600180820154855280845282852060028084015487526003808752968590209684018054865181861615610100026000190190911692909204601f8101889004880283018801909652858252606097889788978897939660049094019594929093019286918301828280156105585780601f1061052d57610100808354040283529160200191610558565b820191906000526020600020905b81548152906001019060200180831161053b57829003601f168201915b5050865460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959950889450925084019050828280156105e65780601f106105bb576101008083540402835291602001916105e6565b820191906000526020600020905b8154815290600101906020018083116105c957829003601f168201915b5050855460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959850879450925084019050828280156106745780601f1061064957610100808354040283529160200191610674565b820191906000526020600020905b81548152906001019060200180831161065757829003601f168201915b5050845460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959750869450925084019050828280156107025780601f106106d757610100808354040283529160200191610702565b820191906000526020600020905b8154815290600101906020018083116106e557829003601f168201915b5050505050905093509350935093509193509193565b610720610b5e565b60005473ffffffffffffffffffffffffffffffffffffffff16331461074457600080fd5b600454604080830182905284835260208084018581526000938452600382529190922083518155905180518493610782926001850192910190610b80565b506040918201516002909101556004805460010190558051848152602080820183815285519383019390935284517fb3b7629c7ca1a24c2fbe52e7dcb037ae5b1532c5541187f7c57235252bc0174393879387939092606084019185019080838360005b838110156107fe5781810151838201526020016107e6565b50505050905090810190601f16801561082b5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a1505050565b610846610bfe565b60005473ffffffffffffffffffffffffffffffffffffffff16331461086a57600080fd5b60025460408083018290528483526020808401859052600092835260018152912082518051849361089f928492910190610b80565b50602082810151600180840191909155604093840151600293840155825401918290558251808201869052928301829052606080845286519084015285517f6404030ee551495d1f3dd519e1482342e76c61daa2c48788b6473c3dcd56b9f893879387939092829160808301919087019080838360005b8381101561092e578181015183820152602001610916565b50505050905090810190601f16801561095b5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a1505050565b610977610c20565b60005473ffffffffffffffffffffffffffffffffffffffff16331461099b57600080fd5b606081018581526020808301858152604080850186815260808601899052600654600090815260058552919091208551815591516001830155516002820155915180518493926109f2926003850192910190610b80565b5060808201518051610a0e916004840191602090910190610b80565b5050600680546001019055505050505050565b60008181526003602090815260408083208054600191820180548451600294821615610100026000190190911693909304601f81018690048602840186019094528383526060959490939192918491830182828015610ac15780601f10610a9657610100808354040283529160200191610ac1565b820191906000526020600020905b815481529060010190602001808311610aa457829003601f168201915b5050505050915091509150915091565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60008181526001602081815260408084208084015481548351600296821615610100026000190190911695909504601f810185900485028601850190935282855260609594919390928491830182828015610ac15780601f10610a9657610100808354040283529160200191610ac1565b6060604051908101604052806000815260200160608152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610bc157805160ff1916838001178555610bee565b82800160010185558215610bee579182015b82811115610bee578251825591602001919060010190610bd3565b50610bfa929150610c50565b5090565b6060604051908101604052806060815260200160008152602001600081525090565b60a06040519081016040528060008152602001600081526020016000815260200160608152602001606081525090565b610c6a91905b80821115610bfa5760008155600101610c56565b905600a165627a7a72305820949386bc4dd18ceae39b9daf12340fb25e80edb483e5a832fc36d796334d0ff60029',
			gas: '4700000'
		}, function (e, contract) {
			console.log(e, contract);
			if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                sessionStorage.setItem('contractAddress', contract.address);
                // global = contract.address;
			}
		})
}