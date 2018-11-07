const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

  var Student = artifacts.require("Student");

  contract('Student', function(accounts) {
    var student;

    var dono = accounts[0];
    var donoIncorreto = accounts[1];
    
    before("Carregar a estudante", async function(){

        student = await Student.deployed()
        
    });

    it("cadastrar um novo estudante com o dono do contrato", async function(){
        await student.addStudent(12345, "Márcio", { from: dono});
        (await student.name()).should.be.equal("Márcio");
        (await student.registrationId()).should.be.equal(12345);
    })

    it("cadastrar um novo estudante com o dono incorreto", async function() {
        try {
            await student.addStudent(12345, "Fernando", { from: donoIncorreto});
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('revert'), error.toString())
        }
    });
  })