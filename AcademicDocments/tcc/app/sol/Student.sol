pragma solidity ^0.4.24;

import "../sol/zeppelin/ownership/Ownable.sol";

contract Student is Ownable {
    
    mapping(uint => StudentData) _student;
    uint _studentId = 1;
    
    event AddNewStudent(uint registrationId, string name);

    struct StudentData {
        uint registrationId;  
        string name;   
        uint studentId;
    }
    
    function addStudent(uint registrationId, string name) public onlyOwner{
        StudentData memory student;

        student.studentId = _studentId;
        student.registrationId = registrationId;
        student.name = name;
        
        _student[_studentId] = student;
        _studentId++;

        emit AddNewStudent(registrationId, name);
    }
    
    function getStudent(uint studentId) public view returns(string, uint) {
        return(_student[studentId].name, _student[studentId].registrationId);
    }
}