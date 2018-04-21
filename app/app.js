//css
import "./stylesheets/style.css";

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import Dox_artifacts from '../build/contracts/DoxHash.json';


window.App = {

  hashInput: undefined,
  info: undefined,
  DoxContract: undefined,
  Dox: undefined,

  init: function(){

    //contracts
    App.DoxContract = contract(Dox_artifacts);
    App.DoxContract.setProvider(web3.currentProvider);
    App.DoxContract.defaults({from: web3.eth.coinbase});

    App.Dox = App.DoxContract.at('0x1db0aa0e8017038e124f510bf2e325dc14591b50');
    console.log(App.Dox);

    //DOM
    App.hashInput = document.getElementById("inputHash");
    App.info = document.getElementById("info");

    //events
    App.initEvents();
  },

  initEvents: function(){

    App.Dox.NewHashStored((err, res) => {
      if(err) 
        console.log(err);
      else{

        App.info.innerHTML =  "Stored Hash: " + res.args._hashContent +
        "\nTime: " + timeConverter(res.args.timestamp);
      }
        
    });
  },

  save: function(){

    App.Dox.save(App.hashInput.value).then((result) => {
      console.log(result);
    });
  },

  find: function(){

    App.Dox.save(App.hashInput.value).then((result) => {
      console.log(result);
    });
  }
}

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    
    window.web3 = new Web3(web3.currentProvider);
  } else {
    alert("No Metamask detected... Falling back to http://127.0.0.1:9545");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.init();



  document.getElementById("btnSave").onclick = App.save;
});


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}