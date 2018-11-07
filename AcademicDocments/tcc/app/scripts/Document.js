let abi = [
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
        "name": "_documentId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "universityId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "studentId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "documentType",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "has",
        "type": "string"
      }
    ],
    "name": "AddNewDocument",
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
  }
]

function getInstanceDocument() {
	let DocumentContract = web3.eth.contract(abi);
	let documentInstance = DocumentContract.at(contractAddress);
	return documentInstance;
}

/**
 * Add Document
 */
$("#btnCadastrarDocumento").click(function () {
  $('#registro_document_id').val("");
	upload();
});

function upload() {
	const reader = new FileReader();
	reader.onloadend = function () {
		const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
		const buf = buffer.Buffer(reader.result) // Convert data into buffer
		ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
			if (err) {
				console.error(err)
				return
			}
			mint(result[0].hash)
		})
	}

	const doc = document.getElementById("documento");
	reader.readAsArrayBuffer(doc.files[0]); // Read Provided File
}

function mint(hash) {
	var myAddress = web3.eth.coinbase

	if (!myAddress) {
		("Please use a browser compatible with Ethereum");
		return;
	}

	let documentInstance = getInstanceDocument(contractAddress);
	let documentType = $("#tipo_documento").val();
	let universityId = $("#universidade_id").val();
	let studentId = $("#estudante_id").val();

	var tx = {
		from: myAddress,
		gas: 900000,
		gasPrice: 3000000000
	};

	documentInstance.addDocument(documentType, hash, universityId, studentId, tx, function (error, result) {
		if (!error) {
			console.info(result);
      startEvent(documentInstance);
		} else {
			console.error(error);
    }
  });
}

/**
* Get Student
*/
$("#btnConsultarDocumento").click(function () {
  let documentInstance = getInstanceDocument();
  let idDocument = $("#consulta_id_documento").val();
	documentInstance.getDocument(idDocument, function (error, result) {
		if (!error) {
			$("#consulta_tipo_documento").val(result[0]);
			$('#consulta_link_doc').attr('href', 'http://localhost:8080/ipfs/' + result[1]);
			$('#consulta_link_doc').html('Baixar');
			$("#consulta_nome_universidade").val(result[2]);
			$("#consulta_nome_estudante").val(result[3]);
		} else {
			console.error(error);
		}
  })
});

function startEvent(documentInstance) {
  let event = documentInstance.AddNewDocument();
  event.watch(function(error, result){
    console.info(result.args);
    alert("Documento inserido com sucesso. O código do documento é " + result.args._documentId.toNumber());
    $("#tipo_documento").val("");
	  $("#universidade_id").val("");
    $("#estudante_id").val("");
    $('#documento').val("");
    $('#registro_document_id').val("Id do documento cadastrado: " + result.args._documentId.toNumber());
});
}