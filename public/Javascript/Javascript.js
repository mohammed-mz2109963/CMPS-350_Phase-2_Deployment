function sellCar() {
    const year = document.getElementById('car-year').value;
    const type = document.getElementById('car-type').value;
    const make = document.getElementById('car-make').value;
    const model = document.getElementById('car-model').value;
    const price = document.getElementById('car-price').value;

    const car = {
        year: year,
        type: type,
        make: make,
        model: model,
        price: price
    };

    addCarToHomePage(car);
}


function addCarToHomePage(car) {
    const carElement = document.createElement('div'); //make a new div
    carElement.classList.add('car');

    carElement.innerHTML = `<img src="" alt="Car Image">`; //add image inside the div, need to add image

    const carDetails = document.createElement('ul'); //bullet points to show the details of the car
    carDetails.innerHTML = `
        <li>Year: ${car.year}</li>
        <li>Type: ${car.type}</li>
        <li>Make: ${car.make}</li>
        <li>Model: ${car.model}</li>
    `;
    carElement.appendChild(carDetails); //add the details below the image

    const priceButton = document.createElement('button'); //add a button
    priceButton.textContent = `Price: $${car.price}`; //button's text is the price of the car
    priceButton.addEventListener('click', function() { //clicking the price will generate a action
        
        const isLoggedIn = true; 
        const destination = isLoggedIn ? 'Cart.html' : 'Signin.html';
        window.location.href = destination;
    });
    carElement.appendChild(priceButton);

    const carsSection = document.getElementById('cars'); 
    carsSection.appendChild(carElement); 
}

