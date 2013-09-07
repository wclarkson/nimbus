var express = require('express');
var app = express();
var logger = require('logger').createLogger();


app.get('/', function(req, res) {
//  var redis = require('redis');
//  var client = redis.createClient();
  console.log(req);
  res.send(req.url);
//  client.get("greeting", function(err, reply) {
//    res.send(reply);
//  });
});

app.get('/q', function(req, res) {
  console.log(req.params);
  res.send('abc');
});


app.post('/auth' function(req, res) {

});

app.delete('/auth' function(req, res) {

});

app.post('/service', function(req, res) {

});

app.delete('/service', function(req, res) {

});

app.post('/signup', function(req, res) {

});

app.listen(3000);
