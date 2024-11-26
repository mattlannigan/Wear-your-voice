
const now = new Date();

let priceValue = 12.50;

const currentDateTime = now.toLocaleString();

const imageMale = [
 {url:'images/male/black.png',        color: 'Black'},
 {url:'images/male/dark green.png',   color: 'Dark green'},
 {url:'images/male/blue.png',         color: 'Blue'}
];

const imageFemale = [
  {url: 'images/female/dark blue.png', color: 'Dark blue'},
  {url: 'images/female/lightblue.png', color: 'Light blue'},
  {url: 'images/female/yellow.png',    color: 'Yellow'}, 
  {url: 'images/female/pink.png',      color: 'Pink'}, 
  {url: 'images/female/red.png',       color: 'Red'}   
];

const imageDesign = [
  {url:'images/design/merry and bright.jpg',               color: 'Merry and bright'},
  {url:'images/design/xmas DJ.jpg',                        color: 'Xmas DJ'},
  {url:'images/design/christmas is the to be joyful.jpg',  color: 'Christmas is the to be joyful'},  
  {url:'images/design/merry christmas.jpg',                color: 'Merry christmas'},  
  {url:'images/design/merry christmas (deer).jpg',         color: 'Merry christmas deer'},  
  {url:'images/design/harley davidson christmas.jpg',      color: 'Harley davidson christmas'},
  {url:'images/design/christmas penguin.jpg',              color: 'Christmas penguin'}
];

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


// Loop through 
const containerFemale = document.getElementById('image-female');
const containerMale = document.getElementById('image-male');
const containerDesign = document.getElementById('image-design');

// female t-shirt images
imageFemale.forEach(item => {
  const imageBox = document.createElement('div');
  imageBox.classList.add('shirtModle');  

  const img = document.createElement('img');
  img.src = item.url; 
  img.alt = item.color;  

  // Create the button container (button and color description)
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttonCentra');

  // Create the span element for color description
  const colorSpan = document.createElement('span');
  colorSpan.textContent = item.color;  

  // Create the button element
  const button = document.createElement('button');
  button.textContent = 'Add to cart';  
  button.onclick = () => {
    myShirt(item.color);  
    myGender('Female');   
  };
  // Append the span and button to the button container
  buttonContainer.appendChild(colorSpan);
  buttonContainer.appendChild(button);

  // Append the image and button container to the imageBox div
  imageBox.appendChild(img);
  imageBox.appendChild(buttonContainer);

  // Append the imageBox to the container
  containerFemale.appendChild(imageBox);
});

// male t-shirt images
imageMale.forEach(item => {
  const imageBox = document.createElement('div');
  imageBox.classList.add('shirtModle');  

  const img = document.createElement('img');
  img.src = item.url; 
  img.alt = item.color;  

  // Create the button container (button and color description)
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttonCentra');

  // Create the span element for color description
  const colorSpan = document.createElement('span');
  colorSpan.textContent = item.color;  

  // Create the button element
  const button = document.createElement('button');
  button.textContent = 'Add to cart';  
  button.onclick = () => {
    myShirt(item.color);  
    myGender('Male');   
  };
  // Append the span and button to the button container
  buttonContainer.appendChild(colorSpan);
  buttonContainer.appendChild(button);

  // Append the image and button container to the imageBox div
  imageBox.appendChild(img);
  imageBox.appendChild(buttonContainer);

  // Append the imageBox to the container
  containerMale.appendChild(imageBox);
});

// design images
imageDesign.forEach(item => {
  const imageBox = document.createElement('div');
  imageBox.classList.add('designModle');  

  const img = document.createElement('img');
  img.src = item.url; 
  img.alt = item.color;  

  // Create the button container (button and color description)
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttonCentra');

  // Create the button element
  const button = document.createElement('button');
  button.textContent = 'Add to cart';  
  button.onclick = () => {
    myDesign(item.color);  
  };

  // Create the span element for design description
  const colorSpan = document.createElement('span');
  colorSpan.textContent = item.color;  

  // Append the span and button to the button container
  buttonContainer.appendChild(colorSpan);
  buttonContainer.appendChild(button);

  // Append the image and button container to the imageBox div
  imageBox.appendChild(img);
  imageBox.appendChild(buttonContainer);

  // Append the imageBox to the container
  containerDesign.appendChild(imageBox);
});

