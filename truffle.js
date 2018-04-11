// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 47000000,
      from: "0x8a20e49bf1ac5ecd8b395f9dde6d72497fb97a0f"
    }
  }
}
