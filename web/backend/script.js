
const now = new Date();

let priceValue = 12.50;

const currentDateTime = now.toLocaleString();

const imageMale = [
 {url:'images/male/black.png',        description: 'Black'},
 {url:'images/male/dark green.png',   description: 'Dark green'},
 {url:'images/male/blue.png',         description: 'Blue'}
];

const imageFemale = [
  {url: 'images/female/dark blue.png', description: 'Dark blue'},
  {url: 'images/female/lightblue.png', description: 'Light blue'},
  {url: 'images/female/yellow.png',    description: 'Yellow'}, 
  {url: 'images/female/pink.png',      description: 'Pink'}, 
  {url: 'images/female/red.png',       description: 'Red'}   
];

const imageDesign = [
  {url:'images/design/merry and bright.jpg',               description: 'Merry and bright'},
  {url:'images/design/xmas DJ.jpg',                        description: 'Xmas DJ'},
  {url:'images/design/christmas is the to be joyful.jpg',  description: 'Christmas is the to be joyful'},  
  {url:'images/design/merry christmas.jpg',                description: 'Merry christmas'},  
  {url:'images/design/merry christmas reindeer.jpg',         description: 'Merry christmas reindeer'},  
  {url:'images/design/harley davidson christmas.jpg',      description: 'Harley davidson christmas'},
  {url:'images/design/christmas penguin.jpg',              description: 'Christmas penguin'}
];

// export const vinlyImagColours = [
const vinlyImagColours = [
  {url:'images/colour/rose-gold.png',                      description: 'Rose gold'},
  {url:'images/colour/black.jpeg',                          description: 'Black'},
  {url:'images/colour/gold.jpg',                          description: 'Gold'},
  {url:'images/colour/green.jpg',                          description: 'Green'},
  {url:'images/colour/grey.jpg',                          description: 'Grey'},
  {url:'images/colour/white.jpg',                          description: 'White'},
  {url:'images/colour/silver.jpg',                          description: 'Silver'},
  {url:'images/colour/surprise-me.webp',                          description: 'Surprise me'}
];

let butto = document.querySelector("#btn-id");

let tutor_text = document.querySelector("#tutorName");
let name_text = document.querySelector("#name-input");
let email_text = document.querySelector("#email-input");


let colour_text = document.querySelector("#myShirt");
let design_text = document.querySelector("#myDesign");
let vinyl_text = document.querySelector("#VinylColour");

let quantitySelect = document.querySelector("#quantity");
let genderSelect = document.querySelector("#gender");
let sizeSelect = document.querySelector("#size");
let groupSelect = document.querySelector("#groupSelect");


let price = document.querySelector("#totalPriceVal");
let testElement = document.getElementById('totalPrice');


const colourfeedbackElement = document.getElementById('colourFeedback');
const designfeedbackElement = document.getElementById('designFeedback');
const vinylcolourfeedbackElement = document.getElementById('vinylcolourfeedback');
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
const containervinlyImages = document.getElementById('image-VinlyColours');

// female t-shirt images
imageFemale.forEach(item => {
  const imageBox = document.createElement('div');
  imageBox.classList.add('shirtModle');  

  const img = document.createElement('img');
  img.src = item.url; 
  img.alt = item.description;  

  // Create the button container (button and description description)
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttonCentra');

  // Create the span element for description description
  const descriptionSpan = document.createElement('span');
  descriptionSpan.textContent = item.description;  

  // Create the button element
  const button = document.createElement('button');
  button.textContent = 'Add to cart';  
  button.onclick = () => {
    myShirt(item.description);  
    myGender('Female');   
  };
  // Append the span and button to the button container
  buttonContainer.appendChild(descriptionSpan);
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
  img.alt = item.description;  

  // Create the button container (button and description description)
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttonCentra');

  // Create the span element for description description
  const descriptionSpan = document.createElement('span');
  descriptionSpan.textContent = item.description;  

  // Create the button element
  const button = document.createElement('button');
  button.textContent = 'Add to cart';  
  button.onclick = () => {
    myShirt(item.description);  
    myGender('Male');   
  };
  // Append the span and button to the button container
  buttonContainer.appendChild(descriptionSpan);
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
  img.alt = item.description;  

  // Create the button container (button and description description)
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttonCentra');

  // Create the button element
  const button = document.createElement('button');
  button.textContent = 'Add to cart';  
  button.onclick = () => {
    myDesign(item.description);  
  };

  // Create the span element for design description
  const descriptionSpan = document.createElement('span');
  descriptionSpan.textContent = item.description;  

  // Append the span and button to the button container
  buttonContainer.appendChild(descriptionSpan);
  buttonContainer.appendChild(button);

  // Append the image and button container to the imageBox div
  imageBox.appendChild(img);
  imageBox.appendChild(buttonContainer);

  // Append the imageBox to the container
  containerDesign.appendChild(imageBox);
});

// vinly colours images
vinlyImagColours.forEach(item => {
  const imageBox = document.createElement('div');
  imageBox.classList.add('designModle');  

  const img = document.createElement('img');
  img.src = item.url; 
  img.alt = item.description;  

  // Create the button container (button and description description)
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttonCentra');

  // Create the button element
  const button = document.createElement('button');
  button.textContent = 'Add to cart';  
  button.onclick = () => {
    myVinylColours(item.description);  
  };

  // Create the span element for design description
  const descriptionSpan = document.createElement('span');
  descriptionSpan.textContent = item.description;  

  // Append the span and button to the button container
  buttonContainer.appendChild(descriptionSpan);
  buttonContainer.appendChild(button);

  // Append the image and button container to the imageBox div
  imageBox.appendChild(img);
  imageBox.appendChild(buttonContainer);

  // Append the imageBox to the container
  containervinlyImages.appendChild(imageBox);
});

// Dummy functions for the button's onclick event
function myDesign(description) {
  console.log('Design added to cart: ' + description);
}
function myShirt(description) {
  console.log('Shirt added to cart: ' + description);
}
function myVinylColours(description) {
  console.log('Vinyl colours added to cart: ' + description);
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
    let vinylvalueinput = vinyl_text.value
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
    if (!designvalueinput) {
      designfeedbackElement.textContent = "Enter design";
      errorMes = 1;
    }
    if (!colourvalueinput) {
      colourfeedbackElement.textContent = "Enter colour";
      errorMes = 1;
    }
    if (!vinylvalueinput) {
      vinylcolourfeedbackElement.textContent = "Enter vinyl colour";
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
        vinyl: vinylvalueinput,
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
              'T-shirt colour: ', colourvalueinput, '\n',
              'Design: ', designvalueinput, '\n',
              'Vinyl colour: ', vinylvalueinput, '\n',
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
function myVinylColours(inputValue) {
  document.getElementById("VinylColour").value = inputValue;
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



