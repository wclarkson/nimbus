var express = require('express');
var app = express();
var logger = require('logger').createLogger();
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var http = require('http');
var https = require('https');
var fs = require('fs');

mongoose.connect('mongodb://localhost/nimbus');

var userSchema = new Schema({
  firstname:  String,
  lastname:   String,
  email:      String,
  password:   String,
  boxes: [{
    name:           String,
    session_token:  String,
    refresh_token:  String
  }]
});

userSchema.methods.validPassword = function(password)
{
  return password === this.password;
}

var Box = mongoose.model('Box', userSchema);
var User = mongoose.model('User', userSchema);

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'thisisasecret', cookie: {maxAge : 3600000}}));
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
      function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.validPassword(password)) { return done(null, false); }
          return done(null, user);
        });
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

app.get('/auth', 
    passport.authenticate('basic', { session : true }),
    function(req, res) {
      res.send('you\'re logged in!');
    }
);

app.get('/callback/box', function(req, res){
  res.send(req.query);
  if (res['error']) {
    res.send('did not work');
  } else {
    res.send('save began to work');
    // works to here. unsure later.
    user = res['state'];
    authCode = res['code'];
    clientId = 'it9ibjpeb6ob058682960aovx4iicbdr';    
    clientSecret = 'QimYw8RUj9OrDwEszvTM3v21R3DQWZcQ';    
    url = 'https://www.box.com/api/oauth2/token?'    
      + 'grant_type=authorization_code&'    
      + 'code=' + authCode + '&'    
      + 'client_id=' + clientId + '&'    
      + 'client_static=' + clientSecret;    
    res.send('now requesting');
    request.post({uri:url, method:'POST'}, function(req, res) {
      if (res['error']) {    
        console.log('failed');    
        return;    
      }     
      //persist res['access_token'], res['refresh_token']    
      //        console.log('success')    
      //             }     
      //                 );
    });
  }
})

app.get('/callback/dropbox', function(req, res){
  res.send(req.query);
})

app.get('/callback/gdrive', function(req, res){
  res.send(req.query);
})

app.delete('/auth', function(req, res) {

});

app.post('/service', function(req, res) {

});

app.delete('/service', function(req, res) {

});

app.post('/signup', function(req, res) {
  debugger
  console.log(req.body)
  userData = {
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    password : req.body.password,
    boxes : []
  };
  var u = new User(userData);
  u.save();
  res.send(200, userData);
});

var sslOptions = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt")
};

https.createServer(sslOptions, app).listen(8443);
http.createServer(app).listen(3000);
