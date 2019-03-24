const table = document.getElementById('table-body');
const clear = document.getElementById('clear-btn');

chrome.storage.sync.get('data', (result) => {
    result.data.forEach(element => {
        const row = table.insertRow(0);
        let date = row.insertCell(0);
        let from = row.insertCell(1);
        let to = row.insertCell(2);

        date.innerHTML = element.day;
        from.innerHTML = element.from;
        to.innerHTML = element.to;
    });
});

clear.addEventListener('click', () => {
    chrome.storage.sync.set({data: []});
    location.reload();
});