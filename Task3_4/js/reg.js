'use strict'

let nameUser = JSON.parse(sessionStorage.getItem('sessionNameUser'));

function textName() {
  document.getElementById('nameUser').innerHTML = '';
  document.getElementById('nameUser').innerHTML = nameUser;
}

if (nameUser) textName();

const form = document.forms.reg,
  name = form.elements.name,
  email = form.elements.email,
  password = form.elements.password,
  password2 = form.elements.password2;

let checkError = 0;

function ShowError(input, message) {
  let formControl = input.parentElement;
  formControl.className = "form-control error";

  let small = formControl.querySelector('small');
  small.innerText = message;

  return checkError += 1;
};

function ShowSuccess(input) {
  let formControl = input.parentElement;
  formControl.className = "form-control success";
};

function CheckEmail(input) {
  let char = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (char.test(input.value.trim())) {
    ShowSuccess(input);
  } else {
    ShowError(input, "Email is not valid");
  }
};

function CheckRequired(inputErr) {
  inputErr.forEach(function (input) {
    if (input.value.trim() === "") {
      ShowError(input, `${getFieldName(input)} is required`);
    } else {
      ShowSuccess(input);
    }
  });
};

function CheckLenght(input, min, max) {
  if (input.value.length < min) {
    ShowError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    ShowError(input, `${getFieldName(input)} must be less then ${max} characters`);
  } else {
    ShowSuccess(input);
  }
};

function CheckPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    ShowError(input2, "Password do not match");
  }
};

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  CheckRequired([name, email, password, password2]);
  CheckLenght(name, 3, 15);
  CheckLenght(password, 8, 25);
  CheckEmail(email);
  CheckPasswordsMatch(password, password2);
  recordPasw();
});

function recordPasw() {
  let elements = document.getElementById("form").elements;
  let person = {};
  let users = [];

  for (let i = 0; i < elements.length - 1; i++) {
    let item = elements.item(i);
    person[item.name] = item.value;

    if (checkLocalStorageEmail()) {
      document.getElementById('repeatEmail').textContent = 'this email one is busy';
      setTimeout(function () {
        document.getElementById('repeatEmail').innerHTML = '';
      }, 4000);
      return;
    };

    if (checkError) {
      return checkError = 0;
    };
  };

  function checkLocalStorageEmail() {
    users = JSON.parse(localStorage.getItem('localUser'));
    if (users == null){ 
      return false;
    };       
  };

  users = JSON.parse(localStorage.getItem('localUser')) || [];
  users.push(person);

/* localStorage.clear(); */        //fun clear localStorage=================

  localStorage.setItem('localUser', JSON.stringify(users));

  nameUser = "welcome " + person.name;
  sessionStorage.setItem('sessionNameUser', JSON.stringify(nameUser));

  textName();
  closeReg();
};

function show() {
  let p = document.getElementById('password');
  p.setAttribute('type', 'text');
};

function hide() {
  let p = document.getElementById('password');
  p.setAttribute('type', 'password');
};

let pwShown = 0;

document.getElementById("eye").addEventListener("click", toggle);

function toggle() {
  if (pwShown == 0) {
    pwShown = 1;
    show();
  } else {
    pwShown = 0;
    hide();
  }
};

function show2() {
  let p = document.getElementById('password2');
  p.setAttribute('type', 'text');
};

function hide2() {
  let p = document.getElementById('password2');
  p.setAttribute('type', 'password');
};

let pwShown2 = 0;

document.getElementById("eye2").addEventListener("click", toggle2);

function toggle2() {
  if (pwShown2 == 0) {
    pwShown2 = 1;
    show2();
  } else {
    pwShown2 = 0;
    hide2();
  }
};

function lastPageCloseReg(){  
  let lastPageBeforReg = JSON.parse(sessionStorage.getItem('lastPageBeforReg'));
  if(lastPageBeforReg == 1){
    document.getElementById('idCloseReg').setAttribute('href','./');
  } else if(lastPage == 2){
    document.getElementById('idCloseReg').setAttribute('href','./about.html');
  };  
};

function closeReg() {
  lastPageCloseReg();
  setTimeout(function () {
    document.getElementById('idCloseReg').click();
  }, 2000);
};