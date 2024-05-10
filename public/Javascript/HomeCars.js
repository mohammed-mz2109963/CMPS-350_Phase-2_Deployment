document.addEventListener('DOMContentLoaded', function() {
    let carsForSale; // Declare carsForSale as a global variable

    // Function to append cars from local storage
    async function appendCarsFromApi() {
        const response = await fetch('/api/products');
        const data = await response.json();
        carsForSale = data || [];
        let carsContainer;

        if (document.getElementById('search-cars-admin')) {
            carsContainer = document.getElementById('search-cars-admin');
        } else if (document.getElementById('search-cars-guest')) {
            carsContainer = document.getElementById('search-cars-guest');
        } else {
            carsContainer = document.getElementById('search-cars');
        }

        carsContainer.innerHTML = '';

        carsForSale.forEach(car => {
            const carBox = createCarBox(car, carsContainer.id);
            carsContainer.appendChild(carBox);
        });
    }

    function createCarBox(car, containerId) {
        const carBox = document.createElement('div');
        carBox.classList.add('car-box');
        carBox.classList.add('search-car-box');
        carBox.classList.add('search-car-object'); // Add search-car-object class
        carBox.id = 'search-car-box-' + car.id;
    
        // Create car details elements
        const carImg = document.createElement('img');
        carImg.src = car.image_url;
    
        const carInfo = document.createElement('p');
        carInfo.textContent = `Year: ${car.year} | Make: ${car.make} | Model: ${car.model} | Type: ${car.type}`;
    
        const carPrice = document.createElement('h4');
        carPrice.classList.add('car-price');
        carPrice.textContent = '$' + car.price;
    
        const carDescription = document.createElement('p');
        carDescription.classList.add('car-description');
        carDescription.textContent = `Distance Travelled [km]: ${car.distance}`;
    
        const sellerInfo = document.createElement('p');
        sellerInfo.textContent = `Seller: ${car.seller_id}`;
    
        // Create button based on containerId
        let buttonLabel = 'Add to Cart';
        let onClickFunction = function () {
            addToCart(car.id);
        };
    
        if (containerId === 'search-cars-guest') {
            buttonLabel = 'Login to Continue';
            onClickFunction = function () {
                window.location.href = 'SignIn.html';
            };
        } else if (containerId === 'search-cars-admin') {
            buttonLabel = 'Remove';
            onClickFunction = function () {
                removeCar(car.id);
            };
        } else {
            if (car.isSold) {
                buttonLabel = 'Sold Out';
                onClickFunction = null;
            } else {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
                const isInCart = cart.some(item => item.id === car.id);
                const isInPurchaseHistory = purchaseHistory.some(item => item.id === car.id);
    
                if (isInCart || isInPurchaseHistory) {
                    buttonLabel = isInCart ? 'Pending' : 'Sold Out';
                    onClickFunction = null;
                }
            }
        }
    
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.dataset.carId = car.id;
        addToCartButton.textContent = buttonLabel;
        if (onClickFunction) {
            addToCartButton.onclick = onClickFunction;
        } else {
            addToCartButton.disabled = true;
        }
    
        // Append elements to the car box
        carBox.appendChild(carImg);
        carBox.appendChild(carInfo);
        carBox.appendChild(carPrice);
        carBox.appendChild(carDescription);
        carBox.appendChild(sellerInfo);
        carBox.appendChild(addToCartButton);
    
        return carBox;
    }    
    
    async function addToCart(carId) {
        const currentUser = JSON.parse(localStorage.getItem('currentlyLoggedIn'));
        const cartName = `${currentUser.id}_cart`;
        let cart = JSON.parse(localStorage.getItem(cartName)) || [];

        const isInCart = cart.some(item => item.id === carId);
        if (isInCart) {
            alert('This car is already in your cart!');
            return;
        }

        const carIndex = carsForSale.findIndex(item => item.id === carId);

        if (carIndex !== -1) {
            cart.push(carsForSale[carIndex]);
            localStorage.setItem(cartName, JSON.stringify(cart));

            const addToCartButton = document.querySelector(`.add-to-cart[data-car-id="${carId}"]`);
            if (addToCartButton) {
                addToCartButton.textContent = 'Pending';
                addToCartButton.disabled = true;
            }
            alert('Car added to cart successfully!');
        }
    }
    
    async function removeCar(carId) {
        const response = await fetch(`/api/products/${carId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            // Refresh the display
            appendCarsFromApi();
            alert('Car removed successfully!');
        } else {
            alert('Failed to remove car. Please try again.');
        }
    }
    
    
    async function filterCars() {
        // Get search criteria
        const year = document.getElementById('year').value;
        const carType = document.getElementById('car-type').value;
        const carMake = document.getElementById('car-make').value;
        const carModel = document.getElementById('model').value;

        console.log(year, carType, carMake, carModel);
    
        try {
            // Fetch cars data from the API
            const response = await fetch('/api/products');
            const products = await response.json();
    
            console.log('Products from API:', products); // Log fetched data
    
            // Filter cars based on selected criteria
            const filteredCars = products.filter(car => {
                console.log('Car:', car); // Log each car for debugging
    
                return (year === 'Select Year' || car.year === year) &&
                (carType === 'Select Type' || car.type.toLowerCase() === carType.toLowerCase()) &&
                (carMake === 'Select Make' || car.make.toLowerCase() === carMake.toLowerCase()) &&
                (carModel === '' || car.model.toLowerCase().includes(carModel.toLowerCase()));
                
            });
    
            console.log('Filtered Cars:', filteredCars); // Log filtered cars
    
            // Clear existing content
            let carsContainer;
            if (document.getElementById('search-cars-guest')) {
                carsContainer = document.getElementById('search-cars-guest');
            } else if (document.getElementById('search-cars-admin')) {
                carsContainer = document.getElementById('search-cars-admin');
            } else {
                carsContainer = document.getElementById('search-cars');
            }
            carsContainer.innerHTML = '';
    
            // Append filtered cars to the container
            filteredCars.forEach(car => {
                const carBox = createCarBox(car, carsContainer.id);
                carsContainer.appendChild(carBox);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    // Attach event listeners to search form fields
    // async function checkSoldItems() {
    //     const response = await fetch('/api/purchases');
    //     const purchaseData = await response.json();

    //     const currentUser = JSON.parse(localStorage.getItem('currentlyLoggedIn'));
    //     const cartName = `${currentUser.id}_cart`;
    //     let cart = JSON.parse(localStorage.getItem(cartName)) || [];

    //     cart.forEach(item => {
    //         const isSold = purchaseData.some(purchase => purchase.product_id === item.id);
    //         if (isSold) {
    //             item.isSold = true;
    //         }
    //     });

    //     localStorage.setItem(cartName, JSON.stringify(cart));
    //     appendCarsFromApi();
    // }

    // Attach event listeners to search form fields
    document.getElementById('search-car-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        await filterCars();
    });

    // Attach event listener to form reset
    document.getElementById('search-car-form').addEventListener('reset', async function(event) {
        event.preventDefault();
        await appendCarsFromApi();
    });

    // Append cars from API on page load
    appendCarsFromApi();
});
