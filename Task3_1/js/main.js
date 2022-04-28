'use strict'
// localStorage.clear();

let forHi = JSON.parse(sessionStorage.getItem('sessionForHi'));

function textHi() {
  document.getElementById('forHi').innerHTML = '';
  document.getElementById('forHi').innerHTML = forHi;
}

if (forHi) textHi();

form.addEventListener('submit', function (e) {
  e.preventDefault();
  findPasw();
});



function getReg() {
  let elements = document.getElementById("form").elements;
  let person = {};

  for (let i = 0; i < elements.length; i++) {
    let item = elements.item(i);
    person[item.name] = item.value;
  }

  return person;
};

function findPasw() {   
  let users = JSON.parse(localStorage.getItem('localUser'));
  if (users == null) {
    let person = {
      name: " ",
      email: " ",
      pasword: " "
    };
   users = [person];
  }
  let personAutoriz = getReg();
  let findEmail = users.find(item => item.email == personAutoriz.email) ? true : false;
  let findPasword = findEmail ? users.find(item => item.email == personAutoriz.email).password : false;
  let textSave = findPasword !== personAutoriz.password || findPasword == false ? "Upss! please register" : "welcome " + users.find(item => item.email == personAutoriz.email).name;

  document.getElementById('enter').innerHTML = '';
  document.getElementById('enter').innerHTML = textSave;

  if (textSave == "Upss! please register") {
    document.getElementById('enter').style.color = "red";    
  } else {
    document.getElementById('enter').style.color = "green";
    forHi = textSave;
    sessionStorage.setItem('sessionForHi', JSON.stringify(forHi));

    textHi();

    setTimeout(function () {
      document.getElementById('idClose').click();
    }, 2000);
  };  
};

function commentButton() {
  document.getElementById('restAbout').click();
  document.getElementById('answerComment').innerHTML = "thank you for message";
  setTimeout(function () {
    document.getElementById('answerComment').innerHTML = "";
  }, 3000);
};

function logOut(){
  forHi = JSON.parse(sessionStorage.getItem('sessionForHi'));
  forHi ="";
  document.getElementById('forHi').innerHTML = forHi;
  sessionStorage.setItem('sessionForHi', JSON.stringify(forHi));
}