// DOM elements
const pickButton = document.getElementById('continue-btn');
const startButton = document.getElementById('start-btn');
const dateField = document.getElementById('date');

dateField.valueAsDate = new Date();

/***
 * @returns {string} Date with the following format: yyyy-mm-dd
 */
const formatDay = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
};

/***
 * @returns {string} Hour with the following format: hh-mm
 */
const formatHour = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
};

/*
    Sets the min date of the date picker with the date of the oldest element in the history
    Here a bug is used to get all the results by setting maxResults to 0
*/

chrome.history.search({ text: '', startTime: 0, maxResults: 0 }, (elements) => {
    const date = new Date(elements[elements.length - 1].lastVisitTime);
    dateField.min = formatDay(date);
});

// Gets all the history elements from a specific date and determines the schedules for each day
const fetchFromDate = (dateValue) => {
    let date = null;
    if (!dateValue) {
        date = (new Date()).getTime();
    }
    else {
        date = (new Date(dateValue)).getTime();
    }

    chrome.history.search({ text: '', startTime: date, maxResults: 0 }, (elements) => {
        console.log(elements);
        let data = [];
        for (let i = elements.length - 1; i >= 0; i--) { // Elements are sorted in descending order (from date to oldest)
            const elementDate = new Date(elements[i].lastVisitTime);

            if (data.length == 0 || data[data.length - 1].day != formatDay(elementDate)) { // Empty list or new day
                data.push({
                    day: formatDay(elementDate),
                    from: formatHour(elementDate),
                    to: formatHour(elementDate)
                });
            }
            else {
                data[data.length - 1].to = formatHour(elementDate);
            }
        }

        chrome.storage.sync.set({ data: data });
        chrome.browserAction.setPopup({ popup: "views/popup.html" });
        window.location.href = "popup.html";
    });
}

pickButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetchFromDate(dateField.value);
});

startButton.addEventListener('click', () => {
    fetchFromDate();
});