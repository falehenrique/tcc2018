const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

  var University = artifacts.require("University");

  contract('University', function(accounts) {
    var university;

    var dono = accounts[0];
    var donoIncorreto = accounts[1];
    
    before("Carregar a universisdade", async function(){
        university = await University.deployed()
    });

    it("cadastrar uma nova unisersidade com o dono do contrato", async function(){
        await university.addUniversity("PUCRS", 1234, { from: dono});
        (await university.name()).should.be.equal("PUCRS");
        (await university.registrationId()).should.be.equal(1234);
    })

    it("cadastrar uma nova unisersidade com o dono incorreto", async function() {
        try {
            await university.addUniversity("PUCRS", 1234, { from: donoIncorreto});
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('revert'), error.toString())
        }
    });
  })