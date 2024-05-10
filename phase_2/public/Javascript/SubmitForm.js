document.addEventListener('DOMContentLoaded', function() {
    const sellForm = document.getElementById('sell-form');

    sellForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form data
        const sellerName = document.getElementById('seller-name').value;
        const sellerEmail = document.getElementById('seller-email').value;
        const sellerPhone = document.getElementById('seller-phone').value;
        const sellerContact = document.querySelector('input[name="seller-contact"]:checked').value;
        const carYear = document.getElementById('car-year').value;
        const carMake = document.getElementById('car-make').value;
        const carModel = document.getElementById('car-model').value;
        const carType = document.getElementById('car-type').value;
        const carPrice = document.getElementById('car-price').value;
        const carDistance = document.getElementById('car-distance').value;
        const carImageURL = document.getElementById('car-image-url').value; // Get the URL from input field

        // Retrieve currently logged-in user details from localStorage
        const currentlyLoggedIn = JSON.parse(localStorage.getItem('currentlyLoggedIn'));

        // Create product object
        const productObject = {
            name: carMake + ' ' + carModel,
            price: parseFloat(carPrice),
            type: carType,
            image_url: carImageURL,
            seller_id: currentlyLoggedIn.id // Fill in seller_id using currently logged-in user details
        };

        // POST request to create a new product
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productObject)
        });

        if (response.ok) {
            // Optionally, you can clear the form fields after successful submission
            sellForm.reset();

            // Display alert indicating form submission status
            alert('Product created successfully!');
            // Redirect to Homepage.html or any other page as needed
            // window.location.href = 'Homepage.html';
        } else {
            alert('Failed to create product. Please try again.');
        }
    });
});
