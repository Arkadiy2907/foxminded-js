"use strict";

const newOrder = document.getElementById("resultNewOrder");

let resultOrder = JSON.parse(sessionStorage.getItem('resultOrder'));

for (let key in resultOrder) {
  let div = document.createElement('div');
  div.className = "infoOrder";
  div.innerHTML = key + ": " + resultOrder[key];
  newOrder.append(div);
};
