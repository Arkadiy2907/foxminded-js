'use strict'

let form = document.forms.reg1,
    userName = form.elements.userName,
    email = form.elements.email,
    tel = form.elements.tel,
    address = form.elements.address,
    city = form.elements.city,
    state = form.elements.state,
    zip = form.elements.zip;

function ShowError(input, message) {
    let formControl = input.parentElement;
    formControl.className = "form-control error";
    
    let small = formControl.querySelector('small');
    small.innerText = message;
};

function ShowSuccess(input) {
    let formControl = input.parentElement;
    formControl.className = "form-control success";
};

function CheckName(input) {
    let regex = /^[a-zA-Z ]{2,30}$/;
    if (regex.test(input.value.trim())) {
        ShowSuccess(input);
        return true;
    } else {
        ShowError(input, "name is not valid");
        return false;
    };
};

function CheckEmail(input) {
    let char = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (char.test(input.value.trim())) {
        ShowSuccess(input);
        return true;
    } else {
        ShowError(input, "Email is not valid");
        return false;
    }
};

function CheckTelephone(input) {
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (regex.test(input.value.trim())) {
        ShowSuccess(input);
        return true;
    } else {
        ShowError(input, `Telephone is not valid,
      using this format 12223334455 or +12223334455`);
        return false;
    };
};

function CheckZip(input) {
    let regex = /^[0-9]{5,7}$/;
    if (regex.test(input.value.trim())) {
        ShowSuccess(input);
        return true;
    } else {
        ShowError(input, `Zip is not valid, use numbers`);
        return false;
    };
};

function CheckLenght(input, min, max) {
    if (input.value.length < min) {
        ShowError(input, `${getFieldName(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        ShowError(input, `${getFieldName(input)} must be less then ${max} characters`);
        return false;
    } else {
        ShowSuccess(input);
        return true;
    };
};

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

function checkInput(userName, email, tel, address, city, state, zip) {
    if (CheckLenght(userName, 3, 15) && CheckName(userName) && CheckEmail(email) && CheckTelephone(tel) && CheckName(address) && CheckName(city) && CheckName(state) && CheckLenght(zip, 3, 10) && CheckZip(zip)) {
        return true;
    } else {
        return false;
    };
};

document.querySelector('.buttonNext').addEventListener('click', function (e) {    
    if (checkInput(userName, email, tel, address, city, state, zip)) {       
        sendOrder();
    } else {
        e.preventDefault();
    };
});

function sendOrder() {  
    Array.from(form.elements).forEach((input) => {
        input.type = 'hidden';
    });
       form.action = `./order2.html`;       
};
