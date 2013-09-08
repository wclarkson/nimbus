var BOX_AUTHORIZE = 'https://www.box.com/api/oauth2/authorize';
var BOX_TOKEN = 'https://www.box.com/api/oauth2/token';
var CLIENT_ID = 'it9ibjpeb6ob058682960aovx4iicbdr';

function makeBox() {
  return new Box();
}

function Box(/*secrets*/) {
  this.authorize = authorize;
  this.read = read;
  this.create = create;
  this.destroy = destroy;
}

function authorize(user, onFail) {
  url = BOX_AUTHORIZE + '?'
    + 'response_type=code&'
    + 'client_id=' + CLIENT_ID + '&'
    + 'state=' + user; //we may want this to be more useful.
  window.open(url);
}

function read(pathname, onFail) {

}

function create(pathname, contents, onFail) {
  
}

function destroy(pathname, onFail) {

}

