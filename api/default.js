var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('hello, boobies');
});

app.post('/auth',function(req, res) {
  res.send(500);
});

app.listen(3000);