// Dummy functions for the button's onclick event
function myDesign(color) {
  console.log('Design added to cart: ' + color);
}

function myShirt(color) {
  console.log('Shirt added to cart: ' + color);
}

function myGender(gender) {
  console.log('Gender selected: ' + gender);
}
// --------------- END loop ___________________

let request = indexedDB.open('MyDatabase', 1);

request.onupgradeneeded = function (event) {
  let db = event.target.result;
  if (!db.objectStoreNames.contains('items')) {
    db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
  }
};

request.onsuccess = function (event) {
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
    if (!colourvalueinput) {
      colourfeedbackElement.textContent = "Enter t-shirt colour";
      errorMes = 1;
    }
    if (!designvalueinput) {
      designfeedbackElement.textContent = "Enter design";
      errorMes = 1;
    }
    // select 
    if (!quantityvalueinput) {
      quantityfeedbackElement.textContent = "Enter quantity";
      errorMes = 1;
    }
    if (!sizevalueinput) {
      sizefeedbackElement.textContent = "Enter size";
      errorMes = 1;
    }
    if (!gendervalueinput) {
      genderfeedbackElement.textContent = "Enter gender";
      errorMes = 1;
    }
    // tutor
    if (!tutorvalueinput) {
      tutorfeedbackElement.textContent = "Enter your tutor name";
      errorMes = 1;
    }
    if (!groupvalue) {
      groupfeedbackElement.textContent = "Enter your group";
      errorMes = 1;
    }
    // studen
    if (!namevalueinput) {
      namefeedbackElement.textContent = "Enter your name";
      errorMes = 1;
    }
    if (!emailvalueinput) {
      emailfeedbackElement.textContent = "Enter your email";
      errorMes = 1;
    }

    if (!errorMes) {
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
        studentEmail: emailvalueinput
      });

      addRequest.onsuccess = function () {
        console.log('Item added to the store');
        errfeedbackElement.textContent = "Item added to the store";
        storeMes = 0;

      };
      transaction.oncomplete = function () {
        console.log('Transaction completed');
      };
      transaction.onerror = function (event) {
        console.error('Transaction failed', event.target.error);
        storeMes = 1;
      };

      addRequest.onsuccess = function () {
        console.log('Item added to the store');
        errfeedbackElement.textContent = "Item added to the store";
        storeMes = 0;

        // Capture the last record's ID
        let lastId = addRequest.result; 
        console.log("Last ID:", lastId);



        if (!storeMes) {
          let blobdtMIME =
            new Blob([
              '__________________________________ \n',
              '    Thank you for purchasing \n',
              '__________________________________ \n',
              'Dates and time: ', currentDateTime, '\n',
              'Order id: ', lastId, '\n', 
              'Colour: ', colourvalueinput, '\n',
              'Design: ', designvalueinput, '\n',
              'Gender: ', gendervalueinput, '\n',
              'Size: ', sizevalueinput, '\n',
              'Quantity: ', quantityvalueinput, '\n',
              'Price: ', pricevalueinput, '\n',
              'Tutor name: ', tutorvalueinput, '\n',
              'Group: ', groupvalue, '\n',
              'Name: ', namevalueinput, '\n',
              'Email: ', emailvalueinput, '\n',
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
  }
  );
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

function quantityTotal() {
  let quantityvalueinput = quantitySelect.value;
  var result = priceValue * quantityvalueinput;
  document.getElementById("totalPrice").value = '£' + result.toFixed(2);
}

function confirmMsg(theFu) {
  alert(" Thank you for purchasing");
  location.reload(true);
}



