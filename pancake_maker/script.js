const typeSelect = document.getElementById('type');
const nutsCheckbox = document.getElementById('nuts');
const bananasCheckbox = document.getElementById('bananas');
const syrupCheckbox = document.getElementById('syrup');
const whippedCreamCheckbox = document.getElementById('whippedCream');
const iceCreamCheckbox = document.getElementById('iceCream');
const deliveryCheckbox = document.getElementById('delivery');
const totalPriceSpan = document.getElementById('totalPrice'); // should it be here?

//DISPLAY SECTION

let customerNameInput = document.getElementById('customerName'); 
let submit = document.getElementById('submit-btn');

const finalName = document.querySelector('.order-summary #customerName');
const finalPanTypes = document.querySelector('.order-summary #pancakeType');
const finaltoppings = document.querySelector('.order-summary #toppings');
const finalextras = document.querySelector('.order-summary #extras');


// Function to calculate and update the total price
function calculateTotalPrice() {
    let totalPrice = parseFloat(typeSelect.value);

    // Add prices of toppings
    if (nutsCheckbox.checked) {
        totalPrice += 1;
    }
    if (bananasCheckbox.checked) {
        totalPrice += 1;
    }
    if (syrupCheckbox.checked) {
        totalPrice += 1;
    }

    // Add prices of extras
    if (whippedCreamCheckbox.checked) {
        totalPrice += 2;
    }
    if (iceCreamCheckbox.checked) {
        totalPrice += 3;
    }

    // Add price of delivery
    if (deliveryCheckbox.checked) {
        totalPrice += 5;
    }
    
    return totalPrice;  // Return the total price

}

// Update the final total price display

function updateTotalPrice() {
    let price = calculateTotalPrice();  // Get the calculated total price

    // Get all elements with id="totalPrice" (even though IDs are supposed to be unique)
    const allPriceElements = document.querySelectorAll('#totalPrice');

    // Update each one
    allPriceElements.forEach((element) => {
        element.innerHTML = `$${price}`;
    });
}

updateTotalPrice(); // Update the total price when the page loads



// Event listener for pancake type changes
typeSelect.addEventListener('change', updateTotalPrice);

// Event listeners for checkbox changes
nutsCheckbox.addEventListener('change', updateTotalPrice);
bananasCheckbox.addEventListener('change', updateTotalPrice);
syrupCheckbox.addEventListener('change', updateTotalPrice);
whippedCreamCheckbox.addEventListener('change', updateTotalPrice);
iceCreamCheckbox.addEventListener('change', updateTotalPrice);
deliveryCheckbox.addEventListener('change', updateTotalPrice);

calculateTotalPrice(); // Initial calculation

//DISPLAY SECTION

function displayOrder (){   //AI helped- taking each section of the order summary display

    let customerName = customerNameInput.value;

    let pancakeType = typeSelect.options[typeSelect.selectedIndex].text;

    let panToppings = [];
        if (nutsCheckbox.checked) panToppings.push("Nuts");
        if (bananasCheckbox.checked) panToppings.push("Bananas");
        if (syrupCheckbox.checked) panToppings.push("Syrup");
    

    let extras = [];
        if (whippedCreamCheckbox.checked) extras.push("Whipped Cream");
        if (iceCreamCheckbox.checked) extras.push("Ice Cream");


    /* let delivery = '';

        if (eatInCheckbox.checked) {
            delivery ='Eat In';
        } else if (takeOutCheckbox.checked) {
            delivery = 'Take Out';
        } else if (deliveryCheckbox.checked) {
            delivery = 'Delivery';
        } */


    finalName.innerHTML = `Name: ${customerName}`;
    finalPanTypes.innerHTML = `Type of Pancake: ${pancakeType}`;
    finaltoppings.innerHTML = `Toppings: ${panToppings.length ? panToppings.join(', ') : 'None'}`;
    finalextras.innerHTML = `Extras: ${extras.length ? extras.join(', ') : 'None'}`;
    finalDelivery.innerHTML = `Delivery: ${delivery}`;
} 

submit.addEventListener('click', displayOrder);