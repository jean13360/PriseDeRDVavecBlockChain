
// web3 is an Ethereum client library
const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

// This file is generated by the Solidity compiler to easily interact with
// the contract using the web3 library.
const rdvAbi = require('./RDV.json').abi;
const RDVContract = web3.eth.contract(rdvAbi).at(0xa8c9aca1a9b5fd638a6aa025545e1274787f3456);

module.exports = RDVContract;