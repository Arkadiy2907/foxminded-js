'use strict'

let url = new URL(document.location);
let order = getObjFromUrl();

function getObjFromUrl() {
    let obj = {};
    location.search
        .substring(1)
        .split('&')
        .forEach((item) => {
            let param = item.split('=');
            obj[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);            
        });
    return obj;
};

const form2 = document.forms.reg2,
    comment = form2.elements.comment,
    frequency = form2.elements.frequency,
    packageSize = form2.elements.packageSize;

function dobleOrder() {    
    order.comment = comment.value;
    order.frequency = frequency.value;
    order.packageSize = packageSize.value;   
    console.log(order);
};

function dobleUrl() {
    Array.from(form2.elements).forEach((input, name) => {       
        url.searchParams.set(`${name}`, `${input.value}`);
    });
    console.log(url);
};

document.querySelector('.signUp').addEventListener('click', function () {
    comment.value = (!comment.value) ? "none" : comment.value;
    dobleUrl(); 
    dobleOrder();
});

