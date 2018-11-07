const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

  var Document = artifacts.require("Document");

  contract('University', function(accounts) {
    var document;

    var dono = accounts[0];
    var donoIncorreto = accounts[1];
    
    before("Carregar o documento", async function(){
        document = await Document.deployed()
    });

    it("cadastrar um novo documento com o dono do contrato e universidade e estudante existentes", async function(){
        await document.addDocument("Matricula", "QmTQt19p8eznNsisNwBiSfzXHJei15e5nK3XKULy2TCiCz", 1, 1, { from: dono});
        (await document.documentType()).should.be.equal("Matricula");
        (await document.studentId()).should.be.equal(1);
        (await document.universityId()).should.be.equal(1);
        (await document.hash()).should.be.equal("");
    })

    it("cadastrar um novo documento com o dono correto e com universidade inexistente", async function() {
        try {
            await document.addDocument("Matricula", "QmTQt19p8eznNsisNwBiSfzXHJei15e5nK3XKULy2TCiCz", 20, 1, { from: dono});
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('revert'), error.toString())
        }
    });

    it("cadastrar um novo documento com o dono correto e com estudante inexistente", async function() {
        try {
            await document.addDocument("Matricula", "QmTQt19p8eznNsisNwBiSfzXHJei15e5nK3XKULy2TCiCz", 1, 20, { from: dono});
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('revert'), error.toString())
        }
    });

    it("cadastrar um novo documento com o dono incorreto", async function() {
        try {
            await document.addDocument("Matricula", "QmTQt19p8eznNsisNwBiSfzXHJei15e5nK3XKULy2TCiCz", 1, 1, { from: donoIncorreto});
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('revert'), error.toString())
        }
    });
  })