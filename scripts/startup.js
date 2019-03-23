const pickButton = document.getElementById('continue-btn');
const startButton = document.getElementById('start-btn');
const dateField = document.getElementById('date');

dateField.valueAsDate = new Date();

// Events
const setDefaultDate = (dateValue) => {
    let date = null;

    if(!dateValue) {
        date = (new Date()).getTime();
    }
    else {
        date = (new Date(dateValue)).getTime();
    }
    
    chrome.storage.sync.set({startTime: date}, () => {
        chrome.browserAction.setPopup({popup: "views/popup.html"});
    });

    window.location.href = "popup.html";
}

pickButton.addEventListener('click', (event) => {
    event.preventDefault();
    setDefaultDate(dateField.value);
});

startButton.addEventListener('click', () => {
    setDefaultDate();
});