pragma solidity ^0.4.24;

import "./zeppelin/ownership/Ownable.sol";
import "./Student.sol";
import "./University.sol";

contract AcademicDocument is Ownable, Student, University {
    mapping(uint => Document) _document;
    uint _documentId = 1;

    struct Document {
        uint documentId;
        bytes32 hash;
        bytes32 documentType;
        uint entryDate;
        uint universityId;
        uint studentId;
    }

    function addDocument(bytes32 documentType, bytes32 hash, uint university, uint student) public onlyOwner {
        Document memory document;
        
        document.hash = hash;
        document.documentType = documentType;
        document.entryDate = now;
        document.universityId = university;
        document.studentId = student;
        
        _document[_documentId] = document;
        _documentId++;
    }
 
    function getDocument(uint documentId) public view returns(bytes32, uint, bytes32, bytes32) {
        return (
            _document[documentId].documentType, 
            _document[documentId].entryDate,  
            _university[_document[documentId].universityId].name,  
            _student[_document[documentId].studentId].name
        );
    }
}
