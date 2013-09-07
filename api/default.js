var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('hello, boobies');
});

app.listen(3000);