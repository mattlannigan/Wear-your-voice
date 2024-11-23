let request = indexedDB.open('MyDatabase', 1);

request.onupgradeneeded = function (event) {
    let db = event.target.result;
    if (!db.objectStoreNames.contains('items')) {
        db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    let db;

    // Open (or create) the database
    let request = indexedDB.open('MyDatabase', 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('items')) {
            db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        loadItems(); // Load items when the page loads
    };

    request.onerror = function (event) {
        console.error('Database error:', event.target.error);
    };

    // Load items from the database
    function loadItems() {
        let transaction = db.transaction(['items'], 'readonly');
        let objectStore = transaction.objectStore('items');

        let itemsList = document.getElementById('itemsList');
        itemsList.innerHTML = ''; // Clear previous data

        objectStore.openCursor().onsuccess = function (event) {
            let cursor = event.target.result;

            if (cursor) {
                let row = document.createElement('tr');
                let idCell = document.createElement('td');
                let statusCell = document.createElement('td');
                let colourCell = document.createElement('td');
                let designCell = document.createElement('td');
                let genderCell = document.createElement('td');
                let sizeCell = document.createElement('td');
                let quantityCell = document.createElement('td');
                let tutorNameCell = document.createElement('td');
                let groupCell = document.createElement('td');
                let nameCell = document.createElement('td');
                let emailCell = document.createElement('td');
                let priceCell = document.createElement('td');

                idCell.textContent = cursor.value.id;
                statusCell.textContent = cursor.value.status;
                colourCell.textContent = cursor.value.colour;
                designCell.textContent = cursor.value.design;
                genderCell.textContent = cursor.value.gender;
                sizeCell.textContent = cursor.value.size;
                quantityCell.textContent = cursor.value.quantity;
                tutorNameCell.textContent = cursor.value.tutorName;
                groupCell.textContent = cursor.value.group;
                nameCell.textContent = cursor.value.studentName;
                emailCell.textContent = cursor.value.studentEmail;
                priceCell.textContent = cursor.value.price;

                row.appendChild(idCell);
                row.appendChild(statusCell);
                row.appendChild(colourCell);
                row.appendChild(designCell);
                row.appendChild(genderCell);
                row.appendChild(sizeCell);
                row.appendChild(quantityCell);
                row.appendChild(tutorNameCell);
                row.appendChild(groupCell);
                row.appendChild(nameCell);
                row.appendChild(emailCell);
                row.appendChild(priceCell);

                // Create edit button and add event listener
                let editCell = document.createElement('td');
                let editButton = document.createElement('button');
                editButton.setAttribute('class', 'fa-solid fa-pen-to-square');
                function createEditHandler(id) {
                    return function () {                       
                        window.location.href = `edit.html?id=${id}`;
                    };
                }
                editButton.dataset.id = cursor.value.id;
                editButton.addEventListener('click', createEditHandler(cursor.value.id));

                editCell.appendChild(editButton);
                row.appendChild(editCell);

                // Create delete button and add event listener
                let deleteCell = document.createElement('td');
                let deleteButton = document.createElement('button');
                deleteButton.setAttribute('class', 'fas fa-trash');

                function createDeleteHandler(id) {
                    return function () {                       
                        deleteItem(id);
                    };
                }
                deleteButton.dataset.id = cursor.value.id;
                deleteButton.addEventListener('click', createDeleteHandler(cursor.value.id));

                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);

                itemsList.appendChild(row);
                cursor.continue();
            } else {
                console.log('No more entries');
            }
        };

        // Handling transaction success and failure
        transaction.oncomplete = function () {
            console.log('Transaction completed successfully.');
        };

        transaction.onerror = function (event) {
            console.error('Transaction error:', event.target.error);
        };
    }

    // Delete an item from the database
    function deleteItem(id) {
        let transaction = db.transaction(['items'], 'readwrite');
        let objectStore = transaction.objectStore('items');
        let deleteRequest = objectStore.delete(id);

        deleteRequest.onsuccess = function () {
            console.log(`Item with id ${id} deleted.`);
            loadItems(); // Reload the list after deletion
        };

        deleteRequest.onerror = function (event) {
            console.error('Delete request failed', event.target.error);
        };
    }
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const table = document.getElementById('myTable');
    const rows = Array.from(table.rows);
    const csvContent = rows.map(row => {
        const cells = Array.from(row.cells);
        return cells.map(cell => cell.textContent).join(',');
    }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'table.csv';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});