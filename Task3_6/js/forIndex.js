'use strict'

const form = document.forms.reg,
    userName = form.elements.userName,
    password = form.elements.password,
    password2 = form.elements.password2,
    email = form.elements.email;

let resultOrder = {};
let arrChecked = [];
let checkError = 0; //this for send form
let toogleCheckPassword = true; //now password check

function ShowError(input, message) {
    let formControl = input.parentElement;
    formControl.className = "form-control error";

    let small = formControl.querySelector('small');
    small.innerText = message;

    return checkError += 1; // if checkError !=0 form send no 
};

function ShowSuccess(input) {
    let formControl = input.parentElement;
    formControl.className = "form-control success";
};

function CheckName(input) {
    let regex = /^[a-zA-Z ]{2,30}$/;
    if (regex.test(input.value.trim())) {
        ShowSuccess(input);
    } else {
        ShowError(input, "name is not valid");
    };
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
    inputErr.forEach(function(input) {
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
    };
};

function CheckPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        ShowError(input2, "Password do not match");
    };
};

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

form.addEventListener('submit', function(e) {
    e.preventDefault();
    CheckRequired([userName, password, password2, email]);
    CheckLenght(userName, 3, 15);
    CheckLenght(password, 8, 25);
    CheckName(userName);
    CheckPasswordsMatch(password, password2);
    CheckEmail(email);

    resultOrder = {
        nameUser: userName.value,
        email: email.value
    };

    sendOrder();
});

function createArrCheckid() {
    const blocksLabel = document.getElementsByTagName("label");
    for (let index = 6; index < 14; index++) {
        if (form.elements[index].checked) {
            arrChecked.push(blocksLabel[index - 2].textContent);
        };
    };
    return arrChecked;
};

function sendOrder() {
    if (checkError) {
        return checkError = 0;
    };

    sessionStorage.setItem('result', JSON.stringify(resultOrder));
    sessionStorage.setItem('arrayChekid', JSON.stringify(createArrCheckid()));

    window.document.location = "./result.html";
};

// =================================open/close password

function show() {
    document.getElementById('password').setAttribute('type', 'text');
    document.getElementById('eyeOrderImg').setAttribute('src', './pic/eyeOpen30.png');
};

function hide() {
    document.getElementById('password').setAttribute('type', 'password');
    document.getElementById('eyeOrderImg').setAttribute('src', './pic/eyeClose30.png');
};

let pwShown = 0;

document.getElementById("eyeOrder").addEventListener("click", toggle);

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
    document.getElementById('password2').setAttribute('type', 'text');
    document.getElementById('eyeOrderImg2').setAttribute('src', './pic/eyeOpen30.png');
};

function hide2() {
    document.getElementById('password2').setAttribute('type', 'password');
    document.getElementById('eyeOrderImg2').setAttribute('src', './pic/eyeClose30.png');
};

let pwShown2 = 0;

document.getElementById("eyeOrder2").addEventListener("click", toggle2);

function toggle2() {
    if (pwShown2 == 0) {
        pwShown2 = 1;
        show2();
    } else {
        pwShown2 = 0;
        hide2();
    }
};