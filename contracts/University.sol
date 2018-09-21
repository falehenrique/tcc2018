pragma solidity ^0.4.24;

import "./zeppelin/ownership/Ownable.sol";

contract University is Ownable {
    
    mapping(uint => UniversityData) _university;
    uint _universityId = 1;
    
    struct UniversityData {
        string name;
        uint registrationId;
        uint universityId;
    }
    
    function addUniversity(string name, uint registrationId) public onlyOwner {
        UniversityData memory universityData;

        universityData.universityId = _universityId;
        universityData.name = name;
        universityData.registrationId = registrationId;
        
        _university[_universityId] = universityData;
        _universityId++;
    }
    
    function getUniversity(uint id) public view returns(string, uint) {
        return(_university[id].name, _university[id].registrationId);
    }
}