const metadata = {
  "ip": "127.0.0.1",
  "port": "8000"
};

var sqlite3 = require('sqlite-sync');
sqlite3.connect("database.db");
let header = {
  "alg": 256,
  "typ": "JWT"
}

let encoder = function(jsonData) {
  return Buffer.from(JSON.stringify(header)).toString("base64") + "." + Buffer.from(JSON.stringify(jsonData)).toString("base64")
}

let decoder = function(token) {
  let header = "";
  let index = 0;
  let data = "";
  while(index < token.length && token[index] != '.') {
    header += token[index];
    index++;
  }
  index++;
  while(index < token.length) {
    data += token[index]
    index++;
  }
  return JSON.parse(Buffer.from(data, 'base64').toString())
}

function cut(data, available) {
  let availableData = {};
  let to_show = {};
  for(var i = 0; i < available.length; i++) {
    availableData[available[i]] = 1;
  }
  for(key in data) {
    if(availableData[key] != 1) {
      to_show[key] = data[key];
    }
  }
  return to_show;
}

function getBy(id, tableName, data) {
  let query = 'SELECT * FROM ' + tableName + ' WHERE id = ' + id;
  let values = sqlite3.run(query);
  if(!values.length) {
    return {};
  }
  return cut(values[0], data)
}

function getMaxId(table) {
  return sqlite3.run("Select max(id) from " + table + " as maximum")[0]['max(id)']
}

function getAll(tableName, data) {
  let query = 'SELECT * FROM ' + tableName ;
  let values = sqlite3.run(query);
  if(!values.length) {
    return [];
  }
  dataToSend = [];
  for(var i = 0; i < values.length; i++) {
    dataToSend.push(cut(values[i], data))
  }
  return dataToSend
}

function getByNameAndPassowrd(table, username, password) {
  let query = 'SELECT * FROM ' + table + ' WHERE email = "' + username + '" AND parola = "' + password + '"';
  let response = sqlite3.run(query);
  return response
}

function getByAttr(attribute, tableName, data) {
  let stringToCompile = "";
  let index = 0;
  for (pairs in attribute) {
    if(index) {
      stringToCompile += " AND "
    }
    if(typeof attribute[pairs] === 'string')
      stringToCompile += pairs + " = '" + attribute[pairs] + "'"
    else
    stringToCompile += pairs + " = " + attribute[pairs]
    index += 1
  }
  let query = 'SELECT * FROM ' + tableName + ' WHERE ' + stringToCompile;
  let values = sqlite3.run(query);
  if(!values.length) {
    return {};
  }
  return cut(values[0], data)
}

function create(tableName, data, accData) {
  var maxId = getMaxId(tableName) + 1;
  var positions = "(";
  var values = "(";
  var index = 0;
  let clone = JSON.parse(JSON.stringify(data));
  clone['id'] = maxId;
  for(keys in clone) {
    if(index) {
      positions += ', ';
      values += ', '
    }
    positions += keys;
    if(typeof clone[keys] === 'string')
      values += "'" + clone[keys] + "'"
    else
      values += clone[keys]
    index++;
  }
  var query = "INSERT INTO " + tableName + " " + positions + ") VALUES " + values + ")";
  sqlite3.run(query)
  return getBy(maxId, tableName, accData)
}

function getAllByRelation(parent_table, child_table, parent_id) {
  var query = "SELECT * FROM " + child_table + " WHERE " + parent_table + "_id = " + parent_id;
  let values = sqlite3.run(query);
  return values;
}

var express = require('express');
var http = require('http')
var app = express();
var cors = require('cors');
const fs = require('fs');
const jwt = require('./encoder')
const { normalize } = require('path');
app.use(cors({origin: 'http://' + metadata["ip"] + ':' + metadata["port"]}));
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/show_users', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("Request done at operation /show_users!");
  if(req.query.id == undefined) {
    res.json({"user": getAll("user", ['id', 'CNP'])});
    return 0;
  }
  record = getBy(req.query.id, "user", ['id', 'CNP'])
  if(record !== undefined) {
    res.json({"user": record});
  }
  else {
    res.json({"Error": "No such record exists!"});
  }
});

