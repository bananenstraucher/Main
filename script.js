// Deine Google Sheets API-Key
const API_KEY = 'AIzaSyBjejyoA4JplIbca0ElxMQgAkfMJ7c_jAE';

// Teil 1 - Daten aus Google Sheets abrufen und anzeigen
const SPREADSHEET_ID_PART1 = '1tJhK_vRxRaQRfJisPXIOe0_XngXRbHBTAy0SJkqP5pA';
const RANGE_PART1 = 'Holz!AD3:AL42';
const HIDDEN_COLUMNS_PART1 = [3, 4, 5];
const ADDITIONAL_HIDDEN_COLUMNS_PART1 = [6, 7, 8];
const THRESHOLD_WIDTH_PART1 = 750;

function getSheetDataPart1() {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID_PART1}/values/${RANGE_PART1}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            displayDataPart1(data.values);
        })
        .catch(error => console.error('Fehler beim Abrufen der Daten aus Google Sheets:', error));
}

function displayDataPart1(sheetData) {
    const table = document.getElementById('data-table');
    sheetData.forEach(rowData => {
        const row = table.insertRow();
        rowData.forEach((cellData, index) => {
            if (!HIDDEN_COLUMNS_PART1.includes(index)) {
                const cell = row.insertCell();
                cell.textContent = cellData;
                if (window.innerWidth <= THRESHOLD_WIDTH_PART1 && ADDITIONAL_HIDDEN_COLUMNS_PART1.includes(index)) {
                    cell.style.display = 'none';
                }
            }
        });
    });
}

window.addEventListener('resize', () => {
    const table = document.getElementById('data-table');
    const headerRow = table.rows[0];
    const rows = table.rows;
    const cells = headerRow.cells;

    for (let i = 0; i < cells.length; i++) {
        if (HIDDEN_COLUMNS_PART1.includes(i)) {
            cells[i].style.display = window.innerWidth <= THRESHOLD_WIDTH_PART1 ? 'none' : '';
            for (let j = 0; j < rows.length; j++) {
                rows[j].cells[i].style.display = window.innerWidth <= THRESHOLD_WIDTH_PART1 ? 'none' : '';
            }
        }
        if (ADDITIONAL_HIDDEN_COLUMNS_PART1.includes(i)) {
            cells[i].style.display = window.innerWidth <= THRESHOLD_WIDTH_PART1 ? 'none' : '';
            for (let j = 0; j < rows.length; j++) {
                rows[j].cells[i].style.display = window.innerWidth <= THRESHOLD_WIDTH_PART1 ? 'none' : '';
            }
        }
    }
});

window.onload = getSheetDataPart1;

// Teil 2 - Daten aus Google Sheets abrufen und anzeigen
const SPREADSHEET_ID_PART2 = '1tJhK_vRxRaQRfJisPXIOe0_XngXRbHBTAy0SJkqP5pA';
const RANGE_PART2 = 'Tabellenblatt1!W2:AB42';

function startPart2() {
    gapi.client.init({
        'apiKey': API_KEY,
        'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID_PART2,
            range: RANGE_PART2,
        })
    }).then((response) => {
        const loadedData = response.result.values;
        const table = document.getElementsByTagName('table')[0];
        const columnHeaders = document.createElement('th');
        columnHeaders.innerHTML = 
        `<th>${loadedData[0][0]}</th>
        <th>|</th>
        <th>${loadedData[0][1]}</th>
        <th>|</th>
        <th>${loadedData[0][2]}</th>
        <th>|</th>
        <th>${loadedData[0][3]}</th>`;
        table.appendChild(columnHeaders);
    }).catch((err) => {
        console.log(err.error.message);
    });
}

gapi.load('client', startPart2);

const urlParams = new URLSearchParams(window.location.search);
const range = urlParams.get('range');

if (range) {
    gapi.load('client', function() {
        gapi.client.init({
            'apiKey': API_KEY,
            'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        }).then(() => {
            return gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID_PART2,
                range: range,
            });
        }).then((response) => {
            const loadedData = response.result.values;
            const table = document.getElementsByTagName('table')[0];
            const columnHeaders = document.createElement('tr');
            columnHeaders.innerHTML = 
            `<td>${loadedData[0][0]}</td>
            <td>|</td>
            <td>${loadedData[0][1]}</td>
            <td>|</td>
            <td>${loadedData[0][2]}</td>
            <td>|</td>
            <td>${loadedData[0][3]}</td>`;
            table.appendChild(columnHeaders);
            document.getElementById('Range').innerHTML = range;
        }).catch((err) => {
            console.log(err.error.message);
        });
    });
}
