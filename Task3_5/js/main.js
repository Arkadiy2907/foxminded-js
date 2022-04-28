'use strict'
// localStorage.clear();

let nameUser = JSON.parse(sessionStorage.getItem('sessionNameUser'));

function textName() {
  document.getElementById('nameUser').innerHTML = '';
  document.getElementById('nameUser').innerHTML = nameUser;
}

if (nameUser) textName();

form.addEventListener('submit', function (e) {
  e.preventDefault();
  findPasw();
});



function getReg() {
  let elements = document.getElementById("form");
  let person = {
    email: elements.email.value,
    password: elements.password.value,
  };

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
    nameUser = textSave;
    sessionStorage.setItem('sessionNameUser', JSON.stringify(nameUser));

    textName();

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

function logOut() {
  nameUser = JSON.parse(sessionStorage.getItem('sessionNameUser'));
  nameUser = "";
  document.getElementById('nameUser').innerHTML = nameUser;
  sessionStorage.setItem('sessionNameUser', JSON.stringify(nameUser));

  document.getElementById('enter').innerHTML = 'Please log in or register';
  document.getElementById('enter').style.color = "black";
}

function saveLastPageAbout() {
  let lastPageBeforReg = 2;
  sessionStorage.setItem('lastPageBeforReg', JSON.stringify(lastPageBeforReg));
}

function saveLastPageIndex() {
  let lastPageBeforReg = 1;
  sessionStorage.setItem('lastPageBeforReg', JSON.stringify(lastPageBeforReg));
}
