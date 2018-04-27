import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import Dox_artifacts from '../../build/contracts/DoxHash.json';


window.App = {

  ipfs_node: undefined,

  content: undefined,
  DoxContract: undefined,
  Dox: undefined,

  init: function(){

    //contracts
    App.DoxContract = contract(Dox_artifacts);
    App.DoxContract.setProvider(web3.currentProvider);
    App.DoxContract.defaults({from: web3.eth.coinbase});

    App.Dox = App.DoxContract.at('0x1db0aa0e8017038e124f510bf2e325dc14591b50');
    appendToConsole("Web3 ready!");

    //DOM
    App.content = document.getElementById("source");
    App.info = document.getElementById("info");

    //events
    App.initEvents();

    //ipfs
    App.ipfs_node = new Ipfs();

    App.ipfs_node.once('ready', () => {

      App.ipfs_node.version((err, version) => { appendToConsole("IPFS ready! (version " + version.version + ")"); });
    })
  },

  initEvents: function(){

    App.Dox.NewHashStored((err, res) => {
      if(err) 
        console.log(err);
      else{
        appendToConsole(res.args._hashId + ": hash stored in the blockchain (ethereum: " + timeConverter(res.args.timestamp) + ")");
      }
        
    });
  },

  store: function (data, name) {

    App.ipfs_node.files.add({
        path: name,
        content: Buffer.from(data)
      }, (err, res) => {
      if (err || !res) {
        appendToConsole("IPFS error");
        return console.error('ipfs add error', err, res);
      }
  
      res.forEach((file) => {
        if (file && file.hash) {
          appendToConsole('file successfully stored (ipfs)', file.hash);
          console.log('ipfs: successfully stored', file.hash);
          saveEth(file.hash);
        }
      });
    })
  },

  search: function (id){
    findEth(id, (res) => {
      console.log(res);
      displayIPFSContent(res[1]); //zweiten rückgabewert übergeben
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

  appendToConsoleWithoutDox("Dox Blochain Memory [Version 1.0.0] <br>(c) 2018 Dox Corporation. all rights reserved.<br>");

  console.log("init");
  App.init();
});

function saveEth(hash){

  App.Dox.save(hash).then((result) => {
    console.log(result); //blockinfo
  });
}

function findEth(id, cb){

  App.Dox.find(id).then((result) => {
    cb(result);
  });
}

function displayIPFSContent (hash) {
  // buffer: true results in the returned result being a buffer rather than a stream
  App.ipfs_node.files.cat(hash, (err, data) => {
    if (err) { return console.error('ipfs cat error', err) }

    appendToConsole('IPFS: retured hash: ' + hash);
    console.log(hash + " => " + data);
    alert(console.log(hash + " => " + data));
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