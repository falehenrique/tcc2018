let abi_document = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "documentType",
				"type": "bytes32"
			},
			{
				"name": "hash",
				"type": "bytes32"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "bytes32"
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
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "bytes32"
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
				"name": "documentId",
				"type": "uint256"
			}
		],
		"name": "getDocument",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
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

function getInstanceDocument() {
    let DocumentContract = web3.eth.contract(abi_document);
    let documentInstance = DocumentContract.at($("#enderecoContratoDocumento").val());
    return documentInstance;
}

/**
 * Add University
 */
$( "#btnCadastrarDocumento" ).click(function() {
    let documentInstance = getInstanceDocument();
    let documentType = $("#tipo_documento").val();
    let universityId = $("#universidade_id").val();
    let studentId = $("#estudante_id").val();

    documentInstance.addDocument(web3.toHex(documentType),function(error, result){
        if (!error) {
        	console.info(result);
        } else {
            console.error(error);
        }
    });
});

/**
 * Get University
 */
$("#btnConsultarUniversidade" ).click(function() {
	let universityInstance = getInstanceUniversity();
	universityInstance.getUniversity(1, function(error, result){
		if (!error) {
			$("#consulta_nome_universidade").val(web3.toAscii(result[0]));
			$("#consulta_matricula_universidade").val(result[1].c[0]);
		} else {
			console.error(error);
		}
	})
});







function upload() {
    const reader = new FileReader();
    reader.onloadend = function () {
      const ipfs = window.IpfsApi('localhost', 5001, {
        protocol: 'http'
      }) // Connect to IPFS using Infura
      const buf = buffer.Buffer(reader.result) // Convert data into buffer
      ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
        if (err) {
          console.error(err)
          return
        }
        let url = 'http://localhost:5001/ipfs/' + result[0].hash //pic url
        let ERC721Metadata = JSON.stringify({
          "doument_type": $("#tipo_documento").val(),
          "universit_id": $("#universidade_id").val(),
          "student_id": $("#estudante_id").val(),
          "document": url,
        })
        const jsonBuffer = buffer.Buffer(ERC721Metadata)
        ipfs.add(jsonBuffer, (err, result) => {
          if (err) {
            console.error(err)
            return
          }
          mint('http://localhost:5001/ipfs/' + result[0].hash)
        });
      })
    }
    // const photo = document.getElementById("photo");
    // reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
  }
  
  function mint(Uri) {
    console.log(ipfsUri)
  
    var myAddress = web3.eth.coinbase
  
    if (!myAddress) {
      alert("Please use a browser compatible with Ethereum");
      return;
    }
  
    var transactionObject = {
      from: myAddress,
      gas: 900000,
      gasPrice: 3000000000
    };
  
    var hash = web3.sha3(document.getElementById("password").value)
    var qtty = document.getElementById("quantity").value
  
    NFTStoreContract.addCollectible.sendTransaction(hash, ipfsUri, qtty, transactionObject, (error, transaction) => {
      console.log(transaction)
    })
  
  }