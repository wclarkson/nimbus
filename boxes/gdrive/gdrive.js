// gdrive.js

var baseAuthURL = 'https://accounts.google.com/o/oauth2/auth'
var baseAuthParams = {
	
};

function authorize(params, callback){

	request = baseAuthURL + $.param(params);
	$.post(request, callback)
}