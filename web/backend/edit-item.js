window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    if (itemId) {
        loadItemData(itemId);
    } else {
        console.error('Item ID not found in URL');
    }
};

function loadItemData(itemId) {
    // Open the IndexedDB
    let request = indexedDB.open('MyDatabase', 1);

    request.onsuccess = function (event) {
        let db = event.target.result;

        // Start a transaction and get the object store
        let transaction = db.transaction(['items'], 'readonly');
        let objectStore = transaction.objectStore('items');

        // Get the item by its ID
        let getRequest = objectStore.get(Number(itemId));

        getRequest.onsuccess = function () {
            let item = getRequest.result;

            if (item) {
                // Create and append option for status
                const statusSelect = document.getElementById("statusSelect"); 
                const statusOption = document.createElement("option"); 
                statusOption.textContent = item.status; 
                statusOption.value = item.status; 
                statusSelect.appendChild(statusOption); 
                statusSelect.value = item.status;

                document.getElementById('colour').value = item.colour;
                document.getElementById('design').value = item.design;
                document.getElementById('gender').value = item.gender;
                document.getElementById('size').value = item.size;
                
                // Create and append option for quantity 
                const quantitySelect = document.getElementById("quantitySelect");
                 const quantityOption = document.createElement("option"); 
                 quantityOption.textContent = item.quantity; 
                 quantityOption.value = item.quantity; 
                 quantitySelect.appendChild(quantityOption); 
                 quantitySelect.value = item.quantity;

                document.getElementById('totalPrice').value = item.price;
                document.getElementById('tutorName').value = item.tutorName;
                document.getElementById('group').value = item.group;
                document.getElementById('studentName').value = item.studentName;
                document.getElementById('studentEmail').value = item.studentEmail;

            } else {
                console.error('Item not found with ID: ' + itemId);
            }
        };

        getRequest.onerror = function () {
            console.error('Failed to retrieve item');
        };
    };

    request.onerror = function () {
        console.error('Failed to open database');
    };
}

// In edit-item.js, handle form submission
document.getElementById('editItemForm').onsubmit = function (event) {
    event.preventDefault(); // Prevent form submission

    let itemId = new URLSearchParams(window.location.search).get('id'); // Get the item ID from the URL

    // Gather the form data
    let editedItem = {
        id: Number(itemId),
        status: document.getElementById('status').value,
        colour: document.getElementById('colour').value,
        design: document.getElementById('design').value,
        gender: document.getElementById('gender').value,
        size: document.getElementById('size').value,
        quantity: document.getElementById('quantity').value,
        price: document.getElementById('totalPrice').value,
        tutorName: document.getElementById('tutorName').value,
        group: document.getElementById('group').value,
        studenName: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value

    };

    // Open the IndexedDB and update the item
    let request = indexedDB.open('MyDatabase', 1);

    request.onsuccess = function (event) {
        let db = event.target.result;

        // Start a transaction to update the item
        let transaction = db.transaction(['items'], 'readwrite');
        let objectStore = transaction.objectStore('items');

        // Update the item in the object store
        let putRequest = objectStore.put(editedItem);

        putRequest.onsuccess = function () {
            console.log('Item updated successfully');
            alert('Item updated successfully!');
            window.location.href = 'dashboard.html';
        };

        putRequest.onerror = function () {
            console.error('Failed to update item');
        };
    };

    request.onerror = function () {
        console.error('Failed to open database');
    };
};


document.getElementById('closeEditPage').addEventListener('click', function () {
    window.location.href = `dashboard.html`;

});
