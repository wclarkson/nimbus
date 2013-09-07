// CRD implementation for Dropbox API
// THIS IS UNTESTED. 

// the middleware will do something like
// var apis = [makeDropbox(), makeBox(), makeGoogleDrive()]
// for (var api in apis) {
//   create(api);
// }
function makeDropbox() {
  Dropbox = require("dropbox");
  client = new Dropbox.Client({key:"p6oew9k9yw0k51v"});
  return new DropboxApi(Dropbox, client);
}

function DropboxApi(Dropbox, client) {
  this.Dropbox = Dropbox;
  this.client = client;
  this.authorize = authorize;
  this.read = read;
  this.create = create;
  this.destroy = destroy;
}

// should be called within a click event listener so the browser will
// definitely open the popup.
// when I run it from the command line, this throws an error re: window,
// probably because it doesn't have a proper browser set up.
function authorize() {
  api.client.authDriver(new api.Dropbox.AuthDriver.Popup({
    recieverUrl: "www.google.com"}));
      // ^^ url pointing to boxes/dropbox_reciever.html
  api.client.authenticate( function(error, data) {
    if (error) { 
      return false;
    }
    return true;
  });
}

function create(pathname, contents) {
  if (!api.client.isAuthenticated()) {
    authorize(api);
  }
  api.client.writeFile(pathname, contents, function(error, stat) {
    if (error) {
      return 0;
    }
    return stat.size();});
}

function read(pathname) {
  if (!api.client.isAuthenticated()) {
    authorize(api);
  }
  api.client.readFile(pathname, function(error, contents) {
    if (error) {
      return "";
    }
    return contents;});
}

function destroy(pathname) {
  if (!api.client.isAuthenticated()) {
    authorize(api);
  }
  api.client.delete(pathname, function(error, stat) {
    if (error) {
      return false;
    }
    return true;});
}
