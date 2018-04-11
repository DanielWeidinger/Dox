var doxHash = artifacts.require("./DoxHash.sol");

module.exports = function(deployer) {
  deployer.deploy(doxHash, 42, {gas: 6700000});
};
