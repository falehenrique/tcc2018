pragma solidity ^0.4.24;

import "./zeppelin/ownership/Ownable.sol";

contract AcademicDocument is Ownable {
    mapping(address => Document) public _documents;
    mapping(address => Authorizer) public _authorizers;
    mapping(address => Student) public _student;
    mapping(address => University) public _university;
    
    struct Authorizer {
        address _address;
        string name;
    }

    struct Student {
        address _studentAddress;
        string name;
        string registrationId;
        address university;
    }
    
    struct Document {
        string hash;
        string documentType;
        uint entryDate;
    }
    
    struct University {
        address _universityAddress;
        string name;
    }
    
    function addDocument(address _address, string hash) public onlyAuthorizer {
        Document memory document;
        
        document.hash = hash;
        document.entryDate = now;
        
        _documents[_address] = document;
    }
    
    function addUniversity(address _address, string name) public onlyAuthorizer {
        University memory university;
        
        university.name = name;
        _university[_address] = university;
    }
    
    function addStudent(address _address, address university,  string name, string registrationId) public onlyAuthorizer {
        Student memory student;
        
        student.name = name;
        student.registrationId = registrationId;
        student.university = university;
        _student[_address] = student;
    }
    
    function addAuthorizer(address _address, string name) public onlyOwner {
        
    }
    
    modifier onlyAuthorizer() {
        require(_authorizers[msg.sender]._address != 0x0);
        _;
    }   
    
    // modifier onlyOwner() {
    //     require(msg.sender == )
    // }
}

