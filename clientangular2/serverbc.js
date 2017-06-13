var express = require("express");
var bodyParser = require("body-parser");
var https = require('https');
var http = require('http');
var fs = require('fs');
var SSE = require('sse-nodejs');
var RDVenAttente = false;
var numnxRDV = 0;
var app = express();
var SSE2 = require('sse')

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

/*------------------------------------------------------------ BC ------------------------------------------------------------*/
// Import libraries we need.
var Web3 = require('web3');
var contract = require('truffle-contract');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// Import our contract artifacts and turn them into usable abstractions.
var metacoin_artifacts = require('D:/_w/perso/MyGitHub/block2/build/contracts/MetaCoin.json');
var test = MetaCoin.at('0x88f9365fb3544ae6a6ff1d5da628b83f5b5aa38e');

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);
let configFilePath = `${__dirname}/../agendaBC.json`
var loki = require('lokijs');
db = new loki(configFilePath, {autoload: true,  autoloadCallback: loadHandler});

function initindividu() {
  var individu = db.getCollection('individu');
  if (!individu) {
    db.addCollection('individu');
  } else {
    individu.chain().remove();
  }
  individu = db.getCollection('individu');
  individu.insert({ name : 'Bob'   , id:'0000000000', login:'012345678A' });
  individu.insert({ name : 'Jean'  , id:'0000000001', login:'012345678B' , compteBC : '0x7f8105da4dd1af61da7bf587766103ba8534fcdc'});
  individu.insert({ name : 'Pierre', id:'0000000002', login:'012345678C' , compteBC : '0x00ae1858ea41f5667cda17c7915c2f289c4ee819'});

  db.saveDatabase()
}

function loadHandler() {
  initindividu();
}
/*------------------------------------------------------------ BC ------------------------------------------------------------*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          
    res.setHeader("Content-Type", "application/json; charset=UTF-8")
  next();
});

app.get("/", function(request, response) {
  console.log(__dirname);
  initBC();
  response.sendFile("index.html", {root : 'D:/_w/perso/MyGitHub/block2/app/'});
})

app.get("/test", function(request, response) { 
  response.status(200 );
  response.send('{alive :  YES! }');
})


app.get("/sendcoin", function(request, response, next) {
 console.log("SEND COIN !!!!!");
 var addressToreceiver = request.query.id;
 var amount = request.query.amount;
 sendcoin(addressToreceiver, amount);
 response.sendFile("index.html", {root : 'D:/_w/perso/MyGitHub/block2/app/'});
})
app.get("/multiply", function(request, response, next) {
 console.log("MULTIPLY !!!!!");
 initBC();
 var amount = request.query.amount;

  response.status(200 );
  multiply( amount).then(function(value) {
      console.log('multiply  7 * '+amount+': ' + value.valueOf());
      response.status(200 );
      response.send('{value :  ' +  value.valueOf() + '}');
    }).catch(function(e) {
      console.log(e);
      response.status(400 );
      setStatus("Error getting balance; see log.");
       return '';
    })
  
})

app.get("/mesrdv", function(request, response, next) {
 initBC();
 var individuTo     = '0x00ae1858ea41f5667cda17c7915c2f289c4ee819';
 var individuFrom   = '0x7f8105da4dd1af61da7bf587766103ba8534fcdc';
 
 if (request.query.to) {
    let liste = db.getCollection('individu');
    individuTo = liste.chain().find({login :request.query.to}).data()[0];
  }

  getRDV( parseInt(numnxRDV), individuTo).then(function(value) {      
    response.status(200 );
    let liste = db.getCollection('individu');
    var resultIndviduFrom = liste.chain().find({compteBC : value[0]}).data();
    var resultIndviduTo = liste.chain().find({compteBC :value[1]}).data();
    var result = ({
      from : resultIndviduFrom[0].name,
      to : resultIndviduTo[0].name
    });
    response.send(JSON.stringify( result ));
  }).catch(function(e) {
    console.log(e);
    response.status(400 );
    setStatus("Error getting RDV; see log.");
    return '';
  });
});

app.get("/rdv", function(request, response, next) {
 initBC();

 var individuTo     = '0x00ae1858ea41f5667cda17c7915c2f289c4ee819'
 var individuFrom   = '0x7f8105da4dd1af61da7bf587766103ba8534fcdc';
 if (request.query.to) {
    let liste = db.getCollection('individu');
    individuTo = liste.chain().find({login :request.query.to}).data()[0];
  }

   if (request.query.from) {
    let liste = db.getCollection('individu');
    individuFrom = liste.chain().find({login :request.query.from}).data()[0];
  }
 
 demandeDeRDV(individuFrom, individuTo).then(function(value) {
      response.status(200 );
      response.send('{value :  1}');
    }).catch(function(e) {
      console.log(e);
      response.status(400 );
      setStatus("Error getting balance; see log.");
      response.send("{value : Error getting balance; see log.}");
    })  
})


/*------------------------------------------------------------ BC ------------------------------------------------------------*/
function setStatus(message) {
    console.log(message);

}

