pragma solidity ^0.4.24;

import "./zeppelin/ownership/Ownable.sol";
import "./Student.sol";
import "./University.sol";

contract AcademicDocument is Ownable, Student, University {
    mapping(uint => Document) _document;
    uint _documentId = 1;

    event AddNewDocument(string documentType, string hash, uint university, uint student, uint _documentId); 

    struct Document {
        uint documentId;
        string hash;
        string documentType;
        uint entryDate;
        uint universityId;
        uint studentId;
    }

    function addDocument(string documentType, string hash, uint university, uint student) public onlyOwner {
        Document memory document;
        
        document.documentId = _documentId;
        document.hash = hash;
        document.documentType = documentType;
        document.entryDate = now;
        document.universityId = university;
        document.studentId = student;
        
        _document[_documentId] = document;
        _documentId++;

        emit AddNewDocument(documentType, hash, university, student, _documentId);
    }
 
    function getDocumentt(uint documentId) public view returns(string, uint, string, string) {
        return(
            _document[documentId].documentType, 
            _document[documentId].entryDate, 
            _university[_document[documentId].universityId].name, 
            _student[_document[documentId].studentId].name
        );
    }
}
