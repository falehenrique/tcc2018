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
    // carregarToken();
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