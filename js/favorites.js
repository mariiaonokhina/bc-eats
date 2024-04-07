let restaurants = [];

function renderRestaurants() {
    restaurantsContainer.innerHTML = '';
    restaurants.forEach(function(restaurant, index) {
        const restaurantElement = document.createElement('div');
        restaurantElement.innerHTML = `
            <div class="restaurant">
                <label for="restaurant${index}" class="priority-${task.priority}">${task.name} - Due: ${task.dueDate}</label>
                <button class="button dangerButton smButton deleteButton" data-index="${index}">Delete</button>
            </div>
        `;
        restaurantsContainer.appendChild(taskElement);

        const deleteBtn = taskElement.querySelector('.deleteButton');
        deleteBtn.addEventListener('click', function() {
            restaurants.splice(index, 1);
            renderRestaurants();
        });
    });
}