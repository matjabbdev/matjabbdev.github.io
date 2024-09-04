// Function to copy a given text (link) to the clipboard
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
    // Get all tables on the page
    const tables = document.querySelectorAll('table');

    // Loop through each table
    tables.forEach(table => {
        // Loop through each row (tbody only)
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            // Get the cell in column 2 (index 1)
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

// Run the function to add clipboard functionality to the links
addClipboardEmojis();
