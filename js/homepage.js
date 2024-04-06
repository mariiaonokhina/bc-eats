// Showing the continue button only when at least one of the restrictions is checked
const checkboxes = document.querySelectorAll('.restriction-checkbox');
const continueBtn = document.querySelector('.continue-btn');

function toggleContinueButton() {
    const isAnyCheckboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    if (isAnyCheckboxChecked) continueBtn.style.display = "block";
    else continueBtn.style.display = "none";
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', toggleContinueButton);
});

toggleContinueButton();

document.querySelector('.continue-btn').addEventListener('click', function() {
    // Hide the dietary restrictions container
    document.getElementById('dietary-restrictions-container').style.display = 'none';

    // Hide the continue button itself
    this.style.display = 'none';

    // Show the hello screen
    document.getElementById('helloScreen').style.display = 'block';
});
