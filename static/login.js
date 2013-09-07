var login = function(event) {
  var email = $('#l-email');
  var pw = $('#l-pw');

  $.ajax({
    type: "GET",
    url: "/api/auth",
    username: email.val(),
    password: pw.val(),
    success: function() {
      window.location.replace("/main.html");
    },
    error: function(err) {
      console.log(err);
    }
  });
};