app.post('/login', jsonParser, function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("Request done at operation /login!");
  if(req.body.user.email == undefined || req.body.user.parola == undefined) {
    res.json({"Error": "password or email are incorrect!"});
    return 0;
  }
  record = getByAttr({"email": req.body.user.email, "parola": req.body.user.parola}, "user", ['parola'])
  if(Object.keys(record).length) {
    res.json({"client": encoder({"email": req.body.user.email, "parola": req.body.user.parola, "id": record.id})});
  }
  else {
    res.json({"Error": "No such record exists!"});
  }
});

app.post('/register', jsonParser, function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("Request done at operation /register!");
  if(req.body["user"] == undefined) {
    res.json({"Error": "body with name 'user' is not present!"});
    return 0;
  }
  record = create("user", req.body["user"], ['parola', 'id', 'CNP'])
  if(record !== undefined) {
    res.json({"user": record});
  }
  else {
    res.json({"Error": "No such record exists!"});
  }
});

app.get('/readContract', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("Request done at operation /readContract!");
  if(req.query.id == undefined) {
    res.json({"contract": getAll("contract", ['id', 'user_id', 'company_id'])});
    return 0;
  }
  record = getBy(req.query.id, "contract", ['id', 'user_id', 'company_id'])
  if(record !== undefined) {
    res.json({"contract": record});
  }
  else {
    res.json({"Error": "No such record exists!"});
  }
});

app.post('/writeContract', jsonParser, function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("Request done at operation /writeContract!");
  if(req.body["contract"] == undefined) {
    res.json({"Error": "body with name 'contract' is not present!"});
    return 0;
  }
  record = create("contract", req.body["contract"], ['id', 'user_id', 'company_id'])
  if(record !== undefined) {
    res.json({"contract": record});
  }
  else {
    res.json({"Error": "No such record exists!"});
  }
});

app.get('/company', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("Request done at operation /company!");
  if(req.query.id == undefined) {
    res.json({"company": getAll("company", ['id'])});
    return 0;
  }
  record = getBy(req.query.id, "company", ['id'])
  if(record !== undefined) {
    res.json({"company": record});
  }
  else {
    res.json({"Error": "No such record exists!"});
  }
});

app.post('/company', jsonParser, function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("Request done at operation /company!");
  if(req.body["company"] == undefined) {
    res.json({"Error": "body with name 'company' is not present!"});
    return 0;
  }
  record = create("company", req.body["company"], ['id'])
  if(record !== undefined) {
    res.json({"company": record});
  }
  else {
    res.json({"Error": "No such record exists!"});
  }
});

app.get('/getContracts/:param_id/user_contract', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("Request done at operation /getContracts!");
  if(req.query.id == undefined) {
    res.json({"user_contract": getAllByRelation("company", "user_contract", req.params.param_id)});
    return 0;
  }
  if(req.params.param_id == undefined || !exists("company", req.params.param_id)) {
    res.json({"Error": "No record 'company' with this id exists!"});
    return 0;
  }
  record = getBy(req.query.id, "user_contract", [])
  if(record !== undefined) {
    res.json({"user_contract": record});
  }
  else {
    res.json({"Error": "No such record exists!"});
  }
});

app.post('/writeContracts/:param_id/user_contract', jsonParser, function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("Request done at operation /writeContracts!");
  if(req.body["user_contract"] == undefined) {
    res.json({"Error": "body with name 'user_contract' is not present!"});
    return 0;
  }
  record = create("user_contract", req.body["user_contract"], [])
  if(record !== undefined) {
    res.json({"user_contract": record});
  }
  else {
    res.json({"Error": "No such record exists!"});
  }
});

app.listen(metadata["port"], metadata["ip"]);
