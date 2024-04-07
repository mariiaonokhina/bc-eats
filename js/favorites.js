let restaurants = [];
let iter = 0;

function renderRestaurants() {
    restaurantsContainer.innerHTML = '';
    restaurants.forEach(function(restaurant, index) {
        const restaurantElement = document.createElement('div');
        restaurantElement.innerHTML = `
            <div for="restaurant${index}" class="flex_item_${iter%2}">
                <div class="restaurant">
                    <p class="name">${restaurant.restaurant_name}</p>
                    <p class="price">${restaurant.price_tag}</p>
                    <p class="date">${restaurant.dates}</p>
                    <button class="button dangerButton smButton deleteButton" data-index="${index}">X</button>
                </div>
            </div>
        `;
        iter++;
        restaurantsContainer.appendChild(taskElement);

        const deleteBtn = taskElement.querySelector('.deleteButton');
        deleteBtn.addEventListener('click', function() {
            restaurants.splice(index, 1);
            renderRestaurants();
        });
    });
}