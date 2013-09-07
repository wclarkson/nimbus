// CRD implementation for Dropbox API
// THIS IS UNTESTED. 
// Not quite sure if these global vars are doing what I want them to do (ie
// always existing)

var Dropbox = require("dropbox");
var client = new Dropbox.Client({key:"p6oew9k9yw0k51v"});

// should be called within a click event listener so the browser will
// definitely open the popup.
function authorize() {
  client.authDriver(new Dropbox.AuthDriver.Popup({
    recieverUrl: "www.google.com"}));
      // ^^ url pointing to boxes/dropbox_reciever.html
  client.authenticate( function(error, data) {
    if (error) { 
      return false;
    }
    return true;
  });
}

// returns size in bytes.
function create(pathname, contents) {
  if (!client.isAuthenticated()) {
    authorize();
  }
  client.writeFile(pathname, contents, function(error, stat) {
    if (error) {
      return 0;
    }
    return stat.size();});
}

// returns contents of file.
function read(pathname) {
  if (!client.isAuthenticated()) {
    authorize();
  }
  client.readFile(pathname, function(error, contents) {
    if (error) {
      return "";
    }
    return contents;});
}

// returns whether the delete worked.
function destroy(pathname) {
  if (!client.isAuthenticated()) {
    authorize();
  }
  client.delete(pathname, function(error, stat) {
    if (error) {
      return false;
    }
    return true;});
}

