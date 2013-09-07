// gdrive.js

var baseAuthURL = 'https://accounts.google.com/o/oauth2/auth'

function authorize(params, callback){
	request = baseAuthURL + $.param(params);
	$.post(request, callback)
}