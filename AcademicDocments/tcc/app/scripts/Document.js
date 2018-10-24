let abi_document = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "documentId",
				"type": "uint256"
			}
		],
		"name": "getDocument",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
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
				"type": "string"
			}
		],
		"name": "addStudent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "registrationId",
				"type": "uint256"
			}
		],
		"name": "addUniversity",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "documentType",
				"type": "string"
			},
			{
				"name": "hash",
				"type": "string"
			},
			{
				"name": "university",
				"type": "uint256"
			},
			{
				"name": "student",
				"type": "uint256"
			}
		],
		"name": "addDocument",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
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
				"type": "string"
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getUniversity",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
				"type": "string"
			}
		],
		"name": "AddNewStudent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "registrationId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_universityId",
				"type": "uint256"
			}
		],
		"name": "AddNewUniversity",
		"type": "event"
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
	}
]

function getInstanceDocument() {
    let DocumentContract = web3.eth.contract(abi_document);
    let documentInstance = DocumentContract.at($("#enderecoContratoDocumento").val());
    return documentInstance;
}

/**
 * Add Document
 */
$( "#btnCadastrarDocumento" ).click(function() {
	// let documentInstance = getInstanceDocument();
    // let documentType = $("#tipo_documento").val();
	// let universityId = $("#universidade_id").val();
	// let studentId = $("#estudante_id").val();
	
    // let tx = {
    //     gas: 470000
    // }

    // documentInstance.addDocument(documentType, hash, universityId, studentId, tx, function(error, result){
    //     if (!error) {
    //     	console.info(result);
    //     } else {
    //         console.error(error);
    //     }
	// });
	upload();
});

function upload() {
	const reader = new FileReader();
	reader.onloadend = function() {
	  const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
	  const buf = buffer.Buffer(reader.result) // Convert data into buffer
	  ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
		if(err) {
		  console.error(err)
		  return
		}
		let url = 'https://ipfs.io/ipfs/' + result[0].hash;
		alert(`Url --> ${url}`)
		mint('https://ipfs.io/ipfs/' + result[0].hash, result[0].hash)
	  })
	}

	
	const doc = document.getElementById("documento");
	reader.readAsArrayBuffer(doc.files[0]); // Read Provided File
}
  
  function mint(ipfsUri, hash) {
    alert(ipfsUri)
  
    var myAddress = web3.eth.coinbase
  
    if (!myAddress) {
      alert("Please use a browser compatible with Ethereum");
      return;
    }
  
    let documentInstance = getInstanceDocument();
    let documentType = $("#tipo_documento").val();
	let universityId = $("#universidade_id").val();
	let studentId = $("#estudante_id").val();
	
	var tx = {
        from: myAddress,
        gas: 900000,
        gasPrice: 3000000000
      };

    documentInstance.addDocument(documentType, hash, universityId, studentId, tx, function(error, result){
        if (!error) {
        	console.info(result);
        } else {
            console.error(error);
        }
    });
  }