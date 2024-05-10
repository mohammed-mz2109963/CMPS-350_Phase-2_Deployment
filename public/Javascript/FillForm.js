document.addEventListener('DOMContentLoaded', function() {
    // Fetch car makes from the API
    fetch('https://databases.one/api/?format=json&select=make&api_key=Your_Database_Api_Key')
        .then(response => response.json())
        .then(data => {
            const makes = data.result;
            const carMakeSelect = document.getElementById('car-make');

            const defaultOption = document.createElement('option');
            defaultOption.text = 'Select Make';
            defaultOption.value = 'Select Make';
            carMakeSelect.appendChild(defaultOption);

            // Populate the options of the make select element
            makes.forEach(make => {
                const option = document.createElement('option');
                option.text = make.make;
                option.value = make.make;
                carMakeSelect.appendChild(option);
            });

            // Add change event listener to car make select
            // carMakeSelect.addEventListener('change', function() {
            //     const selectedMakeId = this.value;

            //     // Fetch models for the selected make
            //     fetch(`https://databases.one/api/?format=json&select=model&make_id=${selectedMakeId}&api_key=Your_Database_Api_Key`)
            //         .then(response => response.json())
            //         .then(data => {
            //             const models = data.result;
            //             const carModelSelect = document.getElementById('car-model');

            //             // Clear existing options
            //             carModelSelect.innerHTML = '';

            //             // Create and append new options
            //             models.forEach(model => {
            //                 const option = document.createElement('option');
            //                 option.text = model.model;
            //                 option.value = model.model_id;
            //                 carModelSelect.appendChild(option);
            //             });
            //         })
            //         .catch(error => {
            //             console.error('Error fetching car models:', error);
            //         });
            // });
        })
        .catch(error => {
            console.error('Error fetching car makes:', error);
        });
});
