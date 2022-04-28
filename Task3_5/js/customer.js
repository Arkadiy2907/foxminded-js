'use strict'

const form = document.forms.formCustomer,
  nameCustomer = form.elements.nameCustomer,
  surnameCustomer = form.elements.surnameCustomer,
  firstBuyingCustomer = form.elements.firstBuyingCustomer,
  nextBuyingCustomer = form.elements.nextBuyingCustomer,
  paymentCustomer = form.elements.paymentCustomer;

let checkError = 0; //this for send form
let discountCustomer = 0;

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

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

function CheckDate(input) {
  let nowDate = new Date();
  if (Date.parse(input.value) <= nowDate) {
    ShowSuccess(input);
  } else {
    ShowError(input, "Date is not valid");
  };
};

form.addEventListener('submit', function(e) {
  e.preventDefault();
  CheckRequired([nameCustomer, surnameCustomer]);
  CheckName(nameCustomer);
  CheckName(surnameCustomer);
  CheckLenght(nameCustomer, 3, 15);
  CheckLenght(surnameCustomer, 3, 15);

  if (firstBuyingCustomer.value != "") {
    CheckDate(firstBuyingCustomer);
  };

  if (nextBuyingCustomer.value != "") {
    CheckDate(nextBuyingCustomer);
  };

  getFormAboutCustomer();
});

class Customer {
  constructor(nameCustomer, surnameCustomer, firstBuyingCustomer, nextBuyingCustomer, paymentCustomer, discountCustomer) {
    this.firstName = nameCustomer.value;
    this.lastName = surnameCustomer.value;
    this.firstBuying = firstBuyingCustomer.value;
    this.nextBuying = nextBuyingCustomer.value;
    this.payment = paymentCustomer.value;
    this.discount = discountCustomer;
  }

  discountCustomer() {
    if (this.firstBuying == "" || this.nextBuying == "") {
      return this.discount = 0;
    } else {
      return this.discount = 5;
    };
  };

  isDateFirstBuyingCustomer() {
    if (this.firstBuying != "") {
      let chengeDate = new Date(Date.parse(this.firstBuying));
      let stringDate = `${chengeDate.getDate()} : ${chengeDate.getMonth()} : ${chengeDate.getFullYear()}`;
      return stringDate;
    } else {
      return this.firstBuying = 'none';
    };
  };

  isDateNextBuyingCustomer() {
    if (this.nextBuying != "") {
      let chengeDate = new Date(Date.parse(this.nextBuying));
      let stringDate = `${chengeDate.getDate()} : ${chengeDate.getMonth()} : ${chengeDate.getFullYear()}`;
      return stringDate;
    } else {
      return this.nextBuying = 'none';
    };
  };
};

function getFormAboutCustomer() {
  if (checkError) {
    return checkError = 0;
  };

  let customer = new Customer(nameCustomer, surnameCustomer, firstBuyingCustomer, nextBuyingCustomer, paymentCustomer, discountCustomer);

  let objectInputInformation = {
    nameCustomer: customer.firstName,
    surnameCustomer: customer.lastName,
    firstBuyingCustomer: customer.isDateFirstBuyingCustomer(),
    nextBuyingCustomer: customer.isDateNextBuyingCustomer(),
    paymentCustomer: customer.payment
  };

  let objectName = {
    nameCustomer: customer.firstName,
    surnameCustomer: customer.lastName,
  };

  let objectCustomerDiscount = {
    discount: customer.discountCustomer()
  };

  console.log(objectInputInformation);
  console.log(objectName);
  console.log(objectCustomerDiscount);
};