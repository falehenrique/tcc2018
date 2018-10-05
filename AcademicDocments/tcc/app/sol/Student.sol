pragma solidity ^0.4.24;

import "../sol/zeppelin/ownership/Ownable.sol";

contract Student is Ownable {
    
    mapping(uint => StudentData) _student;
    uint _studentId = 1;
    
    event AddNewStudent(uint registrationId, bytes32 name);

    struct StudentData {
        uint registrationId;  
        bytes32 name;   
        uint studentId;
    }
    
    function addStudent(uint registrationId, bytes32 name) public onlyOwner{
        StudentData memory student;

        student.studentId = _studentId;
        student.registrationId = registrationId;
        student.name = name;
        
        _student[_studentId] = student;
        _studentId++;

        emit AddNewStudent(registrationId, name);
    }
    
    function getStudent(uint studentId) public view returns(bytes32, uint) {
        return(_student[studentId].name, _student[studentId].registrationId);
    }
}