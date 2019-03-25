const pickButton = document.getElementById('continue-btn');
const startButton = document.getElementById('start-btn');
const dateField = document.getElementById('date');

dateField.valueAsDate = new Date();

const formatDay = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
};

const formatHour = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
};

chrome.history.search({ text: '', startTime: 0, maxResults: 0 }, (elements) => {
    const date = new Date(elements[elements.length - 1].lastVisitTime);
    dateField.min = formatDay(date);
});

const fetchFromDate = (dateValue) => {
    let date = null;
    if (!dateValue) {
        date = (new Date()).getTime();
    }
    else {
        date = (new Date(dateValue)).getTime();
    }

    chrome.history.search({ text: '', startTime: date, maxResults: 0 }, (elements) => {
        let data = [];
        for (let i = elements.length - 1; i >= 0; i--) {
            element = elements[i];
            const elementDate = new Date(element.lastVisitTime);

            if (data.length == 0 || data[data.length - 1].day != formatDay(elementDate)) {
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
        window.location.href = "popup.html";
        chrome.browserAction.setPopup({ popup: "views/popup.html" });
    });
}

pickButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetchFromDate(dateField.value);
});

startButton.addEventListener('click', () => {
    fetchFromDate();
});