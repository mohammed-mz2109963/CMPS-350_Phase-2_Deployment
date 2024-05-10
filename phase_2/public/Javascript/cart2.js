document.addEventListener('DOMContentLoaded', function() {
    // Function to display buyer's shipping address
    function displayShippingAddress() {
        let users = localStorage.getItem('users');
        console.log('Users data:', users); // Log the retrieved users data

        if (!users) {
            console.error('User data not found');
            return;
        }

        let usersArray;
        try {
            usersArray = JSON.parse(users);
        } catch (error) {
            console.error('Error parsing users data:', error);
            return;
        }

        console.log('Parsed users:', usersArray); // Log the parsed users data

        if (!Array.isArray(usersArray)) {
            console.error('Invalid users data format:', usersArray);
            return;
        }

        // Find the buyer object
        const buyer = usersArray.find(user => user.type === 'buyer');
        if (!buyer || !buyer.shipping_address) {
            console.error('Invalid buyer data:', buyer);
            return;
        }

        const address = buyer.shipping_address;
        const addressHTML = `
            <div class="shipping-obj">
                <h1>Shipping Address</h1><br>
                <p>Contact Person's Name: ${address.contact_person_name}</p>
                <p>Street No./Name: ${address.street}</p>
                <p>Apartment Number or Suite Number: ${address.apartment_suite_number}</p>
                <p>City & State: ${address.city}, ${address.state}</p>
                <p>Zip Code: ${address.zip_code}</p>
                <p>Contact Person's Mobile Number: ${address.mobile_number}</p>
            </div>
        `;
        document.getElementById('shipping-details').innerHTML = addressHTML;
    }


    // Function to display car objects in cart
    function displayCarObjects() {
        let cart = localStorage.getItem('cart');
        if (!cart) {
            console.error('No cars in the cart');
            alert("No cars in the cart");
            return;
        }

        const carObjects = JSON.parse(cart);
        if (!Array.isArray(carObjects)) {
            console.error('Invalid car objects data');
            return;
        }

        let carObjectHTML = '';
        carObjects.forEach((car, index) => {
            carObjectHTML += `
                <div class="car-obj car-item">
                    <h3>Car ${index + 1}</h3>
                    <p>Make: ${car.carMake}</p>
                    <p>Model: ${car.carModel}</p>
                    <p>Year: ${car.carYear}</p>
                    <p>Price: $${car.carPrice}</p><br>
                    <button class="confirm-payment-btn" data-index="${index}">Confirm Payment</button>
                </div>
            `;
        });
        document.getElementById('car-object').innerHTML = carObjectHTML;
    }

    // Function to confirm payment
    function confirmPayment(carIndex) {
        let usersData = localStorage.getItem('users');
        if (!usersData) {
            console.error('User data not found');
            return;
        }
    
        let usersArray;
        try {
            usersArray = JSON.parse(usersData);
        } catch (error) {
            console.error('Error parsing users data:', error);
            return;
        }
    
        console.log('Parsed users:', usersArray);
    
        // Find the buyer object
        const buyer = usersArray.find(user => user.type === 'buyer');
        if (!buyer) {
            console.error('Buyer data not found');
            return;
        }
    
        const carObjects = JSON.parse(localStorage.getItem('cart'));
        if (!Array.isArray(carObjects)) {
            console.error('Invalid car objects data');
            return;
        }
    
        const car = carObjects[carIndex];
        if (buyer.money_balance >= car.carPrice) {
            // Deduct amount from balance
            buyer.money_balance -= car.carPrice;
            // Update user data in local storage
            localStorage.setItem('users', JSON.stringify(usersArray));
    
            // Remove sold car from cart
            carObjects.splice(carIndex, 1);
            localStorage.setItem('cart', JSON.stringify(carObjects));
    
            // Add sold car to purchase history
            let purchaseHistory = localStorage.getItem('purchaseHistory');
            if (!purchaseHistory) {
                purchaseHistory = [];
            } else {
                purchaseHistory = JSON.parse(purchaseHistory);
            }
            purchaseHistory.push(car);
            localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
    
            // Update display
            displayCarObjects();
            displayPurchaseHistory();
            displayShippingAddress();
        } else {
            console.error('Insufficient funds');
            alert('Insufficient funds');
        }
    }
    
    // Function to display purchase history
    function displayPurchaseHistory() {
        let purchaseHistory = localStorage.getItem('purchaseHistory');
        if (!purchaseHistory) {
            console.error('No purchase history found');
            return;
        }
        const purchaseHistoryHTML = JSON.parse(purchaseHistory).map((car, index) => `
            <div class="purchase-item">
                <h3>Purchased Car ${index + 1}</h3>
                <p>Make: ${car.carMake}</p>
                <p>Model: ${car.carModel}</p>
                <p>Year: ${car.carYear}</p>
                <p>Price: $${car.carPrice}</p>
            </div>
        `).join('');
        document.getElementById('purchase-history').innerHTML = purchaseHistoryHTML;
    }

    // Display buyer's shipping address
    displayShippingAddress();

    // Display car objects in cart
    displayCarObjects();

    // Display purchase history
    displayPurchaseHistory();

    // Add event listener to confirm payment buttons
    document.querySelectorAll('.confirm-payment-btn').forEach(button => {
        button.addEventListener('click', function() {
            const carIndex = parseInt(this.getAttribute('data-index'));
            confirmPayment(carIndex);
        });
    });
});
