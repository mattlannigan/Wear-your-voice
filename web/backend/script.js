
const now = new Date();

const currentDateTime = now.toLocaleString();

let butto = document.querySelector("#btn-id");


let tutor_text = document.querySelector("#tutorName");
let name_text = document.querySelector("#name-input");
let email_text = document.querySelector("#email-input");


let colour_text = document.querySelector("#myShirt");
let design_text = document.querySelector("#myDesign");

let quantitySelect = document.querySelector("#quantity");
let genderSelect = document.querySelector("#gender");
let sizeSelect = document.querySelector("#size");
let groupSelect = document.querySelector("#groupSelect");


let price = document.querySelector("#totalPriceVal");
let testElement = document.getElementById('totalPrice');


const colourfeedbackElement = document.getElementById('colourFeedback');
const designfeedbackElement = document.getElementById('designFeedback');
const sizefeedbackElement = document.getElementById('sizeFeedback');
const genderfeedbackElement = document.getElementById('genderFeedback');
const quantityfeedbackElement = document.getElementById('quantityFeedback');
const groupfeedbackElement = document.getElementById('groupFeedback');
const tutorfeedbackElement = document.getElementById('tutorFeedback');
const namefeedbackElement = document.getElementById('nameFeedback');
const emailfeedbackElement = document.getElementById('emailFeedback');
const errfeedbackElement = document.getElementById('errorFeedback');

let request = indexedDB.open('MyDatabase', 1);

request.onupgradeneeded = function(event) {
    let db = event.target.result;
    if (!db.objectStoreNames.contains('items')) {
        db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
    }
};

request.onsuccess = function(event) {
    let db = event.target.result;

// eventListener "click" on button
butto.addEventListener("click", () => {
    let colourvalueinput = colour_text.value
    let designvalueinput = design_text.value

    let quantityvalueinput = quantitySelect.value
    let gendervalueinput = genderSelect.value
    let sizevalueinput = sizeSelect.value

    let tutorvalueinput = tutor_text.value
    let groupvalue = groupSelect.value

    let namevalueinput = name_text.value
    let emailvalueinput = email_text.value

    let pricevalueinput = testElement.value


  let fileName = 'group_' + groupvalue + ' ' + namevalueinput 

    let errorMes = 0;
    let storeMes = 0;
    // error message
// t-shirt 
if (!colourvalueinput){
  colourfeedbackElement.textContent = "Enter t-shirt colour";
  errorMes = 1;
}
if (!designvalueinput){
  designfeedbackElement.textContent = "Enter design";
  errorMes = 1;
}
// select 
if (!quantityvalueinput){
  quantityfeedbackElement.textContent = "Enter quantity";
  errorMes = 1;
}
if (!sizevalueinput){
  sizefeedbackElement.textContent = "Enter size";
  errorMes = 1;
}
if (!gendervalueinput){
  genderfeedbackElement.textContent = "Enter gender";
  errorMes = 1;
}
// tutor
if (!tutorvalueinput){
  tutorfeedbackElement.textContent = "Enter your tutor name";
  errorMes = 1;
}
if (!groupvalue){
  groupfeedbackElement.textContent = "Enter your group";
  errorMes = 1;
}
// studen
    if (!namevalueinput){
        namefeedbackElement.textContent = "Enter your name";
        errorMes = 1;
    }
    if (!emailvalueinput){
        emailfeedbackElement.textContent = "Enter your email";
        errorMes = 1;
    }

    if(!errorMes){

      let db = event.target.result;
        let transaction = db.transaction(['items'], 'readwrite');
        let objectStore = transaction.objectStore('items');
        let addRequest = objectStore.add({ 
          status: 'Order processed',
          colour: colourvalueinput,
          design: designvalueinput,
          gender: gendervalueinput,
          size: sizevalueinput,
          quantity: quantityvalueinput,
          price: pricevalueinput,
          tutorName: tutorvalueinput,
          group: groupvalue,
          studentName: namevalueinput,
          studentEmail: emailvalueinput});

        addRequest.onsuccess = function() {
          console.log('Item added to the store');
        errfeedbackElement.textContent = "Item added to the store";
        storeMes = 0;

      };
      transaction.oncomplete = function() {
          console.log('Transaction completed');
      };
      transaction.onerror = function(event) {
          console.error('Transaction failed', event.target.error);
          storeMes = 1;
      };
    
    if(!storeMes){
      let blobdtMIME =
      new Blob([
                  '__________________________________ \n',
                  '    Thank you for purchasing \n',
                  '__________________________________ \n',
                  'Dates and time: ', currentDateTime,'\n', 
                  'Order id: 0001', '\n', 
                  'Colour: ', colourvalueinput,'\n',
                  'Design: ', designvalueinput,'\n',                    
                  'Gender: ', gendervalueinput,'\n',
                  'Size: ', sizevalueinput,'\n',
                  'Quantity: ', quantityvalueinput,'\n',
                  'Price: ', pricevalueinput, '\n',
                  'Tutor name: ', tutorvalueinput,'\n',
                  'Group: ', groupvalue, '\n',
                  'Name: ',namevalueinput,'\n', 
                  'Email: ',emailvalueinput,'\n',
                  '__________________________________ \n',
                ], 
                  { type: "text/plain" })
  let url = URL.createObjectURL(blobdtMIME)
  let anele = document.createElement("a")
  anele.setAttribute("download", fileName);
  anele.href = url;
  anele.click();
  console.log(blobdtMIME)
  confirmMsg()
    }
  }
}

  );
    

    // Add event listener to display button
    document.getElementById('displayItems').addEventListener('click', function() {
      let transaction = db.transaction(['items'], 'readonly');
      let objectStore = transaction.objectStore('items');

      let itemsList = document.getElementById('itemsList');
      itemsList.innerHTML = '';

      objectStore.openCursor().onsuccess = function(event) {
          let cursor = event.target.result;
          if (cursor) {
              let row = document.createElement('tr');
              let nameCell = document.createElement('td');
              nameCell.textContent = cursor.value.studentName;
              let priceCell = document.createElement('td');
              priceCell.textContent = cursor.value.price;
              row.appendChild(nameCell);
              row.appendChild(priceCell);
              itemsList.appendChild(row);
              cursor.continue();
          } else {
              console.log('No more entries');
          }
      };
    });
  }

  function myShirt(inputValue) {
    document.getElementById("myShirt").value = inputValue;
  }
  function myGender(inputValue) {
    document.getElementById("gender").value = inputValue;
  }
  function myDesign(inputValue) {
    document.getElementById("myDesign").value = inputValue;
  }

  function validateEmailInput() {
    const emailInput = document.getElementById('email-input').value;
    const feedbackElement = document.getElementById('emailFeedback');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailRegex.test(emailInput)) {
      feedbackElement.textContent = ""; 
    } else {
      feedbackElement.textContent = "Please enter a valid email address.";
    }
  }

  function quantityTotal(){
    let quantityvalueinput = quantitySelect.value;
    var result = 10 * quantityvalueinput;
    // document.getElementById("totalPrice").value = '£' + result + '.00';
    document.getElementById("totalPrice").value = '£' + result.toFixed(2); 
  }

  function confirmMsg(theFu){
    alert(" Thank you for purchasing");
    location.reload(true);
  }



