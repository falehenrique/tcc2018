pragma solidity ^0.4.23;

import "./zeppelin/owership/Ownable.sol";
import "./Collaborator.sol";

contract Documents is Ownable, Collaborator {
    mapping(address => Document) public _documents;

    struct Document {
        string hash;
        string documenType;
        uint entryDate;
        mapping(address => uint8) student;
    }
    
    function addBoletim(address _address, string hash) public onlyAuthorizer {
        Document memory document;
        
        document.hash = hash;
        document.entryDate = now;
        
        _documents[_address] = document;
    }
    
    modifier onlyAuthorizer() {
        _;
    }
}
