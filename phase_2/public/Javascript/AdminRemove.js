// JavaScript file: adminFunctions.js

// Function to remove a featured car
function removeFeaturedCar(button) {
    // Get the parent car-box element
    var carBox = button.parentNode;
    // Remove the entire car-box from the DOM
    carBox.parentNode.removeChild(carBox);
}

// Function to remove a car object from search results
function removeSearchCar(button) {
    // Get the parent car-box element
    var carBox = button.parentNode;
    // Remove the entire car-box from the DOM
    carBox.parentNode.removeChild(carBox);
}

// Function to remove a review
function removeReview(button) {
    // Get the parent review-bracket element
    var reviewBracket = button.parentNode;
    // Remove the entire review-bracket from the DOM
    reviewBracket.parentNode.removeChild(reviewBracket);
}
