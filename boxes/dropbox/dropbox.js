var Client;
var encodedKey = '223y525pior7kvz';
var baseurl = 'http://localhost:8000';
var holder = "";

window.onload = function(){
	Client = new Dropbox.Client({key: encodedKey});
	dropbox_auth(Client, function(e,d){Client = d})
	dropbox_get(Client, "Hello_world.txt", function(e, d){
		holder = d;
	})
}


function dropbox_auth(client, callback){
	client.authenticate(callback);
}


function dropbox_put(client, filename, data, callback){
	if(client.isAuthenticated()){
		client.writeFile(filename, data, callback);
	}
	else{
		callback('not authenticated', null);
	}
}

function dropbox_get(client, filename, callback){
	if(client.isAuthenticated()){
		client.readFile(filename, callback);
	}
	else{
		callback('not authenticated', null);
	}
}




