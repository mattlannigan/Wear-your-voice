window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    const genderId = urlParams.get('gender');

    if (itemId) {
        loadItemData(itemId);
        console.log(`Item ID: ${itemId}`);
    } else {
        console.error('Item ID not found in URL');
    }

    if (genderId) {
        console.log(`Gender ID: ${genderId}`);
    } else {
        console.error('Gender ID not found in URL');
    }
};

function loadItemData(itemId, genderId) {
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
                console.log(item);
                // Create and append option for status
                const statusSelect = document.getElementById("statusSelect");
                const statusOption = document.createElement("option");
                statusOption.textContent = item.status;
                statusOption.value = item.status;
                statusSelect.appendChild(statusOption);
                statusSelect.value = item.status;

                // Create and append option for quantity 
                const quantitySelect = document.getElementById("quantity");
                const quantityOption = document.createElement("option");
                quantityOption.textContent = item.quantity;
                quantityOption.value = item.quantity;
                quantitySelect.appendChild(quantityOption);
                quantitySelect.value = item.quantity;

                // Create and append option for gender 
                const genderSelect = document.getElementById("genderSelect");
                const genderOption = document.createElement("option");
                genderOption.textContent = item.gender;
                genderOption.value = item.gender;
                genderSelect.appendChild(genderOption);
                genderSelect.value = item.gender;

                // Create and append option for size
                const sizeSelect = document.getElementById("sizeSelect");
                const sizeOption = document.createElement("option");
                sizeOption.textContent = item.size;
                sizeOption.value = item.size;
                sizeSelect.appendChild(sizeOption);
                sizeSelect.value = item.size;

                // Create and append option for group 
                const groupSelect = document.getElementById("groupSelect");
                const groupOption = document.createElement("option");
                groupOption.textContent = item.group;
                groupOption.value = item.group;
                groupSelect.appendChild(groupOption);
                groupSelect.value = item.group;

                // Create and append options for colour
                const colourSelect = document.getElementById("colourSelect");
                let colourOptions = [];

                // Check the genderId and set available colour options
                if (item.gender == 'Male') {
                    console.log(`Chose male: ${item.gender}`);
                    colourOptions = ["Black", "Blue", "Dark Green"];
                } else if (item.gender == 'Female') {
                    console.log(`Chose female: ${item.gender}`);
                    colourOptions = ["Red", "Light blue", "Dark blue", "Yellow", "Pink"];
                } else {
                    console.log('Error cannot find item.value.gender')
                }
                // Clear existing options before appending new ones
                colourSelect.innerHTML = '';

                // Add the options to the colour select dropdown
                colourOptions.forEach(colourElms => {
                    const colourOption = document.createElement("option");
                    colourOption.value = colourElms;
                    colourOption.textContent = colourElms;
                    colourSelect.appendChild(colourOption);
                });
                colourSelect.value = item.colour;

                // Create and append option for design 
                const designSelect = document.getElementById("designSelect");
                let designOptions = ['Merry and bright', 'Xmas DJ', 'Christmas is the to be joyful', 'Merry christmas','Merry christmas deer','Harley davidson christmas', 'Christmas penguin'];
                
               

                // Clear any existing options
                designSelect.innerHTML = '';

                // Add the options from the designOptions array
                designOptions.forEach(designElms => {
                    const designOption = document.createElement("option");
                    designOption.value = designElms;
                    designOption.textContent = designElms;
                    designSelect.appendChild(designOption);
                });
                // Set the selected value 
                designSelect.value = item.design;


                // Set up input values
                document.getElementById('totalPrice').value = item.price;
                document.getElementById('tutorName').value = item.tutorName;
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

// handle form submission
document.getElementById('editItemForm').onsubmit = function (event) {
    event.preventDefault(); // Prevent form submission

    let itemId = new URLSearchParams(window.location.search).get('id'); // Get the item ID from the URL

    // Gather the form data
    let editedItem = {
        id: Number(itemId),
        status: document.getElementById('statusSelect').value,
        colour: document.getElementById('colourSelect').value,
        design: document.getElementById('designSelect').value,
        gender: document.getElementById('genderSelect').value,
        size: document.getElementById('sizeSelect').value,
        quantity: document.getElementById('quantity').value,
        price: document.getElementById('totalPrice').value,
        tutorName: document.getElementById('tutorName').value,
        group: document.getElementById('groupSelect').value,
        studentName: document.getElementById('studentName').value,
        studentEmail: document.getElementById('studentEmail').value

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