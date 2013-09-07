var express = require('express');
var app = express();

app.get('/', function(req, res) {
  var redis = require('redis');
  var client = redis.createClient();
  client.get("greeting", function(err, reply) {
    res.send(reply);
  });
});

app.listen(3000);
