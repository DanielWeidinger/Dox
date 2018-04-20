//css
import "./stylesheets/style.css";

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import Dox_artifacts from '../build/contracts/DoxHash.json';


window.App = {

  hashInput: undefined,

  DoxContract: undefined,

  Dox: undefined,

  init: function(){

    //contracts
    App.DoxContract = contract(Dox_artifacts);
    App.DoxContract.setProvider(web3.currentProvider);
    App.DoxContract.defaults({from: web3.eth.coinbase});

    App.Dox = App.DoxContract.at('0x3663d424765750614e8dee1a241f909f66348395');
    console.log(App.Dox);

    //events
    App.Dox.NewHashStored((err, res) => {
      if(err) 
        console.log(err);
      else
        console.log(res);
    })

    App.hashInput = document.getElementById("inputHash");
    /*DoxContract.deployed().then(function(instance) {
      return console.log(instance);
    }).catch(function(e) {
      console.log(e);
    });*/
  },

  save: function(){

    console.log(App.Dox);

    App.Dox.save(App.hashInput.value);
  }
}

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.init();



  document.getElementById("btnSave").onclick = App.save;
});