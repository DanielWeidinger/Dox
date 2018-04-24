//css
import "./stylesheets/style.css";

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import Dox_artifacts from '../build/contracts/DoxHash.json';


window.App = {

  ipfs_node: undefined,

  content: undefined,
  info: undefined,
  DoxContract: undefined,
  Dox: undefined,

  init: function(){

    //contracts
    App.DoxContract = contract(Dox_artifacts);
    App.DoxContract.setProvider(web3.currentProvider);
    App.DoxContract.defaults({from: web3.eth.coinbase});

    App.Dox = App.DoxContract.at('0x1db0aa0e8017038e124f510bf2e325dc14591b50');
    console.log("Web3 Ready!");

    //DOM
    App.content = document.getElementById("source");
    App.info = document.getElementById("info");

    //events
    App.initEvents();

    //ipfs
    App.ipfs_node = new Ipfs();

    App.ipfs_node.once('ready', () => {
      console.log("IPFS ready!");

      App.ipfs_node.version((err, version) => { console.log("IPFS Version: " + version.version); });
    })
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

  document.getElementById("btnSave").onclick = store;
});

function saveEth(){

  App.Dox.save(App.content.value).then((result) => {
    console.log(result);
  });
}

function findEth(){

  App.Dox.save(App.hashInput.value).then((result) => {
    console.log(result);
  });
}

function store () {
  let toStore = document.getElementById('source').value;

  App.ipfs_node.files.add(Buffer.from(toStore), (err, res) => {
    if (err || !res) {
      return console.error('ipfs add error', err, res);
    }

    res.forEach((file) => {
      if (file && file.hash) {
        console.log('ipfs: successfully stored', file.hash);
        saveEth();
        display(file.hash);
      }
    });
  })
}

function display (hash) {
  // buffer: true results in the returned result being a buffer rather than a stream
  App.ipfs_node.files.cat(hash, (err, data) => {
    if (err) { return console.error('ipfs cat error', err) }

    console.log(hash + " => " + data);
  })
}

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