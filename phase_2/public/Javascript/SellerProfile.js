document.addEventListener('DOMContentLoaded', function() {
    // Function to display seller details
    function displaySellerDetails() {
        // Retrieve seller details from local storage
        const currentUser = JSON.parse(localStorage.getItem('currentlyLoggedIn'));

        if (currentUser && currentUser.type === 'seller') {
            // Update profile info section
            document.getElementById('account-type').textContent = `Account Type: Seller`;

            // Update account details section
            document.querySelector('.account-details').innerHTML = `
                <p>Company Name: ${currentUser.company_name || 'N/A'}</p>
                <p>Bank Account: ${currentUser.bank_account || 'N/A'}</p>
            `;
        }

        // Display sale history
        displaySaleHistory();
    }

    // Function to display sale history
    async function displaySaleHistory() {
        try {
            // Fetch all purchases
            const purchaseResponse = await fetch('/api/purchases');
            const purchases = await purchaseResponse.json();

            // Extract product IDs from purchases
            const productIds = purchases.map(purchase => purchase.product_id);

            // Fetch all products
            const productResponse = await fetch('/api/products');
            const products = await productResponse.json();

            // Shortlist products based on conditions
            const currentUser = JSON.parse(localStorage.getItem('currentlyLoggedIn'));
            const sellerProducts = products.filter(product => productIds.includes(product.id) && product.seller_id === currentUser.id);

            // Map each product to HTML and join them into a string
            const saleHistoryHTML = sellerProducts.map((product, index) => `
                <div class="history-obj">
                    <h3>Sold Product ${index + 1}</h3>
                    <p>Make: ${product.make}</p>
                    <p>Model: ${product.model}</p>
                    <p>Year: ${product.year}</p>
                    <p>Price: $${product.price}</p>
                </div>
            `).join('');

            // Append the sale history HTML to the history container
            document.getElementById('history-container').innerHTML = saleHistoryHTML;
        } catch (error) {
            console.error('Error fetching and displaying sale history:', error);
        }
    }

    // Display seller details on page load
    displaySellerDetails();

    // Function to update seller details
    document.getElementById('seller-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Retrieve form inputs
        const companyName = document.getElementById('company-name').value;
        const bankAccount = document.getElementById('bank-account').value;

        // Fetch currently logged in user from local storage
        let currentUser = JSON.parse(localStorage.getItem('currentlyLoggedIn'));

        if (currentUser && currentUser.type === 'seller') {
            // Update seller details if the form fields are not empty
            if (companyName.trim() !== '') {
                currentUser.company_name = companyName;
            }
            if (bankAccount.trim() !== '') {
                currentUser.bank_account = bankAccount;
            }

            // Update user data in local storage
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
                displaySellerDetails(); // Update displayed buyer details
            } else {
                console.error('Failed to update buyer details.');
            }

            // Display updated details
            //displaySellerDetails();
        }
    });
});
