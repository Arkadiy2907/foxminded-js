'use strict'

let person = {
  name: "",
  email: ""
};
let users = [];

function logIn() {
  FB.login(function (response) {
    if (response.status == "connected") {
      person.userID = response.authResponse.userID;
      person.accessToken = response.authResponse.accessToken;

      FB.api('/me?fields=id,name,email', function (userData) {
        person.name = userData.name;
        person.email = userData.email;

        let nameUser = "welcome " + person.name;
        sessionStorage.setItem('sessionNameUser', JSON.stringify(nameUser));
        document.getElementById('nameUser').innerHTML = '';
        document.getElementById('nameUser').innerHTML = nameUser;

        users = JSON.parse(localStorage.getItem('localUser')) || [];
        users.push(person);
        localStorage.setItem('localUser', JSON.stringify(users));
      });
    }
  }, { scope: 'public_profile, email' });
};

window.fbAsyncInit = function () {
  FB.init({
    appId: '351836383013056',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v11.0'
  });
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


