// Function to calculate the total age in minutes based on the contents of a table cell
function getAge(cell) {
    // If the cell is empty or undefined, return 0
    if (!cell) return 0;

    // Extract the text content of the cell (either using textContent or innerText)
    const ageText = cell.textContent || cell.innerText;

    // Initialize a variable to keep track of total minutes
    let totalMinutes = 0;

    // Use regular expressions to find day, hour, and minute values in the cell text
    const daysMatch = ageText.match(/(\d+)d/);    // Looks for patterns like '1d' (for days)
    const hoursMatch = ageText.match(/(\d+)h/);   // Looks for patterns like '2h' (for hours)
    const minutesMatch = ageText.match(/(\d+)m/); // Looks for patterns like '30m' (for minutes)

    // If days were found, convert them to minutes and add to total
    if (daysMatch) {
        totalMinutes += parseInt(daysMatch[1], 10) * 24 * 60;
    }

    // If hours were found, convert them to minutes and add to total
    if (hoursMatch) {
        totalMinutes += parseInt(hoursMatch[1], 10) * 60;
    }

    // If minutes were found, add them to the total
    if (minutesMatch) {
        totalMinutes += parseInt(minutesMatch[1], 10);
    }

    // Return the total minutes
    return totalMinutes;
}

// Function to sort and merge rows from multiple tables
function sortAndMergeTables() {
    // Get all tables with an ID starting with 'faulttable_' and convert to an array
    const tables = Array.from(document.querySelectorAll('table[id^="faulttable_"]'));

    // If no matching tables are found, display an alert and stop the function
    if (tables.length === 0) {
        alert('No tables found with IDs starting with "faulttable_"');
        return;
    }

    // Initialize an array to hold all the rows from all tables
    let allRows = [];

    // Loop through each table and extract rows, pushing them into the allRows array
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

// Run the function to sort and merge the tables
sortAndMergeTables();