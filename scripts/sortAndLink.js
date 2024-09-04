// Function to calculate the total age in minutes based on the contents of a table cell
function getAge(cell) {
    if (!cell) return 0;
    const ageText = cell.textContent || cell.innerText;
    let totalMinutes = 0;

    // Use regular expressions to find day, hour, and minute values in the cell text
    const daysMatch = ageText.match(/(\d+)d/);    // Looks for patterns like '1d' (for days)
    const hoursMatch = ageText.match(/(\d+)h/);   // Looks for patterns like '2h' (for hours)
    const minutesMatch = ageText.match(/(\d+)m/); // Looks for patterns like '30m' (for minutes)

    // Convert days, hours, and minutes to total minutes
    if (daysMatch) totalMinutes += parseInt(daysMatch[1], 10) * 24 * 60;
    if (hoursMatch) totalMinutes += parseInt(hoursMatch[1], 10) * 60;
    if (minutesMatch) totalMinutes += parseInt(minutesMatch[1], 10);

    return totalMinutes;
}

// Function to sort and merge rows from multiple tables based on the age in the 7th column
function sortAndMergeTables() {
    const tables = Array.from(document.querySelectorAll('table[id^="faulttable_"]'));

    if (tables.length === 0) {
        alert('No tables found with IDs starting with "faulttable_"');
        return;
    }

    let allRows = [];

    tables.forEach(table => {
        Array.from(table.tBodies[0].rows).forEach(row => {
            allRows.push(row);
        });
    });

    // Sort the rows in descending order based on the age in the 7th cell (index 6)
    allRows.sort((rowA, rowB) => getAge(rowB.cells[6]) - getAge(rowA.cells[6]));

    // Clear all the rows from each table's body
    tables.forEach(table => {
        while (table.tBodies[0].rows.length > 0) {
            table.tBodies[0].deleteRow(0);
        }
    });

    // Append the sorted rows back into the first table's body
    const targetTableBody = tables[0].tBodies[0];
    allRows.forEach(row => targetTableBody.appendChild(row));
}

// Function to copy a given text to the clipboard
function copyToClipboard(text) {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

// Function to add clipboard emojis and functionality to links in column 2 of all tables
function addClipboardEmojis() {
    const tables = document.querySelectorAll('table');

    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const linkCell = row.cells[1];
            if (linkCell && linkCell.querySelector('a')) {
                const link = linkCell.querySelector('a').href;

                // Create a clipboard emoji
                const clipboardIcon = document.createElement('span');
                clipboardIcon.textContent = '📋';
                clipboardIcon.style.cursor = 'pointer';
                clipboardIcon.style.marginLeft = '10px';

                // Add an event listener to copy the link to the clipboard when clicked
                clipboardIcon.addEventListener('click', () => {
                    copyToClipboard(link);
                    alert('Link copied to clipboard: ' + link);
                });

                // Append the clipboard emoji to the cell
                linkCell.appendChild(clipboardIcon);
            }
        });
    });
}

// Combined function to first sort tables, then add clipboard functionality
function sortAndLink() {
    sortAndMergeTables(); // Sort the tables based on the age
    addClipboardEmojis(); // Add clipboard functionality to links in column 2
}

// Run the combined function
sortAndLink();
