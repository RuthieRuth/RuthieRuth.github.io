let cars = []; // store the collected data from forms in an array

// get filled form to dsisplay on page in a table form only after clicking the submit button
// question: how to dom a button with type only ?

let form = document.getElementById('inputForm'); 
let displayTableBody = document.querySelector('#display tbody');


// store car data in an object
class Car {  //class methods

   constructor(license, maker, model, year, owner, price, color, discount) {
      this.license = license;
      this.maker = maker;
      this.model = model;
      this.year = parseInt(year);
      this.owner = owner;
      this.price = parseFloat(price);
      this.color = color;
      // this.discount = discount;
      this.discount = parseFloat(discount); // .toFixed(2);  //Store discount with 2 decimal places
   }
}

function calculateDiscount(year, price) {
   if (year <= 2014) {
      return price - (price * 0.15);
   } else {
      return price;
   }
}

// making new table row with necessary car info to display . car.x = from car, get... 
function displayCarInTable(car, index) {
   let newRow = document.createElement('tr');
   newRow.innerHTML = `<td>${car.license}</td>   
                  <td>${car.maker}</td>
                  <td>${car.model}</td>
                  <td>${car.year}</td>
                  <td>${car.owner}</td>
                  <td>${car.price}</td> 
                  <td>${car.color}</td>
                  <td>${car.discount}</td>
                  <td><button class="delete-btn" data-index="${index}">Delete</button></td>`; // to add delete button with car position without using html

   displayTableBody.appendChild(newRow);
}

// DISPLAY MESSAGE FUNCTION 
  
   const displayMessage = (message, type = "success") => {
   const messageElement = document.querySelector("#message");
   messageElement.textContent = message;
   messageElement.className = type;
   setTimeout(() => {
       messageElement.textContent = "";
       messageElement.className = "";
   }, 3000);
};
 

// TO LOAD SAVED CARS FROM STORAGE
window.addEventListener('load', function () {
   let storedCars = localStorage.getItem('cars');
   if (storedCars) {
      cars = JSON.parse(storedCars); // Convert JSON string back to array
      cars.forEach((car, index) => displayCarInTable(car, index)); // Display each car in the table
   }
});


// document.getElementById('carForm').reset(); //causing problems
form.addEventListener('submit', function (event) {  // prompt for clicking the submit button
   event.preventDefault(); // prevent form from submitting or sending somewhere + page reloading


   // get values from user n keep them
   let license = document.getElementById('license').value;
   let maker = document.getElementById('maker').value;
   let model = document.getElementById('model').value;
   let year = document.getElementById('year').value;
   let owner = document.getElementById('owner').value;
   let price = document.getElementById('price').value;
   let color = document.getElementById('color').value;


   let discount = calculateDiscount(parseInt(year), parseFloat(price));

   let newCar = new Car(license, maker, model, year, owner, price, color, discount) // create a new car object + need to follow the order 
   cars.push(newCar); // stores the car in an array for future use

   localStorage.setItem('cars', JSON.stringify(cars)); // Convert array to JSON string and save

   displayCarInTable(newCar, cars.length - 1); // Display the new car in the table + pass index of new car

   displayMessage("Car added successfully!"); // MESSAGE

   form.reset(); //clear all input fields.
});

// Event delegation to handle delete button clicks thanks to chatgpt
displayTableBody.addEventListener('click', function (event) {
   if (event.target.classList.contains('delete-btn')) {
      let index = event.target.getAttribute('data-index');
      cars.splice(index, 1); // Remove car from the array
      localStorage.setItem('cars', JSON.stringify(cars)); // Update localStorage

      // Clear the table and reload it with updated data
      displayTableBody.innerHTML = '';
      cars.forEach((car, index) => displayCarInTable(car, index)); // Re-render the table
   }
});

// DELETE CAR BY THEIR INDEX POSITION 
function deleteCar (index){

     cars.splice(index, -1);
     localStorage.setItem('cars', JSON.stringify(cars));
     displayTableBody.innerHTML = " ";
     
     displayTableBody();
     displayMessage("Car deleted successfully!");
} 

// CREATE A SEARCH PART, TAKE USER INPUT,COMPARE AND DISPLAY RESULT
let searchResult = document.getElementById('searchBy'); // hey, look at this input field
let searchButton = document.getElementById('searchBtn'); // hey, start searching when clicked

searchButton.addEventListener('click', function () { // took event out of the bracket
   // event.preventDefault();
   // form.reset();

   let searchLicense = searchResult.value;

   let result = cars.find(car => car.license === searchLicense);

   if (result) {
      alert(`MATCH: 
                  License Plate: ${result.license}
                  Model: ${result.model}
                  Year: ${result.year}
                  Owner: ${result.owner}`);
   } else {
      alert('NO MATCH')
   }
});



