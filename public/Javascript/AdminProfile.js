document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch data from the /api/products route
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();

        // Display products data
        const cartContainer = document.getElementById('cart-container');
        productsData.forEach(product => {
            const insideObject = createInsideObject(product);
            cartContainer.appendChild(insideObject);
        });

        // Fetch data from the /api/purchases route
        const purchasesResponse = await fetch('/api/purchases');
        const purchasesData = await purchasesResponse.json();

        // Display purchases data
        const purchaseHistoryContainer = document.getElementById('purchase-history-container');
        purchasesData.forEach(purchase => {
            const insideObject = createInsideObject(purchase);
            purchaseHistoryContainer.appendChild(insideObject);
        });

        // Fetch data from the /api/users route
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();

        // Display users data
        const usersContainer = document.getElementById('users-container');
        usersData.forEach(user => {
            const insideObject = createInsideObject(user);
            usersContainer.appendChild(insideObject);
        });
    } catch (error) {
        console.error('Error fetching and displaying data:', error);
    }
});

// Function to create an insideObject div and append data to it
function createInsideObject(data) {
    const insideObject = document.createElement('div');
    insideObject.classList.add('insideObject');
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const p = document.createElement('p');
            p.textContent = `${key}: ${data[key]}`;
            insideObject.appendChild(p);
        }
    }
    return insideObject;
}
