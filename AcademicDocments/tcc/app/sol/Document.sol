pragma solidity ^0.4.24;

import "./Ownable.sol";
import "./Student.sol";
import "./University.sol";

contract Document is Ownable, University, Student {
    
    mapping(uint => DocumentData) _document;
    uint _documentId = 1;
    
    struct DocumentData {
        uint documentId;
        uint universityId;
        uint studentId;
        string documentType;
        string hash;
    }
    
    function addDocument(string documentType, string hash, uint university, uint student) public onlyOwner {
        DocumentData memory document;
        
        document.documentType = documentType;
        document.universityId = university;
        document.studentId = student;
        document.hash = hash;
        
        _document[_documentId] = document;
        _documentId++;
    }
    
    function getDocument(uint documentId) public view returns(string, string, string, string) {
        return (
            _document[documentId].documentType,
            _document[documentId].hash,
            _university[_document[documentId].universityId].name,
            _student[_document[documentId].studentId].name
        );
    }
}