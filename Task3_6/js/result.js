"use strict";

const user = document.querySelector(".userNameResultat");
const email = document.querySelector(".emailAddressResultat");
const preferredLodgings = document.querySelector(".preferredLodgingsResultat");

const resultOrder = JSON.parse(sessionStorage.getItem('result'));
const resultChecked = JSON.parse(sessionStorage.getItem('arrayChekid'));

let userName,
    emailAddress,
    checked;

function createEl(nameElem, basicEl, sessionStorageObj) {
    nameElem = document.createElement('div');
    nameElem.className = "infoOrder";
    nameElem.innerHTML = `&#160; ${sessionStorageObj}`;
    basicEl.append(nameElem);
};

createEl(userName, user, resultOrder.nameUser);
createEl(emailAddress, email, resultOrder.email);


for (let key in resultChecked) {
    createEl(checked, preferredLodgings, resultChecked[key]);
};