// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*', // Match any network id
      gas: 47000000,
      from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"
    }
  }
}
