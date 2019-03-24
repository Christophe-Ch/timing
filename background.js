const formatDay = (date) => {
    const month = String(date.getMonth()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${month}/${day}/${year}`;
};

const formatHour = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
};

chrome.history.onVisited.addListener((historyItem) => {
    chrome.storage.sync.get(['data'], (items) => {
        const date = new Date(historyItem.lastVisitTime);

        if(items.data.length == 0 || items.data[items.data.length - 1].day != formatDay(date)) {
            items.data.push({
                day: formatDay(date), 
                from: formatHour(date), 
                to: formatHour(date)
            });
        }
        else {
            items.data[items.data.length - 1].to = formatHour(date);
        }

        chrome.storage.sync.set({data: items.data});

        console.log(items.data[items.data.length - 1]);
    });
});