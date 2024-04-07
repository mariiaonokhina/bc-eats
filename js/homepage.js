// Showing the continue button only when at least one of the restrictions is checked
const checkboxes = document.querySelectorAll('.restriction-checkbox');
const continueBtn = document.querySelector('.continue-btn');
const tagsSelected = document.getElementById("tags-selected");

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

document.querySelector(".continue-btn").addEventListener("click", function() {
    // Hide the dietary restrictions container and the welcome message
    document.getElementById("dietary-restrictions-container").style.display = "none";
    document.getElementById("welcome-message-container").style.display = "none";

    // Hide the continue button
    this.style.display = "none";

    populateTagsSelected();

    // Show the results
    document.getElementById("results-page").style.display = "block";
});
