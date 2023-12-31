function insertNavbarContent(targetElementId) {
    var navbar = document.getElementById(targetElementId);
    navbar.innerHTML = 
    '<div class="navbar">\
        <div class="dropdown">\
            <button class="dropbtn"> <img src="speisekarte.jpg" id="burger-icon" class="drpdn">\
            <i class="fa fa-caret-down"></i>\
            </button>\
            <div class="dropdown-content">\
                <a href="index.html">Home \
                </a>\
                <a href="login.html">Login\
                </a>\
                <div class="nested-dropdown">\
                    <a>Krypto\
                    </a>\
                    <div class="nested-dropdown-content">\
                        <a href="btc.html">Bitcoin\
                        </a>\
                        <a href="eth.html">Ethereum\
                        </a>\
                        <a href="ltc.html">Litecoin\
                        </a>\
                    </div>\
                </div>\
                <a href="holz.html">Holz\
                </a>\
                <a href="quellen.html">Quellen\
                </a>\
            </div>\
        </div>\
        <h3 class="header-text"></h3>\
    </div>';
}

document.addEventListener('DOMContentLoaded', function() {
    insertNavbarContent('wiederholender-Content');
    // Sie können die Funktion auch für andere Elemente aufrufen
    // insertRepeatedContent('anotherElementId');
});

const start = () => {
    // Initialize the JavaScript client library
    gapi.client.init({
        'apiKey': 'AIzaSyBjejyoA4JplIbca0ElxMQgAkfMJ7c_jAE',
        'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
        // Erster Bereich
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1tJhK_vRxRaQRfJisPXIOe0_XngXRbHBTAy0SJkqP5pA',
            range: 'Tabellenblatt1!W2:AB42',
        })
    }).then((response) => {
        // Parse the response data
        const loadedData = response.result.values;

        // populate HTML table with data
        const table = document.getElementsByTagName('table')[0];

        // add column headers
        const columnHeaders = document.createElement('th');
        columnHeaders.innerHTML = 
        `<th>${loadedData[0][0]}</th>
        <th>|</th>
        <th>${loadedData[0][1]}</th>
        <th>|</th>
        <th>${loadedData[0][2]}</th>
        <th>|</th>
        <th>${loadedData[0][3]}</th>
        `;
        table.appendChild(columnHeaders);
    }).catch((err) => {
        console.log(err.error.message);
    });
};

// Load the JavaScript client library
gapi.load('client', start);

// Lese den Bereich aus dem URL-Parameter "range"
const urlParams = new URLSearchParams(window.location.search);
const range = urlParams.get('range');

if (range) {
    // Warte auf das Laden der GAPI-Bibliothek
    gapi.load('client', function() {
        gapi.client.init({
            'apiKey': 'AIzaSyBjejyoA4JplIbca0ElxMQgAkfMJ7c_jAE',
            'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        }).then(() => {
            // Lade den zweiten Bereich
            return gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1tJhK_vRxRaQRfJisPXIOe0_XngXRbHBTAy0SJkqP5pA',
                range: range,
            });
        }).then((response) => {
            // Parse the response data
            const loadedData = response.result.values;
        
            // populate HTML table with data
            const table = document.getElementsByTagName('table')[0];

            // add column headers but not in bold this time
            const columnHeaders = document.createElement('tr');
            columnHeaders.innerHTML = 
            `<td>${loadedData[0][0]}</td>
            <td>|</td>
            <td>${loadedData[0][1]}</td>
            <td>|</td>
            <td>${loadedData[0][2]}</td>
            <td>|</td>
            <td>${loadedData[0][3]}</td>
            `;
            table.appendChild(columnHeaders);

            document.getElementById('Range').innerHTML = range
            
        }).catch((err) => {
            console.log(err.error.message);
        });
    });
}

