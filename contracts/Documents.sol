pragma solidity ^0.4.24;

import "./zeppelin/ownership/Ownable.sol";

contract AcademicDocument is Ownable {
    mapping(address => Student) _student;
    mapping(address => University) _university;
    mapping(address => Document) _document;
    
    struct University {
        string name;
        uint registrationId;
    }
    
    struct Student {
        string name;
        uint registrationId;
    }
    
    struct Document {
        string hash;
        string documentType;
        uint entryDate;
        mapping(address => University) u;
        mapping(address => Student) s;
    }
    
    function addUniversity(address universityAddress, string name, uint registrationId) public onlyOwner {
        University memory university;
        university.name = name;
        university.registrationId = registrationId;
        
        _university[universityAddress] = university;
    }
    
    function getUniversity(address universityAddress) constant public returns(string, uint) {
        return(_university[universityAddress].name, _university[universityAddress].registrationId);
    }
    
    function addStudent(address studentAddress, string name, uint registrationId) public onlyOwner{
        Student memory student;
        student.name = name;
        student.registrationId = registrationId;
        
        _student[studentAddress] = student;
    }
    
    function getStudent(address studentAddress) constant public returns(string, uint) {
        return(_student[studentAddress].name, _student[studentAddress].registrationId);
    }
    
    function addDocument(address _address, string hash, string name, string documentType, uint entryDate) public onlyOwner {
        Document memory document;
        
        document.hash = hash;
        document.documentType = documentType;
        document.entryDate = now;
        
        _document[_address] = document;
    }
}