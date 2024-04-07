import { restaurant_list } from "./restaurantdb.js";

// Showing the continue button only when at least one of the restrictions is checked
const checkboxes = document.querySelectorAll('.restriction-checkbox');
const continueBtn = document.querySelector('.continue-btn');
const tagsSelected = document.getElementById("tags-selected");
const resultsDiv = document.getElementById("results-container");
const numOfResultsDiv = document.getElementById("number-of-results");

function toggleContinueButton() {
    const isAnyCheckboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    if (isAnyCheckboxChecked) continueBtn.style.display = "block";
    else continueBtn.style.display = "none";
}

function populateTagsSelected() {
    populateTagsSelected.innerHTML = "";    // Clear previous tags

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const newTag = document.createElement("span");
            newTag.textContent = checkbox.value;
            newTag.classList.add("tag");

            tagsSelected.appendChild(newTag);
        }
    })
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", toggleContinueButton);
});

toggleContinueButton();

function fetchAndDisplayRestaurants() {
    fetch(`http://localhost:8080/restaurants`)
      .then((response) => response.json())
      .then((allRestaurants) => {

        // Clear previous results
        resultsDiv.innerHTML = '';
    
        const selectedTags = Array.from(checkboxes)
                            .filter(checkbox => checkbox.checked)
                            .map(checkbox => checkbox.value);

        let filteredRestaurants;

        if (selectedTags.includes("None")) {
            filteredRestaurants = allRestaurants;
        } else {
            // Filter the restaurants based on the selected tags
            filteredRestaurants = allRestaurants.filter(restaurant =>
                selectedTags.every(tag => restaurant.tags.includes(tag))
            );
        }

        // Add each restaurant to the container
        filteredRestaurants.forEach(restaurant => {
            resultsDiv.appendChild(createRestaurantElement(restaurant));
        });

        // Set the number of results
        numOfResultsDiv.textContent = `${filteredRestaurants.length} result(s) found`;

      })
      .catch((error) => console.error("Fetch Error:", error));
}

function createRestaurantElement(restaurant) {
    const restaurantElement = document.createElement('div');
    restaurantElement.classList.add('restaurant');
  
    const restaurantName = document.createElement('h3');
    restaurantName.textContent = restaurant.restaurant_name;
    restaurantElement.appendChild(restaurantName);
  
    return restaurantElement;
}

document.querySelector(".continue-btn").addEventListener("click", function() {
    // Hide the dietary restrictions container and the welcome message
    document.getElementById("dietary-restrictions-container").style.display = "none";
    document.getElementById("welcome-message-container").style.display = "none";

    // Hide the continue button
    this.style.display = "none";

    populateTagsSelected();

    fetchAndDisplayRestaurants();

    // Show the results
    document.getElementById("results-page").style.display = "block";
});
