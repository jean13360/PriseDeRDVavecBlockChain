var express = require("express");
var bodyParser = require("body-parser");
var https = require('https');
var http = require('http');
var fs = require('fs');
// Import libraries we need.

var cnxtimeout = 1000*60;

var app = express();

var clients = [];
var clientsAttachedData = [];

var advisors = [];
var loki = require('lokijs');
let configFilePath = `${__dirname}/../agenda.json`

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

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(request, response) {
    console.log(__dirname);
  response.sendFile("index.html", {root : __dirname+ '/dist/'});
})

app.get("/login", function(request, response, next) {
  var loginEnvoye = request.query.id;
  console.log(loginEnvoye);
    let liste = db.getCollection('individu');
  var result = liste.chain().find({login : loginEnvoye}).data();
  console.log(result.length);
  if (result && result.length > 0) {
    response.send('agenda1');
  } else {
    response.status(403 );
    response.send('erreur');
  }

})

http.createServer(app).listen("8888", function(){
  console.log("server listening on port 8888");
});
/*

https.createServer(https_options, app).listen("7001", function(){
  console.log("server listening on port 7001");
});
*/