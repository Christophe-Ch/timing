// chrome.browserAction.setPopup({popup: "views/popup.html"});

const pickButton = document.getElementById('continue-btn');
const startButton = document.getElementById('continue-btn');
const dateField = document.getElementById('date');

let date = new Date();

dateField.nodeValue = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`);