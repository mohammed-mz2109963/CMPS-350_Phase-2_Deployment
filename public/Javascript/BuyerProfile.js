document.addEventListener('DOMContentLoaded', function() {
    // Function to display buyer details
    function displayBuyerDetails() {
        // Retrieve current user from local storage
        const currentUser = JSON.parse(localStorage.getItem('currentlyLoggedIn'));
        if (!currentUser) {
            console.error('Current user not found.');
            return;
        }

        // Update profile info section with current user's data
        document.getElementById('name').textContent = `Name: ${currentUser.name}`;
        document.getElementById('surname').textContent = `Surname: ${currentUser.surname}`;
        document.getElementById('account-type').textContent = `Account Type: ${currentUser.type}`;
        document.getElementById('balance').textContent = `Account Balance: $${currentUser.money_balance}`;

        // Update shipping address section
        const addressHTML = `
            <p>Contact Person's Name: ${currentUser.contact_person_name}</p>
            <p>Street No./Name: ${currentUser.street}</p>
            <p>Apartment Number or Suite Number: ${currentUser.apartment_suite_number}</p>
            <p>City & State: ${currentUser.city}, ${currentUser.state}</p>
            <p>Zip Code: ${currentUser.zip_code}</p>
            <p>Contact Person's Mobile Number: ${currentUser.mobile_number}</p>
        `;
        document.querySelector('.shipping-address').innerHTML = addressHTML;

        // Display purchase history
        displayPurchaseHistory();
    }

    async function displayPurchaseHistory() {
        try {
            // Retrieve currently logged in user from local storage
            const currentUser = JSON.parse(localStorage.getItem('currentlyLoggedIn'));
            if (!currentUser) {
                console.error('Current user not found.');
                return;
            }
    
            // Fetch all purchases
            const purchasesResponse = await fetch('/api/purchases');
            const purchases = await purchasesResponse.json();
    
            // Filter purchases for the current buyer
            const buyerPurchases = purchases.filter(purchase => purchase.buyer_id === currentUser.id);
    
            // Get the product IDs from the filtered purchases
            const productIds = buyerPurchases.map(purchase => purchase.product_id);
    
            // Fetch all products
            const productsResponse = await fetch('/api/products');
            const products = await productsResponse.json();
    
            // Filter products with IDs from the purchase list
            const purchasedProducts = products.filter(product => productIds.includes(product.id));
    
            // Map each purchased product to HTML and join them into a string
            const purchaseHistoryHTML = purchasedProducts.map((product, index) => `
                <div class="history-obj">
                    <h3>Purchased Car ${index + 1}</h3>
                    <p>Make: ${product.make}</p>
                    <p>Model: ${product.model}</p>
                    <p>Year: ${product.year}</p>
                    <p>Price: $${product.price}</p>
                </div>
            `).join('');
    
            // Append the purchase history HTML to the history container
            document.getElementById('history-container').innerHTML = purchaseHistoryHTML;
        } catch (error) {
            console.error('Error fetching and displaying purchase history:', error);
        }
    }
    

    // Add event listener to the "Add Balance" button
    document.getElementById('add-balance').addEventListener('click', function(event) {
        addBalance(1000); // Add $1000 to the balance
    });

    // Function to add balance
    async function addBalance(amount) {
        // Retrieve current user from local storage
        const currentUser = JSON.parse(localStorage.getItem('currentlyLoggedIn'));
        if (!currentUser) {
            console.error('Current user not found.');
            return;
        }

        // Update balance in the current user object
        currentUser.money_balance += amount;

        try {
            // Update balance in local storage
            localStorage.setItem('currentlyLoggedIn', JSON.stringify(currentUser));

            // Update balance in Prisma storage using PUT /api/users/[user_id] route
            const response = await fetch(`/api/users/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            });

            if (response.ok) {
                console.log('Balance updated successfully in Prisma storage.');
            } else {
                console.error('Failed to update balance in Prisma storage.');
            }
        } catch (error) {
            console.error('Error updating balance:', error);
        }

        // Update displayed balance
        document.getElementById('balance').textContent = `Account Balance: $${currentUser.money_balance}`;
    }

    // Add event listener to the form for updating buyer details
    document.getElementById('buyer-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = {
            shipping_address: {
                contact_person_name: document.getElementById('contact-person-name').value,
                street: document.getElementById('street').value,
                apartment_suite_number: document.getElementById('apartment-suite-number').value,
                city: document.getElementById('city-state').value,
                zip_code: document.getElementById('zip-code').value,
                mobile_number: document.getElementById('mobile-number').value
            }
        };

        // Update buyer details in local storage
        updateBuyerDetails(formData);
    });

    // Function to update buyer details in local storage and Prisma storage
    async function updateBuyerDetails(formData) {
        try {
            // Retrieve currently logged in user from local storage
            let currentUser = JSON.parse(localStorage.getItem('currentlyLoggedIn'));
            if (!currentUser) {
                console.error('Current user not found.');
                return;
            }

            // Update the user object with the new details
            currentUser.contact_person_name = formData.shipping_address.contact_person_name || currentUser.contact_person_name;
            currentUser.street = formData.shipping_address.street || currentUser.street;
            currentUser.apartment_suite_number = formData.shipping_address.apartment_suite_number || currentUser.apartment_suite_number;
            currentUser.city = formData.shipping_address.city || currentUser.city;
            currentUser.zip_code = formData.shipping_address.zip_code || currentUser.zip_code;
            currentUser.mobile_number = formData.shipping_address.mobile_number || currentUser.mobile_number;

            // Update the user details in local storage
            localStorage.setItem('currentlyLoggedIn', JSON.stringify(currentUser));

            // Update the user details in Prisma storage using PUT /api/users/[user_id] route
            const response = await fetch(`/api/users/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            });

            if (response.ok) {
                console.log('Buyer details updated successfully.');
                displayBuyerDetails(); // Update displayed buyer details
            } else {
                console.error('Failed to update buyer details.');
            }
        } catch (error) {
            console.error('Error updating buyer details:', error);
        }
    }

    // Call the function to display buyer details
    displayBuyerDetails();
});