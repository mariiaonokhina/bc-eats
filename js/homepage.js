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

function setupCheckboxListeners() {
    const noneCheckbox = document.getElementById('none'); 

    checkboxes.forEach(checkbox => {
        if (checkbox === noneCheckbox) {
            // If this is the "None" checkbox
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    // Uncheck all other checkboxes
                    checkboxes.forEach(box => {
                        if (box !== noneCheckbox) box.checked = false;
                    });
                }
                toggleContinueButton();
            });
        } else {
            // For all other checkboxes
            checkbox.addEventListener('change', () => {
                if (checkbox.checked && noneCheckbox.checked) {
                    // Uncheck "None" if other checkbox is checked
                    noneCheckbox.checked = false;
                }
                toggleContinueButton();
            });
        }
    });
}

setupCheckboxListeners(); 

function populateTagsSelected() {
    populateTagsSelected.innerHTML = "";    // Clear previous tags

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const newTag = document.createElement("div");
            let img = document.createElement('img');
            let text = document.createElement('span');

            text.innerHTML = checkbox.value;

            img.src = "../assets/x-solid.svg";

            img.classList.add("cancel-img");
            
            newTag.appendChild(img);
            newTag.appendChild(text);

            newTag.classList.add("tag");

            tagsSelected.appendChild(newTag);
        }
    })
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", toggleContinueButton);
});

toggleContinueButton();

function getSelectedTags() {
    return Array.from(tagsSelected.children).map(tag => tag.textContent);
}

function fetchAndDisplayRestaurants() {
    // Clear previous results
    resultsDiv.innerHTML = '';
  
    const selectedTags = Array.from(checkboxes)
                        .filter(checkbox => checkbox.checked)
                        .map(checkbox => checkbox.value);

    let filteredRestaurants;

    if (selectedTags.includes("None")) {
        filteredRestaurants = restaurant_list;
    } else {
        // Filter the restaurants based on the selected tags
        filteredRestaurants = restaurant_list.filter(restaurant =>
            selectedTags.every(tag => restaurant.tags.includes(tag))
        );
    }

    // Add each restaurant to the container
    filteredRestaurants.forEach(restaurant => {
        resultsDiv.appendChild(createRestaurantElement(restaurant));
    });

    // Set the number of results
    numOfResultsDiv.textContent = `${filteredRestaurants.length} result(s) found:`;
}

function createRestaurantElement(restaurant) {
    const restaurantElement = document.createElement('div');
  
    const restaurantName = document.createElement('h3');
    const image = document.createElement("img");
    const price = document.createElement("span");
    const schedule = document.createElement("p");
    const divInfo = document.createElement("div");
    const divTools = document.createElement("div");

    restaurantName.innerHTML = restaurant.restaurant_name;
    image.src = restaurant.images_url[0];

    price.innerHTML = restaurant.price_tag;
    schedule.innerHTML = restaurant.dates;

    restaurantElement.classList.add("result");

    divInfo.appendChild(restaurantName);
    divInfo.appendChild(price);
    divInfo.appendChild(schedule);

    divInfo.classList.add("div-info");
    divTools.classList.add("div-tools");

    divTools.innerHTML = ">";

    restaurantElement.appendChild(image);
    restaurantElement.appendChild(divInfo);
    restaurantElement.appendChild(divTools);
  
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

document.getElementById("add-restriction").addEventListener("click", function() {
    const selectElement = document.querySelector(".select-restrictions");
    const selectedValue = selectElement.value;
    
    // Check if the selected value is not empty and not already added
    if (selectedValue && !Array.from(tagsSelected.children).some(tag => tag.textContent === selectedValue)) {
        
        
        // Append the new tag to the tags-selected container
        tagsSelected.appendChild(newTag);

        // Optionally, you might want to reset the select dropdown back to its placeholder option
        selectElement.value = " ";
    }
});