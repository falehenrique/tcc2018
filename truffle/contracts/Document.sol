pragma solidity ^0.4.24;

import "./zeppelin/ownership/Ownable.sol";
import "./Util/StringUtil.sol";
import "./Student.sol";
import "./University.sol";

contract Document is Ownable, University, Student {
    
    using StringUtils for string;

    mapping(uint => DocumentData) _document;
    uint _documentId = 1;

    event AddNewDocument(uint _documentId, uint universityId, uint studentId, string documentType, string has);
    
    struct DocumentData {
        uint documentId;
        uint universityId;
        uint studentId;
        string documentType;
        string hash;
    }
    
    function addDocument(string documentType, string hash, uint university, uint student) public onlyOwner {
        require(_university[university].name.stringToBytes32() != 0x0, "Necessary University");
        require(_student[student].name.stringToBytes32() != 0x0, "Necessary Student");

        DocumentData memory document;
        
        document.documentType = documentType;
        document.universityId = university;
        document.studentId = student;
        document.hash = hash;
        
        _document[_documentId] = document;
        _documentId++;

        emit AddNewDocument(_documentId, document.universityId, document.studentId, documentType, hash);
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