function sendcoin(receiver, amount) {
  setStatus("Initiating transaction... (please wait)");
  var meta;
  MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: account});
    }).then(function() {
      setStatus("Transaction complete!");
      refreshBalance();
    }).catch(function(e) {
      console.log(e);
      setStatus("Error sending coin; see log.");
    });
}
function initBC(){

   // Bootstrap the MetaCoin abstraction for Use.  
  MetaCoin.setProvider(web3.currentProvider);
  getOneAccount();
   
 
   
}


function checkRDVBC(from) {
  var event =  MetaCoin.at('0x88f9365fb3544ae6a6ff1d5da628b83f5b5aa38e').DemandeRDV({_to: from });
  return event.watch( function (error, result) {
     if (!error) {
       
       console.log('watch');
       
       RDVenAttente = true;    
       numnxRDV = result.args.lastItem;
       console.log(numnxRDV);
       return numnxRDV;
     } else return 0;
  });

}
function checkRDV(from,res) {
  //var event =  MetaCoin.at('0x88f9365fb3544ae6a6ff1d5da628b83f5b5aa38e').DemandeRDV({_to: from });
console.log('checkRDV');
  var serverSent = new SSE(res);
  serverSent.send('mesrdv2', function () {return new Date()},1000);   
   /*   
  event.watch( function (error, result) {
     if (!error) {
       
       console.log('watch');
       
       RDVenAttente = true;    
       numnxRDV = result.args.lastItem;
       console.log(numnxRDV);
     } else {
       console.log('error');
       console.log(error);
     }
  });*/
}
function getOneAccount() {
  
  web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        setStatus("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        setStatus("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      refreshBalance();
    });
}

  function refreshBalance() {   
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
    
      return value.valueOf();
   
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
     
    });
  }

  function multiply(amount) {   
    var meta;
    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.multiply.call(amount, {from: account});
    });
  }

  
  function getRDV(num, fromIndividu) {   
    var meta;
    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getRDVConseiller.call({from: fromIndividu});
    });
  }
  function demandeDeRDV(de, a) {   
    var meta;
    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.demandeDeRDV('0x00ae1858ea41f5667cda17c7915c2f289c4ee819', {from:'0x7f8105da4dd1af61da7bf587766103ba8534fcdc'});
    }).then(function() {
      setStatus("Transaction complete!");
      refreshBalance();
    }).catch(function(e) {
      console.log(e);
      setStatus("Error sending coin; see log.");
    });
  }
/*------------------------------------------------------------ BC ------------------------------------------------------------*/
/*

https.createServer(https_options, app).listen("7001", function(){
  console.log("server listening on port 7001");
});
*/
var server = http.createServer(app).listen("8889", function(){

  console.log("server listening on port 8889");
});
