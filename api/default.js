var express = require('express');
var app = express();
var logger = require('logger').createLogger();
var passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy
var User = require('passport-http').User

var auth = express.basicAuth(function(user, pass, callback) {
  var result = (user === 'test' && pass === 'test');
  callback(null, result);
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
          done(err, user);
            });
});

passport.use(new BasicStrategy(
      function(username, password, done) {
        return done(null, true);
        User.findOne({ username : username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.validPassword(password)) { return done(null, false); }
          return done(null, user);
        });
        return done(null, null);
      }));

app.get('/', function(req, res) {
  //  var redis = require('redis');
  //  var client = redis.createClient();
  console.log(req);
  res.send(req.url);
  //  client.get("greeting", function(err, reply) {
  //    res.send(reply);
  //  });
});

app.get('/q', auth, function(req, res) {
  console.log(req.params);
  res.send('abc');
});

app.get('/auth', 
    passport.authenticate('basic', { session : true }),
    function(req, res) {
      res.send('you\'re logged in!');
    }
    );

app.delete('/auth', function(req, res) {

});

app.post('/service', function(req, res) {

});

app.delete('/service', function(req, res) {

});

app.post('/signup', function(req, res) {

});

app.listen(3000);
