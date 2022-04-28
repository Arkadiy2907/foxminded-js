'use strict'

const form = document.forms.formOrder,
  userName = form.elements.userName,
  password = form.elements.password,
  password2 = form.elements.password2,
  chooseBike = form.elements.chooseBike,
  chooseBikeComment = form.elements.chooseBikeComment,
  billingAddressName = form.elements.billingAddressName,
  billingAddressSurname = form.elements.billingAddressSurname,
  billingAddressStreet = form.elements.billingAddressStreet,
  billingAddressField = form.elements.billingAddressField,
  billingAddressStateRegion = form.elements.billingAddressStateRegion,
  billingAddressZipCode = form.elements.billingAddressZipCode,
  billingAddressTel = form.elements.billingAddressTel,
  addressMatch = form.elements.addressMatch,
  deliveryAddressName = form.elements.deliveryAddressName,
  deliveryAddressSurname = form.elements.deliveryAddressSurname,
  deliveryAddressStreet = form.elements.deliveryAddressStreet,
  deliveryAddressField = form.elements.deliveryAddressField,
  deliveryAddressStateRegion = form.elements.deliveryAddressStateRegion,
  deliveryAddressZipCode = form.elements.deliveryAddressZipCode,
  deliveryAddressTel = form.elements.deliveryAddressTel,
  dateDelivery = form.elements.dateDelivery,
  typeCard = form.elements.typeCard,
  cardNumber = form.elements.cardNumber,
  expiration = form.elements.expiration,
  cvv = form.elements.cvv;

let resultOrder = {};
let checkError = 0; //this for send form
let toogleCheckPassword = true; //now password check

needAccount.addEventListener("click", function () {
  if (needAccount.checked) {
    userName.value = "none",
    password.value = "",
    password2.value = "";
    toogleCheckPassword = false; //now password no check
  }
  return toogleCheckPassword;
});


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

function CheckTelephone(input) {
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (regex.test(input.value.trim())) {
    ShowSuccess(input);
  } else {
    ShowError(input, `Telephone is not valid,
    using this format 12223334455 or +12223334455`);
  };
};

function CheckCardNumber(input) {
  let regex = /^\d{4}([ \-]?)((\d{6}\1?\d{5})|(\d{4}\1?\d{4}\1?\d{4}))$/gm;
  if (regex.test(input.value.trim())) {
    ShowSuccess(input);
  } else {
    ShowError(input, `Card number is not valid, using this format 
    1111222233334444 or 111122223333444 or 1111 2222 3333 4444`);
  };
};

function CheckCvv(input) {
  let regex = /^[0-9]{3,4}$/;
  if (regex.test(input.value.trim())) {
    ShowSuccess(input);
  } else {
    ShowError(input, `CVV is not valid, using this format 123 or 1234`);
  };
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

function CheckDate(input){
 let nowDate = new Date();
  if (Date.parse(input.value) >= nowDate) {
    ShowSuccess(input);
  } else {
    ShowError(input, "Date is not valid");
  };
};

function CheckDateMonth(input){
  let nowDateMonth = new Date();
  let CheckDate = new Date(Date.parse(input.value)); //here get date 1 namber choose month
  CheckDate.setMonth(CheckDate.getMonth() + 1);
  CheckDate.setDate(-1);// for last day choose month
   if (CheckDate > nowDateMonth || CheckDate == nowDateMonth) {
     ShowSuccess(input);
   } else {
     ShowError(input, "Date is not valid");
   };
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  CheckRequired([billingAddressName, billingAddressSurname, deliveryAddressName, deliveryAddressSurname, typeCard, cardNumber, expiration, cvv]);
  CheckName(billingAddressName);
  CheckName(billingAddressSurname);
  CheckName(deliveryAddressName);
  CheckName(deliveryAddressSurname);
  CheckTelephone(billingAddressTel);
  CheckTelephone(deliveryAddressTel);
  CheckPasswordsMatch(password, password2);
  CheckCardNumber(cardNumber);
  CheckCvv(cvv);
  CheckDate(dateDelivery);
  CheckDateMonth(expiration);

  if(toogleCheckPassword){
    CheckRequired([userName, password, password2]);
    CheckLenght(userName, 3, 15);
    CheckLenght(password, 8, 25);
    CheckName(userName);
  };

  resultOrder = {
    ["name user"]: userName.value,
    password: password.value,
    ["choose bike"]: chooseBike.value,
    ["choose bike comment"]: chooseBikeComment.value,
    ["name for billing address"]: billingAddressName.value,
    ["surname for billing address"]: billingAddressSurname.value,
    ["street for billing address"]: billingAddressStreet.value,
    ["chose district for billing address"]: billingAddressField.value,
    ["district for billing address"]: billingAddressStateRegion.value,
    ["zip code for billing address"]: billingAddressZipCode.value,
    ["phone number for billing address"]: billingAddressTel.value,
    ["name for delivery address"]: deliveryAddressName.value,
    ["surname for delivery address"]: deliveryAddressSurname.value,
    ["street for delivery address"]: deliveryAddressStreet.value,
    ["chose district for delivery address"]: deliveryAddressField.value,
    ["district for delivery address"]: deliveryAddressStateRegion.value,
    ["zip code for delivery address"]: deliveryAddressZipCode.value,
    ["phone number for delivery address"]: deliveryAddressTel.value,
    ["date delivery"]: dateDelivery.value,
    ["type credite card"]: typeCard.value,
    ["number credite card"]: cardNumber.value,
    expiration: expiration.value,
    cvv: cvv.value
  }

  if(!toogleCheckPassword){
    delete resultOrder["name user"];
    delete resultOrder.password;
  };

  sendOrder();
  
});

function sendOrder(){
  if (checkError) {
    return checkError = 0;
  };

  sessionStorage.setItem('resultOrder', JSON.stringify(resultOrder));
  window.document.location = "./result.html";
};

addressMatch.addEventListener("click", function () {
  if (addressMatch.checked) {
    deliveryAddressName.value = billingAddressName.value;
    deliveryAddressSurname.value = billingAddressSurname.value;
    deliveryAddressStreet.value = billingAddressStreet.value;
    deliveryAddressField.value = billingAddressField.value;
    deliveryAddressStateRegion.value = billingAddressStateRegion.value;
    deliveryAddressZipCode.value = billingAddressZipCode.value;
    deliveryAddressTel.value = billingAddressTel.value;
  }
});

if(!chooseBikeComment.value){
  chooseBikeComment.value = " ";
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


