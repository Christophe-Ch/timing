// chrome.storage.sync.get('lastUpdate', (result) => {
//     let oldest = (new Date()).getTime();
//     let historyElements = [];

//     while(oldest > result.lastUpdate) {
//         chrome.history.search({text: '', endTime: oldest}, (results) => {
//             console.log(results);
//         });
//     }
    
// });

// chrome.storage.sync.get('test', (items) => {
//     console.log(items.test);
//     chrome.storage.sync.set({test: items.test + 1});
// });

const table = document.getElementById('table-body');

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